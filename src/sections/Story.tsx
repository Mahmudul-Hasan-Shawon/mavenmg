import { story } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/text/Eyebrow'

/**
 * Story, Maven's history as an elegant vertical timeline: founding, the
 * move into design, management, and full-stack marketing. Editorial rows,
 * no cards.
 */
export function Story() {
  return (
    <section id="story" className="section pt-28 md:pt-36 pb-8 md:pb-12 border-t border-line" aria-label="Company story">
      <div className="container-maven">
        <Reveal>
          <Eyebrow label="Our story" className="mb-8 justify-center" />
        </Reveal>

        <h2 className="display text-[clamp(2rem,4.6vw,3.8rem)] text-white mb-8 md:mb-14 text-center">
          Bringing small businesses
          <br />
          into <span className="grad-text">the digital age</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
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

                    <h3 className="display font-semibold tracking-[0.98px] text-lg text-white transition-colors duration-500 group-hover:text-maven-lighter">
                      {entry.title}
                    </h3>
                    <p className="mt-2.5 text-mist-dim text-[15px] leading-relaxed max-w-lg transition-colors duration-500 group-hover:text-mist">
                      {entry.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="relative order-first lg:order-none" data-cursor>
            <div
              aria-hidden="true"
              className="absolute -inset-3 bg-gradient-to-br from-maven-lighter/8 to-maven-light/15 blur-2xl"
            />
            <img
              src="/images/about/chicago.jpg"
              alt="Chicago, home of Maven Marketing Group"
              className="relative rounded-3xl w-full aspect-[4/3] object-cover border border-line shadow-[0_32px_80px_-32px_rgba(97,44,139,0.5)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
