export interface Reason {
  index: string
  title: string
  description: string
}

export const reasons: Reason[] = [
  {
    index: '01',
    title: 'Custom Website Solutions',
    description:
      'Every business is unique. We craft tailor-made web design and marketing strategies that align perfectly with your specific business goals and brand identity.',
  },
  {
    index: '02',
    title: 'Expertise and Experience',
    description:
      'With years of experience in web development and digital marketing, Maven has a deep understanding of the digital landscape and the latest technologies and trends.',
  },
  {
    index: '03',
    title: 'Results-Driven Approach',
    description:
      'Our focus is on delivering measurable results and increasing your bottom line, with data-driven strategies where every marketing dollar contributes to your objectives.',
  },
  {
    index: '04',
    title: 'Exceptional Customer Service',
    description:
      'Clear communication, regular updates, and ongoing support — we pride ourselves on service that ensures your needs are met and exceeded.',
  },
  {
    index: '05',
    title: 'Ongoing Management & Maintenance',
    description:
      "Our job doesn't end at launch. Maven provides continuous support and maintenance to ensure your site stays updated, secure and fast.",
  },
  {
    index: '06',
    title: 'Innovative & Creative Design',
    description:
      'Our designs are not just functional but aesthetically pleasing — engaging, user-friendly websites that stand out and align with the latest design standards.',
  },
  {
    index: '07',
    title: 'Commitment to Excellence',
    description:
      'Every project is handled with the utmost care and attention to detail. We pride ourselves on exceeding client expectations.',
  },
]

export interface Value {
  title: string
  description: string
}

export const values: Value[] = [
  {
    title: 'Innovation',
    description: 'Staying ahead of the curve with the latest technologies and design trends.',
  },
  {
    title: 'Results',
    description: 'Every decision is made with your bottom line in mind.',
  },
  {
    title: 'Partnership',
    description: 'We treat our clients like partners, not just numbers.',
  },
  {
    title: 'Excellence',
    description: 'We never settle for "good enough" — we strive for outstanding.',
  },
]

export const mavens = {
  eyebrow: 'The Marketing Mavens',
  headline: 'Elevating Digital Excellence',
  sub: 'Meet the Marketing Mavens',
  intro:
    'At Maven, we bring together the finest minds in digital strategy and web design — our team known as the Marketing Mavens. These elite online marketers and web masters are your gateway to transcending the ordinary and achieving the extraordinary in the digital realm.',
  webMasters: {
    label: 'Web Masters',
    body: "Commanding the latest in technology and design trends, our web masters don't just build websites; they craft powerhouse platforms that are optimized for SEO and designed to convert visitors into customers, setting the stage for sustainable business growth.",
  },
  marketers: {
    label: 'Online Marketers',
    body: 'With precision, our online marketers devise and execute bespoke digital marketing campaigns. Utilizing a mix of SEO, content marketing, and targeted social media strategies, they ensure that your brand doesn’t just participate but dominates in your industry.',
  },
  callout:
    'Join forces with the Marketing Mavens, where every click is an opportunity, and every strategy is tailored for your triumph.',
}

export interface StoryEntry {
  year: string
  title: string
  body: string
}

export const story: StoryEntry[] = [
  {
    year: '2019',
    title: 'Founded in Lake Zurich',
    body: 'Maven Marketing Group was founded on the core principle of bringing small businesses into the digital age — a Chicago-based company with clients all over the United States and the world.',
  },
  {
    year: 'Design',
    title: 'Custom Website Solutions',
    body: 'We matured into a full-stack digital marketing agency offering high-quality web design packages — custom, responsive websites built to convert.',
  },
  {
    year: 'Care',
    title: 'Website Management',
    body: 'Beyond launch, we keep sites up and running with monitoring, updates and content support — a 99.9% up-time guarantee.',
  },
  {
    year: 'Growth',
    title: 'Digital Marketing & SEO',
    body: 'Today our focus is the best freelance digital marketing experience you can find: SEO, PPC, content and strategy that drive measurable growth.',
  },
]

export const philosophy = {
  eyebrow: 'Our Philosophy',
  vision:
    'We excel in crafting custom websites and marketing strategies that truly connect with your audience. Every design decision is made with your audience in mind — blending aesthetics with performance to create digital experiences that resonate and convert.',
  mission:
    'As a leading website management and digital marketing agency, our expertise covers website management, conversion rate optimization, SEO, and UI/UX design — offering a comprehensive approach that consistently delivers results.',
}

export const visionMission = {
  title: 'The Best Web Design & Digital Marketing Agency',
  body: 'At Maven, we provide premier website design and marketing services. As a leading website management and digital marketing agency, our expertise covers website management, conversion rate optimization, SEO, and UI/UX design — offering a comprehensive approach that consistently delivers results.',
  callout:
    'We excel in crafting custom websites and marketing strategies that truly connect with your audience.',
}
