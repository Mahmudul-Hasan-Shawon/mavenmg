import { useRef, useState, type FormEvent } from 'react'
import { AlertCircle, ArrowRight, Loader2, RotateCcw, Send, Sparkles } from 'lucide-react'
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactPayload {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

/** Read the form fields into a plain, trimmed payload. */
const readPayload = (data: FormData): ContactPayload => ({
  name: String(data.get('name') ?? '').trim(),
  email: String(data.get('email') ?? '').trim(),
  phone: String(data.get('phone') ?? '').trim(),
  company: String(data.get('company') ?? '').trim(),
  service: String(data.get('service') ?? '').trim(),
  message: String(data.get('message') ?? '').trim(),
})

/** Explicit fallback only — pre-fills the visitor's email client from their answers. */
const buildMailto = (p: ContactPayload) => {
  const subject = encodeURIComponent(`Project Inquiry from ${p.name || 'a Maven visitor'}`)
  const body = encodeURIComponent(
    `Name: ${p.name}\nEmail: ${p.email}\nPhone: ${p.phone}\nCompany: ${p.company}\nService: ${p.service}\n\nProject Details:\n${p.message}`
  )
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}

export default function ContactPage({ onNavigate: _onNavigate }: { onNavigate: (href: string) => void }) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  const [mailtoHref, setMailtoHref] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = readPayload(new FormData(e.currentTarget))

    // Capture the fallback link from the current answers before anything else.
    setMailtoHref(buildMailto(payload))

    if (!payload.name || !EMAIL_RE.test(payload.email) || !payload.message) {
      setError('Please add your name, a valid email address, and a few words about your project.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('sent')
        return
      }
      const detail = (await res.json().catch(() => null)) as { error?: string } | null
      setError(
        detail?.error === 'not_configured'
          ? 'Our online form delivery is not set up yet.'
          : detail?.error || 'We could not deliver your message just now.'
      )
    } catch {
      setError('We could not reach the server just now.')
    }
    setStatus('error')
  }

  const handleRetry = () => formRef.current?.requestSubmit()

  const inputCls =
    'w-full px-4 py-3.5 rounded-xl bg-ink-2 border border-line text-white text-sm focus:border-maven focus:ring-2 focus:ring-maven/20 outline-none transition-all placeholder:text-mist-dim'

  return (
    <div
      className="relative"
style={{
  backgroundColor: 'var(--hero-base)',
  backgroundImage:
    'radial-gradient(ellipse 85% 65% at 50% 0%, var(--hero-glow) 0%, var(--hero-base) 100%)',
}}
    >
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
              className="-mx-6 lg:mx-0 rounded-none lg:rounded-3xl p-10 relative overflow-hidden h-full"
              style={{ background: 'linear-gradient(135deg, #4A1F6B 0%, #431E61 50%, #4A2668 100%)' }}
            >
              <div aria-hidden="true" className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white-solid/10" />
              <div aria-hidden="true" className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white-solid/10" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
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
            {status === 'sent' ? (
              <div className="glass rounded-3xl p-10 md:p-12 h-full flex flex-col items-center justify-center text-center">
                <p className="display text-2xl md:text-3xl text-white mb-4">Thank you, message sent.</p>
                <p className="text-mist mb-8">We received your project details and will get back to you within one business day. For anything urgent, email {site.email}.</p>
                <MagneticButton variant="deep" onClick={() => setStatus('idle')}>
                  Send another message
                </MagneticButton>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="bg-ink rounded-3xl p-8 md:p-10 h-full flex flex-col shadow-[0_28px_80px_-28px_rgba(97,44,139,0.4)]" aria-label="Project inquiry">
                <div className="space-y-5 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cf-name" className="block text-sm font-semibold text-mist mb-2">
                        Your name *
                      </label>
                      <input id="cf-name" name="name" required placeholder="Carolina Rose" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="block text-sm font-semibold text-mist mb-2">
                        Your email *
                      </label>
                      <input id="cf-email" name="email" type="email" required placeholder="carolina@company.com" className={inputCls} />
                    </div>
                  </div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cf-phone" className="block text-sm font-semibold text-mist mb-2">
                        Phone number
                      </label>
                      <input id="cf-phone" name="phone" type="tel" placeholder="(555) 123-4567" className={inputCls} />
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
                      Tell us about your project *
                    </label>
                    <textarea id="cf-message" name="message" rows={4} required placeholder="Describe your project, goals, and budget…" className={`${inputCls} resize-none`} />
                  </div>
                </div>

                {status === 'error' && (
                  <div role="alert" className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-5">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-white">Your message didn&rsquo;t send</p>
                        <p className="text-sm text-mist">{error}</p>
                        <p className="text-sm text-mist">
                          Try again, or{' '}
                          <a
                            href={mailtoHref || `mailto:${site.email}`}
                            data-cursor
                            className="font-semibold text-maven-lighter underline decoration-maven-light/40 underline-offset-4 transition-colors hover:text-white"
                          >
                            email it directly to {site.email}
                          </a>{' '}
                          — the link opens your email app with your answers pre-filled.
                        </p>
                        <button
                          type="button"
                          onClick={handleRetry}
                          data-cursor
                          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:border-maven-lighter/50 hover:bg-maven-lighter/[0.04]"
                        >
                          <RotateCcw size={14} aria-hidden="true" />
                          Retry
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-8">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-maven to-maven-light rounded-xl font-semibold text-white-solid hover:shadow-[0_8px_30px_rgba(97,44,139,0.4)] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
