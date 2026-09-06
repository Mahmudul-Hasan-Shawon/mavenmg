export interface Project {
  id: number
  name: string
  category: string
  services: string
  color: string
  featured?: boolean
  image: string
  blurb: string
  url?: string
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'HAQ Pickle\nPickleball',
    category: 'E-Commerce',
    services: 'Website Design, Website Development, Website Management',
    color: '#E85D04',
    featured: true,
    image: '/images/projects/p1.jpg',
    blurb: 'Started as a fun idea between a father and son, now a booming e-commerce brand.',
    url: 'https://haqpickle.com/',
  },
  {
    id: 2,
    name: 'Pirtano Construction',
    category: 'Construction & Real Estate',
    services: 'Website Design, Website Development, Website Management',
    color: '#2D6A4F',
    image: '/images/projects/p2.jpg',
    blurb: 'Showcasing featured projects with sharp townhome infrastructure craftsmanship.',
  },
  {
    id: 3,
    name: 'LSC Development',
    category: 'Construction & Real Estate',
    services: 'Website Design, Website Development, Website Management',
    color: '#1A1A2E',
    image: '/images/projects/p3.jpg',
    blurb: 'A functional, easy-to-update site for communicating modern developments.',
    url: 'https://lscdevelopment.com/',
  },
  {
    id: 4,
    name: 'CRX Engines',
    category: 'Manufacturing',
    services: 'Website Design, Website Development',
    color: '#3B82F6',
    image: '/images/projects/p4.jpg',
    blurb: 'A tough, performance-focused site for an engine manufacturing brand.',
    url: 'https://crxengines.com/',
  },
  {
    id: 5,
    name: 'Simpson Cleaning',
    category: 'Manufacturing',
    services: 'Website Design, Website Development, Website Management',
    color: '#0D7377',
    image: '/images/projects/p5.jpg',
    blurb: 'Swooped in to save the brand with a tough, slick, all-American redesign.',
    url: 'https://simpsoncleaning.com/',
  },
  {
    id: 6,
    name: 'GXC Inc',
    category: 'Other',
    services: 'Website Design, Website Development, Website Management',
    color: '#7B2CBF',
    image: '/images/projects/p6.jpg',
    blurb: 'A custom web presence built to convert visitors into customers.',
    url: 'https://gxc-inc.com/',
  },
  {
    id: 7,
    name: 'TorHoerman Law',
    category: 'Law Firms',
    services: 'Website Design, Website Development, Website Management',
    color: '#C77DFF',
    image: '/images/projects/p7.jpg',
    blurb: 'A professionalized site that cemented a top-tier presence in the industry.',
    url: 'https://www.torhoermanlaw.com/',
  },
  {
    id: 8,
    name: 'Waggon',
    category: 'Other',
    services: 'Website Design, Website Development, Website Management, Digital Marketing',
    color: '#E85D04',
    image: '/images/projects/p8.jpg',
    blurb: 'A bespoke site with full digital marketing to match standout branding.',
    url: 'https://waggon.io/',
  },
  {
    id: 9,
    name: 'Kieth Law Group',
    category: 'Law Firms',
    services: 'Website Design, Website Development, Website Management',
    color: '#612C8B',
    image: '/images/projects/p9.jpg',
    blurb: 'Clean, trust-building design with ongoing management and maintenance.',
    url: 'https://keithlawgroup.com/',
  },
  {
    id: 10,
    name: 'Crypto Cache',
    category: 'E-Commerce',
    services: 'Website Design, Website Development, Website Management',
    color: '#FAA307',
    image: '/images/projects/p10.jpg',
    blurb: 'A bold, cutting-edge crypto-savvy design with flawless management.',
    url: 'https://cryptocache.tech/',
  },
  {
    id: 11,
    name: 'Blueberry',
    category: 'Other',
    services: 'Website Design, Website Development, Website Management',
    color: '#4A1F6B',
    image: '/images/projects/p11.jpg',
    blurb: 'A sleek, futuristic DeFi experience that pulls the brand onto the screen.',
    url: 'https://www.blueberry.garden/',
  },
]

export const projectCategories = [
  'All',
  'Construction & Real Estate',
  'E-Commerce',
  'Law Firms',
  'Manufacturing',
  'Other',
]
