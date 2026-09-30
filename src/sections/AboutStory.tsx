import { Check } from 'lucide-react'
import { aboutServices } from '../data/content'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/text/Eyebrow'
import { trackSpotlight } from '../utils/motion'

/**
 * AboutStory, the live site's "What We Do" block: four offering cards, each
 * with a one-line description and its sub-services. Mirrors
 * mavenmarketinggroup.com/about.
 */
export function AboutStory() {
  return (
    <section
      id="about-services"
      className="section py-24 md:py-32 bg-[var(--hero-base)] border-t border-line relative overflow-clip"
      aria-label="What we do"
    >
      <div className="container-maven relative">
        <Reveal>
          <Eyebrow label="What we do" className="mb-8" />
        </Reveal>

        <Reveal>
          <h2 className="display text-[clamp(1.8rem,4.2vw,3.6rem)] text-white max-w-2xl mb-12 md:mb-16">
            Everything your website needs,{' '}
            <span className="grad-text">under one roof</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {aboutServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div
                className="scroll-blur spotlight glow-tl h-full flex flex-col rounded-2xl border border-line bg-void p-7 md:p-8 shadow-[0_24px_60px_-24px_rgba(97,44,139,0.45)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-28px_rgba(97,44,139,0.55)]"
                onPointerMove={trackSpotlight}
              >
                <h3 className="display font-semibold tracking-[0.98px] text-xl text-white mb-3">{s.title}</h3>
                <p className="text-mist text-[15px] leading-relaxed mb-7">{s.description}</p>
                <ul className="space-y-2.5 mt-auto">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-mist">
                      <span className="w-[18px] h-[18px] rounded-full bg-maven/25 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-maven-lighter" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
