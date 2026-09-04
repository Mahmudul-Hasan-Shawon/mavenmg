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
          <span aria-hidden="true" className="absolute left-[7px] md:left-[99px] top-2 bottom-2 w-px bg-gradient-to-b from-maven-light/50 via-line to-transparent" />

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

        {/* Location strip */}
        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 panel rounded-2xl px-7 py-6">
            <div className="flex items-center gap-4">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <div>
                <p className="text-white text-sm font-medium">
                  Based in {site.address.city}, {site.address.state}
                </p>
                <p className="text-mist-dim text-xs mt-0.5">
                  {site.address.street} · {site.hours}
                </p>
              </div>
            </div>
            {onNavigate && (
              <a
                onClick={() => onNavigate('/contact')}
                data-cursor
                className="link-line text-sm text-maven-lighter cursor-pointer"
              >
                Work with us
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
