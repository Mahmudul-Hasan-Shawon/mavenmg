import { Code, Megaphone } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/text/Eyebrow'
import { cn } from '../utils/cn'

interface MavensTeamProps {
  /** Unique section id, anchors and CSS scoping stay unambiguous. */
  id: string
  /**
   * Section spacing classes, owned by the call site (cn() is a plain joiner,
   * so the component ships no default padding that could conflict).
   */
  className: string
}

/**
 * MavensTeam, "The Experts Behind Your Success". Team photo beside two glass
 * discipline cards (Web Masters / Online Marketers). Shared by the Home and
 * Work pages; each page supplies its own id and vertical spacing.
 */
export function MavensTeam({ id, className }: MavensTeamProps) {
  return (
    <section id={id} className={cn('section relative overflow-hidden', className)} aria-label="The Marketing Mavens team">
      <div className="container-maven">
        <Reveal>
          <div className="text-start mb-16">
            <Eyebrow label="The Marketing Mavens" className="mb-6" />
            <h2 className="font-bold mb-4 leading-[1.05] text-[clamp(2rem,8vw,3.4rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)]">
              <span className="text-white">The Experts Behind</span>{' '}
              <span className="block text-maven-light">Your Success</span>
            </h2>
            <p className="text-mist max-w-2xl text-lg leading-relaxed">
              At Maven, we bring together the finest minds in digital strategy and web design, our
              team known as the Marketing Mavens. These elite online marketers and web masters are
              your gateway to transcending the ordinary and achieving the extraordinary in the
              digital realm.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-8 md:mb-14">
          <Reveal className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#612C8B]/30 to-[#8B4FBF]/30 blur-2xl" aria-hidden="true" />
            <img
              alt="The Maven Marketing team collaborating in the studio"
              className="relative rounded-3xl w-full h-full min-h-[420px] object-cover border border-line"
              loading="lazy"
              src="/images/team.jpg"
            />
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-8 hover:border-maven-light/30 transition-all duration-500">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-maven/20 flex items-center justify-center flex-shrink-0">
                    <Code size={24} className="text-maven-light" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold">Our Web Masters</h3>
                </div>
                <p className="text-mist leading-relaxed text-base">
                  Commanding the latest in technology and design trends, our web masters don't just
                  build websites; they craft powerhouse platforms that are optimized for SEO and
                  designed to convert visitors into customers, setting the stage for sustainable
                  business growth.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass rounded-3xl p-8 hover:border-maven-light/30 transition-all duration-500">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-maven-light/20 flex items-center justify-center flex-shrink-0">
                    <Megaphone size={24} className="text-maven-light" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold">Our Online Marketers</h3>
                </div>
                <p className="text-mist leading-relaxed text-base">
                  With precision, our online marketers devise and execute bespoke digital marketing
                  campaigns. Utilizing a mix of SEO, content marketing, and targeted social media
                  strategies, they ensure that your brand doesn't just participate but dominates in
                  your industry.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
