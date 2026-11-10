import { useEffect, useRef } from 'react'
import { philosophy } from '../data/content'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { Eyebrow } from '../components/text/Eyebrow'

/**
 * Philosophy, the manifesto as a numbered beliefs rail.
 *
 * A centered manifesto statement opens the section, then four beliefs run
 * down a vertical hairline that fills with brand violet as you scroll
 * (scrubbed to the rail's position). While a belief holds the middle of the
 * viewport, its ghosted numeral fills with violet and its title brightens,
 * so the page literally spotlights each belief as you pass it. The fine
 * particle dust stays as the section's atmosphere.
 */
export function Philosophy() {
  const rootRef = useRef<HTMLElement>(null)

  useGsapContext(
    rootRef,
    ({ ScrollTrigger }) => {
      // Manifesto block rises as one piece.
      gsap.fromTo(
        '[data-phil-head]',
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-phil-head]', start: 'top 82%', once: true },
        }
      )

      gsap.utils.toArray<HTMLElement>('[data-belief]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 52 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 84%', once: true },
          }
        )
        // Spotlight the belief while it holds the viewport's middle band.
        ScrollTrigger.create({
          trigger: el,
          start: 'top 62%',
          end: 'bottom 42%',
          onToggle: (self) => el.classList.toggle('is-live', self.isActive),
        })
      })

      // The rail fills top-to-bottom, scrubbed to scroll position.
      gsap.fromTo(
        '[data-rail-fill]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: '[data-rail]', start: 'top 68%', end: 'bottom 58%', scrub: 0.6 },
        }
      )
    },
    []
  )

  return (
    <section
      ref={rootRef}
      id="philosophy"
      className="section relative py-28 md:py-36 border-t border-line overflow-hidden"
      aria-label="Our philosophy"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)' }}
    >
      <ParticleField />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[12%] w-[420px] h-[420px] rounded-full bg-maven/12 blur-[150px]" />
        <div className="absolute bottom-[5%] right-[8%] w-[380px] h-[380px] rounded-full bg-maven-light/10 blur-[140px]" />
      </div>

      <div className="container-maven relative">
        {/* Manifesto */}
        <div className="max-w-3xl mx-auto text-center" data-phil-head>
          <Eyebrow label={philosophy.eyebrow} align="center" className="mb-6" />
          <h2 className="display text-[clamp(2rem,5vw,3.8rem)] mb-7">
            {philosophy.headline} <span className="grad-text">{philosophy.headlineAccent}</span>
          </h2>
          <p className="text-mist text-base md:text-lg leading-relaxed text-balance">{philosophy.manifesto}</p>
        </div>

        {/* Beliefs rail */}
        <ol className="relative mt-16 md:mt-24 max-w-4xl mx-auto" data-rail aria-label="What we believe">
          <span
            aria-hidden="true"
            className="hidden sm:block absolute left-0 top-3 bottom-3 w-px bg-line"
          />
          <span
            aria-hidden="true"
            data-rail-fill
            className="hidden sm:block absolute left-0 top-3 bottom-3 w-px bg-maven-light origin-top scale-y-0"
          />

          {philosophy.beliefs.map((b) => (
            <li
              key={b.num}
              data-belief
              className="phil-belief relative grid sm:grid-cols-[112px_1fr] gap-x-8 gap-y-4 py-9 md:py-12 pl-6 sm:pl-10 border-b border-line last:border-b-0"
            >
              <div className="flex sm:flex-col items-center sm:items-start gap-4">
                <span aria-hidden="true" className="belief-num display font-bold text-6xl md:text-7xl leading-none select-none">
                  {b.num}
                </span>
                <span className="mono-label !text-mist-dim rounded-full border border-line px-3 py-1">{b.key}</span>
              </div>
              <div className="min-w-0">
                <h3 className="display font-semibold text-2xl md:text-3xl mb-3 tracking-[0.01em]">{b.title}</h3>
                <p className="text-mist text-base md:text-lg leading-relaxed max-w-xl">{b.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/**
 * Canvas layer of fine drifting violet particles. Density scales with area,
 * each particle twinkles and sways on its own phase; the loop pauses when the
 * section leaves the viewport, and reduced-motion users get a single static
 * frame instead.
 */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    let running = false
    let w = 0
    let h = 0
    let t = 0

    type Particle = {
      x: number
      y: number
      r: number
      vy: number
      sway: number
      phase: number
      speed: number
      base: number
    }
    let parts: Particle[] = []

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(90, Math.floor((w * h) / 16000))
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        vy: 0.06 + Math.random() * 0.22,
        sway: 8 + Math.random() * 24,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0004 + Math.random() * 0.0008,
        base: 0.15 + Math.random() * 0.45,
      }))
    }

    const draw = () => {
      if (!running) return
      t += 16
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.y -= p.vy
        if (p.y < -4) {
          p.y = h + 4
          p.x = Math.random() * w
        }
        const twinkle = p.base + Math.sin(t * p.speed + p.phase) * 0.18
        const x = p.x + Math.sin(t * p.speed * 0.7 + p.phase) * p.sway * 0.2
        ctx.beginPath()
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(190, 150, 255, ${Math.max(0.04, twinkle)})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    resize()
    if (reduced) {
      // Single static frame the field is visible but not animated.
      running = true
      draw()
      running = false
    } else {
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { rootMargin: '100px' }
      )
      io.observe(canvas)
      window.addEventListener('resize', resize)
      return () => {
        stop()
        io.disconnect()
        window.removeEventListener('resize', resize)
      }
    }
    return stop
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" />
}
