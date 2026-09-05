import { useState, type FormEvent } from 'react'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../data/site'
import { PageHero } from '../sections/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'

const serviceOptions = [
  'Custom Website Build',
  'Website Management',
  'SEO Services',
  'Digital Marketing',
  'Other',
]

export default function ContactPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Project Inquiry from ${data.get('name')}`)
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nCompany: ${data.get('company')}\nService: ${data.get('service')}\n\nProject Details:\n${data.get('message')}`
    )
    window.open(`mailto:${site.email}?subject=${subject}&body=${body}`)
    setSent(true)
  }

  const fieldCls =
    'w-full bg-transparent border-b border-line py-3.5 text-white text-[15px] outline-none focus:outline-none focus:ring-0 transition-colors duration-300 placeholder:text-mist-dim/70'

  return (
    <>
      <PageHero
        id="contact-hero"
        eyebrow="Contact"
        title="Let's build something"
        accent="extraordinary"
        lede="Tell us about your project — we'll get back to you within one business day."
      />

      <section id="contact" className="section pb-28 md:pb-36" aria-label="Contact form">
        <div className="container-maven grid lg:grid-cols-[1fr_1.3fr] gap-14 lg:gap-20">
          {/* Info column */}
          <div>
            <Reveal>
              <h2 className="display text-2xl md:text-3xl text-white mb-8 leading-snug">
                Elevate your website and supercharge your digital marketing results
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="space-y-5 text-mist leading-relaxed mb-8">
                <p>
                  Our custom-built websites and web management services enhance user experiences through strategic, brand-focused storytelling while driving high conversions.
                </p>
                <p>
                  Discover a fresh approach to digital marketing: websites designed with purpose drive leads, boost engagement, and propel your sales to new heights.
                </p>
                <p>
                  Contact Maven Marketing Group today to discuss our web design packages, website management services, or freelance digital marketing services!
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-6">
                <li>
                  <a href={site.phoneHref} data-cursor className="group flex items-center gap-4 text-mist hover:text-white transition-colors">
                    <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center group-hover:border-maven-light/50 transition-colors">
                      <Phone size={15} aria-hidden="true" />
                    </span>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} data-cursor className="group flex items-center gap-4 text-mist hover:text-white transition-colors">
                    <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center group-hover:border-maven-light/50 transition-colors">
                      <Mail size={15} aria-hidden="true" />
                    </span>
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-4 text-mist">
                  <span className="w-10 h-10 rounded-full border border-line flex items-center justify-center">
                    <MapPin size={15} aria-hidden="true" />
                  </span>
                  <span>
                    {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
                  </span>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            {sent ? (
              <div className="panel rounded-2xl p-10 md:p-14 text-center">
                <p className="display text-2xl md:text-3xl text-white mb-4">Thank you — message ready.</p>
                <p className="text-mist mb-8">Your email client should have opened with your project details. If not, reach us directly at {site.email}.</p>
                <MagneticButton variant="ghost" onClick={() => setSent(false)}>
                  Send another message
                </MagneticButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="panel rounded-2xl p-8 md:p-12" aria-label="Project inquiry">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
                  <div>
                    <label htmlFor="cf-name" className="mono-label block mb-1">
                      Your name *
                    </label>
                    <div className="field">
                      <input id="cf-name" name="name" required placeholder="John Doe" className={fieldCls} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="mono-label block mb-1">
                      Your email *
                    </label>
                    <div className="field">
                      <input id="cf-email" name="email" type="email" required placeholder="john@company.com" className={fieldCls} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cf-phone" className="mono-label block mb-1">
                      Phone number
                    </label>
                    <div className="field">
                      <input id="cf-phone" name="phone" placeholder="(555) 123-4567" className={fieldCls} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cf-company" className="mono-label block mb-1">
                      Company name
                    </label>
                    <div className="field">
                      <input id="cf-company" name="company" placeholder="Acme Inc" className={fieldCls} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cf-service" className="mono-label block mb-1">
                      Service interested in *
                    </label>
                    <div className="field">
                      <select id="cf-service" name="service" required defaultValue="" className={`${fieldCls} appearance-none cursor-pointer [&>option]:bg-ink`}>
                        <option value="" disabled>
                          Select a service
                        </option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cf-message" className="mono-label block mb-1">
                      Tell us about your project
                    </label>
                    <div className="field">
                      <textarea id="cf-message" name="message" rows={4} placeholder="Describe your project, goals, and budget…" className={`${fieldCls} resize-none`} />
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-center md:justify-end">
                  <MagneticButton variant="primary" strength={0.3} type="submit">
                    Send Message
                    <ArrowRight size={16} />
                  </MagneticButton>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
