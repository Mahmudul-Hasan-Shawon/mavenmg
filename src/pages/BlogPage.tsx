import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { blogPosts } from '../data/blog'
import { PageHero } from '../sections/PageHero'
import { FinalCTA } from '../sections/FinalCTA'
import { Reveal } from '../components/ui/Reveal'
import { getLenis } from '../utils/lenis'
import { reducedMotion } from '../utils/motion'
import { formatDate } from '../utils/date'

const POSTS_PER_PAGE = 12

/** Scroll offset that clears the fixed header pill (matches sectionOffset elsewhere). */
const listScrollOffset = -96

/** A jump between consecutive page numbers larger than this becomes an ellipsis. */
const ELLIPSIS_THRESHOLD = 1

/**
 * Numbered pagination window: always shows the first and last page plus the
 * pages around the current one, collapsing the gaps into ellipsis markers
 * (e.g. 1 … 4 5 6 … 8).
 */
function getPageItems(current: number, total: number): (number | 'gap')[] {
  if (total <= 1) return [1]
  const wanted = new Set<number>([1, total, current - 1, current, current + 1])
  // Keep an extra neighbour when hugging an edge so the window never pinches.
  if (current <= 3) [2, 3, 4].forEach((p) => wanted.add(p))
  if (current >= total - 2) [total - 1, total - 2, total - 3].forEach((p) => wanted.add(p))
  const pages = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const items: (number | 'gap')[] = []
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > ELLIPSIS_THRESHOLD) items.push('gap')
    items.push(p)
  })
  return items
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

export default function BlogPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const pageCount = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
  const [page, setPage] = useState(1)
  const didMount = useRef(false)

  const posts = blogPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  const yearGroups = groupByYear(posts)

  const goTo = (next: number) => {
    if (next < 1 || next > pageCount || next === page) return
    setPage(next)
  }

  // Scroll the top of the list into view on page change (never on first paint).
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    const list = document.getElementById('blog-list')
    if (!list) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(list, { offset: listScrollOffset, immediate: reducedMotion })
    else list.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [page])

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
          <div key={page}>
            {yearGroups.map(([year, groupPosts]) => (
              <div key={year}>
                <div className="scroll-mt-28 mb-10 md:mb-14">
                  <div className="blog-cards-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {groupPosts.map((post, i) => {
                      const isExternal = !post.slug
                      const href = post.slug ? `/blog/${post.slug}` : post.href
                      return (
                        <div
                          key={post.href}
                          className="blog-card-shell"
                          style={{ '--card-i': i } as CSSProperties}
                        >
                          <a
                            href={href}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            onClick={
                              isExternal
                                ? undefined
                                : (e) => {
                                    e.preventDefault()
                                    onNavigate(href)
                                  }
                            }
                            data-cursor
                            className="scroll-blur panel panel-hover group relative flex flex-col justify-between gap-6 rounded-2xl p-6 md:p-7 overflow-hidden transition-shadow duration-500 hover:shadow-[0_28px_70px_-30px_rgba(97,44,139,0.55)]"
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
                                <span className="absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full border border-white/15 bg-black/40 text-white-solid backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.08em]">
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
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Reveal>
            <nav aria-label="Blog pages" className="mt-12 flex items-center justify-center gap-3 text-mist-dim">
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-line bg-ink/60 transition-colors duration-300 cursor-pointer hover:text-white hover:border-maven-light/40 disabled:opacity-40 disabled:cursor-default"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1">
                {getPageItems(page, pageCount).map((item, idx) =>
                  item === 'gap' ? (
                    <span
                      key={`gap-${idx}`}
                      aria-hidden="true"
                      className="h-10 w-6 flex items-center justify-center text-sm text-mist-dim select-none"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      data-active-page={item === page}
                      aria-label={`Go to page ${item} of ${pageCount}`}
                      aria-current={item === page ? 'page' : undefined}
                      onClick={() => goTo(item)}
                      className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                        item === page
                          ? 'pag-pop bg-maven text-white-solid shadow-[0_4px_16px_rgba(97,44,139,0.5)]'
                          : 'hover:bg-ink-2 hover:text-white'
                      }`}
                    >
                      {item === page ? (
                        <span key={item} className="pag-rise">
                          {item}
                        </span>
                      ) : (
                        item
                      )}
                    </button>
                  )
                )}
              </div>

              <button
                type="button"
                aria-label="Next page"
                onClick={() => goTo(page + 1)}
                disabled={page === pageCount}
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