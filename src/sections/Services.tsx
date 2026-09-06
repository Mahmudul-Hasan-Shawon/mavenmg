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

        <div data-service-list className="border-t border-line">
          {services.map((service, i) => {
            const isActive = active === i
            return (
              <div
                key={service.id}
                data-service-row
                className={cn(
                  'group relative grid md:grid-cols-[minmax(0,1fr)_minmax(0,42%)] border-b border-line transition-colors duration-500',
                  isActive ? 'bg-maven-lighter/[0.025]' : 'hover:bg-maven-lighter/[0.015]'
                )}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                {/* Active edge marker */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute left-0 top-0 bottom-0 w-[2px] bg-maven-light transition-transform duration-500 origin-top z-10',
                    isActive ? 'scale-y-100' : 'scale-y-0'
                  )}
                />

                <button
                  type="button"
                  data-cursor
                  aria-expanded={isActive}
                  className="w-full text-left px-5 md:px-10 py-7 md:py-9 cursor-pointer"
                >
                  <div className="flex items-baseline gap-5 md:gap-10 min-w-0">
                    <span className={cn('index-tag transition-colors duration-300', isActive && '!text-maven-lighter')}>
                      {service.index}
                    </span>
                    <h3
                      className={cn(
                        'display font-semibold tracking-[0.98px] text-[clamp(1.125rem,3.4vw,2.6rem)] transition-all duration-500 md:truncate',
                        isActive ? 'text-white translate-x-1 md:translate-x-2' : 'text-mist group-hover:text-white'
                      )}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Expanding detail */}
                  <div
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-5 pb-1 pl-9 md:pl-[4.5rem]">
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

                {/* Full-bleed service image — right column */}
                <div
className={cn(
                      'relative hidden md:block overflow-hidden border-l border-line transition-all duration-700 ease-out [mask-image:linear-gradient(90deg,transparent,#000_35%)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_35%)]',
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
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