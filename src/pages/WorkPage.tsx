import { projects } from '../data/projects'
import { PageHero } from '../sections/PageHero'
import { WorkShowcase } from '../sections/WorkShowcase'
import { FinalCTA } from '../sections/FinalCTA'
import { Reveal } from '../components/ui/Reveal'

export default function WorkPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  // Group the full project index by category for the editorial list.
  const categories = Array.from(new Set(projects.map((p) => p.category)))

  return (
    <>
      <PageHero
        index="01"
        eyebrow="Our work"
        title="Grow your business online"
        accent="purpose driven websites"
        lede="Every project below was designed, developed, and is actively managed by Maven — built to perform as good as it looks."
      />

      <WorkShowcase onNavigate={onNavigate} />

      {/* Editorial index of all projects */}
      <section className="section py-24 md:py-32 border-t border-line" aria-label="Project index">
        <div className="container-maven">
          <Reveal>
            <div className="flex items-center gap-4 mb-14">
              <span className="index-tag">Index</span>
              <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              <span className="mono-label !text-mist">All projects</span>
            </div>
          </Reveal>

          <div className="space-y-14">
            {categories.map((cat) => (
              <div key={cat}>
                <p className="mono-label mb-5">{cat}</p>
                <ul className="border-t border-line">
                  {projects
                    .filter((p) => p.category === cat)
                    .map((p) => (
                      <li key={p.id}>
                        <div
                          data-cursor
                          className="group grid grid-cols-[auto_1fr] md:grid-cols-[64px_1fr_1fr_auto] items-baseline gap-4 md:gap-8 py-5 border-b border-line transition-colors duration-500 hover:bg-maven-lighter/[0.015] px-1"
                        >
                          <span className="index-tag">{String(p.id).padStart(2, '0')}</span>
                          <span className="display text-lg md:text-2xl text-mist group-hover:text-white transition-colors duration-400">
                            {p.name}
                          </span>
                          <span className="hidden md:block text-mist-dim text-sm">{p.blurb}</span>
                          <span className="hidden md:flex items-center gap-2 text-xs text-mist-dim">
                            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} aria-hidden="true" />
                            {p.services.split(',')[0]}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
