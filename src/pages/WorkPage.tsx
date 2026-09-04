import { useState } from 'react'
import { projects } from '../data/projects'
import { PageHero } from '../sections/PageHero'
import { FinalCTA } from '../sections/FinalCTA'
import { Reveal } from '../components/ui/Reveal'
import { WorkShowcase } from '../sections/WorkShowcase'
import { ArrowRight, Star } from 'lucide-react'

export default function WorkPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [filter, setFilter] = useState('All')
  // Group the full project index by category for the editorial list.
  const categories = Array.from(new Set(projects.map((p) => p.category)))
  const featured = projects.find((p) => p.featured)
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <PageHero
        index="01"
        eyebrow="Our work"
        title="Grow your business online"
        accent="purpose driven websites"
        lede="Every project below was designed, developed, and is actively managed by Maven — built to perform as good as it looks."
      />

      {/* Featured project hero */}
      {featured && (
        <Reveal>
          <section className="py-24 lg:pt-10 lg:pb-24 px-6" aria-label="Featured project">
            <div className="max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded-[2rem]">
                <div className="absolute inset-0">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/95 via-[#0A0A0F]/20 to-[#0A0A0F]/0" />
                </div>
                <div className="relative p-8 md:p-14 max-w-xl">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                    style={{ background: `${featured.color}15`, border: `1px solid ${featured.color}30`, color: '#FF9B42' }}
                  >
                    <Star size={14} aria-hidden="true" />
                    Featured Project
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black mb-3 leading-tight text-white-solid">
                    HAQ Pickle
                    <br />
                    Pickleball
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    The HAQ Pickle Pickleball started as a fun idea between a father and son, two avid pickleball players.
                    <br />
                    <br />
                    After &#34;dinking&#34; around a few ideas to create something unique that picklers had never seen before, an idea started coming to life.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('/#contact')}
                      data-cursor
                      className="inline-flex items-center gap-2 px-6 py-3 bg-maven hover:bg-maven-light rounded-full font-semibold text-sm text-white-solid transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      Start Your Project <ArrowRight size={16} />
                    </button>
                    <a
                      href="https://haqpickle.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/40 rounded-full font-semibold text-sm text-white-solid backdrop-blur-md hover:bg-white/25 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {/* Full project card grid with sticky category filter */}
      <WorkShowcase
        onNavigate={onNavigate}
        hideHeader
        items={filtered}
        showFilter
        filter={filter}
        onFilterChange={setFilter}
      />

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
