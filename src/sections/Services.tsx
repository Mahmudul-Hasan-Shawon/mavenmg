import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { cn } from '../utils/cn'

const serviceIcons = {
  globe: GlobeIcon,
  settings: SettingsIcon,
  search: SearchIcon,
  trending: TrendingIcon,
} as const

/**
 * ServiceExplorer — a large vertical index of Maven's services.
 * Hovering (desktop) or tapping (mobile) a row expands its description and
 * highlights, with a numbered editorial treatment instead of cards.
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
          index="01"
          eyebrow="What we do"
          title="Everything your business needs"
          accent="to win online"
          lede="Affordable web design services and digital marketing that fit your business needs — from first design to daily management."
        />

        <div data-service-list className="border-t border-line">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon]
            const isActive = active === i
            return (
              <div
                key={service.id}
                data-service-row
                className={cn(
                  'group relative border-b border-line transition-colors duration-500',
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
                    'absolute left-0 top-0 bottom-0 w-[2px] bg-maven-light transition-transform duration-500 origin-top',
                    isActive ? 'scale-y-100' : 'scale-y-0'
                  )}
                />

                <button
                  type="button"
                  data-cursor
                  aria-expanded={isActive}
                  className="w-full text-left px-5 md:px-10 py-7 md:py-9 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-baseline gap-5 md:gap-10 min-w-0">
                      <span className={cn('index-tag transition-colors duration-300', isActive && '!text-maven-lighter')}>
                        {service.index}
                      </span>
                      <h3
                        className={cn(
                          'display text-[clamp(1.4rem,3.4vw,2.6rem)] transition-all duration-500 truncate',
                          isActive ? 'text-white translate-x-1 md:translate-x-2' : 'text-mist group-hover:text-white'
                        )}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6 shrink-0">
                      <span className="hidden sm:block text-mist-dim">
                        <Icon active={isActive} />
                      </span>
                      <ArrowUpRight
                        size={20}
                        aria-hidden="true"
                        className={cn(
                          'transition-all duration-500',
                          isActive ? 'text-maven-lighter rotate-45' : 'text-mist-dim'
                        )}
                      />
                    </div>
                  </div>

                  {/* Expanding detail */}
                  <div
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
                      isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-5 pb-1 pl-9 md:pl-[4.5rem] max-w-3xl">
                        <p className="text-mist text-base md:text-base leading-relaxed">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
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
              </div>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-10 flex justify-end">
          <a
            onClick={() => onNavigate('/contact')}
            data-cursor
            className="link-line inline-flex items-center gap-2 text-[15px] font-medium text-maven-lighter cursor-pointer"
          >
            Discuss your project <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* Minimal inline icons (stroke) so rows stay visually quiet */
import { Globe, Settings, Search, TrendingUp } from 'lucide-react'

function GlobeIcon({ active }: { active: boolean }) {
  return <Icon wrap active={active}><Globe size={18} /></Icon>
}
function SettingsIcon({ active }: { active: boolean }) {
  return <Icon wrap active={active}><Settings size={18} /></Icon>
}
function SearchIcon({ active }: { active: boolean }) {
  return <Icon wrap active={active}><Search size={18} /></Icon>
}
function TrendingIcon({ active }: { active: boolean }) {
  return <Icon wrap active={active}><TrendingUp size={18} /></Icon>
}

function Icon({ children, active }: { children: React.ReactNode; active: boolean; wrap?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500',
        active ? 'border-maven bg-maven text-white-solid' : 'border-line text-mist-dim'
      )}
    >
      {children}
    </span>
  )
}
