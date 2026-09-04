import { useEffect, useRef, useState } from 'react'
import { Code, Megaphone } from 'lucide-react'
import { mavens, philosophy } from '../data/content'
import { gsap, useGsapContext } from '../hooks/useGsap'

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
      className="section py-32 md:py-44 border-t border-line relative overflow-hidden"
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
        <div className="flex items-center justify-center gap-4 mb-16 md:mb-24">
          <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
          <span className="index-tag">04</span>
          <span className="mono-label !text-mist">{philosophy.eyebrow}</span>
          <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
        </div>

        {/* Intro — The Marketing Mavens */}
        <div data-phil-block className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-8xl font-black mb-6">
              The <span className="text-white">Marketing</span>
              <span className="text-maven-light"> Mavens</span>
            </h3>
            <p className="text-mist text-base md:text-lg leading-relaxed mb-9">
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

        <div className="space-y-24 md:space-y-36">
          {/* Vision — image first on mobile, text left on desktop */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <Phil image="/images/vision.png" label="Vision" className="order-1 lg:order-2" />
            <div data-phil-block className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="index-tag">01</span>
                <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              </div>
              <h3 className="display text-3xl md:text-5xl text-white mb-5">
                Our <span className="text-maven-light">Vision</span>
              </h3>
              <p className="text-mist text-base md:text-lg leading-relaxed max-w-xl">
                {philosophy.vision}
              </p>
            </div>
          </div>

          {/* Mission — image first on mobile, numeral left on desktop */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <Phil image="/images/mission.png" label="Mission" className="order-1" />
            <div data-phil-block className="order-2">
              <div className="flex items-center gap-4 mb-6">
                <span className="index-tag">02</span>
                <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              </div>
              <h3 className="display text-3xl md:text-5xl text-white mb-5">
                Our <span className="text-maven-light">Mission</span>
              </h3>
              <p className="text-mist text-base md:text-lg leading-relaxed max-w-xl">
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

  const disciplines = [
    { ...mavens.webMasters, icon: Code },
    { ...mavens.marketers, icon: Megaphone },
  ]
  const Active = disciplines[mode]

  const select = (next: number) => {
    if (next === modeRef.current || animating.current) return
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
    <div>
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
        <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">{Active.body}</p>
      </div>

      <div className="mt-12 pt-8 border-t border-line max-w-xl">
        <p className="text-maven-lighter/70 text-[15px] leading-relaxed italic">{mavens.callout}</p>
      </div>
    </div>
  )
}

/**
 * The visual half of a zigzag row — an illustration floating over a blurred
 * echo of itself and a soft glow.
 */
function Phil({ image, label, className = '' }: { image: string; label: string; className?: string }) {
  return (
    <div data-phil-block className={`relative flex items-center justify-center py-6 ${className}`}>
      <div aria-hidden="true" className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-maven/15 blur-[110px]" />
      <img
        aria-hidden="true"
        src={image}
        alt=""
        className="duotone-maven absolute w-full max-w-[14rem] sm:max-w-sm lg:max-w-md object-contain blur-2xl opacity-40 select-none"
      />
      <img
        src={image}
        alt={label}
        className="duotone-maven relative w-full max-w-[14rem] sm:max-w-sm lg:max-w-md object-contain"
        loading="lazy"
      />
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
