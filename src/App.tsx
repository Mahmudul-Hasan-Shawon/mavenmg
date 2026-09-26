import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './hooks/useGsap'
import { scrollState, reducedMotion } from './utils/motion'
import { getLenis, setLenis } from './utils/lenis'
import { Navbar } from './components/ui/Navbar'
import { Footer } from './components/ui/Footer'
import { ReadyVeil } from './components/ui/ReadyVeil'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import ServicePage from './pages/ServicePage'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SitemapPage from './pages/SitemapPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import NotFoundPage from './pages/NotFoundPage'
import { blogPosts } from './data/blog'
import { servicePages } from './data/servicePages'

/** Individual service detail routes built from the service page data. */
const serviceRoutes: Record<string, (props: { onNavigate: (href: string) => void }) => ReactElement> = {}
for (const page of servicePages) {
  serviceRoutes[`/services/${page.slug}`] = (props) => <ServicePage {...props} data={page} />
}

const routes: Record<string, (props: { onNavigate: (href: string) => void }) => ReactElement> = {
  '/': Home,
  '/services': ServicesPage,
  ...serviceRoutes,
  '/work': WorkPage,
  '/portfolio': WorkPage, // legacy path kept alive
  '/about': AboutPage,
  '/contact': ContactPage,
  '/sitemap': SitemapPage,
  '/blog': BlogPage,
  '/privacy-policy': PrivacyPolicy,
  '/terms-of-service': TermsOfService,
  '/cookie-policy': CookiePolicy,
}

/** Resolve internal blog detail pages (`/blog/<slug>`) from the post data. */
const blogPostForPath = (path: string) => {
  const prefix = '/blog/'
  if (!path.startsWith(prefix)) return false
  return blogPosts.some((p) => p.slug === path.slice(prefix.length))
}

/** Lowercase + strip trailing slashes so `/About/` and `/about` resolve identically. */
const normalizePath = (rawPathname: string) => {
  const p = rawPathname.trim()
  if (p === '' || p === '/') return '/'
  const noTrailing = p.replace(/\/+$/, '')
  return noTrailing === '' ? '/' : noTrailing.toLowerCase()
}

const SITE_URL = 'https://mavenmarketinggroup.com'
const DEFAULT_DESCRIPTION =
  'Maven designs custom websites and delivers website management, SEO, and digital marketing solutions that help businesses grow.'

interface RouteMeta {
  title: string
  description: string
}

const STATIC_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Maven Marketing Group | Custom Built Websites With A Purpose',
    description:
      'Maven Marketing Group is a Chicago-based web design and digital marketing agency serving clients across the US & worldwide. Custom websites, website management, SEO and digital marketing that drive measurable growth.',
  },
  '/services': {
    title: 'Web Design, Development & Marketing Services | Maven Marketing Group',
    description:
      'Custom web design, development, website management, SEO and digital marketing services from Maven Marketing Group — built to drive measurable growth.',
  },
  '/work': {
    title: 'Our Work | Maven Marketing Group',
    description:
      "Explore Maven Marketing Group's portfolio of custom websites and digital marketing projects for clients across industries.",
  },
  '/about': {
    title: 'About Us | Maven Marketing Group',
    description:
      'Meet Maven Marketing Group — a Chicago-area team of web designers, developers and marketers building websites with a purpose.',
  },
  '/contact': {
    title: 'Contact Us | Maven Marketing Group',
    description:
      "Start your project with Maven Marketing Group. Tell us about your website, SEO or digital marketing goals and we'll be in touch.",
  },
  '/blog': {
    title: 'Blog | Maven Marketing Group',
    description:
      'Web design, development, SEO and digital marketing insights from the Maven Marketing Group team.',
  },
  '/sitemap': {
    title: 'Sitemap | Maven Marketing Group',
    description: 'Browse every page across the Maven website.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Maven Marketing Group',
    description: 'How Maven Marketing Group collects, uses and protects your information.',
  },
  '/terms-of-service': {
    title: 'Terms of Service | Maven Marketing Group',
    description: 'The terms that govern your use of the Maven Marketing Group website and services.',
  },
  '/cookie-policy': {
    title: 'Cookie Policy | Maven Marketing Group',
    description: 'How Maven Marketing Group uses cookies and how you can manage them.',
  },
}

/** Collapse whitespace and cap at ~155 chars on a word boundary for meta tags. */
const trimDescription = (s: string) => {
  const clean = s.replace(/\s+/g, ' ').trim()
  if (clean.length <= 155) return clean
  return `${clean.slice(0, 152).replace(/\s+\S*$/, '')}…`
}

/** Per-route document metadata so every URL has its own title/description/canonical. */
const getRouteMeta = (path: string): RouteMeta => {
  const service = servicePages.find((p) => `/services/${p.slug}` === path)
  if (service) {
    return {
      title: `${service.navLabel} | Maven Marketing Group`,
      description: trimDescription(service.blurb),
    }
  }
  const post = blogPosts.find((p) => `/blog/${p.slug}` === path)
  if (post) {
    return {
      title: `${post.title} | Maven Marketing Group`,
      description: post.intro ? trimDescription(post.intro) : DEFAULT_DESCRIPTION,
    }
  }
  return (
    STATIC_META[path] ?? {
      title: 'Page Not Found | Maven Marketing Group',
      description: DEFAULT_DESCRIPTION,
    }
  )
}

/** Write a document.head attribute if the element exists. */
const setAttr = (selector: string, attr: string, value: string) => {
  document.querySelector(selector)?.setAttribute(attr, value)
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  const [pageKey, setPageKey] = useState(0)
  const veilRef = useRef<HTMLDivElement>(null)
  const transitioning = useRef(false)
  /** Hash awaiting a scroll once the next page has rendered. */
  const pendingHash = useRef<string | null>(null)
  /** Scroll offsets remembered per path so back/forward restores position. */
  const scrollMemory = useRef<Record<string, number>>({})

  // Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    // The SPA owns scroll restoration (see the popstate handler).
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 1.5,
      lerp: 0.13,
    })
    setLenis(lenis)

    lenis.on('scroll', (e: { scroll: number; progress: number; velocity: number }) => {
      scrollState.y = e.scroll
      scrollState.progress = e.progress
      scrollState.velocity = e.velocity
      ScrollTrigger.update()
    })

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      setLenis(undefined)
    }
  }, [])

  // Canonicalize the visible URL when the routed path differs (trailing slash, case).
  useEffect(() => {
    if (window.location.pathname !== path) {
      window.history.replaceState(window.history.state, '', path + window.location.search)
    }
  }, [path])

  // Per-route <title>, description, canonical and social meta.
  useEffect(() => {
    const meta = getRouteMeta(path)
    document.title = meta.title
    setAttr('meta[name="description"]', 'content', meta.description)
    const url = `${SITE_URL}${path === '/' ? '/' : path}`
    setAttr('link[rel="canonical"]', 'href', url)
    setAttr('meta[property="og:title"]', 'content', meta.title)
    setAttr('meta[property="og:description"]', 'content', meta.description)
    setAttr('meta[property="og:url"]', 'content', url)
    setAttr('meta[name="twitter:title"]', 'content', meta.title)
    setAttr('meta[name="twitter:description"]', 'content', meta.description)
  }, [path])

  const scrollToTop = useCallback(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [])

  /** Scroll to an in-page anchor, respecting reduced motion. */
  const scrollToHash = useCallback((hash: string) => {
    const el = document.getElementById(hash)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -96, immediate: reducedMotion })
    else el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [])

  /** Route change with a purple veil wipe. */
  const navigate = useCallback(
    (href: string) => {
      const hash = href.includes('#') ? (href.split('#')[1] ?? null) : null
      const target = normalizePath(href.split('#')[0] || '/')
      if (target === path || transitioning.current) {
        if (hash) {
          scrollToHash(hash)
        } else if (target === path) {
          if (target === '/') {
            const lenis = getLenis()
            if (lenis) lenis.scrollTo(0)
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            scrollToTop()
          }
        }
        return
      }

      // Swap pages instantly under reduced motion — no veil.
      if (reducedMotion) {
        scrollMemory.current[path] = getLenis()?.scroll ?? window.scrollY
        window.history.pushState({}, '', target + window.location.search)
        setPath(target)
        setPageKey((k) => k + 1)
        scrollToTop()
        return
      }

      const veil = veilRef.current
      if (!veil) {
        scrollMemory.current[path] = getLenis()?.scroll ?? window.scrollY
        window.history.pushState({}, '', target + window.location.search)
        setPath(target)
        setPageKey((k) => k + 1)
        scrollToTop()
        return
      }

      transitioning.current = true
      pendingHash.current = hash
      scrollMemory.current[path] = getLenis()?.scroll ?? window.scrollY
      const tl = gsap.timeline({
        onComplete: () => {
          transitioning.current = false
        },
      })
      tl.set(veil, { visibility: 'visible' })
      tl.fromTo(veil, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.5, ease: 'power4.inOut' })
      tl.add(() => {
        window.history.pushState({}, '', target + window.location.search)
        setPath(target)
        setPageKey((k) => k + 1)
        scrollToTop()
      })
      tl.to(veil, { clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'power4.inOut', delay: 0.08 })
      tl.set(veil, { visibility: 'hidden', clipPath: 'inset(100% 0 0 0)' })
    },
    [path, scrollToTop, scrollToHash]
  )

  useEffect(() => {
    const onPop = () => {
      const target = normalizePath(window.location.pathname)
      setPath(target)
      setPageKey((k) => k + 1)
      // Restore the position the user left at, instead of always landing on top.
      const y = scrollMemory.current[target] ?? 0
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(y, { immediate: true })
      else window.scrollTo(0, y)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const Page = routes[path] ?? (blogPostForPath(path) ? BlogPostPage : NotFoundPage)

  // Refresh ScrollTrigger after each route swap settles, then honor a pending
  // cross-page hash anchor once the layout is stable.
  useEffect(() => {
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 300)
    const hashScroll = pendingHash.current
      ? setTimeout(() => {
          if (pendingHash.current) scrollToHash(pendingHash.current)
          pendingHash.current = null
        }, 380)
      : undefined
    return () => {
      clearTimeout(refresh)
      if (hashScroll) clearTimeout(hashScroll)
    }
  }, [pageKey, scrollToHash])

  return (
    <div className="min-h-screen">
      <Navbar activePath={path} onNavigate={navigate} />

      <main key={pageKey} id="main">
        <Page onNavigate={navigate} />
      </main>

      <Footer onNavigate={navigate} />

      {/* Page transition veil */}
      <div
        ref={veilRef}
        aria-hidden="true"
        className="fixed inset-0 z-[150] invisible pointer-events-none"
        style={{
          clipPath: 'inset(100% 0 0 0)',
          background: 'linear-gradient(160deg, #4a1f6b 0%, #612c8b 45%, #2a1140 100%)',
        }}
      >
        <span className="absolute bottom-10 left-1/2 -translate-x-1/2 mono-label !text-maven-lighter/80">
          Maven
        </span>
      </div>

      <div className="noise-overlay" aria-hidden="true" />
      <ReadyVeil />
    </div>
  )
}
