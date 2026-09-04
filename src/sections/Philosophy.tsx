import { useRef } from 'react'
import { philosophy } from '../data/content'
import { gsap, useGsapContext } from '../hooks/useGsap'

/**
 * Philosophy — a sticky, editorial reading moment. The statement fills in
 * word-by-word as you scroll (scrubbed), then the supporting paragraphs
 * fade up. The background slowly brightens from void toward ink.
 */
export function Philosophy() {
  const rootRef = useRef<HTMLElement>(null)

  useGsapContext(
    rootRef,
    () => {
      // Statement words fill from dim to white as the user scrolls through.
      gsap.fromTo(
        '[data-phil-word]',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '[data-phil-statement]',
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      )

      gsap.fromTo(
        '[data-phil-body]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '[data-phil-body-wrap]', start: 'top 82%', once: true },
        }
      )
    },
    []
  )

  const words = philosophy.statement.split(' ')

  return (
    <section
      ref={rootRef}
      className="section py-32 md:py-44 border-t border-line"
      aria-label="Our philosophy"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)' }}
    >
      <div className="container-maven">
        <div className="flex items-center gap-4 mb-14 md:mb-20">
          <span className="index-tag">04</span>
          <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
          <span className="mono-label !text-mist">{philosophy.eyebrow}</span>
        </div>

        <p
          data-phil-statement
          className="display text-[clamp(2.2rem,6.4vw,5.4rem)] max-w-5xl"
        >
          {words.map((w, i) => (
            <span key={i} data-phil-word className="inline-block mr-[0.28em] will-change-opacity">
              {i >= words.length - 3 ? (
                <span className="grad-text">{w}</span>
              ) : (
                w
              )}
            </span>
          ))}
        </p>

        <div data-phil-body-wrap className="mt-14 md:mt-20 grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl">
          <p data-phil-body className="text-mist text-base md:text-lg leading-relaxed">
            {philosophy.body}
          </p>
          <p data-phil-body className="text-maven-lighter/80 text-base md:text-lg leading-relaxed border-l border-maven-light/30 pl-6">
            {philosophy.callout}
          </p>
        </div>
      </div>
    </section>
  )
}
