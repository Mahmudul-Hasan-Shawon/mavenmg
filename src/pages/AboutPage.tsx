import { values } from '../data/content'
import { PageHero } from '../sections/PageHero'
import { Story } from '../sections/Story'
import { Mavens } from '../sections/Mavens'
import { FinalCTA } from '../sections/FinalCTA'
import { Reveal } from '../components/ui/Reveal'

const valueIcons: Record<string, JSX.Element> = {
  Innovation: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8B4FBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z" />
    </svg>
  ),
  Results: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8B4FBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Partnership: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8B4FBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Excellence: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#8B4FBF" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
}

export default function AboutPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="About Maven"
        title="Who is"
        accent="Maven Marketing Group?"
        lede="A Chicago-based web design and digital marketing agency — founded in 2019 on the core principle of bringing small businesses into the digital age."
      />

      <Story onNavigate={onNavigate} />

      {/* Values */}
      <section className="section py-24 md:py-32 border-t border-line" aria-label="Our values">
        <div className="container-maven">
          <Reveal>
            <div className="flex items-center gap-4 mb-14">
              <span className="index-tag">09</span>
              <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              <span className="mono-label !text-mist">Our values</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="group rounded-2xl border border-line bg-white/[0.02] p-8 h-full hover:border-maven-light/40 transition-colors duration-300 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#612C8B]/25 to-[#8B4FBF]/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    {valueIcons[v.title]}
                  </div>
                  <h3 className="display text-lg md:text-xl text-white mb-2">{v.title}</h3>
                  <p className="text-mist-dim text-sm leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Mavens />

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
