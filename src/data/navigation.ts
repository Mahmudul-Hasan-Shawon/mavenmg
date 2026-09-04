export interface NavLink {
  label: string
  href: string
  index: string
}

export const navigation: NavLink[] = [
  { label: 'Work', href: '/work', index: '01' },
  { label: 'Services', href: '/services', index: '02' },
  { label: 'About', href: '/about', index: '03' },
  { label: 'Mavens', href: '/about#mavens', index: '04' },
  { label: 'Contact', href: '/contact', index: '05' },
]

export const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookie Policy', href: '#' },
]

export const footerServices = [
  'Custom Website Design',
  'Website Development',
  'Website Management',
  'SEO Services',
  'Digital Marketing',
  'E-commerce Solutions',
  'Logo & Branding',
]
