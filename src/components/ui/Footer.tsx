import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../data/site'
import { footerNavigation, footerServices, legalLinks } from '../../data/navigation'
import { SocialIcon } from './SocialIcon'
import { SmartLink } from './SmartLink'

type SubscribeState = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  const year = new Date().getFullYear()
  const [subscribeState, setSubscribeState] = useState<SubscribeState>('idle')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address.')
      setSubscribeState('error')
      return
    }
    setSubscribeState('loading')
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      if (!res.ok) {
        setError(
          res.status === 503
            ? 'The newsletter service is temporarily unavailable. Please email us or try again shortly.'
            : 'We could not add you to the Digest right now. Please try again.'
        )
        setSubscribeState('error')
        return
      }
      setSubscribeState('success')
    } catch {
      setError('Something went wrong reaching the newsletter service.')
      setSubscribeState('error')
    }
  }

  return (
    <footer className="relative border-t border-white/10 bg-[#170a24]" aria-label="Footer">
      <div className="container-maven px-6 md:px-10 pt-10 md:pt-16">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-[1.35fr_1fr_1fr_1fr] gap-10 pb-14 md:pb-16 [&>*]:min-w-0">
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <img
              src="/images/logos/logo.png"
              alt={site.name}
              data-logo="dark"
              className="h-11 w-auto mb-5 mx-auto md:mx-0"
              loading="lazy"
            />
            <img
              src="/images/logos/mavenlogo_light.png"
              alt=""
              aria-hidden="true"
              data-logo="light"
              className="h-11 w-auto mb-5 mx-auto md:mx-0"
              loading="lazy"
            />
            <p className="text-[#a89fc0] text-md leading-relaxed max-w-[34ch] mx-auto md:mx-0">
              Custom built websites and digital marketing services for businesses of all sizes. Based in Lake Zurich,
              IL, serving clients nationwide and worldwide.
            </p>
            <div className="flex gap-3 mt-6 justify-center md:justify-start">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor
                  className="w-10 h-10 rounded-xl bg-[#a89fc0]/10 flex items-center justify-center text-[#a89fc0] hover:bg-maven hover:text-white-solid transition-all duration-300 hover:-translate-y-1"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase footer-col-heading">Services</h4>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s.href}>
                  <SmartLink
                    href={s.href}
                    onNavigate={onNavigate}
                    data-cursor
                    className="text-sm text-[#a89fc0] hover:text-white-solid transition-colors"
                  >
                    {s.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-sm uppercase footer-col-heading">Explore</h4>
            <ul className="space-y-3 font-semibold">
              {footerNavigation.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    onNavigate={onNavigate}
                    data-cursor
                    className="text-sm text-[#a89fc0] hover:text-white-solid transition-colors"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm uppercase footer-col-heading">Contact</h4>
            <ul className="space-y-3 text-sm text-[#a89fc0]">
              <li>
                <a href={site.phoneHref} data-cursor className="flex items-start gap-2.5 hover:text-white-solid transition-colors">
                  <Phone size={15} className="mt-0.5 shrink-0 text-[#a89fc0]" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor
                  className="flex items-start gap-2.5 hover:text-white-solid transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#a89fc0]" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[#a89fc0]">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#a89fc0]" aria-hidden="true" />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </li>
            </ul>

            {/* Maven Digest newsletter */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="display font-semibold text-[#a89fc0] text-lg mb-1">Maven Digest</p>
              <p className="text-[#a89fc0] text-sm leading-relaxed mb-4">Sign up to receive the latest industry news.</p>
              {subscribeState === 'success' ? (
                <p className="text-sm text-white-solid/80" role="status">
                  You're on the list, welcome to the Digest.
                </p>
              ) : (
                <>
                  {subscribeState === 'error' && (
                    <div
                      className="mb-4 rounded-xl border border-[#ffb4b4]/30 bg-[#ffb4b4]/10 px-4 py-3 text-sm text-[#ffb4b4]"
                      role="alert"
                    >
                      <p>{error}</p>
                      <p className="mt-1">
                        Prefer email?{' '}
                        <a href={`mailto:${site.email}`} className="underline hover:text-white-solid transition-colors">
                          Email us at {site.email}
                        </a>
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubscribeState('idle')}
                        className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-white-solid/80 underline hover:text-white-solid transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  )}
                  <form onSubmit={handleSubscribe} className="flex flex-row">
                    <label htmlFor="footer-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="flex-1 min-w-0 px-4 py-3 bg-white-solid/5 border border-white/10 text-white-solid text-sm focus:border-maven focus:ring-2 focus:ring-maven/20 outline-none transition-all placeholder:text-white-solid/40 rounded-l-xl rounded-r-none disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      data-cursor
                      disabled={subscribeState === 'loading'}
                      className="shrink-0 px-4 py-3 bg-maven hover:bg-maven-light text-white-solid text-sm font-medium whitespace-nowrap transition-all duration-300 rounded-r-xl rounded-l-none disabled:opacity-60 disabled:cursor-wait"
                    >
                      {subscribeState === 'loading' ? 'Subscribing…' : 'Subscribe'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-maven px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#a89fc0] text-xs">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <a
                key={l.name}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(l.href)
                }}
                data-cursor
                className="text-xs text-[#a89fc0] hover:text-white-solid cursor-pointer transition-colors"
              >
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
