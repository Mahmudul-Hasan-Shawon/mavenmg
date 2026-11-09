import { useRef, useState } from 'react'
import { teamQrPath } from '../data/leaderQr'

/**
 * Leadership: a faithful rebuild of the Framer "hover team" wall at
 * https://diverse-unicorn-464220.framer.app/. Cards hang from thin wires off a
 * sagging rail cord, sway on their pendulums, tilt toward the pointer with a
 * holographic sheen on hover, and flip on click to a profile back with
 * location, bio, selected projects, email and a QR badge. Light theme on
 * purpose: the section is a self-contained white island on the dark page.
 */

type Member = {
  name: string
  role: string
  /** Portrait served from /images; without one the card shows a tinted monogram. */
  photo?: string
  accent: string
  location: string
  about: string
  projects: string[]
  email: string
  qr: string
  /** Hanging geometry, copied from the reference: rest angle, wire length, vertical offset, entrance delay. */
  rest: number
  wire: number
  marginTop: number
  delay: number
}

const members: Member[] = [
  {
    name: 'Connor McNerney',
    role: 'President & Managing Member',
    photo: undefined,
    accent: '#7765ee',
    location: 'Illinois, US',
    about: 'Leads every project from first call to launch, keeping the work tied to business goals.',
    projects: ['Web / Client Strategy', 'Brand / Growth'],
    email: 'info@mavenmarketinggroup.com',
    qr: teamQrPath,
    rest: -2.2,
    wire: 53,
    marginTop: 2.79,
    delay: 0,
  },
  {
    name: 'Kolton Durment',
    role: 'Chief Technical Officer',
    photo: undefined,
    accent: '#b678ed',
    location: 'Illinois, US',
    about: 'Owns the technical side of every build: performance, security and long-term care.',
    projects: ['Platform / Performance', 'Systems / Security'],
    email: 'info@mavenmarketinggroup.com',
    qr: teamQrPath,
    rest: 1.5,
    wire: 110.6,
    marginTop: 19.87,
    delay: 85,
  },
  {
    name: 'David Rodriguez',
    role: 'Executive Administrator',
    photo: undefined,
    accent: '#28b88d',
    location: 'Illinois, US',
    about: 'Keeps projects moving and clients informed, from scheduling to day-to-day delivery.',
    projects: ['Operations / Delivery', 'Process / Care'],
    email: 'info@mavenmarketinggroup.com',
    qr: teamQrPath,
    rest: 2,
    wire: 125,
    marginTop: 2.79,
    delay: 170,
  },
]

/* Card geometry shared by every item, in px. */
const CARD_W = 268
const ITEM_H = 454
const TRACK_GAP = 36
const TRACK_PAD = 12
/* Max pointer tilt, in degrees. */
const TILT_X = 6
const TILT_Y = 9

export function Leadership() {
  /* Rail cord spans between the outermost hang points, dipping in the middle. */
  const center0 = TRACK_PAD + CARD_W / 2
  const centerN = TRACK_PAD + (members.length - 1) * (CARD_W + TRACK_GAP) + CARD_W / 2
  const cordLeft = center0 - 32
  const cordWidth = centerN - center0 + 64

  return (
    <section className="ht-section" aria-label="Our team">
      <div className="ht-container">
        <header className="ht-heading">
          <div className="ht-heading-left">
            <h2 className="ht-title">
              <span>Meet the people</span>
              <em>behind the work.</em>
            </h2>
          </div>
        </header>
      </div>

      <div className="ht-scroll-outer">
        <div className="ht-scroll">
          <div
            className="ht-track"
            style={{ gap: TRACK_GAP, paddingLeft: TRACK_PAD, paddingRight: TRACK_PAD }}
          >
            <svg
              className="ht-rail-cord"
              aria-hidden="true"
              style={{ left: cordLeft, width: cordWidth, height: 50 }}
              viewBox={`0 0 ${cordWidth} 50`}
              preserveAspectRatio="none"
            >
              <path
                d={`M 0 13 Q ${cordWidth / 2} 57 ${cordWidth} 13`}
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            {members.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TeamCard({ member, index }: { member: Member; index: number }) {
  const hitRef = useRef<HTMLDivElement>(null)
  const [flipped, setFlipped] = useState(false)
  const num = String(index + 1).padStart(2, '0')

  /** Track the pointer: tilt the badge and park the holographic sheen under it. */
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = hitRef.current
    if (!el || flipped) return
    const rect = el.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * 100
    const py = ((e.clientY - rect.top) / rect.height) * 100
    const ry = ((px - 50) / 50) * TILT_Y
    const rx = -((py - 50) / 50) * TILT_X
    el.style.setProperty('--ht-rx', `${rx.toFixed(2)}deg`)
    el.style.setProperty('--ht-ry', `${ry.toFixed(2)}deg`)
    el.style.setProperty('--ht-px', `${px.toFixed(1)}%`)
    el.style.setProperty('--ht-py', `${py.toFixed(1)}%`)
    el.style.setProperty('--ht-illumination', '1')
  }

  const handleLeave = () => {
    const el = hitRef.current
    if (!el) return
    el.style.setProperty('--ht-rx', '0deg')
    el.style.setProperty('--ht-ry', '0deg')
    el.style.setProperty('--ht-illumination', '0')
  }

  return (
    <div
      className="ht-item ht-enter"
      style={{
        width: CARD_W,
        height: ITEM_H,
        flex: `0 0 ${CARD_W}px`,
        marginTop: member.marginTop,
        animationDelay: `${member.delay}ms`,
      }}
    >
      <div className="ht-pendulum" style={{ '--ht-rest': `${member.rest}deg` } as React.CSSProperties}>
        <div className="ht-ceiling-anchor" aria-hidden="true" />
        <div className="ht-fine-wire" style={{ height: member.wire }} aria-hidden="true" />
        <div
          ref={hitRef}
          className="ht-card-hit"
          style={{ top: member.wire + 13 }}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
        >
          <div className="ht-tilt">
            <div className="ht-eyelet" aria-hidden="true">
              <span />
            </div>
            <div className={flipped ? 'ht-flipper ht-flipped' : 'ht-flipper'}>
              <button
                type="button"
                className="ht-face ht-front"
                onClick={() => {
                  setFlipped(true)
                  handleLeave()
                }}
                aria-label={`View ${member.name}'s full profile`}
              >
                <div className="ht-card-topline">
                  <span style={{ marginLeft: 'auto' }}>#{num}</span>
                </div>
                <div className="ht-portrait">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      draggable={false}
                    />
                  ) : (
                    <span
                      className="ht-portrait-fallback"
                      style={{
                        background: `linear-gradient(160deg, ${member.accent}cc, ${member.accent}55)`,
                      }}
                      aria-hidden="true"
                    >
                      {member.name.split(' ').map((w) => w[0]).join('')}
                    </span>
                  )}
                </div>
                <div className="ht-person-info">
                  <strong className="ht-person-name">{member.name}</strong>
                  <span className="ht-role">{member.role}</span>
                </div>
                <div className="ht-card-bottomline">
                  <span>VIEW PROFILE</span>
                  <span>&#8599;</span>
                </div>
                <span className="ht-holo" aria-hidden="true" />
                <span className="ht-holo-gloss" aria-hidden="true" />
              </button>

              <div className="ht-face ht-back" aria-hidden={!flipped}>
                <div className="ht-back-heading">
                  <span>PROFILE / {num}</span>
                  <button
                    type="button"
                    className="ht-back-close"
                    onClick={() => setFlipped(false)}
                    aria-label={`Flip ${member.name}'s card back`}
                    tabIndex={flipped ? 0 : -1}
                  >
                    &#8634;
                  </button>
                </div>
                <div className="ht-back-main">
                  <div className="ht-back-identity">
                    <span className="ht-back-avatar" style={{ background: member.accent }}>
                      {member.photo ? (
                        <img src={member.photo} alt="" loading="lazy" draggable={false} />
                      ) : (
                        member.name[0]
                      )}
                    </span>
                    <div className="ht-back-intro">
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                    </div>
                  </div>
                  <div className="ht-back-location">&#11250; &nbsp;{member.location}</div>
                  <p className="ht-about">{member.about}</p>
                </div>
                <div className="ht-back-section">
                  <div className="ht-back-label">SELECTED PROJECTS</div>
                  {member.projects.map((p) => (
                    <div key={p} className="ht-project-link">
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                <div className="ht-back-footer">
                  <div className="ht-back-contact">
                    <div className="ht-back-label">LET'S CONNECT</div>
                    <a
                      href={`mailto:${member.email}`}
                      className="ht-email"
                      tabIndex={flipped ? 0 : -1}
                    >
                      {member.email}
                    </a>
                  </div>
                  <div className="ht-qr">
                    <svg height="64" width="64" viewBox="0 0 29 29" role="img" aria-label={`QR link for ${member.name}`}>
                      <path fill="#FFFFFF" d="M0,0 h29v29H0z" shapeRendering="crispEdges" />
                      <path fill="#202126" d={member.qr} shapeRendering="crispEdges" />
                    </svg>
                    <span>SCAN ME</span>
                  </div>
                </div>
                <span className="ht-holo" aria-hidden="true" />
                <span className="ht-holo-gloss" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
