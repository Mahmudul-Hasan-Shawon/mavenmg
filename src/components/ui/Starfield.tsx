import { useEffect, useRef } from 'react'

/**
 * Quiet starfield, after reflex-template.framer.ai's blog hero: small
 * scattered stars twinkling on a dark backdrop, a few larger and brighter.
 * Mouse-interactive: stars inside a radius brighten, grow and drift gently
 * toward the cursor with soft easing, then ease back home. Static single
 * paint for reduced motion; the rAF loop pauses offscreen.
 */
export function Starfield({
  className,
  density = 12000,
}: {
  className?: string
  /** One star per N square px. */
  density?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
    const REACH = 160
    const DOT_RGB = '226, 222, 244'
    const HALO_RGB = '203, 178, 245'

    let raf = 0
    let running = false
    let visible = true
    let w = 0
    let h = 0
    let t = Math.random() * 100

    type Star = {
      hx: number
      hy: number
      x: number
      y: number
      r: number
      base: number
      phase: number
      speed: number
      big: boolean
    }
    let stars: Star[] = []
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(420, Math.max(50, Math.round((w * h) / density)))
      stars = []
      for (let i = 0; i < count; i++) {
        const big = Math.random() < 0.07
        const x = Math.random() * w
        const y = Math.random() * h
        stars.push({
          hx: x,
          hy: y,
          x,
          y,
          r: big ? 1.2 + Math.random() * 1 : 0.4 + Math.random() * 0.9,
          base: big ? 0.5 + Math.random() * 0.4 : 0.2 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 0.9,
          big,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // Ease the virtual cursor toward its target for silky interaction.
      mouse.x += (mouse.tx - mouse.x) * 0.12
      mouse.y += (mouse.ty - mouse.y) * 0.12
      t += 0.012

      for (const s of stars) {
        const tw = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase)
        let boost = 0

        const dx = s.hx - mouse.x
        const dy = s.hy - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < REACH) {
          boost = 1 - dist / REACH
          // Gentle gravity: nearby stars drift toward the cursor.
          const pull = boost * boost * 14
          const inv = dist > 0.001 ? 1 / dist : 0
          const tx = s.hx - dx * inv * pull
          const ty = s.hy - dy * inv * pull
          s.x += (tx - s.x) * 0.1
          s.y += (ty - s.y) * 0.1
        } else {
          s.x += (s.hx - s.x) * 0.06
          s.y += (s.hy - s.y) * 0.06
        }

        const alpha = Math.min(1, s.base * tw + boost * 0.6)
        const radius = s.r * (1 + boost * 0.9)
        ctx.beginPath()
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${DOT_RGB}, ${alpha.toFixed(3)})`
        ctx.fill()
        // Larger stars get a soft halo instead of a hard dot.
        if (s.big || boost > 0.25) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${HALO_RGB}, ${(alpha * 0.16).toFixed(3)})`
          ctx.fill()
        }
      }
    }

    const loop = () => {
      if (!running) return
      draw()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!running && visible && !reduced) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.tx = -9999
      mouse.ty = -9999
    }

    build()
    if (reduced) {
      draw()
    } else {
      start()
    }

    const ro = new ResizeObserver(() => {
      build()
      if (reduced) draw()
    })
    ro.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true
      if (reduced) return
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [density])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
