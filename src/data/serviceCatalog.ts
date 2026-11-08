export interface ServiceCatalogLink {
  label: string
  href: string
}

export interface ServiceCatalogCategory {
  /** Anchor id used by the services page. */
  id: string
  title: string
  /** Short line shown above the title. */
  tagline: string
  description: string
  /** Optional pill next to the title, e.g. "NEW". */
  badge?: string
  items: ServiceCatalogLink[]
  cta: ServiceCatalogLink
}

/**
 * The complete Maven offering, grouped the way the Services mega menu groups
 * it. Each category renders as its own big-title block on /services; items
 * link to the matching detail page, or to /contact where no page exists yet.
 */
export const serviceCatalog: ServiceCatalogCategory[] = [
  {
    id: 'seo-aeo',
    title: 'SEO & AEO',
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
    cta: { label: 'Explore SEO & AEO', href: '/services/seo' },
  },
  {
    id: 'web-design-development',
    title: 'Web Design & Development',
    tagline: 'Design that converts, code that scales.',
    description:
      'Custom websites and web applications designed around your brand and engineered for speed, security and growth.',
    items: [
      { label: 'Custom Web Design', href: '/services/web-design' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'Website Redesigns', href: '/services/web-design' },
      { label: 'E-commerce', href: '/services/ecommerce' },
      { label: 'Logo & Branding', href: '/services/logo-branding' },
    ],
    cta: { label: 'Explore design & development', href: '/services/web-design' },
  },
  {
    id: 'website-management',
    title: 'Website Management & Maintenance',
    tagline: 'Your site, fully handled.',
    description:
      'Updates, hosting, monitoring and content handled for you every month, backed by a 99.9% up-time guarantee.',
    items: [
      { label: 'Website Maintenance Plans', href: '/services/website-management' },
      { label: 'E-commerce Website Management', href: '/services/website-management' },
      { label: 'Managed Hosting & Speed', href: '/services/website-management' },
    ],
    cta: { label: 'Compare plans', href: '/services#management-plans' },
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tagline: 'Campaigns measured in revenue.',
    description:
      'PPC, social, content and lead generation run end-to-end and measured by the leads and sales they bring in.',
    items: [
      { label: 'PPC & Google Ads', href: '/services/digital-marketing' },
      { label: 'Social Media Marketing', href: '/services/digital-marketing' },
      { label: 'Content Marketing', href: '/services/digital-marketing' },
      { label: 'Lead Generation & CRO', href: '/services/digital-marketing' },
    ],
    cta: { label: 'Explore digital marketing', href: '/services/digital-marketing' },
  },
  {
    id: 'ai-consulting',
    title: 'AI Consulting',
    tagline: 'Practical AI, real workflows.',
    description:
      'From strategy to AI agents: automation and integrations built around the way your team already works.',
    items: [
      { label: 'AI Strategy & Roadmapping', href: '/services/ai-consulting' },
      { label: 'AI Implementation & Integration', href: '/services/ai-consulting' },
      { label: 'AI Automation', href: '/services/ai-consulting' },
      { label: 'AI Agents', href: '/services/ai-consulting' },
    ],
    cta: { label: 'Explore AI consulting', href: '/services/ai-consulting' },
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    tagline: 'Stay ahead of the threats.',
    description:
      'Penetration testing, compliance readiness and audit support that keep your business out of the headlines.',
    badge: 'NEW',
    items: [
      { label: 'Penetration Testing', href: '/services/cyber-security' },
      { label: 'Compliance Readiness', href: '/services/cyber-security' },
      { label: 'Attestation & Audit Support', href: '/services/cyber-security' },
    ],
    cta: { label: 'Explore cyber security', href: '/services/cyber-security' },
  },
]
