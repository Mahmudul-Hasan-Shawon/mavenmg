import { useState, type FormEvent } from 'react'
import { ArrowRight, Send, Sparkles } from 'lucide-react'
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

  const inputCls =
    'w-full px-4 py-3.5 rounded-xl bg-ink-2 border border-line text-white text-sm focus:border-maven focus:ring-2 focus:ring-maven/20 outline-none transition-all placeholder:text-mist-dim'

  return (
    <>
      <PageHero
        id="contact-hero"
        eyebrow="Contact"
        title="How can we"
        accent="help you?"
        lede="Tell us about your project, we'll get back to you within one business day."
      />

      <section id="contact" className="section pb-28 md:pb-36" aria-label="Contact form">
        <div className="container-maven grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Why Maven panel */}
          <Reveal className="h-full">
            <div
              className="rounded-3xl p-10 relative overflow-hidden h-full"
              style={{ background: 'linear-gradient(135deg, #4A1F6B 0%, #431E61 50%, #4A2668 100%)' }}
            >
              <div aria-hidden="true" className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white-solid/10" />
              <div aria-hidden="true" className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white-solid/10" />
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white-solid/15 flex items-center justify-center backdrop-blur-sm">
                    <Sparkles size={22} className="text-white-solid" aria-hidden="true" />
                  </div>
                  <span className="text-white-solid/80 text-sm font-semibold tracking-wider uppercase">MAVEN MARKETING GROUP</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-white-solid mb-6 leading-tight">
                  Elevate your website and supercharge your digital marketing results
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <ArrowRight size={18} className="text-white-solid/60 mt-1 flex-shrink-0" aria-hidden="true" />
                    <p className="text-white-solid/80 leading-relaxed">
                      Our custom-built websites and web management services enhance user experiences through strategic, brand-focused storytelling while driving high conversions.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ArrowRight size={18} className="text-white-solid/60 mt-1 flex-shrink-0" aria-hidden="true" />
                    <p className="text-white-solid/80 leading-relaxed">
                      Discover a fresh approach to digital marketing: websites designed with purpose drive leads, boost engagement, and propel your sales to new heights.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white-solid/20 pt-6">
                  <p className="text-white-solid font-semibold text-lg">
                    Contact Maven Marketing Group today to discuss our web design packages, website management services, or freelance digital marketing services!
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="h-full">
            {sent ? (
              <div className="glass rounded-3xl p-10 md:p-12 h-full flex flex-col items-center justify-center text-center">
                <p className="display text-2xl md:text-3xl text-white mb-4">Thank you, message ready.</p>
                <p className="text-mist mb-8">Your email client should have opened with your project details. If not, reach us directly at {site.email}.</p>
                <MagneticButton variant="ghost" onClick={() => setSent(false)}>
                  Send another message
                </MagneticButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-ink rounded-3xl p-8 md:p-10 h-full flex flex-col shadow-[0_28px_80px_-28px_rgba(97,44,139,0.4)]" aria-label="Project inquiry">
                <div className="space-y-5 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cf-name" className="block text-sm font-semibold text-mist mb-2">
                        Your name
                      </label>
                      <input id="cf-name" name="name" required placeholder="John Doe" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="block text-sm font-semibold text-mist mb-2">
                        Your email
                      </label>
                      <input id="cf-email" name="email" type="email" required placeholder="john@company.com" className={inputCls} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cf-phone" className="block text-sm font-semibold text-mist mb-2">
                        Phone number
                      </label>
                      <input id="cf-phone" name="phone" placeholder="(555) 123-4567" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="cf-company" className="block text-sm font-semibold text-mist mb-2">
                        Company name
                      </label>
                      <input id="cf-company" name="company" placeholder="Acme Inc" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cf-service" className="block text-sm font-semibold text-mist mb-2">
                      Service interested in *
                    </label>
                    <select id="cf-service" name="service" required defaultValue="" className={`${inputCls} appearance-none cursor-pointer contact-select [&>option]:bg-ink-2`}>
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

                  <div>
                    <label htmlFor="cf-message" className="block text-sm font-semibold text-mist mb-2">
                      Tell us about your project
                    </label>
                    <textarea id="cf-message" name="message" rows={4} placeholder="Describe your project, goals, and budget…" className={`${inputCls} resize-none`} />
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-maven to-maven-light rounded-xl font-semibold text-white-solid hover:shadow-[0_8px_30px_rgba(97,44,139,0.4)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Send size={18} aria-hidden="true" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
