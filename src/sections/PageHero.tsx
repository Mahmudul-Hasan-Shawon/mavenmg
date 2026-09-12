import { lazy, type CSSProperties, type ReactNode } from 'react'
import { AnimatedText } from '../components/text/AnimatedText'
import { Eyebrow } from '../components/text/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { LazyCanvas } from '../three/LazyCanvas'
import { cn } from '../utils/cn'
import { reducedMotion } from '../utils/motion'

const AboutLogo = reducedMotion ? null : lazy(() => import('../three/AboutLogo'))

/** Renders a lede string, wrapping any listed words in solid maven-light. */
function LedeHighlight({ text, highlight }: { text?: string; highlight: string[] }) {
  const set = new Set(highlight.map((w) => w.toLowerCase()))
  return (
    <>
      {(text ?? '').split(/(\s+)/).map((piece, i) =>
        /^\s+$/.test(piece) ? (
          <span key={i}> </span>
        ) : set.has(piece.toLowerCase()) ? (
          <span key={i} className="text-maven-light">{piece}</span>
        ) : (
          <span key={i}>{piece}</span>
        )
      )}
    </>
  )
}

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
  /** Words (case-insensitive) in the lede to render in solid maven-light. */
  ledeHighlight?: string[]
  /** Drop the max-width cap on the lede paragraph so it spans the hero width. */
  ledeWide?: boolean
  /** Render the lede as separate lines (one node per sentence). */
  ledeLines?: ReactNode[]
  /** Inline styles applied to the hero section (e.g. custom background). */
  style?: CSSProperties
}

/** Compact editorial hero for secondary pages. */
export function PageHero({ id, eyebrow, title, accent, lede, image, imageAlt, logo3d, accentHighlight, accentWhite, titleHighlight, ledeHighlight, ledeWide, ledeLines, style }: PageHeroProps) {
  const imageBg = Boolean(image && !logo3d)

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
              : ledeHighlight?.length
                ? <LedeHighlight text={lede} highlight={ledeHighlight} />
                : lede}
          </p>
        </Reveal>
      )}
    </>
  )

  return (
    <section
      id={id}
      style={style}
      className={cn(
        'section relative overflow-hidden',
        imageBg ? 'isolate pt-24 pb-10 md:pt-44 md:pb-20' : 'pt-24 pb-8 md:pt-52 md:pb-20'
      )}
      aria-label={`${eyebrow} introduction`}
    >
      {imageBg && image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover blur-[4px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/60 to-void/25"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[8%] -z-10 w-[560px] h-[420px] rounded-full bg-maven/15 blur-[140px]"
          />
        </>
      )}

      <div className="container-maven relative">
        {image ? (
          imageBg ? (
            <div className="flex min-h-0 flex-col justify-start md:min-h-[48vh]">
              <div className="max-w-4xl pb-2 md:pb-4">{copy}</div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center lg:items-stretch">
              <div className="lg:flex lg:flex-col lg:justify-center">{copy}</div>
              <div className="relative order-first lg:order-last w-full">
                {logo3d ? (
                  <div className="relative flex flex-col items-center justify-center gap-6 lg:h-full lg:justify-end">
                    <div className="relative flex justify-center lg:justify-end w-full">
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
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full min-h-[320px] sm:min-h-[420px] lg:h-full overflow-hidden rounded-3xl border border-line shadow-[0_30px_70px_-30px_rgba(97,44,139,0.45)]">
                    <img
                      src={image}
                      alt={imageAlt || ''}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          copy
        )}
      </div>
    </section>
  )
}
