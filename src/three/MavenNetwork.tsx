import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { quality, isMobileWidth } from '../utils/motion'
import { themeState } from '../utils/theme'
import { SCENE_PALETTES, retintMaterial, watchSceneTheme } from './scenePalette'

/* =====================================================================
   MavenNetwork — the "Maven system": two counter-rotating orbital rings
   of nodes around a wireframe core. `mode` (0 = Web Masters, 1 = Online
   Marketers) re-weights the rings' colour, tilt and speed, so the visual
   identity shifts as the story moves between the two disciplines.
   ===================================================================== */

function ringPositions(count: number, radius: number, tilt: number, jitter: number) {
  const positions = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const r = radius + (Math.random() - 0.5) * jitter
    const y = (Math.random() - 0.5) * jitter * 0.6
    positions[i * 3] = Math.cos(a) * r
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = Math.sin(a) * r
    seeds[i] = Math.random()
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  const m = new THREE.Matrix4().makeRotationX(tilt)
  g.applyMatrix4(m)
  return g
}

const nodeShader = () =>
  new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 0.07 },
      uColor: { value: new THREE.Color('#8B4FBF') },
      uSpin: { value: 0 },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform float uSize;
      uniform float uSpin;
      in float aSeed;
      out float vPulse;
      void main() {
        // Rotate this ring's points around Y inside the shader.
        float c = cos(uSpin), s = sin(uSpin);
        vec3 p = position;
        p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        float pulse = 0.55 + 0.45 * sin(uTime * 1.6 + aSeed * 30.0);
        vPulse = pulse;
        gl_PointSize = (0.5 + aSeed) * pulse * uSize * (340.0 / max(-mv.z, 0.1));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      in float vPulse;
      out vec4 fragColor;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float alpha = smoothstep(0.5, 0.05, d) * (0.4 + vPulse * 0.5);
        fragColor = vec4(uColor * (0.7 + vPulse * 0.5), alpha);
      }
    `,
  })

function System({ mode, count, showCore }: { mode: number; count: number; showCore: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const modeRef = useRef(mode)
  modeRef.current = mode

  const rings = useMemo(() => {
    const outer = ringPositions(count, 2.6, 0.5, 0.5)
    const inner = ringPositions(Math.round(count * 0.7), 1.7, -0.7, 0.35)
    const outerMat = nodeShader()
    const innerMat = nodeShader()
    innerMat.uniforms.uColor.value = new THREE.Color('#DACAFF')
    innerMat.uniforms.uSize.value = 0.055
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1)
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#612C8B'),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    return { outer, inner, outerMat, innerMat, coreGeo, coreMat }
  }, [count])

  const pointer = useRef({ x: 0, y: 0 })
  const colorOuter = useMemo(() => new THREE.Color(), [])
  const colorInner = useMemo(() => new THREE.Color(), [])

  // Theme retinting + mode colour accents co-operate here: theme sets the
  // baseline ring colours, mode blends between them each frame.
  useEffect(() => {
    return watchSceneTheme((theme) => {
      const pal = SCENE_PALETTES[theme]
      const outerTarget = theme === 'light' ? '#7b3cbe' : '#8B4FBF'
      const innerTarget = theme === 'light' ? '#4a3070' : '#DACAFF'
      retintMaterial(rings.outerMat, theme, (m) => {
        ;((m as THREE.ShaderMaterial).uniforms.uColor.value as THREE.Color).set(outerTarget)
      })
      retintMaterial(rings.innerMat, theme, (m) => {
        ;((m as THREE.ShaderMaterial).uniforms.uColor.value as THREE.Color).set(innerTarget)
      })
      retintMaterial(rings.coreMat, theme, (m) => {
        ;(m as THREE.MeshBasicMaterial).color.set(pal.core)
        ;(m as THREE.MeshBasicMaterial).opacity = theme === 'light' ? 0.28 : 0.35
      })
    })
  }, [rings])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const m = modeRef.current
    rings.outerMat.uniforms.uTime.value = t
    rings.innerMat.uniforms.uTime.value = t

    // Mode 0 (Web Masters): outer ring leads. Mode 1 (Online Marketers):
    // inner ring leads, warmer emphasis. Targets follow the active theme.
    const light = themeState.name === 'light'
    rings.outerMat.uniforms.uSpin.value += dt * (0.22 - m * 0.12)
    rings.innerMat.uniforms.uSpin.value += dt * (-0.28 + m * 0.4)
    colorOuter.set(light ? (m < 0.5 ? '#7b3cbe' : '#9257cf') : m < 0.5 ? '#8B4FBF' : '#B98AF0')
    colorInner.set(light ? (m < 0.5 ? '#4a3070' : '#6d4a9e') : m < 0.5 ? '#DACAFF' : '#E9DDFF')
    ;(rings.outerMat.uniforms.uColor.value as THREE.Color).lerp(colorOuter, dt * 3)
    ;(rings.innerMat.uniforms.uColor.value as THREE.Color).lerp(colorInner, dt * 3)

    const g = groupRef.current
    if (g) {
      pointer.current.x += (state.pointer.x - pointer.current.x) * Math.min(1, dt * 3)
      pointer.current.y += (state.pointer.y - pointer.current.y) * Math.min(1, dt * 3)
      g.rotation.y += (pointer.current.x * 0.5 - g.rotation.y) * dt * 2
      g.rotation.x += (pointer.current.y * 0.3 - g.rotation.x) * dt * 2
      g.position.y = Math.sin(t * 0.5) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={rings.outer} material={rings.outerMat} />
      <points geometry={rings.inner} material={rings.innerMat} />
      {showCore && <mesh geometry={rings.coreGeo} material={rings.coreMat} />}
    </group>
  )
}

export default function MavenNetworkCanvas({
  mode = 0,
  showCore = true,
  frameloop = 'always',
}: {
  mode?: number
  showCore?: boolean
  frameloop?: 'always' | 'never'
}) {
  const mobile = isMobileWidth()
  return (
    <Canvas
      frameloop={frameloop}
      dpr={quality.dpr}
      camera={{ position: [0, 0, mobile ? 6.5 : 5.6], fov: 45 }}
      gl={{ antialias: quality.tier === 'high', alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <System mode={mode} count={quality.mavenNodes} showCore={showCore} />
    </Canvas>
  )
}
