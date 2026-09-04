import { useRef } from 'react'
import { stats } from '../data/site'
import { gsap, useGsapContext } from '../hooks/useGsap'

/**
 * Results — Maven's real numbers as huge editorial typography, not stat
 * cards. Counters animate once when the section enters; a fine top rule and
 * ghosted suffix numerals give it depth without decoration.
 */
export function Results() {
  const rootRef = useRef<HTMLElement>(null)

  useGsapContext(
    rootRef,
    () => {
      gsap.fromTo(
        '[data-stat]',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%', once: true },
        }
      )

      // Counters
      gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
        const target = Number(el.dataset.counter || '0')
        const decimals = Number(el.dataset.decimals || '0')
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%', once: true },
          onUpdate: () => {
            el.textContent = decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString()
          },
        })
      })
    },
    []
  )

  return (
    <section ref={rootRef} className="section py-28 md:py-40 relative overflow-hidden" aria-label="Results">
      {/* Ambient wash */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-maven/10 blur-[160px]" />
      </div>

      <div className="container-maven relative">
        <div className="flex items-center gap-4 mb-14 md:mb-20">
          <span className="index-tag">03</span>
          <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
          <span className="mono-label !text-mist">The Maven impact</span>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {stats.map((stat) => (
            <div key={stat.label} data-stat className="group relative py-10 md:py-14">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-12 px-2 md:px-6">
                <div className="font-sora font-bold leading-none tracking-tight text-[clamp(3.4rem,10vw,8.5rem)] grad-text tabular-nums">
                  {stat.prefix}
                  <span data-counter={stat.value} data-decimals={stat.decimals}>
                    0
                  </span>
                  <span className="text-maven-light">{stat.suffix}</span>
                </div>
                <div className="md:text-right md:pb-4 max-w-sm">
                  <h3 className="display text-xl md:text-2xl text-white mb-2">{stat.label}</h3>
                  <p className="text-mist-dim text-sm leading-relaxed">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
