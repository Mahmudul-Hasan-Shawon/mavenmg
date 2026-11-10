import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { onAppReady, quality, scrollState } from '../utils/motion'
import { retintMaterial, watchSceneTheme } from './scenePalette'

/* =====================================================================
   HeroGlobe — the "midnight planet" hero backdrop: a dark violet globe
   seen from ~58° above the equator, a pole bloom
   and a lighthouse beam sweeping around the limb. Everything renders in
   the site's own palette on top of the hero's existing glow, so the
   section keeps its look and just gains the globe.

   Technique notes (values are tuned constants, not magic):
   - The beam is a camera-facing plane running the reference lobe math:
     Gaussian core + Lorentzian halo/outer rings, a raised-cosine
     angular arc so the sweep has no seam, and a soft window at the
     buffer edge. It orbits the globe's limb like a searchlight.
   - Placement mirrors the reference layout: the disc is
     max(min(1.337·vw, 2054px), 1.3·vh) wide, centred horizontally, with
     its centre parked below the fold so only the polar cap shows.
   ===================================================================== */

/* ------------------------------ tunables ------------------------------ */

const BEAM = {
  spin: 13.5, // orbit speed, degrees/second (~27s per revolution)
  phase: 74, // starting angle, degrees
  arcPower: 12, // lobe tightness of the sweep
  exposure: 1.5,
  coreGain: 0.62,
  haloGain: 0.8,
  outerGain: 0.22,
  haloInner: 0.3, // halo squeeze factor inside the ring
  coreWidth: 0.016, // art-relative widths (fractions of globe diameter)
  haloWidth: 0.0492,
  outerWidth: 0.18,
  span: 1.9, // beam plane size in globe diameters
}

const GLOBE = {
  spin: 0.032, // slow self-rotation, rad/s
  cameraElevation: 58, // degrees above the equator
  cameraDistance: 5.37,
  fov: 42,
  rampSeconds: 1.5, // entrance bloom duration
  scrollFadeVh: 0.85, // fully faded once this much viewport is scrolled
}

const DARK = {
  pole: '#DACAFF',
  poleGain: 0.4,
  body: '#060213',
  bodyRim: '#8B4FBF',
  bodySheen: '#3A1355',
  beamCore: '#EDE8FF',
  beamHalo: '#B98AF0',
  beamOuter: '#612C8B',
}

const LIGHT = {
  pole: '#4a3070',
  poleGain: 0.28,
  body: '#ece7f6',
  bodyRim: '#6d2fa5',
  bodySheen: '#c9bce4',
  beamCore: '#5b2a86',
  beamHalo: '#6d2fa5',
  beamOuter: '#4a3070',
  beamExposure: 0.85,
}

/* ------------------------------ helpers ------------------------------ */

/** Reference hero layout: disc size + centre position in px. */
function heroFrame(vw: number, vh: number) {
  const artW = Math.max(Math.min(1.337 * vw, 2054), 1.3 * vh)
  const artCY = Math.max(0.3 * vh, vh + 40 - artW) + artW / 2
  return { artW, artCX: vw / 2, artCY }
}

const clamp01 = (v: number) => THREE.MathUtils.clamp(v, 0, 1)

/* -------------------------------- scene ------------------------------- */

interface GlobeSet {
  bodyGeo: THREE.SphereGeometry
  bodyMat: THREE.ShaderMaterial
  poleGeo: THREE.PlaneGeometry
  poleMat: THREE.ShaderMaterial
  beamGeo: THREE.PlaneGeometry
  beamMat: THREE.ShaderMaterial
  fade: { value: number } // shared by every glow layer
}

function PolarGlobe() {
  const camera = useThree((s) => s.camera)
  const groupRef = useRef<THREE.Group>(null)
  const spinRef = useRef<THREE.Group>(null)
  const poleRef = useRef<THREE.Mesh>(null)
  const beamRef = useRef<THREE.Mesh>(null)
  const setRef = useRef<GlobeSet | null>(null)
  const [set, setSet] = useState<GlobeSet | null>(null)

  const readyRef = useRef(false)
  const rampStartRef = useRef<number | null>(null)
  const phaseRef = useRef((BEAM.phase * Math.PI) / 180)
  const tmpRef = useRef(new THREE.Vector3())

  // Camera setup + entrance trigger (fires once the readiness veil lifts).
  useEffect(() => {
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()
    onAppReady(() => {
      readyRef.current = true
    })
  }, [camera])

  // GPU resources: built outside render, disposed on unmount. The fade
  // uniform object is shared by reference, so one write updates all layers.
  useEffect(() => {
    const fade = { value: 0 }

    const viewVertex = /* glsl */ `
      out vec3 vNormalV;
      out vec3 vViewV;
      out vec3 vNormalW;
      void main() {
        vNormalV = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vViewV = normalize(-mv.xyz);
        vNormalW = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * mv;
      }
    `

    const bodyGeo = new THREE.SphereGeometry(1, 96, 64)
    const bodyMat = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
        uBase: { value: new THREE.Color(DARK.body) },
        uRim: { value: new THREE.Color(DARK.bodyRim) },
        uSheen: { value: new THREE.Color(DARK.bodySheen) },
      },
      vertexShader: viewVertex,
      fragmentShader: /* glsl */ `
        uniform vec3 uBase;
        uniform vec3 uRim;
        uniform vec3 uSheen;
        in vec3 vNormalV;
        in vec3 vViewV;
        in vec3 vNormalW;
        out vec4 fragColor;
        void main() {
          float ndv = max(dot(normalize(vNormalV), normalize(vViewV)), 0.0);
          float fres = pow(1.0 - ndv, 2.6);
          float sheen = pow(max(dot(normalize(vNormalW), normalize(vec3(0.15, 0.85, 0.5))), 0.0), 3.0);
          vec3 col = uBase + uSheen * sheen * 0.35 + uRim * fres * 0.5;
          fragColor = vec4(col, 1.0);
        }
      `,
    })

    const poleGeo = new THREE.PlaneGeometry(0.42, 0.42)
    const poleMat = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(DARK.pole) },
        uGain: { value: DARK.poleGain },
        uFade: fade,
      },
      vertexShader: /* glsl */ `
        out vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uGain;
        uniform float uFade;
        in vec2 vUv;
        out vec4 fragColor;
        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float a = exp(-dot(p, p) * 7.0) * uGain * uFade;
          fragColor = vec4(uColor, a);
        }
      `,
    })

    const beamGeo = new THREE.PlaneGeometry(BEAM.span * 2, BEAM.span * 2)
    const beamMat = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uArcPhase: { value: phaseRef.current },
        uRadius: { value: 1 / BEAM.span },
        uCoreWidth: { value: BEAM.coreWidth / BEAM.span },
        uHaloWidth: { value: BEAM.haloWidth / BEAM.span },
        uOuterWidth: { value: BEAM.outerWidth / BEAM.span },
        uHaloInner: { value: BEAM.haloInner },
        uArcPower: { value: BEAM.arcPower },
        uExposure: { value: BEAM.exposure },
        uCoreGain: { value: BEAM.coreGain },
        uHaloGain: { value: BEAM.haloGain },
        uOuterGain: { value: BEAM.outerGain },
        uCore: { value: new THREE.Color(DARK.beamCore) },
        uHalo: { value: new THREE.Color(DARK.beamHalo) },
        uOuter: { value: new THREE.Color(DARK.beamOuter) },
        uFade: fade,
      },
      vertexShader: /* glsl */ `
        out vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uRadius;
        uniform float uCoreWidth;
        uniform float uHaloWidth;
        uniform float uOuterWidth;
        uniform float uHaloInner;
        uniform float uArcPower;
        uniform float uArcPhase;
        uniform float uExposure;
        uniform float uCoreGain;
        uniform float uHaloGain;
        uniform float uOuterGain;
        uniform float uFade;
        uniform vec3 uCore;
        uniform vec3 uHalo;
        uniform vec3 uOuter;
        in vec2 vUv;
        out vec4 fragColor;

        float lorentz(float x) {
          return 1.0 / (1.0 + x * x);
        }

        void main() {
          // Centred, -1..1: the plane is square so this is isotropic.
          vec2 p = vUv * 2.0 - 1.0;
          float r = length(p);
          float d = r - uRadius;
          float inner = d < 0.0 ? uHaloInner : 1.0;

          float core = exp(-(d * d) / (uCoreWidth * uCoreWidth));
          float halo = lorentz(d / (uHaloWidth * inner));
          float outer = lorentz(d / (uOuterWidth * inner));

          // Raised cosine: one smooth lobe with no seam where angle wraps.
          float ang = atan(p.y, p.x);
          float arc = pow(0.5 + 0.5 * cos(ang - uArcPhase), uArcPower);

          // Soft landing at the buffer edge.
          float window = smoothstep(1.0, 0.85, r);

          float cw = core * uCoreGain;
          float hw = halo * uHaloGain;
          float ow = outer * uOuterGain;
          float intensity = (cw + hw + ow) * arc * uExposure * uFade * window;

          float total = max(cw + hw + ow, 1e-4);
          vec3 rgb = (uCore * cw + uHalo * hw + uOuter * ow) / total;
          float alpha = 1.0 - exp(-intensity);
          fragColor = vec4(rgb, alpha);
        }
      `,
    })

    const built: GlobeSet = {
      bodyGeo,
      bodyMat,
      poleGeo,
      poleMat,
      beamGeo,
      beamMat,
      fade,
    }
    setRef.current = built
    setSet(built)
    return () => {
      setRef.current = null
      built.bodyGeo.dispose()
      built.bodyMat.dispose()
      built.poleGeo.dispose()
      built.poleMat.dispose()
      built.beamGeo.dispose()
      built.beamMat.dispose()
    }
  }, [])

  // Theme retint: additive lavender on dark, normal-blended deep violet on light.
  useEffect(() => {
    if (!set) return
    return watchSceneTheme((theme) => {
      const pal = theme === 'light' ? LIGHT : DARK
      retintMaterial(set.poleMat, theme, (m) => {
        const sm = m as THREE.ShaderMaterial
        sm.uniforms.uColor.value.set(pal.pole)
        sm.uniforms.uGain.value = pal.poleGain
      })
      retintMaterial(set.beamMat, theme, (m) => {
        const sm = m as THREE.ShaderMaterial
        sm.uniforms.uCore.value.set(pal.beamCore)
        sm.uniforms.uHalo.value.set(pal.beamHalo)
        sm.uniforms.uOuter.value.set(pal.beamOuter)
        sm.uniforms.uExposure.value = theme === 'light' ? LIGHT.beamExposure : BEAM.exposure
      })
      set.bodyMat.uniforms.uBase.value.set(pal.body)
      set.bodyMat.uniforms.uRim.value.set(pal.bodyRim)
      set.bodyMat.uniforms.uSheen.value.set(pal.bodySheen)
    })
  }, [set])

  useFrame((state, dt) => {
    const s = setRef.current
    const group = groupRef.current
    if (!s || !group) return
    const t = state.clock.elapsedTime
    const { size } = state

    // Entrance bloom (smoothstep) once the app is ready, then fade with scroll.
    if (readyRef.current && rampStartRef.current === null) rampStartRef.current = t
    const rampT =
      rampStartRef.current === null ? 0 : clamp01((t - rampStartRef.current) / GLOBE.rampSeconds)
    const ramp = rampT * rampT * (3 - 2 * rampT)
    const close = clamp01(scrollState.y / Math.max(size.height * GLOBE.scrollFadeVh, 1))
    s.fade.value = ramp * (1 - close)

    // Responsive placement: park the disc like the reference hero layout.
    const { artW, artCX, artCY } = heroFrame(size.width, size.height)
    const dist = GLOBE.cameraDistance
    const fov = (camera as THREE.PerspectiveCamera).fov
    const worldPerPx = (2 * dist * Math.tan(((fov * Math.PI) / 180) / 2)) / size.height
    const settle = 0.965 + 0.035 * ramp // tiny scale-in on entrance
    group.scale.setScalar((artW / 2) * worldPerPx * settle)
    const ndcX = (artCX / size.width) * 2 - 1
    const ndcY = 1 - (artCY / size.height) * 2
    tmpRef.current.set(ndcX, ndcY, 0.5).unproject(camera).sub(camera.position).normalize()
    group.position.copy(camera.position).addScaledVector(tmpRef.current, dist)

    // Motion: slow self-rotation, beam orbit, billboards face the camera.
    if (spinRef.current) spinRef.current.rotation.y += dt * GLOBE.spin
    phaseRef.current += ((BEAM.spin * Math.PI) / 180) * dt
    s.beamMat.uniforms.uArcPhase.value = phaseRef.current
    if (beamRef.current) beamRef.current.quaternion.copy(camera.quaternion)
    if (poleRef.current) poleRef.current.quaternion.copy(camera.quaternion)
  })

  return (
    <group ref={groupRef}>
      <group ref={spinRef}>
        {set && <mesh geometry={set.bodyGeo} material={set.bodyMat} renderOrder={0} />}
      </group>
      {set && (
        <mesh ref={poleRef} geometry={set.poleGeo} material={set.poleMat} position={[0, 1.02, 0]} renderOrder={5} />
      )}
      {set && <mesh ref={beamRef} geometry={set.beamGeo} material={set.beamMat} renderOrder={10} />}
    </group>
  )
}

export default function HeroGlobeCanvas({ frameloop = 'always' }: { frameloop?: 'always' | 'never' }) {
  const e = (GLOBE.cameraElevation * Math.PI) / 180
  const d = GLOBE.cameraDistance
  return (
    <Canvas
      frameloop={frameloop}
      dpr={quality.dpr}
      camera={{
        position: [0, Math.sin(e) * d, Math.cos(e) * d],
        fov: GLOBE.fov,
      }}
      gl={{ antialias: quality.tier === 'high', alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <PolarGlobe />
    </Canvas>
  )
}
