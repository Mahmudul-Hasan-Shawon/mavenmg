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
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cookie Policy', href: '/cookie-policy' },
]

export const footerNavigation: NavLink[] = [
  ...navigation,
  { label: 'SITEMAP', href: '/sitemap', index: '06' },
  { label: 'BLOG', href: '/blog', index: '07' },
]

export const footerServices: { label: string; href: string }[] = [
  { label: 'Custom Website Design', href: '/services/web-design' },
  { label: 'Website Development', href: '/services/web-development' },
  { label: 'Website Management', href: '/services/website-management' },
  { label: 'SEO Services', href: '/services/seo' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'E-commerce Solutions', href: '/services/ecommerce' },
  { label: 'Logo & Branding', href: '/services/logo-branding' },
]
