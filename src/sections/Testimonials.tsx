import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { reducedMotion } from '../utils/motion'
import { SectionHeading } from '../components/ui/SectionHeading'
import { cn } from '../utils/cn'

const AUTOPLAY_MS = 7000
const SWIPE_PX = 48

/**
 * "Client words" — the original centered editorial stage: one large quote
 * with the inline quote-mark icon, transitioning word-by-word (rise + blur).
 * Underneath, an identity row carries the company logo, owner, and title —
 * it lifts and blurs together with the quote on every slide change, with
 * prev/next arrows for paging. Hovering
 * or focusing the stage pauses autoplay (WCAG 2.2.2), and
 * prefers-reduced-motion skips the autoplay and transitions entirely.
 */
export function Testimonials() {
  const total = testimonials.length
  const [index, setIndex] = useState(0)
  // Autoplay pauses while hovered or keyboard-focused (WCAG 2.2.2).
  const [autoPaused, setAutoPaused] = useState(false)

  const rootRef = useRef<HTMLElement>(null)
  const quoteTextRef = useRef<HTMLParagraphElement>(null)
  const identityRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)
  const pendingIn = useRef(false)
  const interacting = useRef(false)
  const touchX = useRef(0)

  /** Out: words lift and blur away, then the swap queues the word entrance. */
  const transitionTo = (next: number) => {
    if (animating.current || next === index) return
    animating.current = true
    const words = quoteTextRef.current?.querySelectorAll('[data-word]')
    if (reducedMotion || !words || words.length === 0) {
      setIndex(next)
      animating.current = false
      return
    }
    gsap
      .timeline({
        onComplete: () => {
          pendingIn.current = true
          setIndex(next)
        },
      })
      .to(words, {
        opacity: 0,
        y: -14,
        filter: 'blur(4px)',
        duration: 0.32,
        stagger: 0.012,
        ease: 'power2.in',
      }, 0)
      .to(identityRef.current, {
        opacity: 0,
        y: -10,
        filter: 'blur(4px)',
        duration: 0.3,
        ease: 'power2.in',
      }, 0)
  }

  const go = (dir: 1 | -1) => transitionTo((index + dir + total) % total)
  const goRef = useRef(go)
  // Keep the ref fresh outside of render (used by timers + key listener).
  useEffect(() => {
    goRef.current = go
  })

  // Word-level entrance after the swap (the out tween queued it).
  useEffect(() => {
    if (!pendingIn.current) return
    pendingIn.current = false
    const words = quoteTextRef.current?.querySelectorAll('[data-word]')
    if (!words || words.length === 0) {
      animating.current = false
      return
    }
    gsap
      .timeline({ onComplete: () => (animating.current = false) })
      .fromTo(words, { opacity: 0, y: 16, filter: 'blur(4px)' }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.55,
        stagger: 0.014,
        ease: 'power3.out',
      }, 0)
      .fromTo(identityRef.current, { opacity: 0, y: 14, filter: 'blur(4px)' }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
      }, 0.05)
  }, [index])

  // Autoplay; disabled entirely for reduced motion.
  useEffect(() => {
    if (autoPaused || reducedMotion) return
    const t = setInterval(() => goRef.current(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [index, autoPaused])

  // Arrow keys steer the stage while the pointer is over it or focus is
  // within it (the same state that pauses autoplay).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!interacting.current) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goRef.current(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goRef.current(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Entrance: the stage rises, then the identity card lifts in after it.
  useGsapContext(
    rootRef,
    () => {
      gsap.fromTo('[data-testi-stage]', { opacity: 0, y: 48 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      })
      gsap.fromTo('[data-testi-card]', { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.25,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      })
    },
    []
  )

  const t = testimonials[index]

  return (
    <section
      id="testimonials"
      ref={rootRef}
      className="section py-28 md:py-36 border-t border-line relative overflow-hidden"
      aria-label="Client testimonials"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-32 left-1/4 w-[600px] h-[400px] rounded-full bg-maven/8 blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full bg-maven-light/8 blur-[140px]" />
      </div>

      {/* Hover OR keyboard focus anywhere in the stage pauses autoplay (WCAG 2.2.2). */}
      <div
        className="container-maven relative"
        onMouseEnter={() => {
          interacting.current = true
          setAutoPaused(true)
        }}
        onMouseLeave={() => {
          interacting.current = false
          setAutoPaused(false)
        }}
        onFocus={() => {
          interacting.current = true
          setAutoPaused(true)
        }}
        onBlur={() => {
          interacting.current = false
          setAutoPaused(false)
        }}
      >
        <SectionHeading
          eyebrow="Client words"
          title="Trusted by founders"
          accent="in their own words"
          align="center"
          className="mb-12 md:mb-16"
        />

        <div data-testi-stage className="relative">
          {/* Featured quote */}
          <div
            className="relative max-w-4xl mx-auto text-center"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current
              if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1)
            }}
          >
            <div aria-live="polite">
              <blockquote>
                <p
                  ref={quoteTextRef}
                  className="min-h-[17rem] sm:min-h-[10rem] md:min-h-[11rem] lg:min-h-[13rem] font-dm font-semibold text-[26px] leading-[1.5] tracking-[0.005em] text-white text-balance"
                >
                  <span data-word className="inline-block will-change-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
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
                  </span>{' '}
                  {t.quote.split(' ').map((word, i) => (
                    <Fragment key={i}>
                      <span data-word className="inline-block will-change-transform">
                        {highlightNames(word)}
                      </span>{' '}
                    </Fragment>
                  ))}
                </p>
              </blockquote>

              {/* Identity: logo + owner + title */}
              <div ref={identityRef} data-testi-card className="mt-10 md:mt-12 flex justify-center">
                <div className="flex items-center gap-3.5 md:gap-4 max-w-full">
                  <span className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white-solid overflow-hidden shrink-0 ring-1 ring-maven-light/25">
                    {t.image ? (
                      <img
                        src={t.image}
                        alt=""
                        className={cn('w-full h-full', t.logoFit === 'cover' ? 'object-cover' : 'object-contain p-1.5')}
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-br from-maven to-maven-light flex items-center justify-center font-poppins font-bold text-lg text-white-solid"
                      >
                        {t.name.charAt(0)}
                      </span>
                    )}
                  </span>
                  <span aria-hidden="true" className="w-px self-stretch max-h-12 bg-gradient-to-b from-transparent via-maven-light/50 to-transparent" />
                  <span className="min-w-0 text-left">
                    <span className="block text-base md:text-lg font-semibold text-white tracking-wide truncate">
                      {t.name}
                    </span>
                    <span className="block mt-1 text-[10px] md:text-xs font-medium uppercase tracking-[0.18em] md:tracking-[0.22em] text-mist truncate">
                      {t.role}
                      {t.company ? ` ${t.company}` : ''}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination: prev / next arrows */}
          <div className="mt-10 md:mt-12 flex items-center justify-center gap-5 md:gap-7">
            <button
              type="button"
              onClick={() => go(-1)}
              data-cursor
              aria-label="Previous client story"
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-mist hover:text-white hover:border-maven-light/50 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              data-cursor
              aria-label="Next client story"
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-mist hover:text-white hover:border-maven-light/50 transition-colors cursor-pointer"
            >
              <ArrowRight size={16} />
            </button>
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
