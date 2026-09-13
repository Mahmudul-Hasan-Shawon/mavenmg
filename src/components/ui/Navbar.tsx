import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { gsap, useGsapContext } from '../../hooks/useGsap'
import { navigation, legalLinks, footerServices, type NavLink } from '../../data/navigation'
import { site as siteData } from '../../data/site'
import { cn } from '../../utils/cn'
import { MagneticButton } from './MagneticButton'
import { ThemeToggle } from './ThemeToggle'
import { SocialIcon } from './SocialIcon'
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
            {navigation.map((link) =>
              link.href === '/services' ? (
                <ServicesNavItem
                  key={link.href}
                  link={link}
                  active={isActive(link.href)}
                  go={go}
                />
              ) : (
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
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <MagneticButton
                variant={scrolled ? 'primary' : 'deep'}
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

function ServicesNavItem({
  link,
  active,
  go,
}: {
  link: NavLink
  active: boolean
  go: (href: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  const openMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    if (!computePos()) return
    setOpen(true)
  }

  const closeMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setOpen(false)
      setShown(false)
    }, 60)
  }

  const closeNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpen(false)
    setShown(false)
  }

  /** Anchor the fixed panel under the trigger; false if the button scrolled out of view. */
  const computePos = () => {
    const el = btnRef.current
    if (!el) return false
    const r = el.getBoundingClientRect()
    if (r.top < -40 || r.bottom < 0) return false
    const width = 340
    const left = Math.max(16, Math.min(window.innerWidth - width - 16, r.left + r.width / 2 - width / 2))
    setPos({ left, top: r.bottom })
    return true
  }

  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => setShown(true))
    // The header is fixed, so the panel cannot move on scroll only
    // re-anchor on resize. During scroll we just close once the header
    // would slide away (scrolled past 180 while moving down), mirroring
    // how the dropdown used to scroll off with the header.
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y > 180 && y - lastY > 6) {
        closeNow()
        return
      }
      lastY = y
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNow()
    }
    const onResize = () => {
      if (!computePos()) closeNow()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target) || btnRef.current?.contains(target)) return
      closeNow()
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <>
      <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
        <button
          ref={btnRef}
          type="button"
          data-cursor
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => (open ? closeNow() : openMenu())}
          className={cn(
            'flex items-center gap-1.5 text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300',
            active ? 'text-white' : 'text-mist hover:text-white'
          )}
        >
          {link.label}
          <span
            className={cn('grid place-items-center transition-transform duration-300', open && 'rotate-180')}
            aria-hidden="true"
          >
            <ChevronDown size={14} />
          </span>
        </button>
      </div>

      {open &&
        pos &&
        createPortal(
          <div
            ref={panelRef}
            id={`${link.href.slice(1)}-menu`}
            role="menu"
            aria-label="All services"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            style={{ left: pos.left, top: pos.top }}
            className={cn(
              'fixed w-[340px] pt-5 z-[110] transition-transform duration-300 ease-out',
              shown ? 'translate-y-0' : '-translate-y-2'
            )}
          >
            <div
              className="relative rounded-2xl border border-line bg-void/80 backdrop-blur-[20px] shadow-[0_30px_70px_-24px_rgba(97,44,139,0.55)] overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full bg-maven/25 blur-[80px]"
              />
              <div className="relative grid gap-0.5 p-2">
                {footerServices.map((s, i) => (
                  <a
                    key={s.href}
                    role="menuitem"
                    tabIndex={shown ? 0 : -1}
                    data-cursor
                    onClick={() => {
                      closeNow()
                      go(s.href)
                    }}
                    style={{ transitionDelay: shown ? `${i * 25}ms` : '0ms' }}
                    className={cn(
                      'group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300',
                      shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-sm font-medium text-white/85 group-hover:text-white transition-colors duration-300">
                        {s.label}
                      </span>
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-maven-light opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
              <div className="relative p-2 pt-1.5">
                <a
                  role="menuitem"
                  tabIndex={shown ? 0 : -1}
                  data-cursor
                  onClick={() => {
                    closeNow()
                    go('/services')
                  }}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-maven/15 hover:bg-maven/25 border border-maven-light/20 transition-colors duration-300 cursor-pointer"
                >
                  <span className="text-sm font-semibold text-maven-lighter">View all services</span>
                  <ArrowRight size={14} className="text-maven-lighter" />
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
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
  const year = new Date().getFullYear()

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
        '-=0.2'
      )
      tl.fromTo(
        '[data-menu-detail]',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
        '-=0.35'
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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[90] invisible overflow-y-auto overflow-x-hidden"
      style={{
        backgroundColor: 'var(--hero-base)',
        backgroundImage: 'radial-gradient(ellipse 85% 65% at 50% 0%, var(--hero-glow) 0%, var(--hero-base) 100%)',
      }}
    >
      {/* Ambient top-left glow keeps the panel on-brand. */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 w-[26rem] h-[26rem] rounded-full bg-maven/20 blur-[120px]" />

      <div className="relative min-h-full flex flex-col px-7 sm:px-10 pt-24 pb-8">
        <div className="flex-1 flex flex-col justify-center py-4">
          <nav aria-label="Mobile" className="flex flex-col items-center">
            {navigation.map((link) => {
              const active = isActive(link.href)
              return (
                <div key={link.href} style={{ overflow: 'hidden' }}>
                  <a
                    data-menu-link
                    onClick={() => onNavigate(link.href)}
                    data-cursor
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group flex items-center gap-4 py-2.5 cursor-pointer transition-colors duration-300',
                      active ? 'text-white' : 'text-mist hover:text-white'
                    )}
                  >
                    <span className="display font-semibold text-[clamp(1.9rem,8vw,2.6rem)] leading-tight tracking-[0.01em] group-hover:translate-x-1.5 transition-transform duration-400">
                      {link.label}
                    </span>
                  </a>
                </div>
              )
            })}
          </nav>
        </div>

        {/* Contact + social + legal cluster */}
        <div className="mt-10 space-y-7">
          <div className="flex flex-col items-center gap-2.5" data-menu-detail>
            <a
              href={`mailto:${siteData.email}`}
              data-cursor
              onClick={() => onClose()}
              className="inline-flex items-center gap-2.5 text-sm text-mist hover:text-white transition-colors duration-300 w-fit"
            >
              <i className="fa-regular fa-envelope text-maven-light/80" aria-hidden="true" />
              {siteData.email}
            </a>
            <a
              href={siteData.phoneHref}
              data-cursor
              onClick={() => onClose()}
              className="inline-flex items-center gap-2.5 text-sm text-mist hover:text-white transition-colors duration-300 w-fit"
            >
              <i className="fa-solid fa-phone text-maven-light/80" aria-hidden="true" />
              {siteData.phone}
            </a>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-line pt-6" data-menu-detail>
            <div className="flex gap-2.5">
              {siteData.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-mist-dim transition-all duration-300 hover:border-maven-light/50 hover:text-maven-lighter hover:bg-maven/10 hover:-translate-y-0.5"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>

            
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5" data-menu-detail>
            {legalLinks.map((l) => (
              <a
                key={l.href}
                onClick={() => onNavigate(l.href)}
                data-cursor
                className="text-[11px] uppercase tracking-[0.08em] text-mist-dim hover:text-white cursor-pointer transition-colors duration-300"
              >
                {l.name}
              </a>
            ))}
            <span className="text-mist-dim/60 text-xs">
              © {year} {siteData.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
