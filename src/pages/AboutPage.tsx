import { values } from '../data/content'
import { PageHero } from '../sections/PageHero'
import { Story } from '../sections/Story'
import { Mavens } from '../sections/Mavens'
import { FinalCTA } from '../sections/FinalCTA'
import { Reveal } from '../components/ui/Reveal'

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

      {/* Values — editorial four-across, no cards */}
      <section className="section py-24 md:py-32 border-t border-line" aria-label="Our values">
        <div className="container-maven">
          <Reveal>
            <div className="flex items-center gap-4 mb-14">
              <span className="index-tag">09</span>
              <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              <span className="mono-label !text-mist">Our values</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="border-t border-maven-light/30 pt-6">
                  <p className="index-tag mb-3">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="display text-xl md:text-2xl text-white mb-3">{v.title}</h3>
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
