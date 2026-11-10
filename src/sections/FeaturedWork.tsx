import { useEffect, useMemo, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '../data/projects'
import { Eyebrow } from '../components/text/Eyebrow'
import { MagneticButton } from '../components/ui/MagneticButton'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { reducedMotion } from '../utils/motion'
import { dominantImageColor } from '../utils/imageColor'

/**
 * FeaturedWork, the home page's project showcase as an editorial
 * "index + stage" piece.
 *
 * Left: the project index, oversized numbered rows in display type. Right:
 * a large glass-framed stage that live-crossfades the active project with a
 * slow Ken Burns drift and an ambient glow tinted by that project's own
 * brand color. The stage autoplays; hovering or focusing anything in the
 * piece pauses it, and the hairline progress bar along the stage's bottom
 * edge tracks the beat. The active row's accent bar, index numeral and
 * visit link all pick up the project color, so switching rows visibly
 * re-themes the section.
 *
 * Reduced motion: no autoplay, no drift, static crossfades.
 */
const AUTOPLAY_MS = 5200

export function FeaturedWork({ onNavigate }: { onNavigate: (href: string) => void }) {
  const shown = useMemo(() => projects.slice(0, 6), [])
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [imageColors, setImageColors] = useState<Record<number, string>>({})
  const rootRef = useRef<HTMLElement>(null)

  const current = shown[active]

  // Sample each project image once; the accent lives off the image's own
  // dominant color, falling back to the project's brand color until the
  // sample lands (or forever, if the image yields nothing usable).
  useEffect(() => {
    let alive = true
    shown.forEach((p) => {
      dominantImageColor(p.image).then((hex) => {
        if (alive && hex) setImageColors((c) => (c[p.id] === hex ? c : { ...c, [p.id]: hex }))
      })
    })
    return () => {
      alive = false
    }
  }, [shown])

  const accentOf = (p: (typeof shown)[number]) => imageColors[p.id] ?? p.color
  const accent = accentOf(current)

  const select = (i: number) => setActive(((i % shown.length) + shown.length) % shown.length)

  // Autoplay: the timer resets on every selection, so manual picks get a
  // full beat before the next advance. Hover/focus anywhere in the piece
  // pauses the show.
  useEffect(() => {
    if (reducedMotion || paused) return
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % shown.length),
      AUTOPLAY_MS
    )
    return () => window.clearTimeout(t)
  }, [active, paused, shown.length])

  // Entrance: rows stagger in from the left, the stage rises last.
  useGsapContext(rootRef, () => {
    gsap.fromTo(
      '.fw-row',
      { opacity: 0, x: -28 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%', once: true },
      }
    )
    gsap.fromTo(
      '.fw-stage',
      { opacity: 0, y: 36, scale: 0.975 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.15,
        delay: 0.18,
        ease: 'expo.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 78%', once: true },
      }
    )
  })

  const onStageKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      select(active - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      select(active + 1)
    }
  }

  const pauseOnFocusOut = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false)
  }

  return (
    <section
      ref={rootRef}
      id="featured-work"
      className="section relative py-28 md:py-36 border-t border-line overflow-clip"
      style={{ backgroundColor: 'var(--hero-base)' }}
      aria-label="Featured work"
    >
      {/* Ambient washes; the right one takes the active project's color */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[6%] w-[420px] h-[420px] rounded-full bg-maven/10 blur-[140px]" />
        <div
          className="absolute bottom-0 right-[10%] w-[480px] h-[480px] rounded-full blur-[150px] opacity-20 transition-colors duration-700"
          style={{ backgroundColor: accent }}
        />
      </div>

      <div className="container-maven relative">
        {/* Header + show controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <Eyebrow label="Featured work" className="mb-6" />
            <h2 className="display text-[clamp(2rem,5vw,3.8rem)]">
              Growth You Can <span className="grad-text">Point To</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="index-tag" aria-live="polite">
              <span className="!text-white">{String(active + 1).padStart(2, '0')}</span>
              <span className="text-mist-dim"> / {String(shown.length).padStart(2, '0')}</span>
            </p>
            <button
              type="button"
              data-cursor
              aria-label="Previous project"
              onClick={() => select(active - 1)}
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-mist-dim transition-colors duration-300 hover:text-white hover:border-line-hover cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              data-cursor
              aria-label="Next project"
              onClick={() => select(active + 1)}
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-mist-dim transition-colors duration-300 hover:text-white hover:border-line-hover cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Index + stage. Hover/focus anywhere here holds the autoplay. */}
        <div
          className="grid lg:grid-cols-[5fr_7fr] gap-8 lg:gap-14 items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={pauseOnFocusOut}
        >
          {/* Project index */}
          <ol className="order-2 lg:order-1 flex flex-col justify-center" aria-label="Projects">
            {shown.map((p, i) => {
              const name = p.name.replace(/\n/g, ' ')
              const isActive = i === active
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    data-cursor
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className={`fw-row group relative w-full text-left flex items-baseline gap-4 md:gap-5 py-4 md:py-5 pl-5 border-b border-line cursor-pointer transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-mist-dim hover:text-mist'
                    }`}
                  >
                    {/* Active accent bar, tinted with the project color */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-[calc(100%-20px)] w-[3px] rounded-full transition-all duration-500 ${
                        isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-50'
                      }`}
                      style={{ backgroundColor: accentOf(p) }}
                    />
                    <span
                      className="index-tag shrink-0 transition-colors duration-300"
                      style={isActive ? { color: accentOf(p) } : undefined}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="display font-semibold text-xl md:text-2xl lg:text-[1.65rem] tracking-[0.01em] flex-1 min-w-0">
                      {name}
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className={`shrink-0 self-center transition-all duration-500 ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1.5'
                      }`}
                      style={isActive ? { color: accentOf(p) } : undefined}
                    />
                  </button>
                </li>
              )
            })}
          </ol>

          {/* Stage */}
          <div className="order-1 lg:order-2">
            <figure
              className="fw-stage relative m-0 h-full rounded-3xl overflow-hidden panel border border-line transition-[box-shadow] duration-700"
              style={{ boxShadow: `0 44px 130px -48px ${accent}66` }}
            >
              <div
                role="group"
                aria-roledescription="slide"
                aria-label={`Project ${active + 1} of ${shown.length}`}
                tabIndex={0}
                onKeyDown={onStageKey}
                className="relative h-[64vw] max-h-[440px] min-h-[300px] sm:h-[56vw] lg:h-full lg:max-h-none lg:min-h-[440px] outline-none focus-visible:ring-2 focus-visible:ring-maven-light/70 rounded-3xl"
              >
                {/* Live crossfade stack */}
                {shown.map((p, i) => {
                  const name = p.name.replace(/\n/g, ' ')
                  return (
                    <img
                      key={p.id}
                      src={p.image}
                      alt={`${name}, ${p.category} website by Maven Marketing Group`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        i === active && !reducedMotion ? 'fw-live' : ''
                      } ${i === active ? 'opacity-100' : 'opacity-0'}`}
                    />
                  )
                })}

                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

                {/* Giant index numeral */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-5 md:top-5 md:right-7 font-poppins font-bold text-[clamp(3rem,7vw,5.5rem)] leading-none text-stroke select-none"
                >
                  {String(active + 1).padStart(2, '0')}
                </span>

                {/* Caption */}
                <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8 pb-7 md:pb-9 flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-[52ch] min-w-0">
                    <p className="mono-label mb-2" style={{ color: accent }}>
                      {current.category}
                    </p>
                    <p className="display font-semibold text-lg md:text-2xl text-white mb-2 tracking-[0.01em]">
                      {current.name.replace(/\n/g, ' ')}
                    </p>
                    <p className="text-mist text-sm md:text-base leading-relaxed line-clamp-2">{current.blurb}</p>
                  </div>

                  {current.url ? (
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor
                      aria-label={`Visit the ${current.name.replace(/\n/g, ' ')} website`}
                      className="shrink-0 flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold text-white backdrop-blur bg-ink/40 transition-colors duration-300 hover:bg-ink/70"
                      style={{ borderColor: `${accent}88` }}
                    >
                      Visit site
                      <ArrowUpRight size={15} style={{ color: accent }} />
                    </a>
                  ) : (
                    <button
                      type="button"
                      data-cursor
                      aria-label={`View the ${current.name.replace(/\n/g, ' ')} project`}
                      onClick={() => onNavigate('/work')}
                      className="shrink-0 flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold text-white backdrop-blur bg-ink/40 transition-colors duration-300 hover:bg-ink/70"
                      style={{ borderColor: `${accent}88` }}
                    >
                      View project
                      <ArrowUpRight size={15} style={{ color: accent }} />
                    </button>
                  )}
                </figcaption>

                {/* Autoplay progress hairline */}
                {!reducedMotion && (
                  <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[3px] bg-white/5">
                    <span
                      key={active}
                      className="block h-full origin-left scale-x-0"
                      style={{
                        backgroundColor: accent,
                        animation: `fw-progress ${AUTOPLAY_MS}ms linear forwards`,
                        animationPlayState: paused ? 'paused' : undefined,
                      }}
                    />
                  </div>
                )}
              </div>
            </figure>
          </div>
        </div>

        <div className="mt-10 md:mt-14 flex justify-center">
          <MagneticButton variant="primary" onClick={() => onNavigate('/work')}>
            View all projects <ArrowUpRight size={16} />
          </MagneticButton>
        </div>

        {/* Live announcement for screen readers when the show advances */}
        <p className="sr-only" aria-live="polite">
          {`Project ${active + 1} of ${shown.length}: ${current.name.replace(/\n/g, ' ')}`}
        </p>
      </div>
    </section>
  )
}
