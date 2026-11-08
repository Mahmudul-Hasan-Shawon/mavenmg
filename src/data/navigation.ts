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
  { label: 'AI Consulting', href: '/services/ai-consulting' },
  { label: 'Cyber Security', href: '/services/cyber-security' },
]

export interface ServicesMenuItem {
  label: string
  href: string
}

export interface ServicesMenuColumn {
  title: string
  href: string
  /** Short line shown under the title in the category list. */
  tagline: string
  /** Longer copy shown in the preview pane when the category is active. */
  description: string
  /** Small pill shown next to the title, e.g. "NEW". */
  badge?: string
  items: ServicesMenuItem[]
  /** Call-out link under the items, e.g. "View All SEO Services". */
  cta?: ServicesMenuItem
}

/** The desktop Services mega menu: interactive category list + preview pane. */
export const servicesMenu: { columns: ServicesMenuColumn[]; note: string; links: ServicesMenuItem[] } = {
  columns: [
    {
      title: 'SEO & AEO',
      href: '/services/seo',
      tagline: 'Rank higher, get recommended by AI.',
      description:
        'Technical SEO, local visibility and answer-engine optimization that put you in front of people searching, clicking and buying.',
      items: [
        { label: 'AEO & GEO', href: '/services/seo' },
        { label: 'Technical SEO', href: '/services/seo' },
        { label: 'Local SEO', href: '/services/seo' },
        { label: 'SEO Content', href: '/services/seo' },
        { label: 'Keyword Research', href: '/services/seo' },
      ],
      cta: { label: 'View All SEO Services', href: '/services/seo' },
    },
    {
      title: 'Web Design & Development',
      href: '/services/web-design',
      tagline: 'Design that converts, code that scales.',
      description:
        'Custom websites and web applications designed around your brand and engineered for speed, security and growth.',
      items: [
        { label: 'Custom Web Design', href: '/services/web-design' },
        { label: 'Web Development', href: '/services/web-development' },
        { label: 'Website Redesigns', href: '/services/web-design' },
        { label: 'E-commerce', href: '/services/ecommerce' },
      ],
    },
    {
      title: 'Website Management & Maintenance',
      href: '/services/website-management',
      tagline: 'Your site, fully handled.',
      description:
        'Updates, hosting, monitoring and content handled for you every month, backed by a 99.9% up-time guarantee.',
      items: [
        { label: 'Website Maintenance Plans', href: '/services/website-management' },
        { label: 'E-commerce Website Management', href: '/services/website-management' },
        { label: 'Managed Hosting & Speed', href: '/services/website-management' },
      ],
      cta: { label: 'Compare Plans', href: '/services/website-management' },
    },
    {
      title: 'Digital Marketing',
      href: '/services/digital-marketing',
      tagline: 'Campaigns measured in revenue.',
      description:
        'PPC, social, content and lead generation run end-to-end and measured by the leads and sales they bring in.',
      items: [
        { label: 'PPC & Google Ads', href: '/services/digital-marketing' },
        { label: 'Social Media Marketing', href: '/services/digital-marketing' },
        { label: 'Content Marketing', href: '/services/digital-marketing' },
        { label: 'Lead Generation & CRO', href: '/services/digital-marketing' },
      ],
    },
    {
      title: 'AI Consulting',
      href: '/services/ai-consulting',
      tagline: 'Practical AI, real workflows.',
      description:
        'From strategy to AI agents: automation and integrations built around the way your team already works.',
      items: [
        { label: 'AI Strategy & Roadmapping', href: '/services/ai-consulting' },
        { label: 'AI Implementation & Integration', href: '/services/ai-consulting' },
        { label: 'AI Automation', href: '/services/ai-consulting' },
        { label: 'AI Agents', href: '/services/ai-consulting' },
      ],
      cta: { label: 'View All AI Services', href: '/services/ai-consulting' },
    },
    {
      title: 'Cyber Security',
      href: '/services/cyber-security',
      tagline: 'Stay ahead of the threats.',
      description:
        'Penetration testing, compliance readiness and audit support that keep your business out of the headlines.',
      badge: 'NEW',
      items: [
        { label: 'Penetration Testing', href: '/services/cyber-security' },
        { label: 'Compliance Readiness', href: '/services/cyber-security' },
        { label: 'Attestation & Audit Support', href: '/services/cyber-security' },
      ],
      cta: { label: 'View All Cyber Security Services', href: '/services/cyber-security' },
    },
  ],
  note: "Not sure which service you need? Tell us what you're trying to accomplish and a Marketing Maven will recommend the right mix.",
  links: [
    { label: 'All Services', href: '/services' },
    { label: 'Start Your Project', href: '/contact' },
  ],
}
