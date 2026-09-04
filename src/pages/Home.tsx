import { Hero } from '../sections/Hero'
import { Partners } from '../sections/Partners'
import { Services } from '../sections/Services'
import { WhyMaven } from '../sections/WhyMaven'
import { Results } from '../sections/Results'
import { Philosophy } from '../sections/Philosophy'
import { WorkShowcase } from '../sections/WorkShowcase'
import { Mavens } from '../sections/Mavens'
import { Testimonials } from '../sections/Testimonials'
import { Story } from '../sections/Story'
import { FinalCTA } from '../sections/FinalCTA'

/** The full narrative experience — Maven's home page. */
export default function Home({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Partners />
      <Services onNavigate={onNavigate} />

      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" style={{ opacity: 1, transform: "none" }}>
            <div>
              <h3 className="text-2xl md:text-8xl font-black mb-6">
                The <span className="text-[#fffeff]">Marketing</span>
                <span className="text-[#612c8b]"> Mavens</span>
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                At Maven, we bring together the finest minds in digital strategy and web design.
                Our web masters craft powerhouse platforms optimized for SEO, and our online
                marketers devise bespoke digital marketing campaigns that dominate industries.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-[#DACAFF]/5 to-[#8B4FBF]/15 blur-2xl" />
              <img
                alt="The Marketing Mavens"
                className="relative rounded-3xl w-full object-cover"
                loading="lazy"
                src="/images/maven.png"
              />
            </div>
          </div>
        </div>
      </section>

      <WhyMaven />
      <Results />
      <Philosophy />
      <WorkShowcase onNavigate={onNavigate} limit={6} />
      <Mavens />
      <Testimonials />
      <Story onNavigate={onNavigate} />
      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
