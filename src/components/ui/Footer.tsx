import type { ReactElement } from 'react'
import { site } from '../../data/site'
import { footerServices, legalLinks, navigation } from '../../data/navigation'

const socialSvg: Record<string, ReactElement> = {
  Instagram: (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 320 512" width="16" height="16" fill="currentColor">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 512 512" width="15" height="15" fill="currentColor">
      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 448 512" width="15" height="15" fill="currentColor">
      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
    </svg>
  ),
}

export function Footer({ onNavigate }: { onNavigate: (href: string) => void }) {
  const year = new Date().getFullYear()

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
            <p className="text-mist-dim text-md leading-relaxed max-w-[34ch] mx-auto md:mx-0">
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
                  className="w-10 h-10 rounded-xl bg-mist/10 flex items-center justify-center text-mist hover:bg-maven hover:text-white-solid transition-all duration-300 hover:-translate-y-1"
                >
                  {socialSvg[s.label]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase footer-col-heading">Services</h4>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s}>
                  <a
                    onClick={() => onNavigate('/services')}
                    data-cursor
                    className="text-sm text-mist-dim hover:text-white cursor-pointer transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="text-sm uppercase footer-col-heading">Explore</h4>
            <ul className="space-y-3 font-semibold">
              {navigation.map((link) => (
                <li key={link.href}>
                  <a
                    onClick={() => onNavigate(link.href)}
                    data-cursor
                    className="text-sm text-mist-dim hover:text-white cursor-pointer transition-colors"
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
                <a href={site.phoneHref} data-cursor className="flex items-start gap-2.5 hover:text-mist transition-colors">
                  <i className="fa-solid fa-phone mt-0.5 shrink-0 text-mist-dim text-[15px]" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor
                  className="flex items-start gap-2.5 hover:text-mist transition-colors"
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
              <li className="flex items-start gap-2.5 text-mist-dim">
                <i className="fa-regular fa-clock mt-0.5 shrink-0 text-mist-dim text-[15px]" aria-hidden="true" />
                {site.hours}
              </li>
            </ul>
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
