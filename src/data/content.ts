export interface Reason {
  index: string
  title: string
  description: string
}

export const reasons: Reason[] = [
  {
    index: '01',
    title: 'We Implement, Not Just Recommend',
    description:
      'The team that plans the work builds it, on your site, in your stack. No slide decks that sit in a folder.',
  },
  {
    index: '02',
    title: 'One Team Across Growth and Governance',
    description:
      'Search, websites, AI and security are planned together, so a fix never bounces between three vendors.',
  },
  {
    index: '03',
    title: 'Measured by Leads and Revenue',
    description:
      '$500M+ in client revenue and 3.6M+ leads. We report on what the business sees, not on vanity metrics.',
  },
  {
    index: '04',
    title: 'Chicago-Area Offices, Clients Nationwide',
    description:
      'Lake Zurich and Deerfield, Illinois, with remote delivery across the US and on-site work in Chicagoland.',
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
  headline: 'Simple beliefs,',
  headlineAccent: 'serious results',
  manifesto:
    'Fancy does not pay invoices. Every site we ship and every campaign we run is built for one audience, your future customer, and judged by one verdict: the numbers you care about.',
  beliefs: [
    {
      num: '01',
      key: 'clarity',
      title: 'Clarity beats clever',
      body: 'The best-performing pages are the easiest to understand. We strip away the noise until your offer, your message and the next step are impossible to miss.',
    },
    {
      num: '02',
      key: 'vision',
      title: 'Vision before pixels',
      body: 'Every project starts with where you are going: the market you want, the customers you want, and the number that proves it. Design is how we get there, not why.',
    },
    {
      num: '03',
      key: 'momentum',
      title: 'Momentum over perfection',
      body: 'We ship strong, then sharpen with real data. A good page live this month teaches more than a perfect one stuck in review for a quarter.',
    },
    {
      num: '04',
      key: 'ownership',
      title: 'Your numbers are the grade',
      body: 'Traffic, leads, revenue, retention. If a change does not move a metric you care about, it does not count as work done.',
    },
  ],
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
