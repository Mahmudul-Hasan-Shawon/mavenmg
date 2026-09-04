import { useState } from 'react'
import { projects } from '../data/projects'
import { PageHero } from '../sections/PageHero'
import { FinalCTA } from '../sections/FinalCTA'
import { Reveal } from '../components/ui/Reveal'
import { WorkShowcase } from '../sections/WorkShowcase'
import { ArrowRight, Star } from 'lucide-react'

export default function WorkPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [filter, setFilter] = useState('All')
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

      <section className="section py-32 relative overflow-hidden">
        <div className="container-maven">
          <div className="text-start mb-16" style={{ opacity: 1, transform: "none" }}>
            <div className="flex items-center gap-4 mb-6">
              <span className="index-tag">06</span>
              <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              <span className="mono-label !text-mist">The Marketing Mavens</span>
            </div>
            <h2 className="font-black mb-4 leading-[1.05] text-[clamp(2rem,8vw,3.4rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)]">
              <span className="text-white">The Experts Behind</span>{" "}
              <span className="block text-[#612C8B]">Your Success</span>
            </h2>
            <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
              At Maven, we bring together the finest minds in digital strategy and web design
              — our team known as the Marketing Mavens. These elite online marketers and web
              masters are your gateway to transcending the ordinary and achieving the
              extraordinary in the digital realm.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-14">
            <div className="relative" style={{ opacity: 1, transform: "none" }}>
              <div className="absolute -inset-3 bg-gradient-to-r from-[#612C8B]/30 to-[#8B4FBF]/30 blur-2xl" />
              <img
                alt="The Maven Marketing team collaborating in the studio"
                className="relative rounded-3xl w-full h-full min-h-[420px] object-cover border border-white/10"
                loading="lazy"
                src="/images/team.jpg"
              />
            </div>

            <div className="space-y-5">
              <div className="glass rounded-3xl p-8 hover:border-[#612C8B]/30 transition-all duration-500" style={{ opacity: 1, transform: "none" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#612C8B]/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code text-[#8B4FBF]" aria-hidden="true">
                      <path d="m16 18 6-6-6-6"></path>
                      <path d="m8 6-6 6 6 6"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-black">Our Web Masters</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base">
                  Commanding the latest in technology and design trends, our web masters
                  don't just build websites; they craft powerhouse platforms that are optimized
                  for SEO and designed to convert visitors into customers, setting the stage for
                  sustainable business growth.
                </p>
              </div>

              <div className="glass rounded-3xl p-8 hover:border-[#612C8B]/30 transition-all duration-500" style={{ opacity: 1, transform: "none" }}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#8B4FBF]/20 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone text-[#8B4FBF]" aria-hidden="true">
                      <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
                      <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"></path>
                      <path d="M8 6v8"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-black">Our Online Marketers</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-base">
                  With precision, our online marketers devise and execute bespoke digital
                  marketing campaigns. Utilizing a mix of SEO, content marketing, and targeted
                  social media strategies, they ensure that your brand doesn't just participate
                  but dominates in your industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
