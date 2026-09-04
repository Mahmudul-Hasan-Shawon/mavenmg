export interface Service {
  id: string
  index: string
  icon: 'globe' | 'settings' | 'search' | 'trending'
  title: string
  features: string[]
  description: string
  longDescription: string
  highlights: string[]
}

export const services: Service[] = [
  {
    id: 'web-design',
    index: '01',
    icon: 'globe',
    title: 'Custom Website Solutions',
    features: ['Custom Web Design', 'Custom Web Development', 'Website Redesign', 'Ecommerce'],
    description:
      'Responsive, custom-designed websites that fit your business — from personal sites to enterprise platforms, with e-commerce capability built in.',
    longDescription:
      'Whether you need a personal website designer or an enterprise-level website — Maven Marketing Group will provide affordable web design services that fit your business needs.',
    highlights: ['Responsive on all devices', 'Custom designed', 'E-commerce Capabilities'],
  },
  {
    id: 'management',
    index: '02',
    icon: 'settings',
    title: 'Website Management',
    features: ['Web Maintenance', 'Dedicated Management', 'Content Strategy', 'Rebrand'],
    description:
      'Your site, kept running smoothly. Monitoring, core and plugin updates, routine content updates — with a 99.9% up-time guarantee.',
    longDescription:
      'We offer website management services to ensure your website is up and running with a 99.9% up-time guarantee.',
    highlights: [
      'Website monitoring',
      'Website core updates',
      'Website plugin updates',
      'Routine content updates',
    ],
  },
  {
    id: 'seo',
    index: '03',
    icon: 'search',
    title: 'Search Engine Optimization',
    features: ['SEO', 'Conversion Rate Optimization', 'Lead Generation'],
    description:
      'Strategies that rank higher, drive qualified inbound traffic and convert — on-page, technical, link building and reporting.',
    longDescription:
      'Maven Marketing Group provides digital marketing services to companies all over the world who are needing to generate more inbound traffic to their websites.',
    highlights: ['On-page SEO', 'Technical SEO', 'Link building', 'Analytics & reporting'],
  },
  {
    id: 'marketing',
    index: '04',
    icon: 'trending',
    title: 'Digital Marketing',
    features: ['PPC/Google Ads', 'Social Media Marketing', 'Content Marketing', 'Logo Design'],
    description:
      'Campaigns that generate leads, land new clients and increase sales — Google Ads, social, content and brand identity.',
    longDescription:
      'Companies all around the world use our freelance digital marketing services to generate leads, land new clients, & increase sales!',
    highlights: ['Logo Design', 'Social Media Marketing', 'Google Ads', 'SEO', 'Lead Generation'],
  },
]

export interface Package {
  icon: 'palette' | 'settings' | 'trending'
  name: string
  blurb: string
  features: string[]
}

export const packages: Package[] = [
  {
    icon: 'palette',
    name: 'Web Design Packages',
    blurb: 'Custom-built, responsive websites designed to convert.',
    features: [
      'Responsive design',
      'Custom-designed websites',
      'E-commerce capabilities',
      'Custom web development',
      'Website redesign',
    ],
  },
  {
    icon: 'settings',
    name: 'Website Management Services',
    blurb: 'Keep your site fast, secure, and always up to date.',
    features: [
      '99.9% uptime guarantee',
      'Continuous monitoring',
      'Regular updates',
      'Content updates',
      'Dedicated management',
      'Content strategy',
      'Rebrand',
    ],
  },
  {
    icon: 'trending',
    name: 'Digital Marketing Services',
    blurb: 'Data-driven campaigns that grow your leads and sales.',
    features: [
      'Logo design',
      'Social media marketing',
      'Google Ads / PPC',
      'SEO',
      'Lead generation',
      'Conversion rate optimization',
      'Content marketing',
    ],
  },
]
