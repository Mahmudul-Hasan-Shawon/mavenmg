import { AnimatedText } from '../components/text/AnimatedText'
import { Reveal } from '../components/ui/Reveal'

interface PageHeroProps {
  index: string
  eyebrow: string
  title: string
  accent?: string
  lede?: string
}

/** Compact editorial hero for secondary pages. */
export function PageHero({ index, eyebrow, title, accent, lede }: PageHeroProps) {
  return (
    <section className="section pt-40 pb-16 md:pt-52 md:pb-20 relative overflow-hidden" aria-label={`${eyebrow} introduction`}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-[8%] w-[560px] h-[420px] rounded-full bg-maven/12 blur-[140px]" />
      </div>
      <div className="container-maven relative">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="index-tag">{index}</span>
            <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
            <span className="mono-label !text-mist">{eyebrow}</span>
          </div>
        </Reveal>
        <h1 className="display text-[clamp(2.4rem,6.6vw,5.4rem)] text-white max-w-5xl">
          <AnimatedText trigger="load" mode="words" stagger={0.07} duration={1}>
            {title}
          </AnimatedText>
          {accent && (
            <span className="block mt-1">
              <AnimatedText trigger="load" mode="words" stagger={0.07} delay={0.25} duration={1} blur gradient>
                {accent}
              </AnimatedText>
            </span>
          )}
        </h1>
        {lede && (
          <Reveal delay={0.25}>
            <p className="mt-7 text-mist text-base md:text-lg leading-relaxed max-w-2xl">{lede}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
