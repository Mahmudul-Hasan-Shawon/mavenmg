import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { Eyebrow } from '../components/text/Eyebrow'

/**
 * Testimonials, one large editorial quote at a time with smooth GSAP
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
      id="testimonials"
      className="section py-28 md:py-36 border-t border-line relative overflow-hidden"
      aria-label="Client testimonials"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[400px] rounded-full bg-maven/8 blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full bg-maven-light/8 blur-[140px]" />
      </div>

      <div className="container-maven relative">
        <Eyebrow label="Client words" align="center" className="mb-14 md:mb-16" />

        <div ref={quoteRef} className="max-w-3xl mx-auto text-center">
          <blockquote
            className="flex flex-col justify-center min-h-[15rem] sm:min-h-[9rem] md:min-h-[11rem] lg:min-h-[16rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span className="font-dm font-semibold text-[clamp(1.05rem,2.2vw,1.6rem)] leading-[1.6] tracking-[0.01em] text-white text-balance">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-maven-lighter inline-block -scale-x-100 -mt-2 mr-3 align-baseline"
                aria-hidden="true"
              >
                <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
              </svg>
              {highlightNames(t.quote)}
            </span>
          </blockquote>
          <figcaption className="mt-10 flex items-center justify-center gap-4">
            <div className="relative w-12 h-12 shrink-0">
              <div className="absolute -inset-1.5 rounded-full border border-maven-light/40" />
              {t.image ? (
                <div className="absolute inset-0 w-12 h-12 rounded-full bg-white-solid overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-contain p-1.5 rounded-full"
                  />
                </div>
              ) : (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-br from-maven to-maven-light flex items-center justify-center font-sora font-bold text-sm text-white-solid"
                >
                  {t.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-maven-light" />
              <span className="block text-start text-md font-medium text-white tracking-wide">{t.name}</span>
              <span className="block text-start text-mist-dim text-xs mt-0.5 font-mono uppercase tracking-widest">
                {t.role}{t.company ? ` — ${t.company}` : ''}
              </span>
            </div>
          </figcaption>
        </div>

        {/* Controls */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-6">
            {[
              { dir: -1 as const, Icon: ArrowLeft, label: 'Previous testimonial' },
              { dir: 1 as const, Icon: ArrowRight, label: 'Next testimonial' },
            ].map(({ dir, Icon, label }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(dir)}
                data-cursor
                aria-label={label}
                className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-mist hover:text-white hover:border-maven-light/50 transition-colors cursor-pointer"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Wraps brand mentions ("Maven Marketing Group", "Maven", "Connor") in
 * maven-light so they stand out inside the quote copy.
 */
const NAME_SPLIT = /(Maven Marketing Group|Maven|Connor)/gi
const NAMES = new Set(['maven marketing group', 'maven', 'connor'])

function highlightNames(text: string): React.ReactNode[] {
  return text.split(NAME_SPLIT).map((part, i) =>
    NAMES.has(part.toLowerCase()) ? (
      <span key={i} className="text-maven-light">
        {part}
      </span>
    ) : (
      part
    )
  )
}
