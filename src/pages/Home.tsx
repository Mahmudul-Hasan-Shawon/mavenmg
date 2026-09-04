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
      <WhyMaven />
      <Results />
      <Philosophy />
      <WorkShowcase onNavigate={onNavigate} />
      <Mavens />
      <Testimonials />
      <Story onNavigate={onNavigate} />
      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
