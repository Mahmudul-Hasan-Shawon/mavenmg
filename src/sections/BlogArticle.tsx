import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown, Mail, Star } from 'lucide-react'
import type { BlogBlock, BlogListItem, BlogPost, BlogSection } from '../data/blog'
import { blogPosts } from '../data/blog'
import { site } from '../data/site'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Eyebrow } from '../components/text/Eyebrow'
import { getLenis } from '../utils/lenis'
import { cn } from '../utils/cn'

/** Format a YYYY-MM-DD string into a human-friendly display date. */
function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const slugify = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const sectionOffset = 96

/** Encoded URL of the live article (current window, with a canonical fallback). */
function articleUrl(post: BlogPost): string {
  const current =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://mavenmarketinggroup.com/blog/${post.slug}`
  return encodeURIComponent(current)
}

function FaqBlock({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink/40">
      {items.map((item, k) => {
        const isOpen = openIndex === k
        return (
          <div key={k}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : k)}
              data-cursor
              className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
            >
              <h3 className="text-[15px] md:text-base font-semibold text-white">{item.q}</h3>
              <ChevronDown
                size={16}
                className={cn('shrink-0 text-mist transition-transform duration-300', isOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="px-5 pb-5 pt-2 text-sm md:px-6 md:pb-6 md:text-[15px] leading-[1.85] text-mist">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Block({ block }: { block: BlogBlock }) {
  if (block.type === 'sub') {
    return <h3 className="display font-semibold text-base md:text-lg text-white pt-2">{block.text}</h3>
  }

  if (block.type === 'list') {
    const items = block.items as BlogListItem[]
    return (
      <ul className="space-y-3">
        {items.map((item, k) => (
          <li key={k} className="flex gap-3 text-mist text-[15px] leading-[1.85]">
            <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-maven-light" aria-hidden="true" />
            {typeof item === 'string' ? (
              item
            ) : (
              <span>
                <strong className="font-semibold text-white">{item.lead}</strong>
                {item.text && <> {item.text}</>}
              </span>
            )}
          </li>
        ))}
      </ul>
    )
  }

  if (block.type === 'faq') {
    return <FaqBlock items={block.items} />
  }

  return (
    <p className="text-[15px] md:text-[16px] leading-[1.85] text-mist">
      {block.lead && <strong className="font-semibold text-white">{block.lead}</strong>}
      {block.lead ? ` ${block.text}` : block.text}
    </p>
  )
}

function Section({
  section,
  index,
  onNavigate,
}: {
  section: BlogSection
  index: number
  onNavigate: (href: string) => void
}) {
  const showCta = !section.blocks.some((block) => block.type === 'faq')
  return (
    <Reveal delay={Math.min(index * 0.03, 0.15)}>
      <section
        id={`s-${index}-${slugify(section.heading)}`}
        data-toc-section
        data-index={index}
        className="mt-14 md:mt-20 scroll-mt-28"
        aria-label={section.heading}
      >
        <h2 className="display text-2xl font-semibold text-white md:text-3xl">{section.heading}</h2>
        <div className="mt-5 space-y-5 md:mt-6 md:space-y-6 max-w-3xl">
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </div>
        {showCta && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton variant="primary" size="md" onClick={() => onNavigate('/contact')}>
              Start Your Project
              <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton variant="ghost" size="md" onClick={() => onNavigate('/contact')}>
              Connect With Maven
            </MagneticButton>
          </div>
        )}
      </section>
    </Reveal>
  )
}

/**
 * In-article navigation: sticky header that live-updates to the section in view,
 * with an expandable dropdown list that scrolls internally.
 * - `sidebar`: fills the sticky sidebar under the Google rating card (desktop).
 * - `compact`: collapsible card shown above the article on small screens.
 */
function TableOfContents({
  sections,
  variant = 'sidebar',
}: {
  sections: BlogSection[]
  variant?: 'sidebar' | 'compact'
}) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(variant === 'sidebar')
  const listRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = listRef.current
    if (!root) return
    const targets = Array.from(root.ownerDocument.querySelectorAll<HTMLElement>('[data-toc-section]'))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index))
          }
        }
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )
    targets.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [sections.length])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const activeItem = container.querySelector<HTMLElement>(`li:nth-child(${active + 1})`)
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [active])

  const goTo = (index: number) => {
    const target = document.getElementById(`s-${index}-${slugify(sections[index].heading)}`)
    if (!target) return
    if (variant === 'compact') {
      setOpen(false)
      setTimeout(() => {
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(target, { offset: -sectionOffset })
        else target.scrollIntoView({ behavior: 'smooth' })
      }, 350)
      return
    }
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(target, { offset: -sectionOffset })
    else target.scrollIntoView({ behavior: 'smooth' })
  }

  const onTocClick = (e: MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault()
    goTo(index)
  }

  const activeHeading = sections[active]?.heading ?? ''

  const header = (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
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
        className={cn('shrink-0 text-mist transition-transform duration-300', open && 'rotate-180')}
        aria-hidden="true"
      />
    </button>
  )

  const canScrollContainer = (el: HTMLElement, delta: number) => {
    if (delta < 0) return el.scrollTop > 0
    return el.scrollTop < el.scrollHeight - el.clientHeight
  }

  const onTocWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    if (canScrollContainer(el, e.deltaY)) e.stopPropagation()
  }

  const list = (
    <nav aria-label="Table of contents">
      <div
        ref={scrollRef}
        onWheel={onTocWheel}
        className="max-h-[50vh] overflow-y-auto overscroll-contain pr-1 lg:max-h-[46vh]"
      >
        <ul className="space-y-1">
          {sections.map((s, i) => (
            <li key={s.heading}>
              <a
                href={`#s-${i}-${slugify(s.heading)}`}
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
  )

  if (variant === 'compact') {
    return (
      <div ref={listRef} className="sticky top-0 z-30 mb-8 -mx-6 border-b border-line bg-void p-4 md:-mx-12 md:mb-10 lg:hidden">
        {header}
        <div
          className={cn(
            'grid transition-all duration-300 ease-out',
            open ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          )}
        >
          <div className="min-h-0 overflow-hidden">{list}</div>
        </div>
      </div>
    )
  }

  return (
    <div ref={listRef} className="panel relative z-20 rounded-2xl p-6">
      {header}
      <div
        className={cn(
          'grid transition-all duration-300 ease-out',
          open ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="min-h-0 overflow-hidden">{list}</div>
      </div>
    </div>
  )
}

function GoogleRatingCard() {
  const { rating, count, url } = site.googleReview
  return (
    <div className="panel rounded-2xl p-6">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 512 512" className="h-12 w-12 shrink-0" aria-hidden="true" focusable="false">
          <path
            fill="#167EE6"
            d="M492.668,211.489l-208.84-0.01c-9.222,0-16.697,7.474-16.697,16.696v66.715c0,9.22,7.475,16.696,16.696,16.696h117.606c-12.878,33.421-36.914,61.41-67.58,79.194L384,477.589c80.442-46.523,128-128.152,128-219.53c0-13.011-0.959-22.312-2.877-32.785C507.665,217.317,500.757,211.489,492.668,211.489z"
          />
          <path
            fill="#12B347"
            d="M256,411.826c-57.554,0-107.798-31.446-134.783-77.979l-86.806,50.034C78.586,460.443,161.34,512,256,512c46.437,0,90.254-12.503,128-34.292v-0.119l-50.147-86.81C310.915,404.083,284.371,411.826,256,411.826z"
          />
          <path
            fill="#0F993E"
            d="M384,477.708v-0.119l-50.147-86.81c-22.938,13.303-49.48,21.047-77.853,21.047V512C302.437,512,346.256,499.497,384,477.708z"
          />
          <path
            fill="#FFD500"
            d="M100.174,256c0-28.369,7.742-54.91,21.043-77.847l-86.806-50.034C12.502,165.746,0,209.444,0,256s12.502,90.254,34.411,127.881l86.806-50.034C107.916,310.91,100.174,284.369,100.174,256z"
          />
          <path
            fill="#FF4B26"
            d="M256,100.174c37.531,0,72.005,13.336,98.932,35.519c6.643,5.472,16.298,5.077,22.383-1.008l47.27-47.27c6.904-6.904,6.412-18.205-0.963-24.603C378.507,23.673,319.807,0,256,0C161.34,0,78.586,51.557,34.411,128.119l86.806,50.034C148.202,131.62,198.446,100.174,256,100.174z"
          />
          <path
            fill="#D93F21"
            d="M354.932,135.693c6.643,5.472,16.299,5.077,22.383-1.008l47.27-47.27c6.903-6.904,6.411-18.205-0.963-24.603C378.507,23.672,319.807,0,256,0v100.174C293.53,100.174,328.005,113.51,354.932,135.693z"
          />
        </svg>
        <div>
          <p className="display text-xl text-white">{rating.toFixed(1)}</p>
          <div className="mt-0.5 flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-amber-400 text-amber-400" aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-mist-dim">Based on {count} Google reviews</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor
        className="link-line mt-1 inline-block text-sm text-maven-lighter"
      >
        Read our reviews
      </a>
    </div>
  )
}

function SidebarCTA({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <div className="panel rounded-2xl p-6 md:p-7">
      <h3 className="mb-3 text-lg font-semibold text-white">In need of professional services?</h3>
      <p className="text-[15px] leading-relaxed text-mist">
        We evolved into a comprehensive digital marketing agency specializing in top-tier web development, web design, web
        management, SEO, and PPC services.
      </p>
      <p className="mt-3 text-[15px] font-semibold leading-relaxed text-white">Could we assist you with your project?</p>
      <div className="mt-5 flex flex-col gap-3">
        <MagneticButton variant="primary" size="md" fullWidth onClick={() => onNavigate('/contact')}>
          Start Your Project
          <ArrowRight size={18} />
        </MagneticButton>
        <MagneticButton variant="ghost" size="md" fullWidth onClick={() => onNavigate('/contact')}>
          Connect With Maven
        </MagneticButton>
      </div>
    </div>
  )
}

function RelatedPosts({ post, onNavigate }: { post: BlogPost; onNavigate: (href: string) => void }) {
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
  return (
    <div className="panel rounded-2xl p-6 md:p-7">
      <p className="mb-5 font-semibold text-white">Related posts</p>
      <ul className="space-y-5">
        {related.map((p) => {
          const isExternal = !p.slug
          const href = p.slug ? `/blog/${p.slug}` : p.href
          return (
            <li key={p.href}>
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
                className="group flex items-center gap-4"
              >
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line bg-ink-2">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                  ) : (
                    <span className="absolute inset-0 bg-gradient-to-br from-maven/40 via-ink-2 to-ink-3" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 block text-sm font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-maven-lighter">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-xs text-mist-dim">{formatDate(p.date)}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function MoreArticles({ current, onNavigate }: { current: BlogPost; onNavigate: (href: string) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.tag).filter(Boolean)))] as string[]

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < max - 4)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  const onFilterChange = (cat: string) => {
    setFilter(cat)
    requestAnimationFrame(() => {
      const el = trackRef.current
      if (el) el.scrollTo({ left: 0 })
      updateArrows()
    })
  }

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-article-card]')
    const step = (card?.offsetWidth ?? 340) + 24
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const posts = blogPosts.filter((p) => p.slug !== current.slug && (filter === 'All' || p.tag === filter))

  return (
    <section id="blog-more-articles" className="section py-16 md:py-24" aria-label="All blog articles">
      <div className="container-maven">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <Eyebrow label="Read more" className="mb-4" />
            <h2 className="display font-semibold text-2xl md:text-4xl tracking-[0.01em] text-white">All articles</h2>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canLeft}
              aria-label="Scroll articles left"
              data-cursor
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink/60 text-white transition-colors duration-300 cursor-pointer hover:border-maven-light/60 hover:bg-maven/10 disabled:opacity-40 disabled:cursor-default"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canRight}
              aria-label="Scroll articles right"
              data-cursor
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-ink/60 text-white transition-colors duration-300 cursor-pointer hover:border-maven-light/60 hover:bg-maven/10 disabled:opacity-40 disabled:cursor-default"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto overscroll-x-contain -mx-6 px-6 pb-1 md:mx-0 md:px-0 md:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onFilterChange(cat)}
              data-cursor
              aria-pressed={filter === cat}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-maven text-white-solid'
                  : 'border border-line bg-ink/60 text-mist-dim hover:bg-ink-2 hover:text-mist'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="flex gap-6 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pb-2 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((p) => {
            const isExternal = !p.slug
            const href = p.slug ? `/blog/${p.slug}` : p.href
            return (
              <a
                key={p.href}
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
                data-article-card
                className="scroll-blur panel panel-hover group relative flex w-[80vw] max-w-[340px] shrink-0 snap-center flex-col justify-between gap-5 overflow-hidden rounded-2xl p-5 md:p-6 transition-shadow duration-500 hover:shadow-[0_28px_70px_-30px_rgba(97,44,139,0.55)]"
              >
                <div className="relative aspect-[16/10] -mx-5 md:-mx-6 -mt-5 md:-mt-6 mb-1 overflow-hidden rounded-t-2xl bg-ink-2">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-maven/40 via-ink-2 to-ink-3" />
                  )}
                  {p.tag ? (
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white-solid backdrop-blur-sm">
                      {p.tag}
                    </span>
                  ) : null}
                </div>

                <h3 className="display font-semibold text-base md:text-lg text-white leading-snug tracking-[0.01em] line-clamp-2 group-hover:text-maven-lighter transition-colors duration-300">
                  {p.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-mist-dim">
                  <span className="inline-flex items-center gap-2">
                    <img
                      src={p.authorImage}
                      alt={p.author}
                      loading="lazy"
                      className="h-6 w-6 shrink-0 rounded-full object-cover border border-maven-light/40"
                    />
                    {p.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={12} className="text-maven-light" aria-hidden="true" />
                    {formatDate(p.date)}
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Editorial blog article: full-width cover hero + body with sticky utility sidebar. */
export function BlogArticle({ post, onNavigate }: { post: BlogPost; onNavigate: (href: string) => void }) {
  return (
    <>
    <section id="blog-article" className="relative" aria-label="Blog article">
      {/* Full-width cover hero with overlaid header */}
      <div className="relative isolate w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover blur-[4px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/60 to-void/25"
        />

        <div className="section">
          <div className="container-maven max-w-6xl flex min-h-[56vh] flex-col py-7 md:min-h-[62vh] md:py-12">
            <div className="mt-auto pt-8">
            <Reveal>
              <button
                type="button"
                onClick={() => onNavigate('/blog')}
                data-cursor
                className="link-line mono-label !text-mist inline-flex items-center gap-2 cursor-pointer hover:!text-white"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                All articles
              </button>
            </Reveal>

            <header className="mt-4 max-w-5xl pb-2 md:mt-5 md:pb-6">
                <Reveal>
                  <div className="flex items-center gap-3">
<svg viewBox="0 0 512 512" className="h-12 w-12 shrink-0" aria-hidden="true" focusable="false">
                      <path fill="#167EE6" d="M492.668,211.489l-208.84-0.01c-9.222,0-16.697,7.474-16.697,16.696v66.715c0,9.22,7.475,16.696,16.696,16.696h117.606c-12.878,33.421-36.914,61.41-67.58,79.194L384,477.589c80.442-46.523,128-128.152,128-219.53c0-13.011-0.959-22.312-2.877-32.785C507.665,217.317,500.757,211.489,492.668,211.489z"></path>
                      <path fill="#12B347" d="M256,411.826c-57.554,0-107.798-31.446-134.783-77.979l-86.806,50.034C78.586,460.443,161.34,512,256,512c46.437,0,90.254-12.503,128-34.292v-0.119l-50.147-86.81C310.915,404.083,284.371,411.826,256,411.826z"></path>
                      <path fill="#0F993E" d="M384,477.708v-0.119l-50.147-86.81c-22.938,13.303-49.48,21.047-77.853,21.047V512C302.437,512,346.256,499.497,384,477.708z"></path>
                      <path fill="#FFD500" d="M100.174,256c0-28.369,7.742-54.91,21.043-77.847l-86.806-50.034C12.502,165.746,0,209.444,0,256s12.502,90.254,34.411,127.881l86.806-50.034C107.916,310.91,100.174,284.369,100.174,256z"></path>
                      <path fill="#FF4B26" d="M256,100.174c37.531,0,72.005,13.336,98.932,35.519c6.643,5.472,16.298,5.077,22.383-1.008l47.27-47.27c6.904-6.904,6.412-18.205-0.963-24.603C378.507,23.673,319.807,0,256,0C161.34,0,78.586,51.557,34.411,128.119l86.806,50.034C148.202,131.62,198.446,100.174,256,100.174z"></path>
                      <path fill="#D93F21" d="M354.932,135.693c6.643,5.472,16.299,5.077,22.383-1.008l47.27-47.27c6.903-6.904,6.411-18.205-0.963-24.603C378.507,23.672,319.807,0,256,0v100.174C293.53,100.174,328.005,113.51,354.932,135.693z"></path>
                    </svg>
                    <div className="flex w-full flex-col justify-center">
                      <p className="w-full text-md font-semibold text-white">
                        Google <span className="text-white">• 19 Reviews</span>
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="display text-2xl text-white">5.0</p>
                        <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <h1 className="display mt-6 text-[clamp(2rem,5.2vw,3.8rem)] text-white md:mt-7">{post.title}</h1>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="mt-5 max-w-2xl text-mist text-[15px] md:text-[17px] leading-[1.85]">
                    Discover the secrets to becoming a top-tier website manager in our ultimate guide. Kickstart your
                    career with our invaluable insights!
                  </p>
                </Reveal>

              </header>
            </div>
          </div>
          </div>
        </div>

      <div className="section">
        <div className="container-maven max-w-6xl">
          <div className="grid gap-10 pt-12 pb-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14 md:pt-16">
            {/* Article body */}
            <article className="min-w-0">
              <TableOfContents sections={post.sections ?? []} variant="compact" />

              {post.intro ? (
                <Reveal>
                  <p className="max-w-3xl text-mist first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[3.4rem] first-letter:leading-[0.85] first-letter:text-maven-light first-letter:font-bold first-letter:drop-shadow-[0_2px_12px_rgba(139,79,191,0.35)] text-[17px] leading-[1.85]">
                    {post.intro}
                  </p>
                </Reveal>
              ) : null}

              {post.sections?.map((section, i) => (
                <Section key={`${i}-${section.heading}`} section={section} index={i} onNavigate={onNavigate} />
              ))}

              {/* Author sign-off */}
              <Reveal>
                <div className="mt-14 rounded-2xl border border-line bg-ink/40 p-6 md:mt-20 md:p-7">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-full border border-maven-light/40 object-cover"
                    />
                    <div>
                      <p className="text-sm text-mist-dim">Published by</p>
                      <p className="mt-1 font-semibold text-white">{post.author}</p>
                      <p className="mt-1.5 text-md leading-relaxed text-mist">
                        We hope this article helps you out! If you want more advice for expanding your reach, getting
                        leads, and growing your business — let us know.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
                    <p className="text-sm font-semibold text-white">Share this article</p>
                    <div className="flex items-center gap-2.5 sm:ml-auto">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl(post)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on Facebook"
                        data-cursor
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink/60 text-maven-light transition-colors duration-300 hover:border-maven-light/60 hover:bg-maven/10 hover:text-maven-lighter"
                      >
                        <span className="fi fi-brands-facebook flex h-full w-full items-center justify-center text-[15px] leading-none" aria-hidden="true" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${articleUrl(post)}&text=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on X (Twitter)"
                        data-cursor
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink/60 text-maven-light transition-colors duration-300 hover:border-maven-light/60 hover:bg-maven/10 hover:text-maven-lighter"
                      >
                        <span className="fi fi-brands-twitter flex h-full w-full items-center justify-center text-[15px] leading-none" aria-hidden="true" />
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl(post)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on LinkedIn"
                        data-cursor
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink/60 text-maven-light transition-colors duration-300 hover:border-maven-light/60 hover:bg-maven/10 hover:text-maven-lighter"
                      >
                        <span className="fi fi-brands-linkedin flex h-full w-full items-center justify-center text-[15px] leading-none" aria-hidden="true" />
                      </a>
                      <a
                        href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${articleUrl(post)}`}
                        aria-label="Share via Email"
                        data-cursor
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink/60 text-maven-light transition-colors duration-300 hover:border-maven-light/60 hover:bg-maven/10 hover:text-maven-lighter"
                      >
                        <Mail size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </article>

            {/* Sticky utility sidebar */}
            <aside className="min-w-0" aria-label="Article resources">
              <div className="space-y-5 lg:sticky lg:top-28">
                <GoogleRatingCard />
                <div className="hidden lg:block">
                  <TableOfContents sections={post.sections ?? []} />
                </div>
                <SidebarCTA onNavigate={onNavigate} />
                <RelatedPosts post={post} onNavigate={onNavigate} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
    <MoreArticles current={post} onNavigate={onNavigate} />
    </>
  )
}