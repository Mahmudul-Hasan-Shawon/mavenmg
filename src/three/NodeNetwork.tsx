import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { scrollState, quality, isMobileWidth } from '../utils/motion'
import { SCENE_PALETTES, retintMaterial, watchSceneTheme } from './scenePalette'

/* =====================================================================
   Maven "digital growth system" — an organic node network with data
   flowing along its connections. Designed for the hero: the constellation
   slowly breathes, tilts toward the cursor, and rotates with scroll.
   ===================================================================== */

interface NetworkProps {
  count: number
  flowCount: number
  radius?: number
}

function Network({ count, flowCount, radius = 4.4 }: NetworkProps) {
  const groupRef = useRef<THREE.Group>(null)
  const flowRef = useRef<THREE.Points>(null)
  const { size } = useThree()
  const narrow = size.width < 768

  // ---- Build the constellation ------------------------------------------
  const { nodeGeo, nodeMat, lineGeo, flows } = useMemo(() => {
    // Organic distribution: fibonacci sphere + radial noise jitter.
    const seeds = new Float32Array(count)
    const positions = new Float32Array(count * 3)
    const GA = Math.PI * (3 - Math.sqrt(5))
    const pos = new THREE.Vector3()
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = GA * i
      const rad = radius * (0.55 + Math.random() * 0.45)
      pos.set(Math.cos(theta) * r, y * 0.72, Math.sin(theta) * r).multiplyScalar(rad)
      positions[i * 3] = pos.x
      positions[i * 3 + 1] = pos.y
      positions[i * 3 + 2] = pos.z
      seeds[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    const mat = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: narrow ? 0.05 : 0.062 },
        uColorA: { value: new THREE.Color('#8B4FBF') },
        uColorB: { value: new THREE.Color('#DACAFF') },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uSize;
        in float aSeed;
        out float vPulse;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float pulse = 0.6 + 0.4 * sin(uTime * 1.4 + aSeed * 40.0);
          vPulse = pulse;
          gl_PointSize = (0.6 + aSeed * 1.4) * pulse * uSize * (340.0 / max(-mv.z, 0.1));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        in float vPulse;
        out vec4 fragColor;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          float alpha = smoothstep(0.5, 0.04, d) * (0.35 + vPulse * 0.5);
          vec3 color = mix(uColorA, uColorB, vPulse);
          fragColor = vec4(color, alpha);
        }
      `,
    })

    // Connections: each node links to its 2 nearest neighbours.
    const pts: number[] = []
    const vA = new THREE.Vector3()
    const vB = new THREE.Vector3()
    const pairs: Array<[number, number]> = []
    for (let i = 0; i < count; i++) {
      vA.fromArray(positions, i * 3)
      let best1 = -1
      let best2 = -1
      let d1 = Infinity
      let d2 = Infinity
      for (let j = 0; j < count; j++) {
        if (i === j) continue
        vB.fromArray(positions, j * 3)
        const d = vA.distanceTo(vB)
        if (d < d1) {
          d2 = d1; best2 = best1
          d1 = d; best1 = j
        } else if (d < d2) {
          d2 = d; best2 = j
        }
      }
      for (const b of [best1, best2]) {
        if (b < 0) continue
        const key = i < b ? `${i}-${b}` : `${b}-${i}`
        if (pairs.some(([p, q]) => (p === i && q === b) || (p === b && q === i))) continue
        void key
        pairs.push([i, b])
        vA.fromArray(positions, i * 3)
        vB.fromArray(positions, b * 3)
        pts.push(vA.x, vA.y, vA.z, vB.x, vB.y, vB.z)
      }
    }

    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))

    // Flow particles travelling along random connections.
    const flowSeeds: Array<{ a: THREE.Vector3; b: THREE.Vector3; c: THREE.Vector3; t: number; speed: number }> = []
    for (let i = 0; i < flowCount; i++) {
      const [pi, qi] = pairs[Math.floor(Math.random() * pairs.length)] ?? [0, 0]
      const a = new THREE.Vector3().fromArray(positions, pi * 3)
      const b = new THREE.Vector3().fromArray(positions, qi * 3)
      const c = a.clone().add(b).multiplyScalar(0.5)
      // Bow the path outward from origin for curved "data streams".
      c.setLength(c.length() * (1.15 + Math.random() * 0.35))
      flowSeeds.push({ a, b, c, t: Math.random(), speed: 0.06 + Math.random() * 0.16 })
    }
    const flowPositions = new Float32Array(flowCount * 3)

    return { nodeGeo: geo, nodeMat: mat, lineGeo: lGeo, flows: { seeds: flowSeeds, positions: flowPositions } }
  }, [count, flowCount, radius, narrow])

  const flowGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(flows.positions, 3))
    return g
  }, [flows])

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color('#612C8B'),
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  )

  const flowMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color('#DACAFF'),
        size: narrow ? 0.045 : 0.055,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    [narrow]
  )

  const pointer = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const scrollSpin = useRef(0)
  const tmp = useMemo(() => new THREE.Vector3(), [])

  // The canvas sits behind the hero copy and gradient scrims, so R3F pointer
  // events never reach it — track the mouse at window level instead.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // Theme retinting: additive glow on dark, deep violets + normal blending on light.
  useEffect(() => {
    return watchSceneTheme((theme) => {
      const pal = SCENE_PALETTES[theme]
      nodeMat.uniforms.uColorA.value.set(pal.nodeA)
      nodeMat.uniforms.uColorB.value.set(pal.nodeB)
      retintMaterial(lineMat, theme, (m) => {
        ;(m as THREE.LineBasicMaterial).color.set(pal.line)
        ;(m as THREE.LineBasicMaterial).opacity = theme === 'light' ? 0.28 : 0.22
      })
      retintMaterial(flowMat, theme, (m) => {
        ;(m as THREE.PointsMaterial).color.set(pal.flow)
        ;(m as THREE.PointsMaterial).opacity = theme === 'light' ? 0.85 : 0.9
      })
    })
  }, [nodeMat, lineMat, flowMat])

  useFrame((state, rawDt) => {
    // Clamp dt so tab-switches / hitched frames don't teleport the scene.
    const dt = Math.min(rawDt, 0.05)
    const t = state.clock.elapsedTime
    nodeMat.uniforms.uTime.value = t

    // Pointer easing toward the window-level mouse position.
    pointer.current.x += (target.current.x - pointer.current.x) * Math.min(1, dt * 2.5)
    pointer.current.y += (target.current.y - pointer.current.y) * Math.min(1, dt * 2.5)

    // Scroll influence: clamped + smoothed so fast flicks and the
    // scroll-to-top on page navigation can't whip the network around.
    scrollSpin.current +=
      (THREE.MathUtils.clamp(scrollState.velocity, -30, 30) - scrollSpin.current) * Math.min(1, dt * 3)

    const g = groupRef.current
    if (g) {
      g.rotation.y += dt * (0.05 + pointer.current.x * 0.22) + scrollSpin.current * 0.00018
      g.rotation.x += (pointer.current.y * 0.16 + 0.12 - g.rotation.x) * dt * 1.2
      g.position.y = narrow ? 0.4 : 0
      g.scale.setScalar(narrow ? 0.72 : 1)
    }

    // Advance flow particles along their bezier paths.
    const arr = flows.positions
    for (let i = 0; i < flows.seeds.length; i++) {
      const f = flows.seeds[i]
      f.t += dt * f.speed
      if (f.t > 1) f.t -= 1
      const u = f.t
      // Quadratic bezier: B(u) = (1-u)^2 a + 2(1-u)u c + u^2 b
      const iu = 1 - u
      tmp.set(
        iu * iu * f.a.x + 2 * iu * u * f.c.x + u * u * f.b.x,
        iu * iu * f.a.y + 2 * iu * u * f.c.y + u * u * f.b.y,
        iu * iu * f.a.z + 2 * iu * u * f.c.z + u * u * f.b.z
      )
      arr[i * 3] = tmp.x
      arr[i * 3 + 1] = tmp.y
      arr[i * 3 + 2] = tmp.z
    }
    if (flowRef.current) {
      ;(flowRef.current.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeo} material={nodeMat} />
      <lineSegments geometry={lineGeo} material={lineMat} />
      <points ref={flowRef} geometry={flowGeo} material={flowMat} />
    </group>
  )
}

export default function NodeNetworkCanvas(props: { frameloop?: 'always' | 'never' }) {
  const mobile = isMobileWidth()
  return (
    <Canvas
      frameloop={props.frameloop ?? 'always'}
      dpr={quality.dpr}
      camera={{ position: [0, 0, mobile ? 10.5 : 9], fov: 42 }}
      gl={{ antialias: quality.tier === 'high', alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Network count={quality.heroNodes} flowCount={quality.heroFlow} />
    </Canvas>
  )
}
