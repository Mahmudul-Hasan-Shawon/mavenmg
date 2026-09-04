import { site } from '../../data/site'
import { footerServices, legalLinks, navigation } from '../../data/navigation'
import { MagneticButton } from './MagneticButton'

export function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line bg-ink" aria-label="Footer">
      <div className="container-maven px-6 md:px-10 pt-16 md:pt-20">
        {/* Top row: CTA-ish contact strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-14 border-b border-line">
          <div>
            <p className="mono-label mb-4">Get in touch</p>
            <a
              href={`mailto:${site.email}`}
              data-cursor
              className="display text-[clamp(1.5rem,3.6vw,2.6rem)] text-white hover:text-maven-lighter transition-colors link-line"
            >
              {site.email}
            </a>
          </div>
          <MagneticButton variant="primary" onClick={() => onNavigate('/contact')}>
            Start Your Project
          </MagneticButton>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          <div className="col-span-2 md:col-span-1">
            <img src="/images/logo.png" alt={site.name} className="h-9 w-auto mb-5" loading="lazy" />
            <p className="text-mist-dim text-sm leading-relaxed max-w-[26ch]">
              Custom built websites and digital marketing, from {site.address.city}, {site.address.state} to clients
              worldwide.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="mono-label mb-5">Explore</p>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <a
                    onClick={() => onNavigate(link.href)}
                    data-cursor
                    className="link-line text-sm text-mist hover:text-white cursor-pointer transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mono-label mb-5">Services</p>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s}>
                  <a
                    onClick={() => onNavigate('/services')}
                    data-cursor
                    className="link-line text-sm text-mist hover:text-white cursor-pointer transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label mb-5">Contact</p>
            <ul className="space-y-3 text-sm text-mist">
              <li>
                <a href={site.phoneHref} data-cursor className="hover:text-white transition-colors">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} data-cursor className="hover:text-white transition-colors break-all">
                  {site.email}
                </a>
              </li>
              <li className="text-mist-dim">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </li>
              <li className="text-mist-dim">{site.hours}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <div
          className="font-sora font-bold text-center leading-[0.78] grad-text opacity-[0.16]"
          style={{ fontSize: 'clamp(4rem, 16.5vw, 15rem)', marginBottom: '-0.14em', letterSpacing: '-0.04em' }}
        >
          MAVEN
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-maven px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-mist-dim text-xs">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="text-xs uppercase tracking-[0.18em] text-mist-dim hover:text-maven-lighter transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <a key={l.name} href={l.href} className="text-xs text-mist-dim hover:text-mist transition-colors">
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
