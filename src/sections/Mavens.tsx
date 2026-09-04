import { lazy, useRef, useState } from 'react'
import { Code, Megaphone } from 'lucide-react'
import { mavens } from '../data/content'
import { useGsapContext } from '../hooks/useGsap'
import { Reveal } from '../components/ui/Reveal'
import { AnimatedText } from '../components/text/AnimatedText'
import { LazyCanvas } from '../three/LazyCanvas'
import { reducedMotion } from '../utils/motion'

const MavenNetwork = reducedMotion ? null : lazy(() => import('../three/MavenNetwork'))

/**
 * Mavens — the signature brand section. A "Maven system" network visual
 * reconfigures itself as the story moves between Web Masters and Online
 * Marketers; the active discipline can also be chosen directly.
 */
export function Mavens() {
  const [mode, setMode] = useState(0)
  const modeRef = useRef(0)
  const rootRef = useRef<HTMLElement>(null)

  // Scroll drives the mode at the halfway point.
  useGsapContext(
    rootRef,
    ({ ScrollTrigger: ST }) => {
      ST.create({
        trigger: '[data-mavens-grid]',
        start: 'top 55%',
        end: 'bottom 45%',
        onUpdate: (self) => {
          const next = self.progress > 0.5 ? 1 : 0
          if (next !== modeRef.current) {
            modeRef.current = next
            setMode(next)
          }
        },
      })
    },
    []
  )

  const disciplines = [
    { ...mavens.webMasters, icon: Code },
    { ...mavens.marketers, icon: Megaphone },
  ]
  const Active = disciplines[mode]

  return (
    <section ref={rootRef} id="mavens" className="section py-28 md:py-40 border-t border-line" aria-label="The Marketing Mavens">
      <div className="container-maven">
        <div className="flex items-center gap-4 mb-14 md:mb-20">
          <span className="index-tag">06</span>
          <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
          <span className="mono-label !text-mist">{mavens.eyebrow}</span>
        </div>

        <h2 className="display text-[clamp(2.2rem,5.6vw,4.6rem)] max-w-4xl mb-6">
          <AnimatedText mode="words" stagger={0.06}>
            {mavens.headline}
          </AnimatedText>
          <span className="block">
            <AnimatedText mode="words" stagger={0.06} delay={0.2} blur gradient>
              {mavens.sub}
            </AnimatedText>
          </span>
        </h2>

        <Reveal>
          <p className="text-mist text-base md:text-lg leading-relaxed max-w-2xl mb-16 md:mb-24">
            {mavens.intro}
          </p>
        </Reveal>

        <div data-mavens-grid className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text / controls */}
          <div className="order-2 md:order-1">
            <div className="flex gap-3 mb-9">
              {disciplines.map((d, i) => (
                <button
                  key={d.label}
                  type="button"
                  data-cursor
                  onClick={() => setMode(i)}
                  aria-pressed={mode === i}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-sm font-medium tracking-tight transition-all duration-400 cursor-pointer ${
                    mode === i
                      ? 'border-maven-light/60 bg-maven/25 text-maven-lighter'
                      : 'border-line text-mist-dim hover:text-mist hover:border-mist/30'
                  }`}
                >
                  <d.icon size={15} aria-hidden="true" />
                  {d.label}
                </button>
              ))}
            </div>

            <div key={mode} data-mavens-copy>
              <p className="mono-label mb-4">{String(mode + 1).padStart(2, '0')} / Our {Active.label}</p>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl">{Active.body}</p>
            </div>

            <div className="mt-12 pt-8 border-t border-line max-w-xl">
              <p className="text-maven-lighter/70 text-[15px] leading-relaxed italic">{mavens.callout}</p>
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 md:order-2 relative">
            <div className="relative aspect-square max-w-[560px] mx-auto">
              <LazyCanvas
                Scene={MavenNetwork}
                className="absolute inset-0"
                sceneProps={{ mode }}
                fallback={
                  <div className="absolute inset-0" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-maven/20 blur-[100px]" />
                  </div>
                }
              />
            </div>
            <p className="text-center mono-label mt-2">The Maven system</p>
          </div>
        </div>
      </div>
    </section>
  )
}
