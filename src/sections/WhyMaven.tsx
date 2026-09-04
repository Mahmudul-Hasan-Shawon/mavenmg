import { useState } from 'react'
import { reasons } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { cn } from '../utils/cn'

/**
 * WhyMaven — the seven reasons as one interactive editorial index.
 * A giant ghosted numeral follows the hovered row; hovering a row shifts its
 * typography and reveals the supporting statement. One central statement
 * anchors the section.
 */
export function WhyMaven() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="section py-28 md:py-36 border-t border-line" aria-label="Why Maven">
      <div className="container-maven">
        <SectionHeading
          index="02"
          eyebrow="Why Maven"
          title="A partner invested in"
          accent="your bottom line"
          lede="Seven reasons businesses across the US and beyond trust Maven with their digital presence."
        />

        <div className="relative">
          {/* Giant ghosted numeral that follows the active row */}
          <div
            aria-hidden="true"
            className="hidden lg:flex pointer-events-none absolute -top-10 right-0 font-sora font-bold text-stroke-faint select-none items-center justify-center transition-all duration-500"
            style={{ fontSize: 'clamp(10rem, 22vw, 20rem)', lineHeight: 1 }}
          >
            {active !== null ? reasons[active].index : '07'}
          </div>

          <ul className="border-t border-line">
            {reasons.map((reason, i) => {
              const isActive = active === i
              return (
                <Reveal as="li" key={reason.index} delay={i * 0.04}>
                  <div
                    data-cursor
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    className={cn(
                      'group relative border-b border-line py-6 md:py-7 transition-colors duration-500',
                      isActive ? 'bg-maven-lighter/[0.02]' : ''
                    )}
                  >
                    <div className="flex items-center gap-6 md:gap-12 px-2 md:px-6">
                      <span
                        className={cn(
                          'index-tag transition-colors duration-400',
                          isActive && '!text-maven-lighter'
                        )}
                      >
                        {reason.index}
                      </span>
                      <h3
                        className={cn(
                          'display flex-1 text-[clamp(1.15rem,2.6vw,1.9rem)] transition-all duration-500',
                          isActive ? 'text-white translate-x-2' : 'text-mist'
                        )}
                      >
                        {reason.title}
                      </h3>
                      <p
                        className={cn(
                          'hidden md:block text-sm text-mist leading-relaxed max-w-md transition-all duration-500',
                          isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                        )}
                      >
                        {reason.description}
                      </p>
                    </div>
                    {/* Mobile description */}
                    <p className="md:hidden px-2 pt-3 text-[13px] text-mist-dim leading-relaxed pl-[3.4rem]">
                      {reason.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
