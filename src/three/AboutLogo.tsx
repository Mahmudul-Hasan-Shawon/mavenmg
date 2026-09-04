import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { quality } from '../utils/motion'

/* =====================================================================
   AboutLogo — the Maven "m" mark as an interactive hologram: the logo
   texture on a shader plane with a travelling light sweep and breathing
   pulse, floating in 3D, tilting toward the cursor, and wrapped in a
   halo of slowly orbiting violet particles.
   ===================================================================== */

const LOGO_BASE = 3.3 // plane height in world units

function LogoPlane({ src }: { src: string }) {
  const [tex, setTex] = useState<THREE.Texture | null>(null)
  const group = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Points>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  // Load the logo texture.
  useEffect(() => {
    let alive = true
    new THREE.TextureLoader().load(src, (t) => {
      if (!alive) return
      t.colorSpace = THREE.SRGBColorSpace
      t.anisotropy = 4
      setTex(t)
    })
    return () => {
      alive = false
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

  // Logo shader: texture + diagonal light sweep + gentle alpha breathing.
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

          // Diagonal light sweep travelling across the mark.
          float d = (vUv.x + vUv.y) * 0.5;
          float head = fract(uTime * 0.16) * 1.6 - 0.3;
          float sweep = smoothstep(0.0, 0.14, d - head) * (1.0 - smoothstep(0.14, 0.34, d - head));

          vec3 violet = vec3(0.545, 0.31, 0.749); // #8B4FBF
          vec3 col = tex.rgb + violet * sweep * 0.7;

          // Breathing luminance.
          float breathe = 0.94 + 0.06 * sin(uTime * 1.3);
          fragColor = vec4(col * breathe, tex.a);
        }
      `,
    })
  }, [tex])

  // Halo of orbiting particles around the mark.
  const haloGeo = useMemo(() => {
    const count = quality.tier === 'high' ? 220 : 120
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2
      const r = LOGO_BASE * (0.62 + Math.random() * 0.38)
      pos[i * 3] = Math.cos(a) * r
      pos[i * 3 + 1] = Math.sin(a) * r * 0.75
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.4
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  const haloMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color('#8B4FBF'),
        size: 0.045,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  )

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
    if (halo.current) {
      halo.current.rotation.z += dt * 0.06
      halo.current.rotation.y = -pointer.current.x * 0.12
    }
  })

  if (!tex || !logoMat) return null

  return (
    <group ref={group}>
      <mesh material={logoMat} scale={[LOGO_BASE * aspect, LOGO_BASE, 1]}>
        <planeGeometry />
      </mesh>
      <points ref={halo} geometry={haloGeo} material={haloMat} />
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
