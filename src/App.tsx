import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './hooks/useGsap'
import { scrollState, reducedMotion } from './utils/motion'
import { getLenis, setLenis } from './utils/lenis'
import { Navbar } from './components/ui/Navbar'
import { Footer } from './components/ui/Footer'
import { CustomCursor } from './components/ui/CustomCursor'
import { Preloader } from './components/ui/Preloader'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

const routes: Record<string, (props: { onNavigate: (href: string) => void }) => ReactElement> = {
  '/': Home,
  '/services': ServicesPage,
  '/work': WorkPage,
  '/portfolio': WorkPage, // legacy path kept alive
  '/about': AboutPage,
  '/contact': ContactPage,
}

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname)
  const [pageKey, setPageKey] = useState(0)
  const veilRef = useRef<HTMLDivElement>(null)
  const transitioning = useRef(false)

  // Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: !reducedMotion,
      wheelMultiplier: 1,
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

  const scrollToTop = useCallback(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [])

  /** Route change with a purple veil wipe. */
  const navigate = useCallback(
    (href: string) => {
      const target = href.split('#')[0] || '/'
      if (target === path || transitioning.current) {
        if (href.includes('#')) {
          document.querySelector(href.split('#')[1] ? `#${href.split('#')[1]}` : 'body')?.scrollIntoView({ behavior: 'smooth' })
        }
        return
      }

      if (reducedMotion) {
        window.history.pushState({}, '', target)
        setPath(target)
        setPageKey((k) => k + 1)
        scrollToTop()
        return
      }

      transitioning.current = true
      const veil = veilRef.current
      const tl = gsap.timeline({
        onComplete: () => {
          transitioning.current = false
        },
      })
      tl.set(veil, { visibility: 'visible' })
      tl.fromTo(veil, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.5, ease: 'power4.inOut' })
      tl.add(() => {
        window.history.pushState({}, '', target)
        setPath(target)
        setPageKey((k) => k + 1)
        scrollToTop()
        window.dispatchEvent(new Event('route-change'))
      })
      tl.to(veil, { clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'power4.inOut', delay: 0.08 })
      tl.set(veil, { visibility: 'hidden', clipPath: 'inset(100% 0 0 0)' })
    },
    [path, scrollToTop]
  )

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname)
      setPageKey((k) => k + 1)
      scrollToTop()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [scrollToTop])

  const Page = routes[path] ?? Home

  // Refresh ScrollTrigger after each route swap settles.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [pageKey])

  return (
    <div className="min-h-screen">
      <Preloader />
      <CustomCursor />
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
    </div>
  )
}
