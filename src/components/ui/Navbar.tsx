import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { ArrowRight, ChevronDown, Mail, Phone } from 'lucide-react'
import { gsap, useGsapContext } from '../../hooks/useGsap'
import { navigation, legalLinks, servicesMenu, type NavLink } from '../../data/navigation'
import { site as siteData } from '../../data/site'
import { cn } from '../../utils/cn'
import { MagneticButton } from './MagneticButton'
import { ThemeToggle } from './ThemeToggle'
import { SocialIcon } from './SocialIcon'
import { SmartLink } from './SmartLink'
import { getLenis } from '../../utils/lenis'

interface NavbarProps {
  activePath: string
  onNavigate: (href: string) => void
}

const MOBILE_MENU_ID = 'mobile-menu'

/** Desktop nav + full-screen mobile menu. Transparent over hero, compact on scroll. */
export function Navbar({ activePath, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Ref, not state: hover flips it often and only the scroll handler reads it,
  // so there is no reason to re-render the header on every hover change.
  const servicesOpenRef = useRef(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // An open mega menu pins the header: the panel lives inside the header,
      // so letting the slide-away run would yank the open menu off screen and
      // resample its backdrop blur mid-hover.
      if (!servicesOpenRef.current && Math.abs(y - lastY) > 6) setHidden(y > lastY && y > 180)
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
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          hidden && !menuOpen && '-translate-y-full'
        )}
      >
        <div
          className={cn(
            // relative: the services mega panel anchors to this row, so it
            // drops from the navbar's bottom edge in both header states.
            'relative mx-auto flex items-center justify-between gap-6 transition-all duration-500',
            scrolled
              ? 'max-w-5xl mt-3 px-5 py-2.5 rounded-full bg-void/70 backdrop-blur-xl border border-line shadow-sm'
              : 'max-w-7xl mt-0 px-6 md:px-10 py-5 border-b border-transparent'
          )}
        >
          <SmartLink
            href="/"
            onNavigate={go}
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
          </SmartLink>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navigation.map((link) =>
              link.href === '/services' ? (
                <ServicesNavItem
                  key={link.href}
                  link={link}
                  active={isActive(link.href)}
                  go={go}
                  onOpenChange={(o) => {
                    servicesOpenRef.current = o
                  }}
                />
              ) : (
                <SmartLink
                  key={link.href}
                  href={link.href}
                  onNavigate={go}
                  data-cursor
                  className={cn(
                    'text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300',
                    isActive(link.href) ? 'text-white' : 'text-mist hover:text-white'
                  )}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </SmartLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <MagneticButton
                variant={scrolled ? 'primary' : 'deepOutline'}
                size="sm"
                onClick={() => go('/contact')}
              >
                Start Your Project
              </MagneticButton>
            </div>

            <ThemeToggle />

            <MenuButton open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} controls={MOBILE_MENU_ID} />
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} activePath={activePath} onNavigate={go} onClose={() => setMenuOpen(false)} />
    </>
  )
}

function MenuButton({ open, onToggle, controls }: { open: boolean; onToggle: () => void; controls?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
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
  onOpenChange,
}: {
  link: NavLink
  active: boolean
  go: (href: string) => void
  /** Tells the header an open panel should pin it against the auto-hide. */
  onOpenChange?: (open: boolean) => void
}) {
  // The mega menu opens via pure CSS :hover on the wrapper (see .services-wrap
  // in index.css): the panel is a DOM child of the trigger wrapper, so there
  // is no mount cost, no timers, and open/close are always smooth transitions.
  // This state only backs the touch tap-toggle, aria-expanded and closing on
  // outside click or Escape.
  //
  // The wrap is deliberately NOT positioned: the panel's containing block is
  // the navbar row (it has .relative), so the panel hangs off the navbar's
  // bottom edge rather than right under the trigger. .services-bridge keeps
  // :hover alive across the gap between the two.
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  // Set when a link inside the panel is clicked: after the route swap the
  // pointer can still rest on the wrap, and :hover alone would keep the menu
  // hanging open on the new page. Cleared by the next deliberate hover.
  const [dismissed, setDismissed] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const open = (pinned || hovered) && !dismissed

  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  useEffect(() => {
    if (!pinned) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPinned(false)
    }
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setPinned(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [pinned])

  const close = () => {
    setPinned(false)
    setHovered(false)
    setDismissed(true)
  }

  return (
    <div
      ref={wrapRef}
      className="services-wrap group/services-wrap"
      onMouseEnter={() => {
        setHovered(true)
        setDismissed(false)
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Invisible hover corridor from the trigger down to the panel. It only
          arms while the wrap is hovered, so brushing the navbar's lower edge
          with the menu closed cannot open it. */}
      <span aria-hidden="true" className="services-bridge" />

      <button
        type="button"
        data-cursor
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          // Pointer devices open on hover; taps (no hover) pin the menu open.
          if (window.matchMedia('(hover: none)').matches) {
            setDismissed(false)
            setPinned((v) => !v)
          }
        }}
        className={cn(
          'flex items-center gap-1.5 text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-300 group-hover/services-wrap:text-white',
          active ? 'text-white' : 'text-mist'
        )}
      >
        {link.label}
        <span
          className={cn(
            'grid place-items-center transition-transform duration-300 group-hover/services-wrap:rotate-180',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        >
          <ChevronDown size={14} />
        </span>
      </button>

      <div
        className={cn(
          'services-panel flex flex-col lg:flex-row rounded-3xl border border-line bg-void shadow-[0_40px_90px_-28px_rgba(97,44,139,0.6)] overflow-hidden',
          pinned && 'panel-open',
          dismissed && 'panel-dismissed'
        )}
        aria-label="All services"
      >
        {/* Soft radial wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(120% 100% at 88% -20%, rgba(139,79,191,0.22), transparent 62%)',
          }}
        />

        {/* Left rail: statement, CTAs, note */}
        <div className="services-rail lg:w-[252px] shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 bg-white/[0.02] px-6 py-7">
          <p className="mono-label !text-mist-dim mb-4">What we do</p>
          <p className="display font-semibold text-[1.4rem] leading-snug text-white">
            Everything your business needs to win online.
          </p>

          <div className="mt-auto pt-7 space-y-2.5">
            <SmartLink
              href={servicesMenu.links[0].href}
              onNavigate={go}
              data-cursor
              onClick={close}
              className="group flex items-center justify-between gap-3 rounded-full border border-white/15 px-4 py-2.5 text-[13px] font-semibold text-white hover:border-maven-lighter/60 hover:bg-maven/15 transition-all duration-300"
            >
              {servicesMenu.links[0].label}
              <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
            </SmartLink>
            <SmartLink
              href={servicesMenu.links[1].href}
              onNavigate={go}
              data-cursor
              onClick={close}
              className="group flex items-center justify-between gap-3 rounded-full bg-maven-lighter px-4 py-2.5 text-[13px] font-bold text-maven-dark hover:bg-maven-light hover:text-white-solid transition-colors duration-300"
            >
              {servicesMenu.links[1].label}
              <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-1" />
            </SmartLink>
          </div>

          <p className="text-xs leading-relaxed text-mist-dim mt-6">{servicesMenu.note}</p>
        </div>

        {/* Offering columns */}
        <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-9 px-7 py-7">
          {servicesMenu.columns.map((col) => (
            <div key={col.title} className="services-col">
              <div className="border-b border-white/10 pb-2.5 mb-4 flex items-start justify-between gap-2">
                <SmartLink
                  href={col.href}
                  onNavigate={go}
                  data-cursor
                  onClick={close}
                  className="text-[14.5px] font-bold text-white leading-snug hover:text-maven-lighter transition-colors duration-300"
                >
                  {col.title}
                </SmartLink>
                {col.badge && (
                  <span className="shrink-0 mt-px px-2 py-px rounded-full bg-maven-lighter text-[10px] font-extrabold tracking-[0.06em] text-maven-dark">
                    {col.badge}
                  </span>
                )}
              </div>

              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <SmartLink
                      href={item.href}
                      onNavigate={go}
                      data-cursor
                      onClick={close}
                      className="group flex items-center gap-2.5 text-[13.5px] leading-snug text-mist hover:text-white transition-colors duration-300"
                    >
                      <span
                        aria-hidden="true"
                        className="w-1 h-1 rounded-full bg-mist/60 group-hover:bg-maven-light shrink-0 transition-colors duration-300"
                      />
                      {item.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>

              {col.cta && (
                <SmartLink
                  href={col.cta.href}
                  onNavigate={go}
                  data-cursor
                  onClick={close}
                  className="group mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-maven-light hover:text-maven-lighter transition-colors duration-300"
                >
                  {col.cta.label}
                  <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-1" />
                </SmartLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
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
  const lastFocused = useRef<HTMLElement | null>(null)
  // Visibility is owned by React (not GSAP) so the menu still opens when
  // prefers-reduced-motion skips the timeline setup entirely.
  const [visible, setVisible] = useState(false)
  const year = new Date().getFullYear()

  const isActive = (href: string) => {
    const base = href.split('#')[0]
    return base !== '/' && activePath.startsWith(base)
  }

  useGsapContext(
    rootRef,
    () => {
      const tl = gsap.timeline({ paused: true })
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
      tl.eventCallback('onReverseComplete', () => setVisible(false))
      tlRef.current = tl
    },
    []
  )

  // With reduced motion tlRef stays null: the overlay simply appears/disappears.
  // The overlay visibility is React-owned; the timeline only animates when it exists.
  useEffect(() => {
    const tl = tlRef.current
    if (open) {
      // eslint-disable-next-line react/set-state-in-effect -- syncing React state with the GSAP timeline (an external system)
      setVisible(true)
      tl?.timeScale(1).play()
    } else if (tl && tl.progress() > 0) {
      tl.timeScale(1.6).reverse()
    } else {
      // eslint-disable-next-line react/set-state-in-effect -- syncing React state with the GSAP timeline (an external system)
      setVisible(false)
    }
  }, [open])

  // Move focus into the dialog on open; restore it to the toggle on close.
  useEffect(() => {
    if (!open) {
      lastFocused.current?.focus()
      return
    }
    lastFocused.current = document.activeElement as HTMLElement | null
    const firstLink = rootRef.current?.querySelector<HTMLElement>('a[href]')
    const raf = requestAnimationFrame(() => (firstLink ?? rootRef.current)?.focus())
    return () => cancelAnimationFrame(raf)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Keep Tab cycling inside the dialog while it is open.
  const onTrapKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const root = rootRef.current
    if (!root) return
    const focusables = Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement
    const inside = active instanceof HTMLElement && root.contains(active)
    if (e.shiftKey && (active === first || active === root || !inside)) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && (active === last || !inside)) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      ref={rootRef}
      id={MOBILE_MENU_ID}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      onKeyDown={onTrapKeyDown}
      className={cn('fixed inset-0 z-[90] overflow-y-auto overflow-x-hidden', !visible && 'invisible')}
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
                  <SmartLink
                    href={link.href}
                    onNavigate={onNavigate}
                    data-menu-link
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
                  </SmartLink>
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
              <Mail size={15} className="text-maven-light/80" aria-hidden="true" />
              {siteData.email}
            </a>
            <a
              href={siteData.phoneHref}
              data-cursor
              onClick={() => onClose()}
              className="inline-flex items-center gap-2.5 text-sm text-mist hover:text-white transition-colors duration-300 w-fit"
            >
              <Phone size={15} className="text-maven-light/80" aria-hidden="true" />
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
              <SmartLink
                key={l.href}
                href={l.href}
                onNavigate={onNavigate}
                data-cursor
                className="text-[11px] uppercase tracking-[0.08em] text-mist-dim hover:text-white cursor-pointer transition-colors duration-300"
              >
                {l.name}
              </SmartLink>
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
