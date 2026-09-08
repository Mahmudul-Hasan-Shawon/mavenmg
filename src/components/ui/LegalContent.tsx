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

  const goTo = (index: number) => {
    const target = document.getElementById(`${uid}-${slugify(page.sections[index].heading)}`)
    setTocOpen(false)
    if (!target) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(target, { offset: -sectionOffset })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  const onTocClick = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault()
    goTo(index)
  }

  return (
    <section id={`${uid}-index`} className="section pt-2 pb-24 md:pb-32" aria-label="Policy content">
      <div className="container-maven">
        <div className="grid lg:grid-cols-[200px_1fr] xl:grid-cols-[220px_1fr] gap-8 lg:gap-16 xl:gap-24">
          {/* In-document navigation — desktop */}
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
            {/* In-document navigation — mobile collapsible */}
            <div className="lg:hidden mb-7">
              <button
                type="button"
                onClick={() => setTocOpen((v) => !v)}
                aria-expanded={tocOpen}
                data-cursor
                className="w-full flex items-center justify-between gap-3 rounded-2xl border border-line bg-ink/60 px-4 py-3.5 text-left transition-colors duration-300 hover:border-maven-light/40"
              >
                <span className="mono-label">In this document</span>
                <span className="flex items-center gap-3">
                  <span className="text-xs text-mist-dim tabular-nums">{page.sections.length}</span>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={cn('text-mist transition-transform duration-300', tocOpen && 'rotate-180')}
                  />
                </span>
              </button>
              {tocOpen && (
                <nav aria-label="On this page" className="mt-2 rounded-2xl border border-line bg-ink/60 overflow-hidden">
                  <ol>
                    {page.sections.map((s, i) => (
                      <li key={s.heading} className="border-b border-line last:border-b-0">
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          data-cursor
                          className={cn(
                            'w-full flex items-baseline gap-3 px-4 py-3 text-left text-sm transition-colors duration-200',
                            active === i ? 'text-white bg-ink-2' : 'text-mist-dim hover:text-mist'
                          )}
                        >
                    <span className="leading-snug">{s.heading}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
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