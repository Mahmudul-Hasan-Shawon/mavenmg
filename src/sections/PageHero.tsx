import { lazy } from 'react'
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
}

/** Compact editorial hero for secondary pages. */
export function PageHero({ id, eyebrow, title, accent, lede, image, imageAlt, logo3d }: PageHeroProps) {
  const copy = (
    <>
      <Reveal>
        <Eyebrow label={eyebrow} className="mb-8" />
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
    </>
  )

  return (
    <section id={id} className="section pt-40 pb-8 md:pt-52 md:pb-20 relative overflow-hidden" aria-label={`${eyebrow} introduction`}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-[8%] w-[560px] h-[420px] rounded-full bg-maven/12 blur-[140px]" />
      </div>
      <div className="container-maven relative">
        {image ? (
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center">
            <div>{copy}</div>
            <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-maven/25 blur-[100px]"
              />
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
                        className="absolute inset-0 w-full h-full object-contain animate-float-slow drop-shadow-[0_0_48px_rgba(139,79,191,0.45)]"
                      />
                    }
                  />
                </div>
              ) : (
                <img
                  src={image}
                  alt={imageAlt || ''}
                  className="relative w-48 sm:w-60 lg:w-full lg:max-w-md object-contain animate-float-slow drop-shadow-[0_0_48px_rgba(139,79,191,0.45)]"
                />
              )}
            </div>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  )
}
