import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { gsap, useGsapContext } from '../hooks/useGsap'

/**
 * Testimonials — one large editorial quote at a time with smooth GSAP
 * transitions, auto-advance, and a fine progress rail. Client identity is
 * presented separately from the quote for a magazine feel.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // Bumped on resume so the progress bar restarts in sync with the timer.
  const [cycle, setCycle] = useState(0)
  const quoteRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)

  const go = (dir: 1 | -1) => {
    if (animating.current) return
    animating.current = true
    const next = (index + dir + testimonials.length) % testimonials.length
    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -24,
      filter: 'blur(6px)',
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setIndex(next)
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 32, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power3.out',
            onComplete: () => (animating.current = false),
          }
        )
      },
    })
  }

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 7000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused])

  // Entrance
  useGsapContext(
    quoteRef,
    () => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 85%', once: true },
        }
      )
    },
    []
  )

  const t = testimonials[index]

  return (
    <section
      className="section py-28 md:py-36 border-t border-line relative overflow-hidden"
      aria-label="Client testimonials"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[400px] rounded-full bg-maven/8 blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full bg-maven-light/8 blur-[140px]" />
      </div>

      <div className="container-maven relative">
        <div className="flex items-center justify-center gap-4 mb-14 md:mb-16">
          <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
          <span className="index-tag">07</span>
          <span className="mono-label !text-mist">Client words</span>
          <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
        </div>

        <div ref={quoteRef} className="max-w-3xl mx-auto text-center">
          <Quote size={32} className="text-maven-lighter mx-auto mb-9" aria-hidden="true" />
          <blockquote
            className="display text-[clamp(1.35rem,3.2vw,2.3rem)] leading-[1.35] font-medium text-white/90 text-balance"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); setCycle((c) => c + 1) }}
          >
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-10 flex items-center justify-center gap-4">
            {t.image ? (
              <img
                src={t.image}
                alt=""
                className="w-12 h-12 rounded-full object-contain p-1.5 bg-white-solid ring-2 ring-maven-light shadow-[0_0_18px_rgba(139,79,191,0.8),0_0_36px_rgba(139,79,191,0.45)] shrink-0"
              />
            ) : (
              <span
                aria-hidden="true"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-maven to-maven-light flex items-center justify-center font-sora font-bold text-sm text-white-solid ring-1 ring-maven-light/40 shadow-[0_0_28px_rgba(139,79,191,0.45)] shrink-0"
              >
                {t.name.charAt(0)}
              </span>
            )}
            <span className="text-left">
              <span className="block text-white font-medium">{t.name}</span>
              <span className="block text-mist-dim text-sm mt-0.5">
                {t.role}
                {t.company ? ` — ${t.company}` : ''}
              </span>
            </span>
          </figcaption>
        </div>

        {/* Controls + progress */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              data-cursor
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-mist hover:text-white hover:border-maven-light/50 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              data-cursor
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-mist hover:text-white hover:border-maven-light/50 transition-colors cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="w-40 h-px bg-line relative overflow-hidden">
            <div
              key={`${index}-${cycle}`}
              className="absolute inset-y-0 left-0 bg-maven-lighter/70"
              style={{
                animation: 'progress 7s linear forwards',
                animationPlayState: paused ? 'paused' : 'running',
              }}
            />
          </div>
          <span className="mono-label !text-mist-dim">
            {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  )
}
