import { useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { blogPosts } from '../data/blog'
import { PageHero } from '../sections/PageHero'
import { FinalCTA } from '../sections/FinalCTA'
import { Reveal } from '../components/ui/Reveal'

const POSTS_PER_PAGE = 12

/** Format a YYYY-MM-DD string into a human-friendly display date. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

/** Group a post slice into year buckets (newest year first). */
function groupByYear(posts: typeof blogPosts) {
  const map = new Map<string, typeof blogPosts>()
  for (const post of posts) {
    const year = post.date.slice(0, 4)
    const list = map.get(year) ?? []
    list.push(post)
    map.set(year, list)
  }
  return Array.from(map.entries())
}

/** Page numbers to render, keeping first/last and a window around the current one. */
function pageList(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set<number>([1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const out: (number | '…')[] = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) out.push('…')
    out.push(p)
    prev = p
  }
  return out
}

export default function BlogPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const pageCount = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
  const [page, setPage] = useState(1)

  const posts = blogPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  const yearGroups = groupByYear(posts)

  const goTo = (next: number) => {
    if (next < 1 || next > pageCount || next === page) return
    setPage(next)
  }

  return (
    <>
      <PageHero
        id="blog-hero"
        eyebrow="Blog"
        title="Insights, guides, and updates"
        accent="from the Maven team"
        ledeLines={[
          'Discover the leading digital marketing blog online! Explore how our proficiency in web design, web development, SEO, and online marketing can drive your business\u2019s growth.',
          'Maven Marketing Group, headquartered in Chicago, serves clients worldwide, offering top-tier comprehensive digital marketing solutions.',
          'Our services include web design, web development, web management, SEO, and PPC services, catering to businesses and enterprises.',
          'Want to build or redesign your website with one of the best companies for web development & web design?',
          'We have the skills required to turn your dream into reality \u2013 let\u2019s chat!',
          <>
            Contact{' '}
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="link-line text-maven-lighter cursor-pointer"
            >
              Maven Marketing Group
            </button>{' '}
            today!
          </>,
        ]}
        ledeWide
      />

      <section id="blog-list" className="section pt-8 md:pt-12 pb-16 md:pb-20 scroll-mt-24" aria-label="Blog articles">
        <div className="container-maven">
          {yearGroups.map(([year, groupPosts], gi) => (
            <Reveal key={year} delay={gi * 0.05}>
              <div className="scroll-mt-28 mb-10 md:mb-14">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-16 h-10 shrink-0 grid place-items-center rounded-lg border border-maven-light/40 bg-maven/15 text-lg font-semibold text-maven-lighter font-mono">
                    {year}
                  </span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {groupPosts.map((post) => (
                    <a
                      key={post.href}
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="panel panel-hover group relative flex flex-col justify-between gap-6 rounded-2xl p-6 md:p-7 overflow-hidden transition-shadow duration-500 hover:shadow-[0_28px_70px_-30px_rgba(97,44,139,0.55)]"
                    >
                      <div className="relative aspect-[16/10] -mx-6 md:-mx-7 -mt-6 md:-mt-7 mb-2 overflow-hidden rounded-t-2xl bg-ink-2">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-maven/40 via-ink-2 to-ink-3" />
                        )}
                        {post.tag ? (
                          <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.08em]">
                            {post.tag}
                          </span>
                        ) : null}
                      </div>

                      <h3 className="display font-semibold text-base md:text-lg text-white leading-snug tracking-[0.01em] line-clamp-2 group-hover:text-maven-lighter transition-colors duration-300">
                        {post.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-mist-dim">
                        <span className="inline-flex items-center gap-2">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            loading="lazy"
                            className="w-7 h-7 shrink-0 rounded-full object-cover border border-maven-light/40"
                          />
                          {post.author}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={12} className="text-maven-light" aria-hidden="true" />
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Pagination */}
          <Reveal>
            <nav aria-label="Blog pages" className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-line bg-ink/60 transition-colors duration-300 cursor-pointer hover:text-white hover:border-maven-light/40 disabled:opacity-40 disabled:cursor-default"
              >
                <ChevronLeft size={18} />
              </button>

              {pageList(page, pageCount).map((p, i) =>
                p === '…' ? (
                  <span key={`e-${i}`} className="text-mist-dim w-6 text-center" aria-hidden="true">
                    …
                  </span>
                ) : (
                  <button
                    key={`p-${p}`}
                    type="button"
                    onClick={() => goTo(p)}
                    aria-label={`Page ${p}`}
                    aria-current={p === page ? 'page' : undefined}
                    className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                      p === page
                        ? 'pag-pop bg-maven text-white-solid shadow-[0_4px_16px_rgba(97,44,139,0.5)]'
                        : 'border border-line bg-ink/60 hover:bg-ink-2 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => goTo(page + 1)}
                disabled={page === pageCount}
                aria-label="Next page"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-line bg-ink/60 transition-colors duration-300 cursor-pointer hover:text-white hover:border-maven-light/40 disabled:opacity-40 disabled:cursor-default"
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          </Reveal>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}