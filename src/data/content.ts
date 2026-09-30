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
      'Every business is unique. We craft tailor-made web design and marketing strategies that align perfectly with your specific business goals and brand identity. Every site is designed around your business and the customers you are actually trying to reach.'
  },
  {
    index: '02',
    title: 'Expertise and Experience',
    description:
      'With years of experience in web development and digital marketing, Maven has a deep understanding of the digital landscape and the latest technologies and trends. ',
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
      'Clear communication, regular updates, and ongoing support, we pride ourselves on service that ensures your needs are met and exceeded.',
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
      'Our designs are not just functional but aesthetically pleasing, engaging, user-friendly websites that stand out and align with the latest design standards.',
  },
  {
    index: '07',
    title: 'Commitment to Excellence',
    description:
      'Every project is handled with the utmost care and attention to detail. We pride ourselves on exceeding client expectations.',
  },
]

export const mavens = {
  eyebrow: 'The Marketing Mavens',
  headline: 'Elevating Digital Excellence',
  sub: 'Meet the Marketing Mavens',
  intro:
    'At Maven, we bring together the finest minds in digital strategy and web design, our team known as the Marketing Mavens. These elite online marketers and web masters are your gateway to transcending the ordinary and achieving the extraordinary in the digital realm.',
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

export const philosophy = {
  eyebrow: 'Our Philosophy',
  vision:
    'We excel in crafting custom websites and marketing strategies that truly connect with your audience. Every design decision is made with your audience in mind, blending aesthetics with performance to create digital experiences that resonate and convert.',
  mission:
    'As a leading website management and digital marketing agency, our expertise covers website management, conversion rate optimization, SEO, and UI/UX design, offering a comprehensive approach that consistently delivers results.',
}

/** About page hero stats, mirroring mavenmarketinggroup.com/about. */
export const aboutStats = [
  { value: '2019', label: 'Founded in the Chicago area' },
  { value: '300+', label: 'Businesses helped' },
  { value: '3.6M+', label: 'Leads generated for clients' },
  { value: '$500M+', label: 'Revenue generated for clients' },
]

export interface AboutService {
  title: string
  description: string
  items: string[]
}

/** "What We Do" offerings on the About page. */
export const aboutServices: AboutService[] = [
  {
    title: 'Custom Websites',
    description: 'Custom design and development built around your brand and the people you sell to.',
    items: ['Custom web design', 'Web development', 'Website redesigns', 'E-commerce'],
  },
  {
    title: 'Website Management',
    description: 'Ongoing care that keeps your site fast, secure and up to date.',
    items: ['Web maintenance', 'Dedicated management', 'Content strategy', 'Rebrands'],
  },
  {
    title: 'Search Engine Optimization',
    description: 'Search strategy that turns rankings into leads and sales.',
    items: ['SEO', 'Conversion rate optimization', 'Lead generation'],
  },
  {
    title: 'Digital Marketing',
    description: 'Campaigns that put your brand in front of the right customers.',
    items: ['PPC and Google Ads', 'Social media marketing', 'Content marketing', 'Logo design'],
  },
]

/** "How We Work" expectations on the About page. */
export const aboutExpect = [
  {
    title: 'Built for your business',
    description: 'No template with your logo dropped in. Every site is designed around your goals, your brand and your customers.',
  },
  {
    title: 'Measured by results',
    description: 'We track leads, conversions and revenue, and use that data to decide what to improve next.',
  },
  {
    title: 'Here after launch',
    description: 'Launch day is the start. We keep your site updated and performing as web standards and technology change.',
  },
  {
    title: 'Easy to reach',
    description: "Clear communication, regular updates and a team that's always a call or an email away.",
  },
]

export const aboutTestimonial = {
  quote:
    'Connor and his team were absolutely fantastic. They professionalized our website and have helped us cement ourselves as a top-notch provider in the Security Industry. I wish I had found them sooner!',
  author: 'Genaro Cavazos',
  role: 'Chief Executive Officer',
}

export const aboutTeam = [
  { initials: 'CM', name: 'Connor McNerney', role: 'President & Managing Member' },
  { initials: 'KD', name: 'Kolton Durment', role: 'Chief Technical Officer' },
  { initials: 'DR', name: 'David Rodriguez', role: 'Executive Administrator' },
]
