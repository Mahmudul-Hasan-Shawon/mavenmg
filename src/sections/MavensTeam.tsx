import { Reveal } from '../components/ui/Reveal'

/**
 * MavensTeam — "The Experts Behind Your Success". Team photo beside two glass
 * discipline cards (Web Masters / Online Marketers).
 */
export function MavensTeam() {
  return (
    <section className="section py-32 relative overflow-hidden" aria-label="The Marketing Mavens team">
      <div className="container-maven">
        <Reveal>
          <div className="text-start mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="index-tag">06</span>
              <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              <span className="mono-label !text-mist">The Marketing Mavens</span>
            </div>
            <h2 className="font-black mb-4 leading-[1.05] text-[clamp(2rem,8vw,3.4rem)] md:text-[clamp(2.5rem,5.5vw,4.5rem)]">
              <span className="text-white">The Experts Behind</span>{' '}
              <span className="block text-maven-light">Your Success</span>
            </h2>
            <p className="text-mist max-w-2xl text-lg leading-relaxed">
              At Maven, we bring together the finest minds in digital strategy and web design — our
              team known as the Marketing Mavens. These elite online marketers and web masters are
              your gateway to transcending the ordinary and achieving the extraordinary in the
              digital realm.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mb-14">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-code text-maven-light"
                      aria-hidden="true"
                    >
                      <path d="m16 18 6-6-6-6"></path>
                      <path d="m8 6-6 6 6 6"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-black">Our Web Masters</h3>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-megaphone text-maven-light"
                      aria-hidden="true"
                    >
                      <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"></path>
                      <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"></path>
                      <path d="M8 6v8"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-black">Our Online Marketers</h3>
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
