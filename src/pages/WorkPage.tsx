import { useState } from 'react'
import { projects } from '../data/projects'
import { PageHero } from '../sections/PageHero'
import { FinalCTA } from '../sections/FinalCTA'
import { MavensTeam } from '../sections/MavensTeam'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { WorkShowcase } from '../sections/WorkShowcase'
import { ArrowRight, Star } from 'lucide-react'

export default function WorkPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [filter, setFilter] = useState('All')
  const featured = projects.find((p) => p.featured)
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <PageHero
        id="work-hero"
        eyebrow="Our work"
        title="Grow your business online"
        accent="purpose driven websites"
        lede="Every project below was designed, developed, and is actively managed by Maven — built to perform as good as it looks."
      />

      {/* Featured project hero */}
      {featured && (
        <Reveal>
          <section id="featured-project" className="pt-4 pb-10 lg:pt-10 lg:pb-24 px-6" aria-label="Featured project">
            <div className="max-w-6xl mx-auto">
              <div className="relative overflow-hidden rounded-[2rem]">
                <div className="absolute inset-0">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/95 via-[#0A0A0F]/20 to-[#0A0A0F]/0" />
                  <div className="absolute inset-0 bg-[#0A0A0F]/60 md:hidden" />
                </div>
                <div className="relative p-8 md:p-14 max-w-xl text-center md:text-left">
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
                  <p className="text-maven-lighter text-base leading-relaxed mb-6">
                    The HAQ Pickle Pickleball started as a fun idea between a father and son, two avid pickleball players.
                    <br />
                    <br />
                    After &#34;dinking&#34; around a few ideas to create something unique that picklers had never seen before, an idea started coming to life.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <MagneticButton variant="primary" size="md" onClick={() => onNavigate('/contact')}>
                      Start Your Project <ArrowRight size={16} />
                    </MagneticButton>
                    <MagneticButton variant="frost" size="md" href="https://haqpickle.com" external>
                      Visit Website
                    </MagneticButton>
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
        mobileTag="Our Projects"
      />

      {/* Team — shared section, this page supplies its own spacing */}
      <MavensTeam id="work-team" className="pt-10 md:pt-32 pb-4 md:pb-16" />

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
