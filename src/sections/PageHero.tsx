import { lazy, type ReactNode } from 'react'
import { AnimatedText } from '../components/text/AnimatedText'
import { Eyebrow } from '../components/text/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { LazyCanvas } from '../three/LazyCanvas'
import { reducedMotion } from '../utils/motion'

const AboutLogo = reducedMotion ? null : lazy(() => import('../three/AboutLogo'))

interface PageHeroProps {
  /** Unique per-page section id, e.g. "about-hero". */
  id: string
  eyebrow: string
  title: string
  accent?: string
  lede?: string
  /** Optional brand visual — shown right of the copy on desktop. */
  image?: string
  imageAlt?: string
  /** Render the image as an interactive Three.js hologram scene. */
  logo3d?: boolean
  /** Words (case-insensitive) in the accent line to render in solid maven-light. */
  accentHighlight?: string[]
  /** Words in the accent line to render in solid white. */
  accentWhite?: string[]
  /** Words (case-insensitive) in the title to render in solid maven-light. */
  titleHighlight?: string[]
  /** Drop the max-width cap on the lede paragraph so it spans the hero width. */
  ledeWide?: boolean
  /** Render the lede as separate lines (one node per sentence). */
  ledeLines?: ReactNode[]
}

/** Compact editorial hero for secondary pages. */
export function PageHero({ id, eyebrow, title, accent, lede, image, imageAlt, logo3d, accentHighlight, accentWhite, titleHighlight, ledeWide, ledeLines }: PageHeroProps) {
  const copy = (
    <>
      <Reveal>
        <Eyebrow label={eyebrow} className="mb-8 hidden lg:flex" />
      </Reveal>
      <h1 className="display text-[clamp(2.4rem,6.6vw,5.4rem)] text-white max-w-5xl">
        <AnimatedText trigger="load" mode="words" stagger={0.07} duration={1} highlight={titleHighlight}>
          {title}
        </AnimatedText>
        {accent && (
          <span className="block mt-1">
            <AnimatedText
              trigger="load"
              mode="words"
              stagger={0.07}
              delay={0.25}
              duration={1}
              blur
              gradient={!accentHighlight && !accentWhite}
              highlight={accentHighlight}
              highlightWhite={accentWhite}
            >
              {accent}
            </AnimatedText>
          </span>
        )}
      </h1>
      {(lede || ledeLines) && (
        <Reveal delay={0.25}>
          <p className={`mt-7 text-mist text-base md:text-lg leading-relaxed ${ledeWide ? 'max-w-none' : 'max-w-2xl'}`}>
            {ledeLines
              ? ledeLines.map((line, i) => (
                  <span key={i} className="block mt-2 first:mt-0 md:mt-2.5">
                    {line}
                  </span>
                ))
              : lede}
          </p>
        </Reveal>
      )}
    </>
  )

  return (
    <section id={id} className="section pt-24 pb-8 md:pt-52 md:pb-20 relative overflow-hidden" aria-label={`${eyebrow} introduction`}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-[8%] w-[560px] h-[420px] rounded-full bg-maven/12 blur-[140px]" />
      </div>
      <div className="container-maven relative">
        {image ? (
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center">
            <div>{copy}</div>
            <div className="relative flex flex-col items-center justify-center gap-6 order-first lg:order-last lg:justify-end">
              <div className="relative flex justify-center lg:justify-end w-full">
                {logo3d ? (
                <div className="relative w-64 sm:w-80 lg:w-full lg:max-w-md aspect-square">
                  <LazyCanvas
                    Scene={AboutLogo}
                    className="absolute inset-0"
                    sceneProps={{ src: image }}
                    fallback={
                      <img
                        src={image}
                        alt={imageAlt || ''}
                        className="absolute inset-0 w-full h-full object-contain animate-float-slow"
                      />
                    }
                  />
                </div>
              ) : (
                <img
                  src={image}
                  alt={imageAlt || ''}
                  className="relative w-48 sm:w-60 lg:w-full lg:max-w-md object-contain animate-float-slow"
                />
              )}
              </div>
            </div>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  )
}
