import { useEffect, useRef, useState } from 'react'
import { gsap, useGsapContext } from '../../hooks/useGsap'
import { navigation } from '../../data/navigation'
import { site as siteData } from '../../data/site'
import { cn } from '../../utils/cn'
import { MagneticButton } from './MagneticButton'
import { ThemeToggle } from './ThemeToggle'
import { getLenis } from '../../utils/lenis'

interface NavbarProps {
  activePath: string
  onNavigate: (href: string) => void
}

/** Desktop nav + full-screen mobile menu. Transparent over hero, compact on scroll. */
export function Navbar({ activePath, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - lastY) > 6) setHidden(y > lastY && y > 180)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    getLenis()?.[menuOpen ? 'stop' : 'start']?.()
  }, [menuOpen])

  const go = (href: string) => {
    setMenuOpen(false)
    // Small delay lets the menu close before the route swap on mobile.
    setTimeout(() => onNavigate(href), menuOpen ? 350 : 0)
  }

  const isActive = (href: string) => {
    const base = href.split('#')[0]
    return base !== '/' && activePath.startsWith(base)
  }

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          hidden && !menuOpen && '-translate-y-full'
        )}
      >
        <div
          className={cn(
            'mx-auto flex items-center justify-between gap-6 transition-all duration-500',
            scrolled
              ? 'max-w-5xl mt-3 px-5 py-2.5 rounded-full bg-void/70 backdrop-blur-xl border border-line shadow-sm'
              : 'max-w-7xl mt-0 px-6 md:px-10 py-5 border-b border-transparent'
          )}
        >
          <a
            onClick={() => go('/')}
            className="cursor-pointer shrink-0"
            aria-label={`${siteData.name}, home`}
            data-cursor
          >
            <img
              src="/images/logos/logo.png"
              alt={siteData.name}
              data-logo="dark"
              className={cn('w-auto transition-all duration-500', scrolled ? 'h-7' : 'h-9')}
            />
            <img
              src="/images/logos/mavenlogo_light.png"
              alt=""
              aria-hidden="true"
              data-logo="light"
              className={cn('w-auto transition-all duration-500', scrolled ? 'h-7' : 'h-9')}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navigation.map((link) => (
              <a
                key={link.href}
                onClick={() => go(link.href)}
                data-cursor
                className={cn(
                  'text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300',
                  isActive(link.href) ? 'text-white' : 'text-mist hover:text-white'
                )}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <MagneticButton
                variant={scrolled ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => go('/contact')}
              >
                Start Your Project
              </MagneticButton>
            </div>

            <ThemeToggle />

            <MenuButton open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} activePath={activePath} onNavigate={go} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function MenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-label={open ? 'Close menu' : 'Open menu'}
      data-cursor
      className="relative w-11 h-11 flex md:hidden items-center justify-center rounded-full border border-line bg-ink/60 backdrop-blur-md cursor-pointer"
    >
      <span className={cn('absolute w-[18px] h-px bg-white transition-all duration-400', open ? 'rotate-45' : '-translate-y-[3.5px]')} />
      <span className={cn('absolute w-[18px] h-px bg-white transition-all duration-400', open ? '-rotate-45' : 'translate-y-[3.5px]')} />
    </button>
  )
}

function MobileMenu({
  open,
  activePath,
  onNavigate,
  onClose,
}: {
  open: boolean
  activePath: string
  onNavigate: (href: string) => void
  onClose: () => void
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const isActive = (href: string) => {
    const base = href.split('#')[0]
    return base !== '/' && activePath.startsWith(base)
  }

  useGsapContext(
    rootRef,
    () => {
      const tl = gsap.timeline({ paused: true })
      tl.set(rootRef.current, { visibility: 'visible' })
      tl.fromTo(
        rootRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power4.inOut' }
      )
      tl.fromTo(
        '[data-menu-link]',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out' },
        '-=0.25'
      )
      tl.fromTo(
        '[data-menu-foot]',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
      tl.eventCallback('onReverseComplete', () => {
        gsap.set(rootRef.current, { visibility: 'hidden' })
      })
      tlRef.current = tl
    },
    []
  )

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return
    if (open) tl.timeScale(1).play()
    else tl.timeScale(1.6).reverse()
  }, [open])

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[90] bg-void/98 backdrop-blur-2xl invisible"
    >
      <div className="h-full flex flex-col justify-center px-8 pt-20">
        <nav aria-label="Mobile" className="flex flex-col">
          {navigation.map((link) => (
            <div key={link.href} style={{ overflow: 'hidden' }}>
              <a
                data-menu-link
                onClick={() => onNavigate(link.href)}
                data-cursor
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'group flex items-baseline gap-4 py-2.5 cursor-pointer display text-[clamp(2rem,9vw,3.2rem)] transition-colors',
                  isActive(link.href) ? 'text-white' : 'text-white/85 hover:text-maven-lighter'
                )}
              >
                <span className="font-mono text-xs text-maven-light w-8">{link.index}</span>
                <span className="group-hover:translate-x-2 transition-transform duration-400">{link.label}</span>
              </a>
            </div>
          ))}
        </nav>

        <div data-menu-foot className="mt-12 pt-8 border-t border-line flex items-center justify-between gap-4">
          <MagneticButton variant="primary" size="md" onClick={() => onNavigate('/contact')}>
            Start Your Project
          </MagneticButton>
          <button
            type="button"
            onClick={onClose}
            className="mono-label cursor-pointer hover:text-maven-lighter transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
