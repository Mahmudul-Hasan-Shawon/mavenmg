import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { cn } from '../utils/cn'

/**
 * Testimonials — one large editorial quote at a time with smooth GSAP
 * transitions, auto-advance, and a fine progress rail. Client identity is
 * presented separately from the quote for a magazine feel.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[400px] rounded-full bg-maven/8 blur-[150px]" />
      </div>

      <div className="container-maven relative">
        <div className="flex items-center gap-4 mb-14">
          <span className="index-tag">07</span>
          <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
          <span className="mono-label !text-mist">Client words</span>
        </div>

        <div ref={quoteRef} className="max-w-4xl">
          <Quote size={36} className="text-maven-light/50 mb-8" aria-hidden="true" />
          <blockquote className="display text-[clamp(1.35rem,3.2vw,2.3rem)] leading-[1.35] font-medium text-white/90">
            “{t.quote}”
          </blockquote>
          <figcaption className="mt-9 flex items-center gap-5">
            <span
              aria-hidden="true"
              className="w-11 h-11 rounded-full bg-gradient-to-br from-maven to-maven-light flex items-center justify-center font-sora font-bold text-sm"
            >
              {t.name.charAt(0)}
            </span>
            <span>
              <span className="block text-white font-medium">{t.name}</span>
              <span className="block text-mist-dim text-sm mt-0.5">
                {t.role}
                {t.company ? ` — ${t.company}` : ''}
              </span>
            </span>
          </figcaption>
        </div>

        {/* Controls + progress */}
        <div className="mt-14 flex items-center gap-6">
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
          <div className="flex-1 max-w-xs h-px bg-line relative overflow-hidden">
            <div
              key={index}
              className={cn('absolute inset-y-0 left-0 bg-maven-lighter/70')}
              style={{
                animation: paused ? 'none' : 'progress 7s linear forwards',
                width: paused ? '100%' : undefined,
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
