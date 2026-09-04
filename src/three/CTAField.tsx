import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { quality, isMobileWidth } from '../utils/motion'
import { SIMPLEX_NOISE } from './glsl/noise'
import { SCENE_PALETTES, retintMaterial, watchSceneTheme } from './scenePalette'

/* =====================================================================
   CTAField — a deep particle field behind the final call-to-action.
   Particles drift on layered noise; `focus` (0..1, driven by scroll) pulls
   the field together and brightens it, so the backdrop "gathers" as the
   CTA enters the viewport. The cursor carves a soft channel through it.
   ===================================================================== */

function Field({ count, focusRef }: { count: number; focusRef: React.RefObject<number> }) {
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count * 2)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1
      seeds[i * 2] = Math.random()
      seeds[i * 2 + 1] = Math.random()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 2))
    return g
  }, [count])

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uFocus: { value: 0 },
          uMouse: { value: new THREE.Vector2(10, 10) },
          uSize: { value: isMobileWidth() ? 0.04 : 0.055 },
          uColorA: { value: new THREE.Color('#8B4FBF') },
          uColorB: { value: new THREE.Color('#DACAFF') },
        },
        vertexShader: /* glsl */ `
          ${SIMPLEX_NOISE}
          uniform float uTime;
          uniform float uFocus;
          uniform vec2 uMouse;
          uniform float uSize;
          in vec2 aSeed;
          out float vFade;
          out float vSeed;
          void main() {
            vec3 p = position;
            p.x += snoise(vec3(p.yz * 0.14, uTime * 0.05)) * 0.9;
            p.y += snoise(vec3(p.xz * 0.14, uTime * 0.045 + 31.0)) * 0.9;
            // Gather toward centre as the CTA comes into focus.
            p *= 1.0 - uFocus * 0.35;
            // Cursor carve
            vec2 diff = p.xy - uMouse * vec2(7.0, 3.6);
            p.x += normalize(diff + 0.001).x * smoothstep(2.6, 0.0, length(diff)) * 0.9;

            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = (0.5 + aSeed.y * 1.6) * uSize * (340.0 / max(-mv.z, 0.1));
            vFade = smoothstep(-14.0, -3.0, mv.z) * (0.25 + aSeed.y * 0.75);
            vSeed = aSeed.x;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uFocus;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          in float vFade;
          in float vSeed;
          out vec4 fragColor;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            float alpha = smoothstep(0.5, 0.03, d) * vFade * (0.35 + uFocus * 0.3);
            vec3 color = mix(uColorA, uColorB, step(0.9, vSeed));
            fragColor = vec4(color, alpha);
          }
        `,
      }),
    []
  )

  const pointsRef = useRef<THREE.Points>(null)
  const focus = useRef(0)

  // Theme retinting: additive violet glow on dark, deep violets on light.
  useEffect(() => {
    return watchSceneTheme((theme) => {
      const pal = SCENE_PALETTES[theme]
      retintMaterial(mat, theme, (m) => {
        const u = (m as THREE.ShaderMaterial).uniforms
        ;(u.uColorA.value as THREE.Color).set(pal.nodeA)
        ;(u.uColorB.value as THREE.Color).set(pal.nodeB)
      })
    })
  }, [mat])

  useFrame((state, dt) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime
    mat.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y)
    focus.current += ((focusRef.current ?? 0) - focus.current) * Math.min(1, dt * 3)
    mat.uniforms.uFocus.value = focus.current
    if (pointsRef.current) pointsRef.current.rotation.z = state.clock.elapsedTime * 0.01
  })

  return <points ref={pointsRef} geometry={geo} material={mat} />
}

export default function CTAFieldCanvas({
  focusRef,
  frameloop = 'always',
}: {
  focusRef: React.RefObject<number>
  frameloop?: 'always' | 'never'
}) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={quality.dpr}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Field count={quality.fieldCount} focusRef={focusRef} />
    </Canvas>
  )
}
