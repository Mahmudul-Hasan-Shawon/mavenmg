import { useRef } from 'react'
import { stats } from '../data/site'
import { gsap, useGsapContext } from '../hooks/useGsap'

/**
 * Results — "luminous panel": a single dark card holding all stats side by
 * side (hairline dividers between them), wrapped in a gradient hairline
 * border that ignites to maven on hover. Inside, a mouse-tracked spotlight
 * plus top-left ambient glow make the panel feel lit from within; numerals
 * render in the brand gradient. Counters animate once when the section enters.
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

        {/* One panel, three stats — hairline dividers between them */}
        <div
          data-stat
          className="border-beam group relative rounded-3xl shadow-[0_28px_80px_-28px_rgba(97,44,139,0.5)] transition-all duration-500 ease-out hover:-translate-y-2"
        >
          {/* Orbiting border beam — blurred halo underneath, sharp core on top */}
          <div aria-hidden="true" className="beam-viewport beam-viewport-halo">
            <div className="beam-rotator beam-rotator-halo" />
          </div>
          <div aria-hidden="true" className="beam-viewport">
            <div className="beam-rotator beam-rotator-core" />
          </div>

          {/* Gradient hairline border — always lit to maven */}
          <div className="rounded-3xl p-px bg-maven-light/50">
            <div className="spotlight glow-tl rounded-[calc(1.5rem-1px)] bg-void grid grid-cols-1 md:grid-cols-3" onPointerMove={spotHandler}>
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col justify-center items-center text-center px-8 py-12 md:px-10 md:py-16 ${
                    i > 0 ? 'border-t border-line md:border-t-0 md:border-l' : ''
                  }`}
                >
                  <div className="font-dm font-[1000] leading-[0.75] tracking-[0.02em] tabular-nums mb-8 md:mb-10 text-[4.5rem] text-transparent bg-clip-text bg-[image:var(--grad)]">
                    {stat.prefix}
                    <span data-counter={stat.value} data-decimals={stat.decimals} className="font-[1000]">
                      0
                    </span>
                    <span>{stat.suffix}</span>
                  </div>

                  <span aria-hidden="true" className="block h-px w-24 bg-maven-light/40 mx-auto mb-6 md:mb-7" />

                  <div>
                    <h3 className="font-dm font-bold text-lg md:text-xl text-white mb-2.5 tracking-[0.05em]">{stat.label}</h3>
                    <p className="text-mist-dim text-md leading-relaxed max-w-xs">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
