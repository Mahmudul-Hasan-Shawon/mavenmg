import { useRef } from 'react'
import { stats } from '../data/site'
import { gsap, useGsapContext } from '../hooks/useGsap'

/**
 * Results — "luminous panels": three floating dark cards, each wrapped in a
 * hairline gradient border that ignites to maven on hover. Inside, a
 * mouse-tracked spotlight plus top-left ambient glow make the panel feel lit
 * from within; numerals render in the brand gradient. Counters animate once
 * when the section enters.
 */
export function Results() {
  const rootRef = useRef<HTMLElement>(null)

  useGsapContext(
    rootRef,
    () => {
      gsap.fromTo(
        '[data-stat]',
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
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
          duration: 2.2,
          ease: 'power3.out',
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-stat
              className="group relative rounded-3xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_28px_80px_-28px_rgba(97,44,139,0.5)]"
            >
              {/* Gradient hairline border — ignites to maven on hover */}
              <div className="rounded-3xl p-px h-full bg-line transition-colors duration-500 group-hover:bg-maven-light/50">
                <div className="spotlight glow-tl rounded-[calc(1.5rem-1px)] bg-void p-8 md:p-10 h-full flex flex-col" onPointerMove={spotHandler}>
                  <div className="flex items-center justify-between mb-10 md:mb-14">
                    <span className="index-tag">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      className="h-px w-8 bg-maven-light/30 transition-all duration-500 group-hover:w-14 group-hover:bg-maven-light/70"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="display font-bold leading-[0.9] tracking-[-0.04em] tabular-nums mb-8 md:mb-10 text-[clamp(3.25rem,6vw,5.75rem)] text-transparent bg-clip-text bg-[image:var(--grad)]">
                    {stat.prefix}
                    <span data-counter={stat.value} data-decimals={stat.decimals}>
                      0
                    </span>
                    <span className="text-[0.55em] tracking-tight ml-0.5">{stat.suffix}</span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="display text-lg md:text-xl text-white mb-2.5">{stat.label}</h3>
                    <p className="text-mist-dim text-md leading-relaxed">{stat.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function spotHandler(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}
