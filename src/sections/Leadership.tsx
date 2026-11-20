import { type CSSProperties } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { teamQrPath } from '../data/leaderQr'
import { Reveal } from '../components/ui/Reveal'

/**
 * Leadership: the "Meet the people behind the work" section on the About
 * page. Clean, editorial profile cards — one photo, one role, a short bio and
 * a direct contact link — with no decorative hanging hardware or flips.
 */

type Member = {
  name: string
  role: string
  /** Portrait served from /images; without one the card shows a tinted monogram. */
  photo?: string
  accent: string
  location: string
  about: string
  email: string
  qr: string
}

const members: Member[] = [
  {
    name: 'Connor McNerney',
    role: 'President & Managing Member',
    photo: '/images/team/connor.jpg',
    accent: '#7765ee',
    location: 'Illinois, US',
    about: 'Leads every project from first call to launch, keeping the work tied to business goals.',
    email: 'info@mavenmgofficial.com',
    qr: teamQrPath,
  },
  {
    name: 'Kolton Durment',
    role: 'Chief Technical Officer',
    photo: '/images/team/kolton.jpg',
    accent: '#b678ed',
    location: 'Illinois, US',
    about: 'Owns the technical side of every build: performance, security and long-term care.',
    email: 'info@mavenmgofficial.com',
    qr: teamQrPath,
  },
  {
    name: 'David Rodriguez',
    role: 'Executive Administrator',
    photo: '/images/team/david.jpg',
    accent: '#28b88d',
    location: 'Illinois, US',
    about: 'Keeps projects moving and clients informed, from scheduling to day-to-day delivery.',
    email: 'info@mavenmgofficial.com',
    qr: teamQrPath,
  },
]

/** Brand links shared by every card, using the profiles from the site metadata. */
const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/mavenmg/',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'X',
    href: 'https://twitter.com/mavenmg',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mavenmg/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.073-4.948c-.197-4.35-2.616-6.774-6.98-6.978C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/mavenmg',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
]

export function Leadership() {
  return (
    <section id="leadership" className="lead-section" aria-label="Our team">
      <div className="lead-container">
        <Reveal className="lead-heading">
          <span className="lead-eyebrow">Leadership</span>
          <h2 className="lead-title">
            The people{' '}
            <span>
              behind the <span className="lead-title-violet">Maven</span>
            </span>
          </h2>
        </Reveal>

        <div className="lead-grid">
          {members.map((member, index) => (
            <Reveal
              key={member.name}
              className="lead-card-wrap"
              delay={index * 0.08}
              style={{ '--lead-accent': member.accent } as CSSProperties}
            >
              <article className="lead-card">
                <div className="lead-portrait">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                    />
                  ) : (
                    <span
                      className="lead-portrait-fallback"
                      style={{
                        background: `linear-gradient(160deg, ${member.accent}cc, ${member.accent}55)`,
                      }}
                      aria-hidden="true"
                    >
                      {member.name.split(' ').map((word) => word[0]).join('')}
                    </span>
                  )}
                </div>

                <div className="lead-body">
                  <h3 className="lead-name">{member.name}</h3>
                  <p className="lead-role">{member.role}</p>
                  <p className="lead-location">
                    <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
                    {member.location}
                  </p>
                  <p className="lead-about">{member.about}</p>
                  <div className="lead-social" aria-label="Maven on social media">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        className="lead-social-link"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Maven on ${social.label}`}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d={social.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="lead-card-foot">
                  <a className="lead-email" href={`mailto:${member.email}`}>
                    <span>{member.email}</span>
                    <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                  <div className="lead-qr">
                    <svg
                      viewBox="0 0 29 29"
                      role="img"
                      aria-label={`Contact QR code for ${member.name}`}
                    >
                      <path fill="#FFFFFF" d="M0,0 h29v29H0z" shapeRendering="crispEdges" />
                      <path fill="#202126" d={member.qr} shapeRendering="crispEdges" />
                    </svg>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
