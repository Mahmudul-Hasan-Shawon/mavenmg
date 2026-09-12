import { useState, type FormEvent } from 'react'
import { site } from '../../data/site'
import { footerNavigation, footerServices, legalLinks } from '../../data/navigation'
import { SocialIcon } from './SocialIcon'

export function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  const year = new Date().getFullYear()
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="relative border-t border-line bg-[#170a24]" aria-label="Footer">
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
              src="/images/logos/logo.png"
              alt=""
              aria-hidden="true"
              data-logo="light"
              className="h-11 w-auto mb-5 mx-auto md:mx-0"
              loading="lazy"
            />
            <p className="text-mist text-md leading-relaxed max-w-[34ch] mx-auto md:mx-0">
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
                  <a
                    onClick={() => onNavigate(s.href)}
                    data-cursor
                    className="text-sm text-mist-dim hover:text-white-solid cursor-pointer transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-sm uppercase footer-col-heading">Explore</h4>
            <ul className="space-y-3 font-semibold">
              {footerNavigation.map((link) => (
                <li key={link.href}>
                  <a
                    onClick={() => onNavigate(link.href)}
                    data-cursor
                    className="text-sm text-mist-dim hover:text-white-solid cursor-pointer transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm uppercase footer-col-heading">Contact</h4>
            <ul className="space-y-3 text-sm text-mist-dim">
              <li>
                <a href={site.phoneHref} data-cursor className="flex items-start gap-2.5 hover:text-white-solid transition-colors">
                  <i className="fa-solid fa-phone mt-0.5 shrink-0 text-mist-dim text-[15px]" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor
                  className="flex items-start gap-2.5 hover:text-white-solid transition-colors"
                >
                  <i className="fa-regular fa-envelope mt-0.5 shrink-0 text-mist-dim text-[15px]" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-mist-dim">
                <i className="fa-solid fa-location-dot mt-0.5 shrink-0 text-mist-dim text-[15px]" aria-hidden="true" />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
                </span>
              </li>
            </ul>

            {/* Maven Digest newsletter */}
            <div className="mt-8 pt-8 border-t border-line">
              <p className="display font-semibold text-[#a89fc0] text-lg mb-1">Maven Digest</p>
              <p className="text-mist-dim text-sm leading-relaxed mb-4">Sign up to receive the latest industry news.</p>
              {subscribed ? (
                <p className="text-sm text-white-solid/80">
                  You're on the list, welcome to the Digest.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-row">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    className="flex-1 min-w-0 px-4 py-3 bg-white-solid/5 border border-line text-white-solid text-sm focus:border-maven focus:ring-2 focus:ring-maven/20 outline-none transition-all placeholder:text-white-solid/40 rounded-l-xl rounded-r-none"
                  />
                  <button
                    type="submit"
                    data-cursor
                    className="shrink-0 px-4 py-3 bg-maven hover:bg-maven-light text-white-solid text-sm font-medium whitespace-nowrap transition-all duration-300 rounded-r-xl rounded-l-none"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-maven px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-mist-dim text-xs">
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
                className="text-xs text-mist-dim hover:text-white-solid cursor-pointer transition-colors"
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
