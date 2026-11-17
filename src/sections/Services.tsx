import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowUpRight, Globe, Search, Settings, Shield, Sparkles, TrendingUp, type LucideIcon } from 'lucide-react'
import { services } from '../data/services'
import { SectionHeading } from '../components/ui/SectionHeading'
import { MagneticButton } from '../components/ui/MagneticButton'
import { SmartLink } from '../components/ui/SmartLink'
import { Reveal } from '../components/ui/Reveal'
import { gsap, ScrollTrigger, useIsoLayoutEffect } from '../hooks/useGsap'
import { cn } from '../utils/cn'

/** Short tab labels (the titles are too long for the rail). */
const TAB_LABEL: Record<string, string> = {
  'web-design': 'Website',
  management: 'Website Management',
  seo: 'SEO',
  'digital-marketing': 'Marketing',
  'ai-consulting': 'AI',
  'cyber-security': 'Security',
}

/** Icon per service, matching services.ts `icon` ids. */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  settings: Settings,
  search: Search,
  trending: TrendingUp,
  sparkles: Sparkles,
  shield: Shield,
}

/**
 * ServiceDeck, ported from trove.quest's "How a save becomes a reference"
 * deck: a pinned viewport inside a (100svh + (n-1) x 70svh) runway and a
 * deck of bordered panels. Scrolling steps through them: the settled card
 * fades up and away with a slight 3D tilt + blur while the next one rises
 * from the peeking stack at the bottom edge, all scrubbed to the scroll.
 * Inner content (kicker, title, copy, highlights, link, image) staggers
 * in after each card lands so every step feels choreographed.
 *
 * Each panel: left column with icon orb, display title, description,
 * highlights and the Explore service link; right column holds the service
 * image inside a framed, softly zooming panel.
 */

/** Per-step scroll distance through the deck, in svh. */
const DECK_STEP_SVH = 70

export function Services({ onNavigate }: { onNavigate: (href: string) => void }) {
  const runwayRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const railRef = useRef<HTMLDivElement>(null)
  const railBtnRefs = useRef<Array<HTMLButtonElement | null>>([])
  const pillRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Manual layout effect: the scrub is user-driven so it also runs for
  // reduced-motion users (only the CSS-ish transitions are softened).
  useIsoLayoutEffect(() => {
    if (!runwayRef.current) return
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
      const n = cards.length
      if (!n) return

      // Card 0 settled; future cards wait hidden just below the deck edge.
      // autoAlpha (opacity + visibility) keeps hidden cards from catching
      // pointer events meant for the settled card's links.
      // transformPerspective gives the rotationX in/out a believable depth.
      cards.forEach((card, i) => {
        gsap.set(card, {
          y: i === 0 ? 0 : 72,
          scale: i === 0 ? 1 : 0.955,
          rotationX: i === 0 ? 0 : -3,
          transformPerspective: 1000,
          transformOrigin: 'bottom center',
          autoAlpha: i === 0 ? 1 : 0,
          filter: 'blur(0px)',
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: runwayRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(Math.round(self.progress * (n - 1)))
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${self.progress})`
            }
          },
        },
      })
      for (let i = 1; i < n; i++) {
        const at = i - 1
        // Outgoing tilts back, blurs and clears first, then the incoming
        // card rises flat from the stack edge below.
        tl.to(
          cards[i - 1],
          {
            y: -40,
            scale: 0.94,
            rotationX: 5,
            autoAlpha: 0,
            filter: 'blur(6px)',
            duration: 0.3,
            ease: 'power2.in',
          },
          at
        )
        tl.fromTo(
          cards[i],
          { y: 72, scale: 0.955, rotationX: -3, autoAlpha: 0, filter: 'blur(8px)' },
          {
            y: 0,
            scale: 1,
            rotationX: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
          },
          at + 0.2
        )
        // After the card lands, its content rows stagger up (title, copy,
        // highlights, link) and the image panel breathes in from a zoom.
        const inner = cards[i].querySelectorAll<HTMLElement>('[data-svc-el]')
        if (inner.length) {
          tl.fromTo(
            inner,
            { y: 28, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.34, ease: 'power2.out' },
            at + 0.3
          )
        }
        const frame = cards[i].querySelector('[data-svc-frame]')
        if (frame) {
          tl.fromTo(
            frame,
            { scale: 1.07, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'power1.out' },
            at + 0.28
          )
        }
      }
      ScrollTrigger.refresh()
    }, runwayRef)
    return () => ctx.revert()
  }, [])

  // Tab click: smooth-scroll to that step's scroll offset.
  const goToStep = (i: number) => {
    const el = runwayRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + i * DECK_STEP_SVH * 0.01 * window.innerHeight, behavior: 'smooth' })
  }

  // Sliding active pill: match the pill to the active button's geometry.
  const syncPill = (i: number) => {
    const pill = pillRef.current
    const btn = railBtnRefs.current[i]
    if (!pill || !btn) return
    pill.style.width = `${btn.offsetWidth}px`
    pill.style.transform = `translateX(${btn.offsetLeft}px)`
  }

  useEffect(() => {
    syncPill(active)
  }, [active])

  useEffect(() => {
    syncPill(active)
    const rail = railRef.current
    if (!rail || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => syncPill(active))
    ro.observe(rail)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="services" className="section relative pt-14 pb-28 md:pt-16 md:pb-36" aria-label="Services">
      <div className="container-maven">
        <SectionHeading
          eyebrow="Our services"
          title="Six Ways We Grow"
          accent="Your Business"
          highlight={['grow', 'business']}
          lede="Take one service or hand us the whole thing. Every line below is planned, built and measured by the same team."
        />
      </div>

      {/* Trove-style deck: pinned stage inside a stepped runway. Negative
          margins cancel the section padding so the stage is full-bleed. */}
      <div
        ref={runwayRef}
        className="relative z-0 -mx-[1.5rem] md:-mx-[3rem]"
        style={{ height: `calc(100svh + ${(services.length - 1) * DECK_STEP_SVH}svh)` } as CSSProperties}
      >
        <div className="sticky top-0 flex h-svh flex-col justify-center max-lg:justify-start pt-2 lg:pt-16 px-4 sm:px-6 lg:px-10 isolate">
          {/* Ambient violet glow breathing behind the deck */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 h-[52svh] opacity-80 blur-3xl"
            style={{
              background:
                'radial-gradient(42% 58% at 50% 50%, rgba(139,79,191,0.16), transparent 70%)',
            }}
          />

          {/* Deck status row: step counter + scroll progress line */}
          <div className="mb-4 hidden lg:flex items-center justify-center gap-5">
            <div className="flex items-baseline gap-1.5 font-mono text-xs tracking-[0.2em] text-mist-dim">
              <span key={active} className="svc-counter-digit text-[15px] font-semibold text-maven-lighter">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="text-mist-dim/60">/</span>
              <span>{String(services.length).padStart(2, '0')}</span>
            </div>
            <div className="relative h-px w-44 overflow-hidden bg-line">
              <div
                ref={progressFillRef}
                className="svc-progress-fill absolute inset-0 bg-gradient-to-r from-maven-light to-maven-lighter"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>

          {/* Tab rail (desktop): dark glass pill bar matching the theme —
              the active step is a violet pill that slides between tabs,
              click jumps to that card */}
          <div
            ref={railRef}
            role="tablist"
            aria-label="Our services"
            className="relative mb-5 hidden lg:flex items-center gap-1 w-fit mx-auto rounded-full bg-white/[0.04] border border-line p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.25)] backdrop-blur"
          >
            {/* Sliding pill behind the active tab */}
            <div
              ref={pillRef}
              aria-hidden="true"
              className="svc-tab-pill absolute left-0 top-1.5 bottom-1.5 rounded-full bg-maven-light/15 border border-maven-light/35 shadow-[0_0_18px_-6px_rgba(139,79,191,0.6)]"
              style={{ width: 0, transform: 'translateX(0px)' }}
            />
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon] ?? Globe
              return (
                <button
                  key={service.id}
                  ref={(el) => {
                    railBtnRefs.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`svc-panel-${service.id}`}
                  onClick={() => goToStep(i)}
                  className={cn(
                    'relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maven-light',
                    active === i ? 'text-maven-lighter' : 'text-mist-dim hover:text-mist'
                  )}
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={cn('transition-colors duration-300', active === i ? 'text-maven-lighter' : 'text-mist-dim/70')}
                  />
                  {TAB_LABEL[service.id] ?? service.title}
                </button>
              )
            })}
          </div>

          {/* Deck area: the settled card plus the peeking stack below.
              Capped width keeps the card from spanning the whole stage. */}
          <div className="relative z-10 mx-auto w-full max-w-[1040px] h-[calc(100svh-200px)] max-lg:h-[calc(100svh-16px)]">
            {services.map((service, i) => {
              const href = `/services/${service.slug}`
              const Icon = SERVICE_ICONS[service.icon] ?? Globe
              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  role="tabpanel"
                  id={`svc-panel-${service.id}`}
                  aria-hidden={active !== i}
                  className="absolute inset-0 flex flex-col overflow-hidden rounded-lg border border-line bg-ink shadow-[0_1px_2px_rgba(0,0,0,0.10),0_8px_20px_-10px_rgba(0,0,0,0.22),0_24px_48px_-24px_rgba(0,0,0,0.30)] p-5 sm:p-8 lg:pl-14 lg:grid lg:grid-cols-[1fr_calc(50%+32px)] lg:gap-12"
                  style={{ zIndex: i + 1 }}
                >
                  {/* Gradient hairline along the top edge */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-maven-light/45 to-transparent"
                  />

                  {/* Left: kicker, title, copy, links */}
                  <div className="relative flex max-w-[460px] shrink-0 flex-col justify-center max-lg:max-w-full">
                    {/* Ghost numeral: huge stroked index tucked behind the copy */}
                    <span
                      aria-hidden="true"
                      className="svc-ghost-index max-lg:hidden"
                      style={{ zIndex: 0 }}
                    >
                      {service.index}
                    </span>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3" data-svc-el>
                        <span
                          aria-hidden="true"
                          className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line text-maven-light"
                          style={{ background: 'color-mix(in srgb, var(--maven) 10%, transparent)' }}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                        </span>
                        <span className="mono-label">Service {service.index}</span>
                      </div>

                      <h3
                        data-svc-el
                        className="display mt-5 text-[clamp(28px,3.4vw,52px)] leading-[1.1] text-white"
                      >
                        {service.title}
                      </h3>
                      <p
                        data-svc-el
                        className="mt-4 text-mist text-base md:text-lg leading-relaxed max-w-[46ch]"
                      >
                        {service.description}
                      </p>

                      <ul data-svc-el className="mt-5 flex flex-col gap-3">
                        {service.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="flex items-center gap-2.5 text-base md:text-[17px] text-mist-dim">
                            <span aria-hidden="true" className="h-px w-4 bg-maven-light/60" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div data-svc-el>
                        <SmartLink
                          href={href}
                          onNavigate={onNavigate}
                          className="group w-fit inline-flex items-center gap-2 text-sm font-semibold mt-7 text-[rgb(185,138,240)] transition-colors duration-300 hover:text-white"
                        >
                          Explore service
                          <ArrowUpRight
                            size={16}
                            strokeWidth={2.2}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </SmartLink>
                      </div>
                    </div>
                  </div>

                  {/* Right: the service image, plain, softly breathing in */}
                  <div className="mt-6 h-[38svh] overflow-hidden max-lg:rounded-md lg:mt-0 lg:h-full lg:rounded-none">
                    <div data-svc-frame className="relative flex h-full w-full items-center justify-center overflow-hidden">
                      <img
                        src={service.image}
                        alt=""
                        loading="eager"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Stacked edges peeking below the settled card (trove look) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 bottom-0 h-3 rounded-lg border border-line bg-ink transition-opacity duration-300"
              style={{
                opacity: active < services.length - 1 ? 1 : 0,
                transform: 'translateY(9px) scale(0.985)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-2 bottom-0 h-3 rounded-lg border border-line bg-ink transition-opacity duration-300"
              style={{
                opacity: active < services.length - 2 ? 1 : 0,
                transform: 'translateY(19px) scale(0.97)',
              }}
            />
          </div>
        </div>
      </div>

      <div className="container-maven mt-16 md:mt-20">
        <Reveal delay={0.1} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <MagneticButton variant="primary" onClick={() => onNavigate('/contact')}>
            Discuss your project <ArrowUpRight size={16} />
          </MagneticButton>
          <SmartLink href="/services" onNavigate={onNavigate} className="svc-view-all">
            View all services
          </SmartLink>
        </Reveal>
      </div>
    </section>
  )
}
