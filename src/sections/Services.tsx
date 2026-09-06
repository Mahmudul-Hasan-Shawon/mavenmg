import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { cn } from '../utils/cn'

/**
 * ServiceExplorer, a large vertical index of Maven's services in a two-column
 * layout: text on the left, a full-bleed image on the right. Hovering
 * (desktop) or tapping (mobile) a row expands its description and highlights,
 * with a numbered editorial treatment instead of cards.
 */
export function Services({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLElement>(null)

  // Rows slide in on scroll, staggered.
  useGsapContext(
    rootRef,
    () => {
      gsap.fromTo(
        '[data-service-row]',
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-service-list]', start: 'top 80%', once: true },
        }
      )
    },
    []
  )

  return (
    <section ref={rootRef} id="services" className="section py-28 md:py-36" aria-label="Services">
      <div className="container-maven">
        <SectionHeading
          eyebrow="What we do"
          title="Everything your Business"
          accent="needs to win online"
          highlight={['business', 'win']}
          lede="Affordable web design services and digital marketing that fit your business needs, from first design to daily management."
        />

        <div
                data-service-list
                className={cn(
                  'flex flex-col gap-4 md:grid md:gap-0 border-t border-line'
                )}
              >
          {services.map((service, i) => {
            const isActive = active === i
            return (
              <div
                key={service.id}
                data-service-row
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-2xl border border-line md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,42%)] md:rounded-none md:border-0 md:border-b md:border-line transition-colors duration-500 bg-ink/60 shadow-[0_18px_45px_-24px_rgba(97,44,139,0.4)] md:shadow-none',
                  isActive ? 'md:bg-maven-lighter/[0.025]' : 'md:hover:bg-maven-lighter/[0.015]'
                )}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {/* Active edge marker */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'hidden md:block absolute left-0 top-0 bottom-0 w-[2px] bg-maven-light transition-transform duration-500 origin-top z-10',
                    isActive ? 'scale-y-100' : 'scale-y-0'
                  )}
                />

                <button
                  type="button"
                  data-cursor
                  aria-expanded={isActive}
                  className="w-full text-left px-5 md:px-10 py-6 md:py-9 cursor-pointer"
                >
                  <div className="flex items-baseline gap-5 md:gap-10 min-w-0">
                    <span
                      className={cn(
                        'hidden md:inline-block index-tag transition-colors duration-300',
                        isActive && '!text-maven-lighter'
                      )}
                    >
                      {service.index}
                    </span>
                    <h3
                      className={cn(
                        'display font-semibold tracking-[0.98px] text-[clamp(1.125rem,3.4vw,2.6rem)] md:transition-all md:duration-500 md:truncate text-white',
                        isActive ? 'md:translate-x-2' : 'md:text-mist md:group-hover:text-white'
                      )}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Expanding detail — always visible on mobile, hover-expands on desktop */}
                  <div
                    className={cn(
                      'grid grid-rows-[1fr] opacity-100 md:transition-[grid-template-rows,opacity] md:duration-500 md:ease-out',
                      isActive
                        ? 'md:grid-rows-[1fr] md:opacity-100'
                        : 'md:grid-rows-[0fr] md:opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-5 pb-1 pl-0 md:pl-[4.5rem]">
                        <p className="text-mist text-base md:text-base leading-relaxed max-w-3xl">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2 max-w-3xl">
                          {service.highlights.map((h) => (
                            <span
                              key={h}
                              className="px-3 py-1 rounded-full border border-line text-[11px] tracking-wide text-mist"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

{/* Service image — card banner on mobile, gradient-reveal right column on desktop */}
                <div
                  className={cn(
                    'relative order-first md:order-none w-full h-44 md:h-auto overflow-hidden transition-all duration-700 ease-out',
                    'border-b border-line md:border-b-0 md:border-l',
                    'md:[mask-image:linear-gradient(90deg,transparent,#000_35%)] md:[-webkit-mask-image:linear-gradient(90deg,transparent,#000_35%)]',
                    isActive ? 'md:opacity-100 md:translate-x-0' : 'md:opacity-0 md:translate-x-8'
                  )}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <MagneticButton variant="primary" onClick={() => onNavigate('/contact')}>
            Discuss your project <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}