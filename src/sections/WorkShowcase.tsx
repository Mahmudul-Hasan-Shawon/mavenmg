import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects, projectCategories } from '../data/projects'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { gsap, useIsoLayoutEffect } from '../hooks/useGsap'
import { reducedMotion } from '../utils/motion'

/**
 * WorkShowcase — Maven's featured projects as a clean responsive grid on the
 * homepage. Up to `limit` projects, each card fully visible with image,
 * title and category. The full index lives on the Work page.
 */
export function WorkShowcase({
  onNavigate,
  limit,
  hideHeader,
  items,
  showFilter,
  filter,
  onFilterChange,
}: {
  onNavigate: (href: string) => void
  limit?: number
  hideHeader?: boolean
  items?: typeof projects
  showFilter?: boolean
  filter?: string
  onFilterChange?: (category: string) => void
}) {
  const shown = (items ?? projects).slice(0, limit)
  const gridRef = useRef<HTMLDivElement>(null)
  const prevFilter = useRef(filter)

  // Smooth re-entry when the active filter changes (skips first mount).
  useIsoLayoutEffect(() => {
    if (!showFilter || prevFilter.current === filter) return
    prevFilter.current = filter
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('[data-filter-card]')
    if (reducedMotion || !cards?.length) return
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        overwrite: 'auto',
        clearProps: 'all',
      }
    )
  }, [filter, showFilter])

  return (
    <section className="section py-24 md:py-32 border-t border-line" style={{ position: 'static' }} aria-label="Featured work">
      <div className="container-maven">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <Reveal>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="index-tag">05</span>
                  <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
                  <span className="mono-label !text-mist">Featured work</span>
                </div>
                <h2 className="display text-[clamp(2rem,5vw,3.8rem)]">
                  Websites built with <span className="grad-text">purpose</span>
                </h2>
              </div>
            </Reveal>
          </div>
        )}

        {showFilter && (
          <div className="sticky top-4 z-30 mb-12 hidden md:flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 p-2 rounded-full border border-line bg-ink/80 backdrop-blur-xl shadow-sm">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onFilterChange?.(cat)}
                  data-cursor
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    filter === cat
                      ? 'bg-maven text-white-solid shadow-[0_4px_20px_rgba(97,44,139,0.5)]'
                      : 'text-mist-dim hover:text-mist hover:bg-ink-2'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          ref={gridRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.06} className="shrink-0 w-[80vw] max-w-[340px] md:w-auto md:max-w-none snap-center">
              <Card project={p} index={i} onNavigate={onNavigate} />
            </Reveal>
          ))}
        </div>

        {onNavigate && !hideHeader && (
          <Reveal>
            <div className="mt-12 flex justify-center">
              <MagneticButton variant="primary" onClick={() => onNavigate('/work')}>
                View all projects <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Card({
  project,
  index,
  onNavigate,
}: {
  project: (typeof projects)[number]
  index: number
  onNavigate: (href: string) => void
}) {
  return (
    <article
      data-cursor-label="View"
      data-filter-card
      onClick={() => onNavigate('/work')}
      className="panel panel-hover group relative cursor-pointer overflow-hidden rounded-2xl hover:shadow-[0_28px_70px_-30px_rgba(97,44,139,0.55)] transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} — ${project.category} website by Maven Marketing Group`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1.2s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <span className="absolute top-4 left-5 font-sora font-bold text-4xl text-stroke select-none" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full border border-white/20 bg-ink/40 backdrop-blur flex items-center justify-center text-white-solid group-hover:bg-maven group-hover:border-maven-light group-hover:rotate-45 transition-all duration-500"
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Meta */}
      <div className="p-5">
        <p className="mono-label mb-2">{project.category}</p>
        <h3 className="display text-xl text-maven-light mb-2">{project.name}</h3>
        <p className="text-mist-dim text-md leading-relaxed line-clamp-2">{project.blurb}</p>
      </div>

      {/* Accent edge in the project's colour */}
      {/* <span aria-hidden="true" className="absolute top-0 left-0 h-[2px] w-full opacity-60" style={{ background: project.color }} /> */}
    </article>
  )
}
