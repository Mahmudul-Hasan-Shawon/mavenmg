import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'

export function FinalCTA({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section id="final-cta" className="pt-4 pb-20 px-6 md:pt-16 md:pb-32">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center shadow-[0_20px_50px_-20px_rgba(97,44,139,0.5)]"
          style={{
            background: 'linear-gradient(135deg, rgba(74,31,107,0.96) 0%, rgba(97,44,139,0.92) 40%, rgba(139,79,191,0.9) 100%)',
          }}
        >
          <img
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/success.png"
            style={{ maskImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 10%, rgb(0,0,0) 100%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/50 via-[#8049ac ]/25 to-[#0A0A0F]/0" />

          <div className="relative z-10 text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white-solid">Start Your Success Story</h2>
            <p className="text-white-solid/70 text-lg mb-8 max-w-xl">
              Connect With A Marketing Maven Now. Elevate your website and supercharge your digital marketing results.
            </p>
            <MagneticButton
              variant="frost"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => onNavigate('/contact')}
            >
              Start Your Project
              <ArrowRight size={20} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
