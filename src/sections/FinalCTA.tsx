import { ArrowRight } from 'lucide-react'

export function FinalCTA({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section className="pt-16 pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center"
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/10 via-[#8049ac ]/25 to-[#0A0A0F]/0" />

          <div className="relative z-10 text-left">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white-solid">Start Your Success Story</h2>
            <p className="text-white-solid/70 text-lg mb-8 max-w-xl">
              Connect With A Marketing Maven Now. Elevate your website and supercharge your digital marketing results.
            </p>
            <a
              onClick={() => onNavigate('/contact')}
              className="flex w-full items-center justify-center gap-2 px-8 py-4 bg-[#ffffff14] backdrop-blur-[10px] text-white rounded-full font-bold text-base sm:inline-flex sm:w-auto sm:px-10 sm:text-lg hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              Start Your Project
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
