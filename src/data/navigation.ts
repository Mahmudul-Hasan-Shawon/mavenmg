export interface NavLink {
  label: string
  href: string
  index: string
}

export const navigation: NavLink[] = [
  { label: 'HOME', href: '/', index: '01' },
  { label: 'WORK', href: '/work', index: '02' },
  { label: 'SERVICES', href: '/services', index: '03' },
  { label: 'ABOUT', href: '/about', index: '04' },
  { label: 'CONTACT', href: '/contact', index: '05' },
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
