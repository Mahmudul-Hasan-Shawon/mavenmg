import { story } from '../data/content'
import { site } from '../data/site'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'

/**
 * Story — Maven's history as an elegant vertical timeline: founding, the
 * move into design, management, and full-stack marketing. Editorial rows,
 * no cards.
 */
export function Story({ onNavigate }: { onNavigate?: (href: string) => void }) {
  return (
    <section className="section py-28 md:py-36 border-t border-line" aria-label="Company story">
      <div className="container-maven">
        <SectionHeading
          index="08"
          eyebrow="Our story"
          title="Bringing small businesses"
          accent="into the digital age"
          lede={`Founded in ${site.founded} in ${site.address.city}, ${site.address.state} — now serving clients all over the United States and the world.`}
        />

        <ol className="relative">
          {/* Timeline rail */}
          <span aria-hidden="true" className="absolute left-[7px] md:left-[99px] top-2 bottom-2 w-px bg-maven-light/50" />

          {story.map((entry, i) => (
            <Reveal as="li" key={entry.title} delay={i * 0.06}>
              <div className="relative grid md:grid-cols-[80px_240px_1fr] gap-3 md:gap-10 py-8 md:py-10 border-b border-line last:border-b-0 pl-8 md:pl-0">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 md:left-[92px] top-9 w-[15px] h-[15px] rounded-full border border-maven-light/60 bg-void"
                >
                  <span className="absolute inset-[3px] rounded-full bg-maven-light" />
                </span>

                <span className="index-tag md:text-right md:pr-0">{entry.year}</span>
                <h3 className="display text-lg md:text-xl text-white">{entry.title}</h3>
                <p className="text-mist text-sm md:text-[15px] leading-relaxed max-w-xl">{entry.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
