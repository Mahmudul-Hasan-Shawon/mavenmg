import { useEffect, useRef, useState } from 'react'
import { Code, Megaphone } from 'lucide-react'
import { mavens, philosophy } from '../data/content'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { reducedMotion } from '../utils/motion'
import { Eyebrow } from '../components/text/Eyebrow'

/**
 * Philosophy — a zigzag of Vision and Mission. Each row pairs an editorial
 * text block with a giant ghosted numeral floating in the section's particle
 * field, alternating sides on desktop. Blocks fade up as they enter.
 */
export function Philosophy() {
  const rootRef = useRef<HTMLElement>(null)

  useGsapContext(
    rootRef,
    () => {
      gsap.utils.toArray<HTMLElement>('[data-phil-block]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true },
          }
        )
      })
    },
    []
  )

  return (
    <section
      ref={rootRef}
      id="philosophy"
      className="section py-28 md:py-36 border-t border-line relative overflow-hidden"
      aria-label="Our philosophy"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)' }}
    >
      {/* Particle dust + ambient glows */}
      <ParticleField />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[12%] w-[420px] h-[420px] rounded-full bg-maven/12 blur-[150px]" />
        <div className="absolute bottom-[5%] right-[8%] w-[380px] h-[380px] rounded-full bg-maven-light/10 blur-[140px]" />
      </div>

      <div className="container-maven relative">
        <Eyebrow label={philosophy.eyebrow} align="center" className="mb-16 md:mb-24" />

        {/* Intro — The Marketing Mavens */}
        <div data-phil-block className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-5xl md:text-8xl font-bold mb-6">
              <span className="block">The</span>
              <span className="block text-white">Marketing</span>
              <span className="block text-maven-light">Mavens</span>
            </h2>
            <p className="text-mist text-base pt-2 md:text-lg leading-relaxed mb-9">
              {mavens.intro}
            </p>
            <MavensTabs />
          </div>
          <div className="relative order-1 lg:order-2 flex justify-center lg:block">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#DACAFF]/5 to-[#8B4FBF]/15 blur-2xl" aria-hidden="true" />
            <img
              alt="The Marketing Mavens"
              className="relative rounded-3xl w-full max-w-xs sm:max-w-sm lg:max-w-none object-cover"
              loading="lazy"
              src="/images/maven.png"
            />
          </div>
        </div>

        <div className="space-y-24 lg:space-y-0">
          {/* Vision — image first on mobile, text left on desktop */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">            <Phil image="/images/vision.png" label="Vision" className="order-1 lg:order-2" />
            <div data-phil-block className="order-2 lg:order-1">
              <h3 className="display text-center text-3xl md:text-5xl text-white mb-5">
                Our <span className="text-maven-light text-[clamp(3rem,4vw,7rem)]">
  Vision
</span>
              </h3>
              <p className="text-mist text-center text-base md:text-lg leading-relaxed max-w-xl">
                {philosophy.vision}
              </p>
            </div>
          </div>

          {/* Mission — image first on mobile, numeral left on desktop */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">            <Phil image="/images/mission.png" label="Mission" className="order-1" floatClass="animate-float-drift-alt" />
            <div data-phil-block className="order-2">
              <h3 className="display text-center text-3xl md:text-5xl text-white mb-5">
                Our <span className="text-maven-light text-[clamp(3rem,4vw,7rem)]">
  Mission
</span>
              </h3>
              <p className="text-mist text-center text-base md:text-lg leading-relaxed max-w-xl">
                {philosophy.mission}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Web Masters / Online Marketers toggle — pill buttons swap the active
 * discipline copy with a blur/fade transition. Same content as the Mavens
 * section's discipline switcher.
 */
function MavensTabs() {
  const [mode, setMode] = useState(0)
  const modeRef = useRef(0)
  const animating = useRef(false)
  const copyRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const resetScrollAcc = useRef<() => void>(() => {})

  // Scroll-driven switching with hysteresis: while the block is in view, a
  // *sustained* scroll of THRESHOLD px in one direction switches tabs — down
  // advances to "Online Marketers", up returns to "Web Masters" (the default).
  // Jitter and tiny adjustments never flip the tab, and one gesture switches
  // at most once.
  useEffect(() => {
    if (reducedMotion) return
    const root = rootRef.current
    if (!root) return

    const THRESHOLD = 140
    let lastY = window.scrollY
    let acc = 0
    let inView = false

    // Only switch while the block is clearly visible (at least half on screen).
    const io = new IntersectionObserver(([entry]) => (inView = entry.intersectionRatio >= 0.5), {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })
    io.observe(root)

    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      if (!inView || dy === 0) return
      // Changing direction wipes accumulated distance.
      if (Math.sign(dy) !== Math.sign(acc)) acc = 0
      acc += dy
      if (Math.abs(acc) >= THRESHOLD) {
        const up = acc < 0
        acc = 0
        select(up ? 0 : 1)
      }
    }

    resetScrollAcc.current = () => (acc = 0)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const disciplines = [
    { ...mavens.webMasters, icon: Code },
    { ...mavens.marketers, icon: Megaphone },
  ]
  const Active = disciplines[mode]

  const select = (next: number) => {
    if (next === modeRef.current || animating.current) return
    resetScrollAcc.current()
    modeRef.current = next
    const el = copyRef.current
    if (!el) {
      setMode(next)
      animating.current = false
      return
    }
    animating.current = true
    gsap.killTweensOf(el)
    gsap.to(el, {
      opacity: 0,
      y: -16,
      filter: 'blur(6px)',
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setMode(next)
        gsap.fromTo(
          el,
          { opacity: 0, y: 24, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => (animating.current = false),
          }
        )
      },
    })
  }

  return (
    <div ref={rootRef}>
      <div className="flex gap-3 mb-9">
        {disciplines.map((d, i) => (
          <button
            key={d.label}
            type="button"
            data-cursor
            onClick={() => select(i)}
            aria-pressed={mode === i}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-sm font-medium tracking-tight transition-all duration-400 cursor-pointer ${
              mode === i
                ? 'border-maven bg-maven text-white-solid'
                : 'border-line text-mist-dim hover:text-mist hover:border-mist/30'
            }`}
          >
            <d.icon size={15} aria-hidden="true" />
            {d.label}
          </button>
        ))}
      </div>

      <div ref={copyRef}>
        <p className="mono-label mb-4">{String(mode + 1).padStart(2, '0')} / Our {Active.label}</p>
        <p className="text-white/70 text-md md:text-lg leading-relaxed max-w-xl">{Active.body}</p>
      </div>

      <div className="mt-12 pt-8 pb-8 border-t border-b border-line max-w-xl">
        <p className="text-maven-lighter/70 text-base leading-relaxed italic">{mavens.callout}</p>
      </div>
    </div>
  )
}

/**
 * The visual half of a zigzag row — an illustration floating over a blurred
 * echo of itself and a soft glow.
 */
function Phil({
  image,
  label,
  className = '',
  floatClass = 'animate-float-drift',
}: {
  image: string
  label: string
  className?: string
  /** Float animation variant — alternate it between rows so their images
      drift out of phase instead of mirroring each other. */
  floatClass?: string
}) {
  return (
    <div data-phil-block className={`relative flex flex-col items-center py-6 ${className}`}>
      <Eyebrow label={`Our ${label}`} className="mb-8 self-center lg:hidden" />
      <div className="relative flex items-center justify-center w-full">
        <div aria-hidden="true" className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-maven/15 blur-[110px]" />
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none blur-2xl opacity-40 select-none">
          <img
            src={image}
            alt=""
            className={`duotone-maven ${floatClass} w-full max-w-[14rem] sm:max-w-sm lg:max-w-md object-contain`}
          />
        </div>
        <img
          src={image}
          alt={label}
          className={`duotone-maven ${floatClass} relative w-full max-w-[14rem] sm:max-w-sm lg:max-w-md object-contain`}
          loading="lazy"
        />
      </div>
    </div>
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
      // Single static frame — the field is visible but not animated.
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
