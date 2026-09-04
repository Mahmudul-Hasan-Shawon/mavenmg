import { story } from '../data/content'
import { Reveal } from '../components/ui/Reveal'

/**
 * Story — Maven's history as an elegant vertical timeline: founding, the
 * move into design, management, and full-stack marketing. Editorial rows,
 * no cards.
 */
export function Story({ onNavigate, index = '08' }: { onNavigate?: (href: string) => void; index?: string }) {
  return (
    <section className="section pt-28 md:pt-36 pb-16 md:pb-20 border-t border-line" aria-label="Company story">
      <div className="container-maven">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="index-tag">{index}</span>
            <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
            <span className="mono-label !text-mist">Our story</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-28">
          <div className="order-2 lg:order-1">
            <h2 className="display text-[clamp(2rem,4.6vw,3.8rem)] text-white mb-12">
              Bringing small businesses <span className="grad-text">into the digital age</span>
            </h2>

            <ol className="relative">
              {/* Rail */}
              <span aria-hidden="true" className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-maven-light/60 via-line to-transparent" />

              {story.map((entry, i) => (
                <Reveal as="li" key={entry.title} delay={i * 0.08}>
                  <div className="group relative pl-10 pb-10 last:pb-2">
                    {/* Node */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-2 w-[11px] h-[11px] rounded-full border border-maven-light/60 bg-void transition-all duration-500 group-hover:border-maven-light group-hover:shadow-[0_0_14px_rgba(139,79,191,0.7)]"
                    >
                      <span className="absolute inset-[2.5px] rounded-full bg-maven-light transition-transform duration-500 group-hover:scale-110" />
                    </span>

                    <h3 className="display text-lg text-white transition-colors duration-500 group-hover:text-maven-lighter">
                      {entry.title}
                    </h3>
                    <p className="mt-2.5 text-mist-dim text-[15px] leading-relaxed max-w-lg transition-colors duration-500 group-hover:text-mist">
                      {entry.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <p className="mt-8 pt-8 border-t border-line flex items-start gap-4 text-maven-lighter/80 text-lg leading-relaxed italic max-w-lg">
              <span aria-hidden="true" className="mt-2.5 h-px w-8 bg-maven-light/60 shrink-0" />
              Your vision mixed with our creative skills will always drive the best results.
            </p>
          </div>

          <div className="relative order-1 lg:order-2" data-cursor>
            <div
              aria-hidden="true"
              className="absolute -inset-3 bg-gradient-to-br from-maven-lighter/8 to-maven-light/15 blur-2xl"
            />
            <img
              src="/images/about/chicago.jpg"
              alt="Chicago — home of Maven Marketing Group"
              className="relative rounded-3xl w-full aspect-[4/3] object-cover border border-line shadow-[0_32px_80px_-32px_rgba(97,44,139,0.5)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
