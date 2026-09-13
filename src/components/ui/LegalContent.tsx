import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { site } from '../../data/site'
import type { LegalPage } from '../../data/legal'
import { getLenis } from '../../utils/lenis'
import { Reveal } from './Reveal'
import { cn } from '../../utils/cn'

const slugify = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const sectionOffset = 96

interface LegalContentProps {
  page: LegalPage
}

/** Clean legal-document layout: sticky in-document nav + numbered sections. */
export function LegalContent({ page }: LegalContentProps) {
  const uid = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const root = listRef.current
    if (!root) return
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-legal-section]'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index))
          }
        }
      },
      { rootMargin: '-20% 0px -65% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [page.sections.length])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const activeItem = container.querySelector<HTMLElement>(`li:nth-child(${active + 1})`)
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [active])

  const goTo = (index: number) => {
    const target = document.getElementById(`${uid}-${slugify(page.sections[index].heading)}`)
    if (!target) return
    const scroll = () => {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(target, { offset: -sectionOffset })
      else target.scrollIntoView({ behavior: 'smooth' })
    }
    if (tocOpen) {
      setTocOpen(false)
      setTimeout(scroll, 350)
    } else {
      scroll()
    }
  }

  const onTocClick = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault()
    goTo(index)
  }

  const activeHeading = page.sections[active]?.heading ?? ''

  const canScrollContainer = (el: HTMLElement, delta: number) => {
    if (delta < 0) return el.scrollTop > 0
    return el.scrollTop < el.scrollHeight - el.clientHeight
  }

  const onTocWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    if (canScrollContainer(el, e.deltaY)) e.stopPropagation()
  }

  return (
    <section id={`${uid}-index`} className="section pt-2 pb-24 md:pb-32" aria-label="Policy content">
      <div className="container-maven">
        <div className="grid lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr] gap-8 lg:gap-16 xl:gap-24">
          {/* In-document navigation desktop */}
          <aside className="hidden lg:block" aria-label="On this page">
            <div className="sticky top-28">
              <p className="mono-label mb-6">In this document</p>
              <nav>
                <ul className="space-y-1 border-l border-line">
                  {page.sections.map((s, i) => (
                    <li key={s.heading}>
                      <a
                        href={`#${uid}-${slugify(s.heading)}`}
                        onClick={(e) => onTocClick(e, i)}
                        data-cursor
                        className={cn(
                          'block -ml-px border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-all duration-300',
                          active === i
                            ? 'border-maven-light text-white'
                            : 'border-transparent text-mist-dim hover:text-mist hover:border-line'
                        )}
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Document body */}
          <div ref={listRef} className="min-w-0">
{/* In-document navigation mobile collapsible (matching the blog article TOC) */}
            <div className="lg:hidden sticky top-0 z-30 -mx-6 border-b border-line bg-void p-4 mb-8 md:-mx-12 md:mb-10">
              <button
                type="button"
                onClick={() => setTocOpen((v) => !v)}
                aria-expanded={tocOpen}
                data-cursor
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="min-w-0">
                  <span className="block font-semibold text-white">Table of Contents</span>
                  <span className="mt-0.5 block truncate text-xs font-medium text-maven-light">
                    {activeHeading || 'Jump to a section'}
                  </span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={cn('shrink-0 text-mist transition-transform duration-300', tocOpen && 'rotate-180')}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-300 ease-out',
                  tocOpen ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <nav aria-label="Table of contents">
                    <div
                      ref={scrollRef}
                      onWheel={onTocWheel}
                      className="max-h-[50vh] overflow-y-auto overscroll-contain pr-1"
                    >
                      <ul className="space-y-1">
                        {page.sections.map((s, i) => (
                          <li key={s.heading}>
                            <a
                              href={`#${uid}-${slugify(s.heading)}`}
                              onClick={(e) => onTocClick(e, i)}
                              data-cursor
                              className={cn(
                                'flex items-baseline gap-2.5 rounded-lg px-2 py-2 text-[13px] leading-snug transition-colors duration-300',
                                active === i ? 'bg-maven/10 text-white' : 'text-mist-dim hover:text-mist'
                              )}
                            >
                              <span
                                className={cn(
                                  'shrink-0 text-[10px] font-medium tabular-nums',
                                  active === i ? 'text-maven-light' : 'text-maven/50'
                                )}
                              >
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              {s.heading}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            {page.sections.map((s, i) => (
              <Reveal key={s.heading} delay={Math.min(i * 0.03, 0.15)}>
                <section
                  id={`${uid}-${slugify(s.heading)}`}
                  data-legal-section
                  data-index={i}
                  className="border-b border-line py-9 md:py-12 scroll-mt-28"
                  aria-label={`${page.eyebrow}: ${s.heading}`}
                >
                  <div className="flex items-baseline gap-3 md:gap-4">
                    <h2 className="display font-semibold text-lg md:text-xl tracking-[0.02em] text-white break-words min-w-0">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="mt-4 md:mt-5 space-y-4">
                    {s.content.map((p, j) => (
                      <p key={j} className="text-mist text-[15px] leading-[1.85] max-w-[68ch]">
                        {typeof p === 'string' ? (
                          p
                        ) : (
                          <>
                            {p.lead && <strong className="font-semibold text-white">{p.lead}</strong>}
                            {p.text}
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <p className="pt-8 text-xs text-mist-dim">
                {site.name} · {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}