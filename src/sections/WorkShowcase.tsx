import { useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects, projectCategories } from '../data/projects'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Eyebrow } from '../components/text/Eyebrow'
import { gsap, useIsoLayoutEffect } from '../hooks/useGsap'
import { reducedMotion } from '../utils/motion'

/**
 * WorkShowcase, Maven's featured projects as a clean responsive grid on the
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
  mobileTag,
}: {
  onNavigate: (href: string) => void
  limit?: number
  hideHeader?: boolean
  items?: typeof projects
  showFilter?: boolean
  filter?: string
  onFilterChange?: (category: string) => void
  /** Label-only mobile eyebrow rendered inside the section header spot. */
  mobileTag?: string
}) {
  const shown = (items ?? projects).slice(0, limit)
  const gridRef = useRef<HTMLDivElement>(null)
  const prevFilter = useRef(filter)
  const [activeSlide, setActiveSlide] = useState(0)

  const total = shown.length
  const SLIDES_PER_PAGE = 1
  const pageCount = Math.max(1, Math.ceil(total / SLIDES_PER_PAGE))
  const activePage = Math.min(Math.floor(activeSlide / SLIDES_PER_PAGE), pageCount - 1)

  const scrollToSlide = (slide: number) => {
    const el = gridRef.current?.querySelectorAll<HTMLElement>('[data-filter-card]')[slide]
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const scrollToPage = (i: number) => {
    scrollToSlide(Math.min(i * SLIDES_PER_PAGE, total - 1))
  }

  const goPrev = () => scrollToPage(Math.max(activePage - 1, 0))
  const goNext = () => scrollToPage(Math.min(activePage + 1, pageCount - 1))

  const handleScroll = () => {
    const grid = gridRef.current
    if (!grid || reducedMotion) return
    const gridRect = grid.getBoundingClientRect()
    const center = gridRect.left + gridRect.width / 2
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-filter-card]'))
    if (!cards.length) return
    let nearest = 0
    let nearestDist = Infinity
    cards.forEach((card, i) => {
      const cardRect = card.getBoundingClientRect()
      const cardCenter = cardRect.left + cardRect.width / 2
      const dist = Math.abs(cardCenter - center)
      if (dist < nearestDist) {
        nearestDist = dist
        nearest = i
      }
    })
    setActiveSlide(nearest)
  }

  // Smooth re-entry when the active filter changes (skips first mount).
  useIsoLayoutEffect(() => {
    if (!showFilter || prevFilter.current === filter) return
    prevFilter.current = filter
    setActiveSlide(0)
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
    <section id="featured-work" className="section py-28 md:py-36 border-t border-line" style={{ position: 'static' }} aria-label="Featured work">
      <div className="container-maven">
        {mobileTag && (
          <div className="mb-8 md:hidden">
            <Eyebrow label={mobileTag} className="justify-center" />
          </div>
        )}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <Reveal>
              <div>
                <Eyebrow label="Featured work" className="mb-6" />
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
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory md:overflow-visible py-8 md:py-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shown.map((p, i) => (
            <div key={p.id} className="shrink-0 w-[80vw] max-w-[340px] md:w-auto md:max-w-none snap-center">
              <Card project={p} index={i} onNavigate={onNavigate} />
            </div>
          ))}
        </div>

        <div className="md:hidden mt-4 flex items-center justify-center gap-3 text-mist-dim">
          <button
            type="button"
            aria-label="Previous page"
            onClick={goPrev}
            disabled={activePage === 0}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-line bg-ink/60 transition-colors cursor-pointer hover:text-white disabled:opacity-40 disabled:cursor-default"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1">
            {[activePage - 1, activePage, activePage + 1].map((page, idx) => {
              const visible = page >= 0 && page < pageCount
              const isCenter = idx === 1
              return visible ? (
                <button
                  key={isCenter ? `center-${page}` : `side-${idx}`}
                  type="button"
                  data-active-page={isCenter}
                  aria-label={`Go to page ${page + 1} of ${pageCount}`}
                  onClick={() => scrollToPage(page)}
                  className={`h-9 w-9 flex items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                    isCenter
                      ? 'pag-pop bg-maven text-white-solid shadow-[0_4px_16px_rgba(97,44,139,0.5)]'
                      : 'hover:bg-ink-2 hover:text-white'
                  }`}
                >
                  {isCenter ? (
                    <span key={page} className="pag-rise">
                      {page + 1}
                    </span>
                  ) : (
                    page + 1
                  )}
                </button>
              ) : (
                <span key={`side-${idx}`} className="h-9 w-9" aria-hidden="true" />
              )
            })}
          </div>

          <button
            type="button"
            aria-label="Next page"
            onClick={goNext}
            disabled={activePage === pageCount - 1}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-line bg-ink/60 transition-colors cursor-pointer hover:text-white disabled:opacity-40 disabled:cursor-default"
          >
            <ChevronRight size={18} />
          </button>
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
  const name = project.name.replace(/\n/g, ' ')
  const body = (
    <>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={`${name}, ${project.category} website by Maven Marketing Group`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1.2s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <span className="absolute top-4 left-5 font-poppins font-bold text-4xl text-stroke select-none" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          aria-hidden="true"
          className="project-arrow-circle absolute bottom-4 right-4 w-10 h-10 rounded-full border border-white/20 bg-ink/40 backdrop-blur flex items-center justify-center text-white-solid group-hover:bg-maven group-hover:border-maven-light group-hover:rotate-45 transition-all duration-500"
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Meta */}
      <div className="p-5">
        <p className="card-tag mb-2">{project.category}</p>
        <h3 className="display font-semibold text-xl text-white mb-2 tracking-[0.01em]">{name}</h3>
        <p className="text-mist-dim text-base leading-relaxed line-clamp-2">{project.blurb}</p>
      </div>
    </>
  )

  // Projects with a live URL open the client's site; the rest route to /work.
  if (project.url) {
    return (
      <a
        data-filter-card
        href={project.url}
        target="_blank"
        rel="noreferrer"
        data-cursor
        aria-label={`Visit the ${name} website`}
        className="scroll-blur panel panel-hover group relative block cursor-pointer overflow-hidden rounded-2xl shadow-[0_18px_45px_-24px_rgba(97,44,139,0.4)] hover:shadow-[0_28px_70px_-30px_rgba(97,44,139,0.55)] transition-shadow duration-500"
      >
        {body}
      </a>
    )
  }

  return (
    <article
      data-filter-card
      onClick={() => onNavigate('/work')}
      className="scroll-blur panel panel-hover group relative cursor-pointer overflow-hidden rounded-2xl shadow-[0_18px_45px_-24px_rgba(97,44,139,0.4)] hover:shadow-[0_28px_70px_-30px_rgba(97,44,139,0.55)] transition-shadow duration-500"
    >
      {body}
    </article>
  )
}
