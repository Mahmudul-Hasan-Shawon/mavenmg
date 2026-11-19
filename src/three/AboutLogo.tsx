import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { quality } from '../utils/motion'

/* =====================================================================
   AboutLogo the Maven "m" mark as an interactive hologram: the logo
   texture on a shader plane with a breathing luminance pulse, floating in
   3D and tilting toward the cursor.
   ===================================================================== */

const LOGO_BASE = 3.3 // plane height in world units

function LogoPlane({ src }: { src: string }) {
  const [tex, setTex] = useState<THREE.Texture | null>(null)
  const group = useRef<THREE.Group>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  // Load the logo texture. Textures handed out by TextureLoader are never
  // freed by three.js itself, so dispose on change/unmount (and immediately
  // if the load resolves after we've already torn down).
  useEffect(() => {
    let alive = true
    let loaded: THREE.Texture | null = null
    new THREE.TextureLoader().load(src, (t) => {
      loaded = t
      if (!alive) {
        t.dispose()
        return
      }
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 4
      setTex(t)
    })
    return () => {
      alive = false
      loaded?.dispose()
    }
  }, [src])

  // Window-level pointer tracking (the canvas sits behind page content).
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // Logo shader: plain texture + gentle luminance breathing.
  const logoMat = useMemo(() => {
    if (!tex) return null
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTex: { value: tex },
        uTime: { value: 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uTex;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec4 tex = texture(uTex, vUv);
          if (tex.a < 0.01) discard;

          // Breathing luminance.
          float breathe = 0.94 + 0.06 * sin(uTime * 1.3);
          fragColor = vec4(tex.rgb * breathe, tex.a);
        }
      `,
    })
  }, [tex])

  // R3F only auto-disposes objects it creates itself; our shader material is
  // ours, so dispose it on replace/unmount.
  useEffect(() => {
    return () => {
      logoMat?.dispose()
    }
  }, [logoMat])

  const aspect = tex ? (tex.image as HTMLImageElement).width / (tex.image as HTMLImageElement).height : 1

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const t = state.clock.elapsedTime
    if (logoMat) logoMat.uniforms.uTime.value = t

    pointer.current.x += (target.current.x - pointer.current.x) * Math.min(1, dt * 2.5)
    pointer.current.y += (target.current.y - pointer.current.y) * Math.min(1, dt * 2.5)

    const g = group.current
    if (g) {
      // Tilt toward the cursor + idle bob.
      g.rotation.y = pointer.current.x * 0.38
      g.rotation.x = -pointer.current.y * 0.26
      g.position.y = Math.sin(t * 0.9) * 0.1
    }
  })

  if (!tex || !logoMat) return null

  return (
    <group ref={group}>
      <mesh material={logoMat} scale={[LOGO_BASE * aspect, LOGO_BASE, 1]}>
        <planeGeometry />
      </mesh>
    </group>
  )
}

export default function AboutLogoCanvas({
  src = '/images/logos/3dlogomaven.png',
  frameloop = 'always',
}: {
  src?: string
  frameloop?: 'always' | 'never'
}) {
  return (
    <Canvas
      frameloop={frameloop}
      dpr={quality.dpr}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: quality.tier === 'high', alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <LogoPlane src={src} />
    </Canvas>
  )
}
