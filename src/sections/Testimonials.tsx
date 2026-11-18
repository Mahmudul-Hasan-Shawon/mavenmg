import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Pause, Play } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { dominantImageColor } from '../utils/imageColor'
import { SectionHeading } from '../components/ui/SectionHeading'
import { gsap, useGsapContext, useIsoLayoutEffect } from '../hooks/useGsap'
import { useMinWidth } from '../hooks/useDevice'
import { reducedMotion } from '../utils/motion'
import { cn } from '../utils/cn'

const AUTOPLAY_MS = 6500
const SWIPE_PX = 48

/* ---- Arc geometry, ported 1:1 from the reference (review-arc.framer.website)
 * The chips sit on a circle whose center is parked outside the card's left
 * edge; each chip is placed with rotate(angle) translateX(R) rotate(-angle)
 * so it stays upright while sliding along the arc. The active chip sits at
 * 0deg, its ±1 neighbors at ±18deg, ±2 at ±36deg — exactly five chips fill
 * the 400×460 stage. */
const STAGE_W = 400
const STAGE_H = 460
const CENTER_X = -245
const CENTER_Y = 230
const RADIUS = 340
const ANGLE_STEP = 18
const ARC_REACH = 2 // chips rendered at -2..+2 steps

/** Theme-aware palette — the card rides the site's semantic tokens so it
 *  reads as a raised surface on the hero-glow base in both themes. */
const CARD_BG = 'var(--surface)'
const INK = 'var(--fg)'
const MUTED = 'var(--mist-dim)'
const BORDER = 'var(--line)'
const STAR = '#F5B524'
const IDLE_AVATAR_BG = 'var(--surface-3)'

/** Accent per active avatar — cycled so each reviewer owns a hue. */
const ACCENTS = ['#C74C8B', '#7B3CBE', '#2E7CF6', '#0F9D7A', '#E0731F', '#B0413E']

const AVATAR = 72
const AVATAR_IDLE_SCALE = 0.611
const CHIP_W = 285

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const SIGNED = (i: number, index: number, total: number) => {
  let d = i - index
  if (d > total / 2) d -= total
  if (d < -total / 2) d += total
  return d
}

/** The stage scales down proportionally when the card stacks on mobile. */
function useStageScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(Math.min(1, el.clientWidth / STAGE_W))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, scale] as const
}

/**
 * "Client words" — the Review Arc.
 *
 * A faithful port of the reference design: a left-aligned heading, then one
 * white rounded card (1040px, centered) split in two. The left stage carries
 * five reviewer chips riding a circular arc — the active chip parks at
 * the arc's crest with a timer ring filling once per autoplay beat, its
 * neighbors step down ±18°/±36° with avatars scaling 72→44px and copy fading
 * toward the edges. The right panel holds the aggregate score, the quote
 * (word-by-word rise + blur, direction-aware), a role line with a Boxicons
 * briefcase-alt-2 icon, and a row of circular up/down arrows plus an
 * icon-only Pause/Play toggle. Hovering or focusing pauses autoplay
 * (WCAG 2.2.2); arrow keys steer; the card is swipeable. Below lg the arc is
 * swapped for a compact reviewer header and a lighter quote entrance.
 */
export function Testimonials() {
  const total = testimonials.length
  const isDesktop = useMinWidth(1024)
  const [index, setIndex] = useState(0)
  // Autoplay pauses while hovered, keyboard-focused (WCAG 2.2.2), or when
  // the reader toggles the Pause button.
  const [autoPaused, setAutoPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  const rootRef = useRef<HTMLElement>(null)
  const [stageRef, stageScale] = useStageScale()
  /** Dominant color per logo, extracted from the artwork itself; chips fall
   *  back to the cycling palette until (and unless) a sample lands. */
  const [logoColors, setLogoColors] = useState<Record<string, string>>({})
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const animating = useRef(false)
  const pendingIn = useRef(false)
  const interacting = useRef(false)
  const touchX = useRef(0)
  /** 1 = next, -1 = previous; signs the desktop word/author travel. */
  const dirRef = useRef<1 | -1>(1)

  const paused = autoPaused || userPaused
  const avg = '5.0'

  /** Desktop keeps the original out-then-in word/author choreography; below
   *  lg the swap is immediate and the lighter entrance below runs instead. */
  const transitionTo = (next: number) => {
    if (animating.current || next === index) return
    const words = quoteRef.current?.querySelectorAll('[data-word]')
    if (!isDesktop || reducedMotion || !words?.length) {
      setIndex(next)
      return
    }
    animating.current = true
    const diff = (next - index + total) % total
    dirRef.current = diff <= total / 2 ? 1 : -1
    const d = dirRef.current
    gsap
      .timeline({
        onComplete: () => {
          pendingIn.current = true
          setIndex(next)
        },
      })
      .to(words, {
        opacity: 0,
        y: -14 * d,
        filter: 'blur(4px)',
        duration: 0.32,
        stagger: 0.012,
        ease: 'power2.in',
      }, 0)
      .to(roleRef.current, {
        opacity: 0,
        y: -10 * d,
        filter: 'blur(4px)',
        duration: 0.3,
        ease: 'power2.in',
      }, 0)
  }

  const go = (dir: 1 | -1) => transitionTo((index + dir + total) % total)
  const goRef = useRef(go)
  useEffect(() => {
    goRef.current = go
  })

  // Autoplay; disabled entirely for reduced motion.
  useEffect(() => {
    if (paused || reducedMotion) return
    const t = setInterval(() => goRef.current(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [index, paused])

  // Word-level entrance after the swap. On desktop this is the original
  // direction-aware rise + blur, queued by the out tween in transitionTo.
  // Below lg a lighter fade-up keeps the full quote readable while it plays.
  useIsoLayoutEffect(() => {
    if (reducedMotion) return
    const words = quoteRef.current?.querySelectorAll('[data-word]')

    if (isDesktop) {
      if (!pendingIn.current) return
      pendingIn.current = false
      const d = dirRef.current
      if (!words?.length) {
        animating.current = false
        return
      }
      const tl = gsap.timeline({ onComplete: () => (animating.current = false) })
      tl.fromTo(words, { opacity: 0, y: 16 * d, filter: 'blur(4px)' }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.55,
        stagger: 0.014,
        ease: 'power3.out',
      }, 0)
        .fromTo(roleRef.current, { opacity: 0, y: 14 * d, filter: 'blur(4px)' }, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
        }, 0.05)
      return () => {
        tl.kill()
      }
    }

    const tl = gsap.timeline()
    if (words?.length) {
      tl.fromTo(words, { opacity: 0.55, y: 8 }, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.014,
        ease: 'power3.out',
        force3D: true,
      }, 0)
    }
    if (roleRef.current) {
      tl.fromTo(roleRef.current, { opacity: 0, y: 6 }, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        force3D: true,
      }, 0.08)
    }
    return () => {
      tl.kill()
    }
  }, [index, isDesktop])

  // Sample each logo's dominant color once so the timer ring and the active
  // glow can follow the artwork's own hue.
  useEffect(() => {
    let alive = true
    testimonials.forEach((t) => {
      if (!t.image) return
      dominantImageColor(t.image).then((hex) => {
        if (alive && hex) setLogoColors((prev) => (prev[t.name] ? prev : { ...prev, [t.name]: hex }))
      })
    })
    return () => {
      alive = false
    }
  }, [])

  // Arrow keys steer while the pointer is over the card or focus is within.
  // Up/Down mirror the reference's vertical chevrons on the arc.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!interacting.current) return
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goRef.current(-1)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        goRef.current(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Entrance: the card rises once as the section scrolls in.
  useGsapContext(
    rootRef,
    () => {
      gsap.fromTo('[data-testi-card]', { opacity: 0, y: 44 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
      })
    },
    []
  )

  const t = testimonials[index]
  const ease = reducedMotion ? 'none' : EASE
  // The seated chip's own accent (its logo's dominant color) drives the ring,
  // the glow, and the quote marks.
  const activeAccent = logoColors[t.name] ?? ACCENTS[index % ACCENTS.length]

  return (
    <section
      id="testimonials"
      ref={rootRef}
      className="section py-28 md:py-36 relative overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* Hover OR keyboard focus anywhere in the card pauses autoplay (WCAG 2.2.2). */}
      <div
        className="container-maven"
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
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1)
        }}
      >
        <div className="mx-auto w-full max-w-[1040px]">
          <SectionHeading
            eyebrow="Client words"
            title="Trusted by founders"
            accent="in their own words"
            accentLight
            align="center"
          />

          <div
            data-testi-card
            className="grid lg:grid-cols-[400px_1fr] rounded-[28px] overflow-hidden"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}`, boxShadow: '0 1px 2px rgba(20,19,43,0.04), 0 12px 32px -8px rgba(20,19,43,0.1)' }}
          >
            {/* ===== Left stage: chips riding the arc ===== */}
            <div
              role="group"
              aria-label="Client reviews"
              ref={stageRef}
              className="relative hidden w-full overflow-hidden lg:block"
              style={{ height: STAGE_H * stageScale }}
            >
              <div
                className="absolute left-0 top-0"
                style={{
                  width: STAGE_W,
                  height: STAGE_H,
                  transform: `scale(${stageScale})`,
                  transformOrigin: '0 0',
                }}
              >
                {testimonials.map((c, i) => {
                  const d = SIGNED(i, index, total)
                  const ad = Math.abs(d)
                  const isActive = d === 0
                  const visible = ad <= ARC_REACH
                  const accent = logoColors[c.name] ?? ACCENTS[i % ACCENTS.length]
                  const angle = d * ANGLE_STEP
                  // Logos ride a white disc (like the reference) so their
                  // artwork stays readable in both themes.
                  const avatarBg = c.image
                    ? '#FFFFFF'
                    : isActive
                      ? accent
                      : IDLE_AVATAR_BG

                  return (
                    <div
                      key={c.name}
                      data-arc-chip
                      style={{
                        position: 'absolute',
                        left: CENTER_X,
                        top: CENTER_Y,
                        width: 0,
                        height: 0,
                        opacity: visible ? (ad <= 1 ? 1 : 0.45) : 0,
                        pointerEvents: visible ? undefined : 'none',
                        transform: `rotate(${angle}deg) translateX(${RADIUS}px) rotate(${-angle}deg)`,
                        transition: reducedMotion
                          ? 'opacity 300ms ease'
                          : `transform 600ms ${EASE}, opacity 300ms ease`,
                      }}
                    >
                      <button
                        type="button"
                        data-cursor
                        onClick={() => transitionTo(i)}
                        aria-current={isActive ? 'true' : undefined}
                        aria-label={`View review from ${c.name}`}
                        className="font-sora"
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          transform: 'translate(-30px, -50%)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          width: CHIP_W,
                          padding: 0,
                          border: 0,
                          background: 'none',
                          color: 'inherit',
                          font: 'inherit',
                          textAlign: 'left',
                          cursor: 'pointer',
                        }}
                      >
                        <span
                          style={{
                            position: 'relative',
                            flexShrink: 0,
                            width: AVATAR / 1.2,
                            height: AVATAR / 1.2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {/* Glow behind the seated avatar, tinted with the logo's own color */}
                          <span
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              width: AVATAR,
                              height: AVATAR,
                              margin: -AVATAR / 2,
                              borderRadius: '50%',
                              background: accent,
                              filter: 'blur(16px)',
                              opacity: isActive ? 0.55 : 0,
                              transform: `scale(${isActive ? 1 : AVATAR_IDLE_SCALE})`,
                              transition: `transform 600ms ${ease}, opacity 400ms ease`,
                            }}
                          />
                          {/* Autoplay timer ring around the seated avatar */}
                          {isActive && <TimerRing accent={accent} index={index} paused={paused} />}
                          {/* Card-colored disc masking the glow behind the avatar;
                              the 41.5px timer ring still clears the 40px mask. */}
                          <span
                            aria-hidden="true"
                            style={{
                              position: 'absolute',
                              left: '50%',
                              top: '50%',
                              width: 80,
                              height: 80,
                              margin: -40,
                              borderRadius: '50%',
                              background: CARD_BG,
                              transform: `scale(${isActive ? 1 : AVATAR_IDLE_SCALE})`,
                              transition: `transform 600ms ${ease}`,
                            }}
                          />
                          <span
                            style={{
                              position: 'relative',
                              width: AVATAR,
                              height: AVATAR,
                              flexShrink: 0,
                              borderRadius: '50%',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: avatarBg,
                              color: isActive && !c.image ? '#FFFFFF' : INK,
                              fontSize: 23,
                              fontWeight: 600,
                              boxShadow: c.image ? `0 0 0 1px ${BORDER}` : undefined,
                              transform: `scale(${isActive ? 1 : AVATAR_IDLE_SCALE})`,
                              transition: `transform 600ms ${ease}, background-color 300ms ease, color 300ms ease, opacity 300ms ease`,
                            }}
                          >
                            {c.image ? (
                              <img
                                src={c.image}
                                alt=""
                                loading="lazy"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: c.logoFit === 'cover' ? 'cover' : 'contain',
                                }}
                              />
                            ) : (
                              initialsOf(c.name)
                            )}
                          </span>
                        </span>

                        <span
                          style={{
                            minWidth: 0,
                            display: 'grid',
                            opacity: ad <= 1 ? 1 : 0.45,
                            transform: isActive ? 'translateX(20px)' : 'none',
                            transition: `transform 600ms ${ease}, opacity 300ms ease`,
                          }}
                        >
                          <span
                            style={{
                              fontSize: isActive ? 20 : 15,
                              fontWeight: 500,
                              color: INK,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              transition: 'font-size 300ms ease',
                            }}
                          >
                            {c.name}
                          </span>
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 5,
                              fontSize: 13,
                              color: MUTED,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
                            <i className="fa-solid fa-star" aria-hidden="true" style={{ color: STAR, fontSize: 13, lineHeight: 1 }} />
                            {avg} · {c.company || c.role}
                          </span>
                        </span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ===== Below lg: compact reviewer header instead of the scaled
                  arc, so the full quote gets the card's entire width. No pill
                  selector — the arrows below and swipes steer the reviews. */}
            <div
              role="group"
              aria-label="Client reviews"
              className="flex items-center gap-3 px-5 pt-6 pb-1 sm:px-8 sm:pt-8 lg:hidden"
            >
              <span
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{ background: t.image ? '#FFFFFF' : activeAccent, boxShadow: `0 0 0 1px ${BORDER}` }}
              >
                <TimerRing accent={activeAccent} index={index} paused={paused} size={62} />
                {t.image ? (
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    className="h-9 w-9 rounded-full"
                    style={{ objectFit: t.logoFit === 'cover' ? 'cover' : 'contain' }}
                  />
                ) : (
                  <span className="text-base font-semibold text-white-solid">{initialsOf(t.name)}</span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sora text-base font-semibold" style={{ color: INK }}>
                  {t.name}
                </p>
                <p
                  className="mt-0.5 flex items-center gap-1.5 text-xs"
                  style={{ color: MUTED }}
                  aria-label={`Rated ${avg} out of 5`}
                >
                  <i className="fa-solid fa-star" aria-hidden="true" style={{ color: STAR, fontSize: 13, lineHeight: 1 }} />
                  <span>{avg}</span>
                  <span aria-hidden="true">·</span>
                  <span>{total} reviews</span>
                </p>
              </div>
              <span className="shrink-0 text-xs tabular-nums" style={{ color: MUTED }}>
                {String(index + 1).padStart(2, '0')} / {total}
              </span>
            </div>

            {/* ===== Right panel: quote, author, controls ===== */}
            <div
              aria-live="off"
              className="flex flex-col justify-start gap-5 p-5 sm:gap-6 sm:p-8 lg:py-10 lg:pr-14 lg:pl-8 min-w-0"
            >
              {/* Aggregate: five stars instead of the raw score text — the
                  compact mobile header already carries the rating. */}
              <p className="hidden items-center gap-2 text-sm lg:flex lg:self-end" style={{ color: MUTED }} aria-label={`Rated ${avg} out of 5`}>
                <span className="flex items-center gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <i
                      key={s}
                      className="fa-solid fa-star"
                      style={{ color: activeAccent, fontSize: 16, lineHeight: 1, transition: 'color 300ms ease' }}
                    />
                  ))}
                </span>
                <span>· {total} reviews</span>
              </p>

              <blockquote
                key={index}
                ref={quoteRef}
                className="font-sora font-medium text-balance flex flex-col"
                style={{
                  margin: 0,
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  lineHeight: 1.26,
                  letterSpacing: '-0.025em',
                  color: INK,
                }}
              >
                <QuoteMark color={activeAccent} className="mb-3 lg:mb-4" />
                <p>
                  {t.quote.split(' ').map((word, i) => (
                    <Fragment key={i}>
                      <span data-word className="inline-block will-change-transform">
                        {highlightNames(word)}
                      </span>{' '}
                    </Fragment>
                  ))}
                </p>
                <QuoteMark color={activeAccent} flip className="mt-3 self-end lg:mt-5" />
              </blockquote>

              {/* Author + controls: stacked on phones for full-width readable
                  copy, one row like the reference from sm up. */}
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <div key={index} ref={roleRef} className="flex items-center gap-2">
                  <BriefcaseAlt2Icon color={activeAccent} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--maven-lighter)' }}>
                    {t.role}
                    {t.company ? `, ${t.company}` : ''}
                  </span>
                </div>

                <div className="testi-controls flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    data-cursor
                    aria-label="Previous review"
                    className="h-11 w-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer sm:h-10 sm:w-10"
                    style={{ border: `1px solid ${BORDER}`, color: INK, background: 'transparent' }}
                  >
                    <ChevronUp size={16} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    data-cursor
                    aria-label="Next review"
                    className="h-11 w-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer sm:h-10 sm:w-10"
                    style={{ border: `1px solid ${BORDER}`, color: INK, background: 'transparent' }}
                  >
                    <ChevronDown size={16} strokeWidth={2} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserPaused((v) => !v)}
                    data-cursor
                    aria-label={userPaused ? 'Play autoplay' : 'Pause autoplay'}
                    aria-pressed={userPaused}
                    className="h-11 w-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer sm:h-10 sm:w-10"
                    style={{ border: `1px solid ${BORDER}`, color: INK, background: 'transparent' }}
                  >
                    {userPaused ? <Play size={14} /> : <Pause size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Live announcement for screen readers when the show advances */}
          <p className="sr-only" aria-live="polite">
            {`Client story ${index + 1} of ${total}: ${t.name}`}
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * Wraps brand mentions ("Maven Marketing Group", "Maven", "Connor") in the
 * brand violet so they stand out inside the quote copy.
 */
const NAME_SPLIT = /(Maven Marketing Group|Maven|Connor)/gi
const NAMES = new Set(['maven marketing group', 'maven', 'connor'])

function highlightNames(text: string): React.ReactNode[] {
  return text.split(NAME_SPLIT).map((part, i) =>
    NAMES.has(part.toLowerCase()) ? (
      <span key={i} style={{ color: 'var(--maven-lighter)' }}>
        {part}
      </span>
    ) : (
      part
    )
  )
}

/**
 * Boxicons v3.0.8 "briefcase-alt-2" — exact SVG (regular / basic), inlined so
 * the role caption needs no extra package or stylesheet. currentColor lets it
 * follow the seated client's accent like the quote marks.
 */
function BriefcaseAlt2Icon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ color, display: 'block', flexShrink: 0, transition: `color ${reducedMotion ? 0 : 600}ms ease` }}
    >
      {/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}
      <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2M9 4h6v2H9zM8 8h12v3.07l-.83.39a16.78 16.78 0 0 1-14.34 0L4 11.07V8zM4 20v-6.72c2.54 1.19 5.27 1.79 8 1.79s5.46-.6 8-1.79V20z" />
    </svg>
  )
}

/**
 * Autoplay progress ring around whichever avatar is seated. Shared by the
 * desktop arc chips and the compact mobile header; the keyed circle restarts
 * the one-beat fill every time the active review changes.
 */
function TimerRing({
  accent,
  index,
  paused,
  size = 88,
}: {
  accent: string
  index: number
  paused: boolean
  size?: number
}) {
  return (
    <svg
      viewBox="0 0 36 36"
      aria-hidden="true"
      className={cn('t-ring', reducedMotion && 'motion-reduce:animate-none')}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: size,
        height: size,
        margin: -size / 2,
        transform: 'rotate(-90deg)',
      }}
    >
      <circle
        key={index}
        cx={18}
        cy={18}
        r={17}
        pathLength={1}
        fill="none"
        stroke={accent}
        strokeWidth={1}
        strokeLinecap="round"
        strokeDasharray={1}
        style={{
          strokeDashoffset: 0,
          animation: reducedMotion ? undefined : `t-ring-fill ${AUTOPLAY_MS}ms linear forwards`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      />
    </svg>
  )
}

/**
 * Quotation-mark glyph (28×24) bookending the review quote. The bottom mark
 * is flipped 180deg so it reads as a hanging closing quote. Both marks take
 * the seated chip's accent so they match the timer ring and glow.
 */
function QuoteMark({ color, className, flip }: { color: string; className?: string; flip?: boolean }) {
  return (
    <svg
      width={28}
      height={24}
      viewBox="0 0 28 24"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path
        d="M0 24V14.4C0 6.6 3.9 1.8 11.4 0l1.3 3C8.6 4.5 6.6 7.4 6.4 11.4H12V24H0Zm16 0V14.4C16 6.6 19.9 1.8 27.4 0l1.3 3c-4.1 1.5-6.1 4.4-6.3 8.4H28V24H16Z"
        style={{ fill: color, transition: `fill ${reducedMotion ? 0 : 600}ms ease` }}
      />
    </svg>
  )
}
