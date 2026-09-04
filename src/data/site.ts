export interface Address {
  street: string
  city: string
  state: string
  zip: string
}

export const site = {
  name: 'Maven Marketing Group',
  shortName: 'Maven',
  tagline: 'Custom Built Websites',
  headline: ['We Build Websites', 'With A Purpose'],
  subhead:
    'We are a Chicago-based company, with clients all over the United States & world. Your vision mixed with our creative skills will always drive the best results.',
  founded: 2019,
  phone: '(847) 558-9957',
  phoneHref: 'tel:+18475589957',
  email: 'info@mavenmarketinggroup.com',
  address: {
    street: '715 Ela Rd.',
    city: 'Lake Zurich',
    state: 'IL',
    zip: '60047',
  } as Address,
  hours: 'Open Mon-Sun · 9:00 AM – 5:00 PM',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/mavenmg/' },
    { label: 'Facebook', href: 'https://www.facebook.com/mavenmg' },
    { label: 'Twitter', href: 'https://twitter.com/mavenmg' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mavenmg/' },
  ],
} as const

export const stats = [
  {
    value: 500,
    prefix: '$',
    suffix: 'M+',
    decimals: 0,
    label: 'Revenue Generated',
    description:
      'We have driven more than $1 billion in revenue for our clients through effective website management and digital marketing strategies.',
  },
  {
    value: 3.6,
    prefix: '',
    suffix: 'M+',
    decimals: 1,
    label: 'Leads Generated',
    description:
      'Qualified leads delivered to businesses through data-driven SEO, PPC and conversion-focused campaigns.',
  },
  {
    value: 300,
    prefix: '',
    suffix: '+',
    decimals: 0,
    label: 'Businesses Helped',
    description:
      'From startups to established enterprises, across the US and around the world. We help every business grow its presence, its traffic and its revenue online.',
  },
] as const

export const partners = [
  { src: '/images/partners/woo.webp', alt: 'Certified WooCommerce Partner' },
  { src: '/images/partners/google.png', alt: 'Google Partner' },
  { src: '/images/partners/shopify.png', alt: 'Shopify Certified Partner' },
  { src: '/images/partners/hubspot.webp', alt: 'HubSpot Platinum Partner' },
  { src: '/images/partners/meta.png', alt: 'Meta Business Partner' },
  { src: '/images/partners/bigcommerce.png', alt: 'BigCommerce Certified Partner' },
  { src: '/images/partners/wordpress.png', alt: 'WordPress Partner' },
  { src: '/images/partners/semrush.png', alt: 'Semrush Partner' },
]
