import { useRef, useState, type CSSProperties } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  Globe,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { services, type Service } from '../data/services'
import { SectionHeading } from '../components/ui/SectionHeading'
import { MagneticButton } from '../components/ui/MagneticButton'
import { SmartLink } from '../components/ui/SmartLink'
import { Reveal } from '../components/ui/Reveal'
import { gsap, useGsapContext } from '../hooks/useGsap'

/**
 * ServiceDeck, a fully redesigned services rail.
 *
 * Desktop (lg+): an expanding accordion of vertical panels. Collapsed panels
 * show only a rotated title, a mono index and an orbiting satellite icon.
 * Hovering (or focusing) a panel grows it across the row while a clipped
 * image wipe, description, highlight chips and a CTA crossfade in. Pure CSS
 * flex-grow transition, no JS per-panel state on desktop.
 *
 * Mobile: the same markup becomes a vertical accordion. Tapping a header
 * expands it (grid-template-rows 0fr -> 1fr trick); one panel open at a
 * time, the first open by default.
 */
const iconMap: Record<Service['icon'], LucideIcon> = {
  globe: Globe,
  settings: Settings,
  search: Search,
  trending: TrendingUp,
  sparkles: Sparkles,
  shield: ShieldCheck,
}

export function Services({ onNavigate }: { onNavigate: (href: string) => void }) {
  const deckRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<string | null>(null)

  useGsapContext(
    deckRef,
    () => {
      const panels = deckRef.current?.querySelectorAll<HTMLElement>('.svc-panel')
      if (!panels?.length) return
      gsap.fromTo(
        panels,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.09,
          ease: 'expo.out',
          scrollTrigger: { trigger: deckRef.current, start: 'top 86%', once: true },
          clearProps: 'all',
        }
      )
    },
    []
  )

  return (
    <section id="services" className="section pt-14 pb-28 md:pt-16 md:pb-36" aria-label="Services">
      <div className="container-maven">
        <SectionHeading
          eyebrow="Our services"
          title="Six Ways We Grow"
          accent="Your Business"
          highlight={['grow', 'business']}
          lede="Take one service or hand us the whole thing. Every line below is planned, built and measured by the same team."
        />

        <div ref={deckRef} className="svc-deck mt-14 md:mt-20">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon]
            const isOpen = open === service.id
            const href = `/services/${service.slug}`
            return (
              <article
                key={service.id}
                className="svc-panel"
                data-open={isOpen ? 'true' : undefined}
                style={{ '--svc-i': i } as CSSProperties}
              >
                {/* Desktop: invisible full-panel hit link (whole panel is clickable) */}
                <SmartLink
                  href={href}
                  onNavigate={onNavigate}
                  className="svc-hit"
                  aria-label={`Explore ${service.title}`}
                />

                {/* Rail: collapsed identity (desktop) / expandable header (mobile) */}
                <header
                  className="svc-rail"
                  onClick={() => setOpen(isOpen ? null : service.id)}
                >
                  <span className="svc-index" aria-hidden="true">
                    {service.index}
                  </span>
                  <h3 className="svc-vtitle">{service.title}</h3>
                  <div className="svc-orb" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.7} />
                  </div>
                  <button
                    type="button"
                    className="svc-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`svc-body-${service.id}`}
                    aria-label={isOpen ? `Collapse ${service.title}` : `Expand ${service.title}`}
                    onClick={() => setOpen(isOpen ? null : service.id)}
                  >
                    <ChevronDown size={15} strokeWidth={2.2} />
                  </button>
                </header>

                {/* Expanded body: image wipe + copy + chips + CTA */}
                <div className="svc-body-wrap" id={`svc-body-${service.id}`}>
                  <div className="svc-clip">
                    <div className="svc-body">
                      <div className="svc-head">
                        <span className="svc-index" aria-hidden="true">
                          {service.index}
                        </span>
                        <span className="svc-btitle">{service.title}</span>
                      </div>
                      <figure className="svc-media" aria-hidden="true">
                        <img src={service.image} alt="" loading="lazy" />
                        <span className="svc-media-scrim" />
                      </figure>
                      <p className="svc-desc">{service.description}</p>
                      <ul className="svc-chips">
                        {service.highlights.slice(0, 3).map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                      <SmartLink href={href} onNavigate={onNavigate} className="svc-cta">
                        Explore service
                        <span className="svc-cta-dot">
                          <ArrowUpRight size={13} strokeWidth={2.2} />
                        </span>
                      </SmartLink>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
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
