export type ServiceIcon =
  | 'layout'
  | 'code'
  | 'settings'
  | 'search'
  | 'megaphone'
  | 'cart'
  | 'palette'
  | 'target'
  | 'zap'
  | 'shield'
  | 'gauge'
  | 'refresh'
  | 'mail'
  | 'link'
  | 'share'
  | 'smartphone'
  | 'credit-card'
  | 'package'
  | 'pen'
  | 'layers'
  | 'file'
  | 'life-buoy'
  | 'trending'
  | 'rocket'
  | 'sparkles'
  | 'map-pin'
  | 'mouse'
  | 'server'
  | 'database'

export interface ServiceStat {
  /** Numeric value shown in the animated counter. */
  value: number
  prefix?: string
  suffix?: string
  /** Decimal places for the animated count. */
  decimals?: number
  label: string
}

export interface ServicePlan {
  name: string
  price: string
  priceNote: string
  blurb: string
  features: string[]
  featured?: boolean
}

export interface ServiceFaq {
  q: string
  a: string
}

export interface ServicePageData {
  /** Route slug, e.g. "web-design" → /services/web-design */
  slug: string
  /** Label used in the footer and cross-link navigation. */
  navLabel: string
  /** Short one-liner used on related-service cards. */
  blurb: string
  hero: {
    eyebrow: string
    title: string
    titleHighlight?: string[]
    accent: string
    accentHighlight?: string[]
    lede: string
    /** Words (case-insensitive) in the lede to render in solid maven-light. */
    ledeHighlight?: string[]
    image: string
    /** Optional light-theme variant of the hero art. */
    imageLight?: string
    imageAlt: string
  }
  stats: ServiceStat[]
  overview: {
    heading: string
    /** Words (case-insensitive) in the heading to render in solid maven-light. */
    headingHighlight?: string[]
    paragraphs: string[]
    bullets: string[]
    image: string
    imageAlt: string
  }
  includes: { icon: ServiceIcon; title: string; description: string }[]
  /** Optional: pages without a process array skip the How-it-works section. */
  process?: { title: string; description: string }[]
  plans: ServicePlan[]
  faq: ServiceFaq[]
  /** Related-service slugs to cross-link at the bottom of the page. */
  related: { slug: string; blurb: string }[]
  /** Optional partner/tool logos rendered as a strip. */
  tech?: { src: string; alt: string }[]
  /** Optional overrides for the shared Includes / Plans / FAQ headings. */
  headings?: {
    includes?: { eyebrow: string; title: string; accent?: string }
    plans?: { eyebrow: string; title: string; accent?: string; lede?: string }
    faq?: { eyebrow: string; title: string; accent?: string }
  }
}

export const servicePages: ServicePageData[] = [
  {
    slug: 'web-design',
    navLabel: 'Custom Website Design',
    blurb: 'Bespoke, conversion-focused websites built around your brand.',
    hero: {
      eyebrow: 'Custom Website Design',
      title: 'Websites designed to',
      titleHighlight: ['designed'],
      accent: 'convert & impress',
      accentHighlight: ['convert'],
      lede: 'Every business is different your website should be too. Maven crafts bespoke, conversion-focused websites that capture your brand, guide your visitors, and turn clicks into customers. No templates, no compromises.',
      image: '/images/Services/Custom Website Design/hero.jpg',
      imageAlt: 'Custom website design displayed on a laptop',
    },
    stats: [
      { value: 200, suffix: '+', label: 'Websites launched' },
      { value: 2.8, suffix: 'X', decimals: 1, label: 'Average conversion lift' },
      { value: 100, suffix: '%', label: 'Responsive by default' },
      { value: 98, label: 'Average Lighthouse score' },
    ],
    overview: {
      heading: 'Design that works as hard as you do',
      paragraphs: [
        'A great website is equal parts art and strategy. We start with your business goals and your visitors\u2019 behavior, then design an interface that looks stunning and quietly does its job guiding people toward the action you want them to take.',
        'Every page, button, and headline is placed with intent. The result is a website that feels unmistakably yours and performs measurably for your bottom line.',
      ],
      bullets: [
        'Custom UI/UX tailored to your real audience',
        'Strategic layouts engineered to convert',
        'Accessible and SEO-friendly from day one',
        'Pixel-perfect on every screen and device',
      ],
      image: '/images/Services/Custom Website Design/overview.png',
      imageAlt: 'Responsive web design across devices',
    },
    includes: [
      {
        icon: 'layout',
        title: 'Custom UI/UX Design',
        description: 'Interfaces designed around how your customers actually behave, not how a theme was built.',
      },
      {
        icon: 'mouse',
        title: 'Conversion-Focused Layouts',
        description: 'Copy, hierarchy, and calls-to-action placed where they drive measurable results.',
      },
      {
        icon: 'smartphone',
        title: 'Responsive & Mobile-First',
        description: 'Flawless experiences on every phone, tablet, and desktop screen from day one.',
      },
      {
        icon: 'palette',
        title: 'Brand-Aligned Visuals',
        description: 'Design systems built from your colors, typography, and personality not a generic look.',
      },
      {
        icon: 'gauge',
        title: 'Speed Optimized',
        description: 'Fast-loading pages keep visitors engaged and Google happy. Performance is in the build.',
      },
      {
        icon: 'shield',
        title: 'Accessible & Compliant',
        description: 'WCAG-friendly structure, semantic markup, and best practices so everyone can use your site.',
      },
    ],
    process: [
      { title: 'Discover', description: 'We dig into your business, audience, and goals to shape the right strategy.' },
      { title: 'Design', description: 'Wireframes evolve into polished, on-brand page designs you will love.' },
      { title: 'Build & Refine', description: 'We craft the site, then test, tweak, and polish every interaction.' },
      { title: 'Launch & Grow', description: 'We go live, verify performance, and set you up to keep improving.' },
    ],
    plans: [
      {
        name: 'Essentials',
        price: '$1,500+',
        priceNote: 'One-time',
        blurb: 'For startups and simple brochure sites that need to look great.',
        features: ['Up to 5 custom pages', 'Responsive on all devices', 'Basic SEO setup', 'Contact form & analytics'],
      },
      {
        name: 'Growth',
        price: '$3,000+',
        priceNote: 'One-time',
        blurb: 'Marketing-ready websites built to actively sell for you.',
        features: [
          'Up to 12 pages',
          'Custom UI/UX design',
          'Conversion-focused layout',
          'Blog & CMS setup',
          'Advanced SEO & speed optimization',
        ],
        featured: true,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        priceNote: 'Project-based',
        blurb: 'Complex, high-touch builds for established brands.',
        features: ['Unlimited pages & sections', 'Custom applications', 'Full design system', 'Ongoing optimization'],
      },
    ],
    faq: [
      {
        q: 'How long does a custom website take?',
        a: 'Most custom builds go live in 4–8 weeks depending on scope and content. We agree on a timeline up front and keep you updated at every milestone.',
      },
      {
        q: 'Do you use templates?',
        a: 'No. Every Maven website is designed and built from scratch around your business. You will never see your site on a template marketplace.',
      },
      {
        q: 'Will my site work well on mobile?',
        a: 'Absolutely. We design mobile-first and test on real devices, so your site looks and performs beautifully on phones, tablets, and desktops.',
      },
      {
        q: 'Can I update the website myself afterward?',
        a: 'Yes. We hand over an easy-to-use CMS and show you how to edit text, images, and pages. And if you prefer, our management plans cover it for you.',
      },
      {
        q: 'What if I already have a website?',
        a: 'We love redesigns. We audit what you have, keep what works, and rebuild the rest often lifting conversions within weeks of relaunch.',
      },
    ],
    related: [
      { slug: 'web-development', blurb: 'Clean, scalable code that makes your design fast, secure, and future-proof.' },
      { slug: 'ecommerce', blurb: 'High-converting storefronts built on the platforms your customers trust.' },
      { slug: 'logo-branding', blurb: 'A complete identity that makes your site and business unmistakable.' },
    ],
  },
  {
    slug: 'web-development',
    navLabel: 'Website Development',
    blurb: 'Clean, scalable code that performs beautifully under pressure.',
    hero: {
      eyebrow: 'Website Development',
      title: 'Development that turns',
      accent: 'ideas into products',
      accentHighlight: ['products'],
      lede: 'A design is only as good as the code behind it. Maven builds fast, secure, and scalable websites and web apps engineered to perform today and grow with your business tomorrow.',
      image: '/images/Services/Website Development/hero.png',
      imageAlt: 'Custom web development code on screen',
    },
    stats: [
      { value: 150, suffix: '+', label: 'Projects delivered' },
      { value: 96, label: 'Average PageSpeed score' },
      { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime on built sites' },
      { value: 0.8, suffix: 's', decimals: 1, label: 'Average load time' },
    ],
    overview: {
      heading: 'Engineered to perform, built to scale',
      paragraphs: [
        'Behind every fast, reliable website is thoughtful engineering. We write clean, modular, documented code that follows modern best practices not a patchwork of plugins held together with hope.',
        'From content platforms to custom web applications, we build the right foundation for your goals, then keep it fast, secure, and easy to maintain.',
      ],
      bullets: [
        'Clean, maintainable, documented code',
        'Scale-ready architecture from day one',
        'Rigorous QA on every browser and device',
        'Secure by design, hardened by default',
      ],
      image: '/images/Services/Website Development/overview.png',
      imageAlt: 'The stages of web development',
    },
    includes: [
      {
        icon: 'code',
        title: 'Custom Development',
        description: 'Tailored functionality and features that off-the-shelf themes simply cannot offer.',
      },
      {
        icon: 'database',
        title: 'CMS & Platform Builds',
        description: 'WordPress, headless, or fully custom we build the foundation your content needs.',
      },
      {
        icon: 'link',
        title: 'API & Integrations',
        description: 'Connect CRMs, payment gateways, marketing tools, and anything else you rely on.',
      },
      {
        icon: 'gauge',
        title: 'Performance Engineering',
        description: 'Optimized code, caching, and assets for lightning-fast loads and happy users.',
      },
      {
        icon: 'shield',
        title: 'Security Hardening',
        description: 'SSL, firewalls, and best-practice hardening applied to every build we ship.',
      },
      {
        icon: 'server',
        title: 'Hosting & Deployment',
        description: 'Reliable infrastructure with CI/CD pipelines and managed updates after launch.',
      },
    ],
    process: [
      { title: 'Architect', description: 'We map requirements, systems, and data before a single line of code.' },
      { title: 'Build', description: 'Clean, modular development delivered in focused, reviewable sprints.' },
      { title: 'Test', description: 'Automated checks, cross-browser QA, and performance audits catch issues early.' },
      { title: 'Launch', description: 'Zero-downtime deploys with monitoring and post-launch support built in.' },
    ],
    plans: [
      {
        name: 'Starter Site',
        price: '$2,500+',
        priceNote: 'One-time',
        blurb: 'A fast, secure brochure site with the essentials handled.',
        features: ['Up to 8 pages', 'CMS integration', 'Responsive build', 'Basic SEO foundation'],
      },
      {
        name: 'Custom Build',
        price: '$6,000+',
        priceNote: 'One-time',
        blurb: 'Tailored features and integrations for growing businesses.',
        features: [
          'Custom features & workflows',
          'API & third-party integrations',
          'Performance tuning',
          'Security hardening',
        ],
        featured: true,
      },
      {
        name: 'Enterprise Platform',
        price: 'Custom',
        priceNote: 'Project-based',
        blurb: 'Complex systems, headless architectures, and high traffic.',
        features: ['Headless & API-first builds', 'Multi-site & scaling', 'Dedicated engineering team', 'SLA support'],
      },
    ],
    faq: [
      {
        q: 'What is the difference between design and development?',
        a: 'Design defines how your site looks and feels; development builds it so it works. Maven offers both seamlessly designing the experience, then engineering the code behind it.',
      },
      {
        q: 'What platforms do you build on?',
        a: 'Whatever fits your project: WordPress, headless frameworks, or fully custom builds. We recommend the simplest platform that solves your problem long-term.',
      },
      {
        q: 'Can you migrate my existing website?',
        a: 'Yes. We migrate content, rebuild pages, and set up redirects so you keep your search rankings and never lose traffic during the move.',
      },
      {
        q: 'Who hosts my website?',
        a: 'We handle hosting setup on fast, secure infrastructure and can manage it for you as part of our website management plans.',
      },
      {
        q: 'Do you provide support after launch?',
        a: 'Every build includes a support window, and most clients continue with maintenance plans so their investment stays fast and secure.',
      },
    ],
    related: [
      { slug: 'web-design', blurb: 'Beautiful, on-brand interfaces that give your code something great to wear.' },
      { slug: 'ecommerce', blurb: 'Storefront engineering payments, catalogs, and checkout that just works.' },
      { slug: 'website-management', blurb: 'Keep your build fast, secure, and up to date after launch.' },
    ],
  },
  {
    slug: 'website-management',
    navLabel: 'Website Management',
    blurb: 'Monitoring, updates, and content your site handled for you.',
    hero: {
      eyebrow: 'Website Management',
      title: 'Your website,',
      accent: 'fully handled',
      accentHighlight: ['handled'],
      lede: 'Your website should work for you never the other way around. Maven manages updates, security, monitoring, and content so your site stays fast, fresh, and online with a 99.9% uptime guarantee.',
      ledeHighlight: ['maven'],
      image: '/images/Services/Website Management/hero.jpg',
      imageAlt: 'Website management and maintenance dashboard',
    },
    stats: [
      { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime guarantee' },
      { value: 15, suffix: 'm', label: 'Average alert response' },
      { value: 48, suffix: 'h', label: 'Average resolution time' },
      { value: 100, suffix: '%', label: 'Updates handled for you' },
    ],
    overview: {
      heading: 'Maintenance that prevents problems',
      headingHighlight: ['maintenance', 'problems'],
      paragraphs: [
        'Too many businesses lose customers when their website goes down, loads slowly, or gets hacked. We put systems in place so those things simply do not happen and when issues do appear, we usually catch them before you ever notice.',
        'You get a fast, secure, always-on website with fresh content, plus clear monthly reporting. You focus on running your business; we handle the rest.',
      ],
      bullets: [
        'Proactive monitoring catches issues before visitors do',
        'Daily backups mean nothing is ever lost',
        'Updates applied safely and tested before going live',
        'Quarterly performance and health reports in plain English',
      ],
      image: '/images/Services/Website Management/overview.png',
      imageAlt: 'Website management essentials',
    },
    includes: [
      {
        icon: 'refresh',
        title: 'Core & Plugin Updates',
        description: 'Safe, tested updates so your site never breaks or falls behind on security.',
      },
      {
        icon: 'shield',
        title: 'Security & Malware Protection',
        description: 'Firewalls, scans, and rapid cleanup if a threat ever appears.',
      },
      {
        icon: 'database',
        title: 'Daily Backups',
        description: 'Off-site backups with one-click restore for total peace of mind.',
      },
      {
        icon: 'life-buoy',
        title: '24/7 Monitoring',
        description: 'Uptime, performance, and security watched around the clock with alerts before outages.',
      },
      {
        icon: 'file',
        title: 'Content & Copy Updates',
        description: 'New pages, edits, and posts handled quickly by real writers and editors.',
      },
      {
        icon: 'trending',
        title: 'Performance Reporting',
        description: 'Clear monthly reports covering uptime, speed, traffic, and overall site health.',
      },
    ],
    process: [
      { title: 'Audit', description: 'We review your site\u2019s health, speed, security, and content quality.' },
      { title: 'Protect', description: 'Backups and security are locked in before anything changes.' },
      { title: 'Maintain', description: 'Updates, monitoring, and content go on autopilot.' },
      { title: 'Report', description: 'You get clear insight into exactly what happened every month.' },
    ],
    plans: [
      {
        name: 'Essential Maintenance',
        price: '$500/mo',
        priceNote: 'Monthly',
        blurb: 'Keep your website secure, backed up, and up to date.',
        features: [
          'Monthly core & plugin updates',
          'Uptime monitoring',
          'Daily backups',
          'Security scans',
          '1 change request / month',
        ],
      },
      {
        name: 'Proactive Management',
        price: '$1,500/mo',
        priceNote: 'Monthly',
        blurb: 'Hands-on management with content and reporting included.',
        features: [
          'Everything in Essential',
          'Weekly content updates',
          'Speed optimization',
          'Performance reporting',
          'Priority support',
        ],
        featured: true,
      },
      {
        name: 'Premier Management',
        price: 'Custom',
        priceNote: 'Monthly',
        blurb: 'A dedicated team for your most important digital asset.',
        features: [
          'Dedicated website manager',
          'Unlimited change requests',
          'Advanced security & backups',
          'Quarterly digital strategy reviews',
        ],
      },
    ],
    faq: [
      {
        q: 'What happens if my website goes down?',
        a: 'Monitoring alerts us within minutes. We diagnose and restore the site usually before your visitors even notice and keep you updated throughout.',
      },
      {
        q: 'How are updates tested so nothing breaks?',
        a: 'We test updates in a staging environment first, then apply them to your live site. If anything conflicts, we roll it back instead of shipping a broken page.',
      },
      {
        q: 'Who writes the content updates?',
        a: 'Content changes are handled by our team including writers and editors for posts, pages, and images. You tell us the topic; we produce it.',
      },
      {
        q: 'Do you manage my hosting too?',
        a: 'We can migrate you to our managed hosting, or work with your existing provider. Either way we monitor, optimize, and handle the technical side.',
      },
      {
        q: 'Can you manage a site another company built?',
        a: 'Yes. We audit the site, get tools and access in place, and start managing it like our own. Many clients come to us after a bad experience elsewhere.',
      },
    ],
    related: [
      { slug: 'web-design', blurb: 'A fresh, modern design that gives your site a new lease on life.' },
      { slug: 'web-development', blurb: 'Rebuilds and upgrades that make your site faster and easier to maintain.' },
      { slug: 'seo', blurb: 'Retain and grow your rankings while your site stays healthy.' },
    ],
  },
  {
    slug: 'seo',
    navLabel: 'SEO Services',
    blurb: 'Rank higher, get found first, and grow organic revenue.',
    hero: {
      eyebrow: 'SEO Services',
      title: 'Rank higher,',
      accent: 'get found first.',
      accentHighlight: ['found'],
      lede: 'When people search for what you offer, you should be there. Maven combines technical expertise, quality content, and real authority building to grow your rankings and the revenue that follows.',
      image: '/images/Services/SEO Services/hero.jpg',
      imageAlt: 'Search engine optimization analytics',
    },
    stats: [
      { value: 3.5, suffix: 'X', decimals: 1, label: 'Average organic traffic growth' },
      { value: 87, suffix: '%', label: 'Of searches start with organic results' },
      { value: 40, suffix: '+', label: 'Keywords tracked per client' },
      { value: 3, label: 'Months to first page-1 rankings' },
    ],
    overview: {
      heading: 'Visibility that compounds over time',
      paragraphs: [
        'SEO is the gift that keeps giving: unlike ads, the traffic keeps coming month after month. We start with a deep audit, fix the technical foundation, and then build the content and authority that moves you up the rankings.',
        'We do not chase vanity metrics. Every optimization ties back to keywords your ideal customers actually search and to leads and sales you can measure.',
      ],
      bullets: [
        'Deep keyword and competitor research',
        'On-page and technical optimization that sticks',
        'Authority links that Google actually values',
        'Transparent, data-first reporting every month',
      ],
      image: '/images/Services/SEO Services/overview.png',
      imageAlt: 'SEO and digital marketing strategy',
    },
    includes: [
      {
        icon: 'search',
        title: 'Keyword Research',
        description: 'We find the terms your best customers search and prioritize them for impact.',
      },
      {
        icon: 'file',
        title: 'On-Page SEO',
        description: 'Titles, structure, and content tuned to match search intent and win clicks.',
      },
      {
        icon: 'settings',
        title: 'Technical SEO',
        description: 'Crawlability, page speed, schema, and site health perfected under the hood.',
      },
      {
        icon: 'link',
        title: 'Link Building',
        description: 'Relevant, authoritative backlinks that build genuine domain strength.',
      },
      {
        icon: 'map-pin',
        title: 'Local SEO',
        description: 'Own your map listing, reviews, and visibility across your service area.',
      },
      {
        icon: 'trending',
        title: 'Analytics & Reporting',
        description: 'Rankings, traffic, and conversions tracked and explained in plain language.',
      },
    ],
    process: [
      { title: 'Audit', description: 'A full teardown of your rankings, site, content, and competition.' },
      { title: 'Optimize', description: 'We fix, refine, and rebuild the pages that matter most to your business.' },
      { title: 'Build', description: 'Content and authority campaigns that earn real, lasting rankings.' },
      { title: 'Refine', description: 'Monthly analysis lets us double down on what is working.' },
    ],
    plans: [
      {
        name: 'Local Reach',
        price: '$600/mo',
        priceNote: 'Monthly',
        blurb: 'Dominating your city and service area.',
        features: [
          'Local keyword targeting',
          'Google Business optimization',
          'On-page fixes',
          'Monthly rankings report',
        ],
      },
      {
        name: 'Growth Ranking',
        price: '$1,200/mo',
        priceNote: 'Monthly',
        blurb: 'A full SEO engine for serious organic growth.',
        features: [
          'Full keyword strategy',
          'Content optimization',
          'Link building',
          'Technical SEO',
          'Monthly reporting & strategy',
        ],
        featured: true,
      },
      {
        name: 'Enterprise SEO',
        price: 'Custom',
        priceNote: 'Monthly',
        blurb: 'National, multi-location, and high-competition markets.',
        features: ['Multi-location strategy', 'Advanced technical SEO', 'Dedicated SEO team', 'Quarterly strategy'],
      },
    ],
    faq: [
      {
        q: 'How long until I see results?',
        a: 'Most clients see meaningful movement in 3–6 months. SEO compounds, so the longer you run it, the stronger and more durable the results.',
      },
      {
        q: 'What is the difference between SEO and Google Ads?',
        a: 'Ads deliver immediate traffic for as long as you pay. SEO earns free, compounding traffic. Most businesses do best with a mix we will tell you honestly which to prioritize.',
      },
      {
        q: 'Do you guarantee #1 rankings?',
        a: 'No honest agency does. We guarantee quality work, transparent reporting, and aggressive progress and we are transparent about feasibility from day one.',
      },
      {
        q: 'Will SEO work for my industry?',
        a: 'Whether you run a local law firm or a national e-commerce brand, the fundamentals apply. We tailor the strategy to your market and competition.',
      },
      {
        q: 'What do your reports include?',
        a: 'Rankings, organic traffic, leading pages, and conversions tied to your business goals, with clear recommendations for the month ahead.',
      },
    ],
    related: [
      { slug: 'digital-marketing', blurb: 'Paid ads and content that amplify your organic wins.' },
      { slug: 'website-management', blurb: 'A fast, healthy site that ranks better over time.' },
      { slug: 'web-design', blurb: 'Conversion-ready design that turns SEO traffic into customers.' },
    ],
  },
  {
    slug: 'aeo-geo',
    navLabel: 'AEO & GEO',
    blurb: 'Get recommended in AI answers with AEO & GEO strategy.',
    hero: {
      eyebrow: 'AEO & GEO Services',
      title: 'Get cited in',
      accent: 'AI answers.',
      accentHighlight: ['AI answers.'],
      lede: 'Answer engine optimization structures your content, entities and technical signals so Google AI Overviews, ChatGPT and Perplexity retrieve, cite and recommend you. We build that visibility on top of your SEO foundation and measure it in citations, not just rankings.',
      ledeHighlight: ['retrieve, cite and recommend'],
      image: '/images/Services/SEO Services/hero.jpg',
      imageAlt: 'AI answer engines citing website content',
    },
    stats: [
      { value: 68, suffix: '%', label: 'Of Google searches now end without a click' },
      { value: 16, suffix: 'X', label: 'Growth in AI search referral traffic, 2024 to 2026' },
      { value: 76, suffix: '%', label: 'Of AI Overview citations come from the organic top 10' },
      { value: 6, label: 'Months for citation share to compound' },
    ],
    overview: {
      heading: 'The AI visibility layer on your SEO',
      headingHighlight: ['AI visibility'],
      paragraphs: [
        'Answer engine optimization (AEO) makes your content, entities and technical signals easy for AI answer engines to retrieve, trust and cite: Google AI Overviews and AI Mode, ChatGPT, Perplexity, Gemini and Copilot. Generative engine optimization (GEO) is the same discipline applied to any generative engine, and Maven delivers both as one program.',
        'If your buyers already ask AI for recommendations before they ever visit a site, ranking well in Google is no longer enough. AEO is the layer that keeps you present and described accurately where decisions actually happen, built on the SEO foundation you already have.',
      ],
      bullets: [
        'Businesses whose buyers ask ChatGPT or AI Overviews for recommendations first',
        'Brands that rank well in Google but are absent or misdescribed in AI answers',
        'Companies with a working SEO program that need an AI visibility layer, not a replacement',
        'Measured in AI citations, share of voice and referral sessions, not just rankings',
      ],
      image: '/images/Services/SEO Services/overview.png',
      imageAlt: 'AEO and GEO visibility strategy',
    },
    includes: [
      {
        icon: 'search',
        title: 'AI Visibility Audit & Prompt Mapping',
        description: 'A baseline across every engine: the prompt set from your buyers real questions, who gets cited, where you are absent or wrong, and the citation-gap roadmap.',
      },
      {
        icon: 'share',
        title: 'Entity & Brand Signal Optimization',
        description: 'Organization, Person and Service schema with sameAs links, consistent facts everywhere and author credentials, so engines know exactly who you are.',
      },
      {
        icon: 'pen',
        title: 'Answer-Ready Content Engineering',
        description: 'Question headings, 40-to-90-word direct answers, comparison tables and lists an engine can lift whole, refreshing the pages buyers already ask about first.',
      },
      {
        icon: 'settings',
        title: 'Technical AI Readiness',
        description: 'Crawler access for OAI-SearchBot, PerplexityBot and Google-Extended, server-rendered HTML, schema that matches visible text, sitemaps and Core Web Vitals.',
      },
      {
        icon: 'sparkles',
        title: 'AI Overviews & AI Mode Optimization',
        description: 'AI Mode fans one question into many sub-queries. We map that fan-out and make sure a page of yours answers each one while holding the rankings citations are drawn from.',
      },
      {
        icon: 'link',
        title: 'Third-Party Citations & Mentions',
        description: 'Engines trust what other sources say about you. We earn placements in the roundups, reviews and trade press they already cite, and correct wrong facts at the source.',
      },
      {
        icon: 'database',
        title: 'Original Data & Proof Assets',
        description: 'Statistics, benchmarks and case results quotable by name. A page that only restates what everyone else says has nothing to be cited for.',
      },
      {
        icon: 'trending',
        title: 'AI Visibility Tracking & Reporting',
        description: 'Share of voice and citation share by engine, mention accuracy and sentiment, AI referrals in GA4 and branded-search lift, reported monthly on your SEO report.',
      },
    ],
    plans: [
      {
        name: 'AI Visibility Audit',
        price: 'Fixed',
        priceNote: 'One-time scope',
        blurb: 'Find out where you stand in every engine.',
        features: [
          'Prompt set from real buyer questions',
          'Competitor citation analysis',
          'Accuracy and sentiment report',
          'Citation-gap roadmap',
        ],
      },
      {
        name: 'AEO & GEO Retainer',
        price: 'Custom',
        priceNote: 'Monthly program',
        blurb: 'The full program: schema, content, citations and reporting.',
        features: [
          'All eight deliverables, implemented',
          'Prompt set tracked monthly',
          'Citation outreach and corrections',
          'Layered on your existing SEO report',
        ],
        featured: true,
      },
      {
        name: 'AEO + Managed SEO',
        price: 'Custom',
        priceNote: 'Monthly bundle',
        blurb: 'One program for classic rankings and AI citations.',
        features: [
          'Managed SEO plus the full AEO layer',
          'Top-10 rankings that feed AI citations',
          'Content refresh and new page builds',
          'Quarterly roadmap reviews',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the difference between AEO and SEO?',
        a: 'SEO earns rankings and clicks in search results. AEO earns citations and recommendations inside AI-generated answers. They share the same foundation of crawlable, authoritative, well-structured content, which is why Maven runs them as one program rather than two.',
      },
      {
        q: 'What is the difference between AEO and GEO?',
        a: 'Mostly history, not substance. Answer engine optimization grew out of featured-snippet work; generative engine optimization describes the same goal for LLM-based engines and leans harder on third-party sources and cross-engine monitoring. Maven delivers both as a single service.',
      },
      {
        q: 'Do I still need SEO if I invest in AEO?',
        a: 'Yes. Google says AI features need no special markup beyond being indexed and snippet-eligible, and about 76% of AI Overview citations come from pages already ranking in the top 10. AEO is a layer on SEO, not a substitute.',
      },
      {
        q: 'How long does it take to get cited in ChatGPT or AI Overviews?',
        a: 'Owned-page wins, such as AI Overview inclusion on questions you already rank for, usually appear in the first quarter. Citation share across ChatGPT and Perplexity moves over three to six months as third-party mentions accumulate, and it compounds from there.',
      },
      {
        q: 'How do you measure AEO results?',
        a: 'A fixed prompt set is re-run monthly across every engine. We report share of voice, citation share, accuracy and sentiment, AI Overview inclusion, AI referral sessions in GA4 and branded-search lift, using a monitoring platform named in your proposal.',
      },
      {
        q: 'Can you pay to appear in AI answers or guarantee placement?',
        a: 'No. Source selection inside AI answers is probabilistic and changes with every model update; nobody can buy or guarantee a citation. Treat any agency promising guaranteed placement as a red flag.',
      },
    ],
    related: [
      { slug: 'seo', blurb: 'The rankings floor AI visibility is built on.' },
      { slug: 'ai-consulting', blurb: 'The AI practice behind our first-hand entity authority.' },
      { slug: 'website-management', blurb: 'Hosting, crawler rules and speed, managed between audits.' },
    ],
  },
  {
    slug: 'penetration-testing',
    navLabel: 'Penetration Testing',
    blurb: 'Manual, human-led pen tests that clear enterprise security reviews.',
    hero: {
      eyebrow: 'Penetration Testing Services',
      title: 'Penetration Testing Services',
      accent: 'That Pass Enterprise Vendor Security Reviews',
      accentHighlight: ['Enterprise Vendor Security Reviews'],
      lede: 'Manual, human-led tests of your web applications, networks and people by a Chicago-area team that also builds and maintains the systems under test. You get a severity-ranked report, a retest and a letter of attestation your prospects, auditors and insurers will accept.',
      ledeHighlight: ['severity-ranked report', 'letter of attestation'],
      image: '/images/Services/Cyber Security/card.png',
      imageAlt: 'Penetration testing and security review artwork',
    },
    stats: [
      { value: 5, label: 'Business days for your full report' },
      { value: 30, suffix: '+', label: 'Day retest window included' },
      { value: 6, label: 'Test types, scoped individually or combined' },
      { value: 1, label: 'Page attestation letter for buyers and auditors' },
    ],
    overview: {
      heading: 'What Is Penetration Testing?',
      headingHighlight: ['Penetration Testing'],
      paragraphs: [
        'A penetration test is an authorized, simulated attack in which a skilled tester finds and exploits weaknesses in your applications, networks or people the way a real adversary would. Unlike an automated vulnerability scan, it chains findings together to prove actual business impact and ends with a prioritized remediation report.',
        'The trigger is rarely a breach: it is a customer. The moment a deal reaches a large company procurement team, the question "when was your last penetration test?" is on the form, and the answer decides whether you are an approved vendor.',
      ],
      bullets: [
        'Companies answering enterprise vendor security questionnaires or SOC 2 auditors',
        'Merchants and service providers in PCI DSS scope (Requirement 11.4)',
        'Any business whose website, portal or app handles customer data',
        'A scan lists weaknesses; a pen test exploits and chains them to prove impact',
      ],
      image: '/images/Services/Cyber Security/overview.png',
      imageAlt: 'Penetration testing attack paths and compliance evidence',
    },
    headings: {
      includes: { eyebrow: "What's included", title: 'Our Penetration Testing', accent: 'Services' },
      plans: {
        eyebrow: 'Penetration testing pricing',
        title: 'How a penetration test',
        accent: 'is scoped',
        lede: 'Price depends on the number of external IPs and internal hosts, application size and complexity, the test types combined, and whether social engineering is included. Every engagement is quoted as a fixed fee with the retest built in.',
      },
      faq: { eyebrow: 'FAQ', title: 'Penetration Testing', accent: 'Questions' },
    },
    includes: [
      {
        icon: 'shield',
        title: 'External Penetration Testing',
        description: 'Attacking your internet-facing perimeter with no prior access: public IPs, VPNs, mail, DNS, exposed services and cloud entry points. Maps to PCI DSS 11.4.2.',
      },
      {
        icon: 'server',
        title: 'Internal Penetration Testing',
        description: 'Assumed-breach testing from the access a phished employee would have: Active Directory attack paths, lateral movement and sensitive data. Maps to PCI DSS 11.4.3.',
      },
      {
        icon: 'code',
        title: 'Web Application Penetration Testing',
        description: 'Authenticated and unauthenticated testing of web apps, portals, WordPress and WooCommerce and APIs against the OWASP Top 10 and WSTG, including business-logic flaws scanners miss.',
      },
      {
        icon: 'mail',
        title: 'Social Engineering Testing',
        description: 'Phishing, vishing, smishing and help-desk pretexting built on your real org chart, with click, credential and report rates by department plus training recommendations.',
      },
      {
        icon: 'search',
        title: 'OSINT & Dark Web Monitoring',
        description: 'Your public footprint mapped the way an attacker does it, plus breach-corpus and marketplace searches for exposed credentials, with optional continuous alerting.',
      },
      {
        icon: 'layers',
        title: 'Network Segmentation Testing (PCI)',
        description: 'Bidirectional connectivity tests proving your cardholder data environment is isolated, with audit-ready evidence for your QSA or SAQ. Required annually for most, twice yearly for service providers.',
      },
    ],
    plans: [
      {
        name: 'Focused Test',
        price: 'Fixed fee',
        priceNote: 'Quoted per scope',
        blurb: 'One external or web application test, end to end.',
        features: [
          'PTES and NIST SP 800-115 aligned',
          'CVSS 3.1 severity-ranked report',
          'Remediation retest included',
          'Letter of attestation',
        ],
      },
      {
        name: 'Combined Scope',
        price: 'Fixed fee',
        priceNote: 'Quoted per scope',
        blurb: 'External, internal, web app and segmentation together.',
        features: [
          'All six test types available',
          'Attack-path chaining and MITRE ATT&CK mapping',
          'On-site Chicagoland or remote nationwide',
          'Executive debrief and questionnaire answers',
        ],
        featured: true,
      },
      {
        name: 'People & Exposure',
        price: 'Fixed fee',
        priceNote: 'Campaign or annual',
        blurb: 'Social engineering plus OSINT and dark web monitoring.',
        features: [
          'Phishing, vishing and smishing campaigns',
          'Department-level click and report rates',
          'Breached-credential exposure report',
          'Optional continuous dark web alerting',
        ],
      },
    ],
    faq: [
      {
        q: 'Does SOC 2 require a penetration test?',
        a: 'Not explicitly. The Trust Services Criteria do not name one, but auditors and enterprise customers expect a penetration test under the Security criteria, and most Type II reports include one performed inside the observation period. Annual testing is the accepted baseline.',
      },
      {
        q: 'What does PCI DSS require for penetration testing?',
        a: 'PCI DSS v4.0.1 Requirement 11.4 calls for internal and external penetration testing at least every twelve months and after significant changes, fixing and retesting exploitable findings, and segmentation testing annually, or every six months for service providers. The tester must be qualified and organizationally independent.',
      },
      {
        q: 'What is the difference between a penetration test and a vulnerability scan?',
        a: 'A vulnerability scan is automated and produces a list of known weaknesses. A penetration test is a human exploiting and chaining those weaknesses to prove real impact. A scan alone does not satisfy PCI Requirement 11.4 or most customer security reviews.',
      },
      {
        q: 'How much does a penetration test cost?',
        a: 'It depends on asset count, application complexity and the test types combined. A focused external or web application test typically starts in the low five figures; combined scopes cost more. Maven quotes a fixed fee, retest included, after a short scoping call.',
      },
      {
        q: 'How long does a penetration test take?',
        a: 'One to two weeks of active testing for a focused scope, three to four for combined external, internal and web application scopes, plus about a week for reporting and a 30-to-60-day retest window.',
      },
      {
        q: 'Will testing disrupt our systems?',
        a: 'We agree on testing windows, exclusions and an emergency-stop contact before starting, never use denial-of-service techniques, and report critical findings immediately. Staging environments are used wherever they exist.',
      },
      {
        q: 'What is a letter of attestation, and can we share it?',
        a: 'A one-page confirmation of who tested what, when, how and the outcome. It is written to be shared with prospects, auditors and insurers instead of the full report, which stays internal or goes out under NDA.',
      },
      {
        q: 'Black box, grey box or white box?',
        a: 'Black box simulates an outsider with no knowledge; white box gives us architecture and source for depth. We recommend grey box, with credentials and documentation, for the best coverage per dollar.',
      },
    ],
    related: [
      { slug: 'cyber-security', blurb: 'Compliance readiness for SOC 2, PCI and beyond.' },
      { slug: 'website-management', blurb: 'On sites we manage, we fix what we find ourselves.' },
      { slug: 'website-management', blurb: 'On sites we manage, we fix what we find ourselves.' },
    ],
  },
  {
    slug: 'compliance-readiness',
    navLabel: 'Compliance Readiness',
    blurb: 'Close the gap between taking security seriously and proving it.',
    hero: {
      eyebrow: 'Compliance Readiness Services',
      title: 'Compliance Readiness Services',
      accent: 'That Get Enterprise Deals Unstuck',
      accentHighlight: ['Enterprise Deals Unstuck'],
      lede: 'A prospect asked for your SOC 2 report, a HIPAA attestation, an ISO certificate or a 200-question security questionnaire, and the deal paused. Maven’s compliance readiness services close the gap between “we take security seriously” and “here is the evidence,” then hand you to an independent auditor ready to pass.',
      ledeHighlight: ['here is the evidence'],
      image: '/images/Services/Cyber Security/card.png',
      imageAlt: 'Compliance readiness and audit preparation artwork',
    },
    stats: [
      { value: 7, label: 'Steps from scoping to auditor handoff' },
      { value: 14, label: 'Weeks to SOC 2 Type I-ready, typical range' },
      { value: 93, label: 'Annex A controls in ISO 27001:2022' },
      { value: 12, label: 'Months of Type II observation, then the report' },
    ],
    overview: {
      heading: 'What Is a Compliance Readiness Assessment?',
      headingHighlight: ['Compliance Readiness Assessment'],
      paragraphs: [
        'A compliance readiness assessment is a pre-audit review that compares your current controls, policies and evidence against a framework such as SOC 2, HIPAA, ISO 27001 or PCI DSS, then produces a prioritized plan to close every gap before an independent auditor looks. Readiness is preparation; the audit itself is performed separately by a licensed CPA firm, certification body or QSA.',
        'The trigger is a customer, not a regulator. Procurement asks for a SOC 2 report, a HIPAA risk analysis, an ISO 27001 certificate or a completed questionnaire, and without it the vendor is excluded from the RFP. Readiness turns a scramble into a program: you learn exactly which controls the framework expects, which ones you already have, which ones are missing, and the shortest sequence to close them before the audit clock starts.',
      ],
      bullets: [
        'SaaS and service companies whose enterprise prospects require a SOC 2 report or ISO certificate',
        'Healthcare vendors and business associates asked for HIPAA evidence; firms handling client, card or AI-processed data',
        'Manufacturers and suppliers being asked about NIST CSF or CMMC by a prime contractor',
        'Most delays happen in readiness, not in the audit, which is why Maven implements the technical fixes itself',
      ],
      image: '/images/Services/Cyber Security/overview.png',
      imageAlt: 'Compliance frameworks and readiness roadmap',
    },
    includes: [
      {
        icon: 'target',
        title: 'Scoping and Framework Selection',
        description: 'Which framework the customer actually asked for, which Trust Services Criteria, HIPAA safeguards or Annex A controls apply, and which systems, people and vendors are in scope.',
      },
      {
        icon: 'search',
        title: 'Compliance Gap Assessment',
        description: 'Current controls versus required controls, scored and documented in a gap report with an owner and an effort estimate for every finding.',
      },
      {
        icon: 'trending',
        title: 'Remediation Roadmap',
        description: 'A prioritized, effort-sized plan sequenced to the deal: what unblocks the customer first, what the auditor needs next, what can wait for year two.',
      },
      {
        icon: 'pen',
        title: 'Policy and Procedure Writing',
        description: 'Information security, risk assessment, vendor management, incident response, access control and change management policies written for your stack, not downloaded from a template library.',
      },
      {
        icon: 'settings',
        title: 'Control Implementation Support',
        description: 'MFA, access reviews, logging, endpoint management, backups and training. Maven implements directly on systems it manages and coordinates with your IT provider on the rest.',
      },
      {
        icon: 'file',
        title: 'Evidence Collection and Mock Audit',
        description: 'A control-to-evidence map, dry-run sample requests and population exports, so failures are fixed before they become findings.',
      },
      {
        icon: 'life-buoy',
        title: 'Auditor Selection and Handoff',
        description: 'Help choosing an independent CPA firm (SOC), accredited certification body (ISO) or QSA (PCI), with support through fieldwork. Maven does not issue the report.',
      },
    ],
    plans: [
      {
        name: 'Gap Assessment',
        price: 'Fixed fee',
        priceNote: 'One-time',
        blurb: 'Know exactly where you stand before anything else.',
        features: [
          'Framework mapping from your questionnaire',
          'Scored gap report with owners',
          'Remediation roadmap sequenced to your deal',
          'Readiness call and written findings',
        ],
      },
      {
        name: 'Full Readiness Program',
        price: '$8K–$25K',
        priceNote: 'Fixed fee by scope',
        blurb: 'Readiness with implementation support, market-rate scope.',
        features: [
          'Policy and procedure set for your stack',
          'Control implementation support',
          'Evidence map and mock audit',
          'Auditor shortlist and fieldwork check-ins',
        ],
        featured: true,
      },
      {
        name: 'Multi-Framework Bundle',
        price: 'Custom',
        priceNote: 'One evidence set',
        blurb: 'SOC 2 plus ISO 27001 or 42001 from shared evidence.',
        features: [
          'Overlapping controls mapped once',
          'ISO 42001 AI governance option',
          'NIST CSF 2.0 profile for vague asks',
          'Sequenced so year two costs less',
        ],
      },
    ],
    faq: [
      {
        q: 'What is the difference between readiness and the audit?',
        a: 'Readiness is preparation and remediation performed by a consultant like Maven. The audit is an independent examination by a licensed CPA firm (SOC), accredited certification body (ISO) or QSA (PCI) that produces the report or certificate.',
      },
      {
        q: 'Can the same firm do readiness and the SOC 2 audit?',
        a: 'Generally no for the same engagement. AICPA independence rules prevent an auditor from evaluating controls it designed or operated, so the two roles are kept separate. Maven handles readiness and helps you select an independent auditor.',
      },
      {
        q: 'How long does SOC 2 readiness take?',
        a: 'Companies with some practices in place are usually Type I-ready in six to fourteen weeks. A Type II then needs an observation period of three to twelve months before the report can be issued.',
      },
      {
        q: 'Is there a HIPAA certification?',
        a: 'No. HHS does not certify organizations as HIPAA compliant. Compliance is demonstrated through a documented risk analysis, policies, training, access controls and business associate agreements. Third-party HIPAA attestations exist and can help with customers, but they are not a government certificate.',
      },
      {
        q: 'SOC 2 or ISO 27001?',
        a: 'Check what your customers and contracts specify. SOC 2 is the North American default; ISO 27001 is a globally recognized certificate favored in Europe and APAC. The controls overlap heavily, so many companies pursue both from one evidence set.',
      },
      {
        q: 'How much does compliance readiness cost?',
        a: 'It depends on the frameworks, your size and your maturity. Market rates put a gap assessment in the low thousands and readiness with implementation support in the $8K to $25K range; the audit is priced separately by the auditor. Maven quotes a fixed fee after a readiness call.',
      },
    ],
    related: [
      { slug: 'attestation-audit-support', blurb: 'Move from readiness to a SOC 1, SOC 2 or PCI report under one contract.' },
      { slug: 'penetration-testing', blurb: 'SOC 2 auditors, HIPAA risk analyses and PCI 11.4 all expect regular testing.' },
      { slug: 'ai-consulting', blurb: 'AI governance and usage policies that satisfy ISO 42001 and SOC 2 questions.' },
    ],
  },
  {
    slug: 'attestation-audit-support',
    navLabel: 'Attestation & Audit Support',
    blurb: 'SOC 1, SOC 2 and PCI DSS attestations, managed from readiness to report.',
    hero: {
      eyebrow: 'Attestation & Audit Support',
      title: 'SOC 1, SOC 2 & PCI DSS Attestation Services',
      accent: 'Managed From Readiness to Report',
      accentHighlight: ['Readiness to Report'],
      lede: 'Maven runs the entire attestation project under one contract: scoping, readiness, remediation, evidence, auditor procurement and pass-through documentation that puts the finished report in your hands. The examination itself is performed by an independent licensed CPA firm or a PCI SSC-listed Qualified Security Assessor.',
      ledeHighlight: ['one contract'],
      image: '/images/Services/Cyber Security/card.png',
      imageAlt: 'Attestation and audit support artwork',
    },
    stats: [
      { value: 4, label: 'Pass-through documents for a clean title transfer' },
      { value: 2, label: 'Independent examiner types: licensed CPA firm or QSA' },
      { value: 12, label: 'Months a SOC 2 Type II observation period runs' },
      { value: 1, label: 'Contract, with the auditor fee itemized separately' },
    ],
    overview: {
      heading: 'What Is Attestation, and Who Is Allowed to Issue It?',
      headingHighlight: ['Attestation'],
      paragraphs: [
        'Attestation is a formal written opinion from an independent, qualified third party that your controls meet a published standard. SOC 1 and SOC 2 reports can only be issued by a licensed CPA firm under AICPA attestation standards (SSAE 18). A PCI DSS Report on Compliance can only be completed by a PCI SSC-qualified QSA.',
        'Maven is neither. We procure the examination on your behalf, manage everything around it and pass the finished deliverables through to you with documented chain of title, while the auditor keeps its own scope, procedures, fees and conclusions.',
      ],
      bullets: [
        'SaaS, software and service companies selling into enterprise procurement',
        'Agencies, MSPs, healthcare vendors and data processors handling client data',
        'E-commerce and subscription businesses storing or transmitting card data',
        'Pass-through paperwork most firms skip: chain of custody, title reconciliation and bill of sale',
      ],
      image: '/images/Services/Cyber Security/overview.png',
      imageAlt: 'Attestation reports and audit evidence',
    },
    includes: [
      {
        icon: 'target',
        title: 'Scoping Call',
        description: 'Which report, who is asking, target date, systems in scope and which Trust Services Criteria or PCI validation path apply.',
      },
      {
        icon: 'search',
        title: 'Readiness and Gap Assessment',
        description: 'Current controls versus the standard, scored and owned, delivered through our compliance readiness services.',
      },
      {
        icon: 'settings',
        title: 'Remediation Sprint',
        description: 'Policies written, controls implemented, evidence made reproducible. Technical fixes applied by Maven on systems it manages.',
      },
      {
        icon: 'file',
        title: 'Asset Verification and Transfer Review',
        description: 'Before fieldwork we inventory every in-scope system, account and data flow, confirm ownership, and document what transfers to the auditor and returns to you.',
      },
      {
        icon: 'share',
        title: 'Auditor Procurement and Fieldwork Coordination',
        description: 'Maven engages a pre-vetted independent CPA firm or QSA company, runs the evidence request list, prepares populations and samples, schedules interviews and keeps the auditor unblocked.',
      },
      {
        icon: 'trending',
        title: 'Report Issuance and Title Reconciliation',
        description: 'The CPA firm issues your SOC report; the QSA completes the ROC and co-signs the AOC. Maven reconciles the deliverable against the scope you bought and executes the title transfer.',
      },
      {
        icon: 'refresh',
        title: 'Trust-Center Kit, Bridge Letters and Renewal',
        description: 'The kit sales can use immediately, management bridge letters between periods, and a renewal plan so year two costs less than year one.',
      },
    ],
    plans: [
      {
        name: 'SOC 2 Attestation',
        price: 'Fixed + pass-through',
        priceNote: 'Type I or Type II',
        blurb: 'The most common enterprise ask for SaaS and MSPs.',
        features: [
          'Readiness, remediation sprint and evidence',
          'Independent CPA firm procurement',
          'Trust-center kit and bridge letters',
          'Renewal plan for year two',
        ],
      },
      {
        name: 'PCI DSS ROC + AOC',
        price: 'Fixed + pass-through',
        priceNote: 'Annual',
        blurb: 'Requirement 11 evidence through a QSA-managed assessment.',
        features: [
          'CDE scoping and segmentation evidence',
          'QSA partner procurement',
          'SAQ selection and validation',
          'AOC signature coordination',
        ],
        featured: true,
      },
      {
        name: 'SOC 1 + Multi-Report',
        price: 'Fixed + pass-through',
        priceNote: 'Type I / Type II',
        blurb: 'Financial-reporting controls, bundled with SOC 2.',
        features: [
          'SSAE 18 / AT-C 320 scope management',
          'SOC 1 and SOC 2 from one evidence set',
          'Auditor and QSA coordination',
          'Annual renewal planning',
        ],
      },
    ],
    faq: [
      {
        q: 'Who can issue a SOC report?',
        a: 'Only a licensed CPA firm working under AICPA attestation standards (SSAE 18). Maven is not a CPA firm; reports for Maven clients are issued by an independent licensed CPA firm that Maven engages on your behalf under a pass-through agreement, with the engagement letter and opinion in your company’s name.',
      },
      {
        q: 'What does pass-through attestation mean?',
        a: 'You contract with Maven once. Maven procures the examination from an independent CPA firm or QSA company, manages readiness and fieldwork, and transfers the finished report to you with chain of custody certification, asset verification, title reconciliation and a bill of sale. The auditor’s independence, scope and conclusions are unchanged.',
      },
      {
        q: 'What is the difference between SOC 1 and SOC 2?',
        a: 'SOC 1 covers controls affecting your customers’ financial reporting and is used by their financial auditors. SOC 2 covers security, availability, processing integrity, confidentiality and privacy and is used by security and vendor-risk teams. Many companies need both.',
      },
      {
        q: 'Type I vs. Type II: what is the difference?',
        a: 'A Type I report says controls were suitably designed and in place at a point in time. A Type II also tests that they operated effectively over a three-to-twelve-month period. Enterprise customers generally expect a Type II.',
      },
      {
        q: 'What is the difference between a PCI AOC and a ROC, and who signs?',
        a: 'The ROC is the full assessment against every PCI DSS requirement, completed by a PCI SSC-qualified QSA or trained internal ISA. The AOC is the one-form attestation you share with acquirers and customers, signed by an authorized officer of your company and by the QSA when a QSA assessed.',
      },
      {
        q: 'How long is a SOC 2 report or AOC valid, and what is a bridge letter?',
        a: 'SOC reports have no formal expiration, but most customers reject reports whose period ended more than twelve months ago, so renew annually; PCI validation is annual. A bridge letter is a statement from your own management covering the gap between the last report period and today.',
      },
    ],
    related: [
      { slug: 'compliance-readiness', blurb: 'Where every attestation starts: gaps, policies, controls and evidence.' },
      { slug: 'penetration-testing', blurb: 'Pen test evidence for SOC 2 and PCI DSS Requirement 11.' },
      { slug: 'website-management', blurb: 'Monitoring, patching and hosting that double as Type II evidence.' },
    ],
  },
  {
    slug: 'digital-marketing',
    navLabel: 'Digital Marketing',
    blurb: 'Data-driven campaigns that grow leads, sales, and revenue.',
    hero: {
      eyebrow: 'Digital Marketing',
      title: 'Campaigns that',
      accent: 'grow your revenue',
      accentHighlight: ['grow'],
      lede: 'From paid ads to social media and email, Maven builds data-driven campaigns that fill your funnel with qualified leads and turn them into loyal, repeat customers.',
      image: '/images/Services/Digital Marketing/hero.jpg',
      imageAlt: 'Digital marketing strategy and analytics',
    },
    stats: [
      { value: 5, suffix: 'X', label: 'Average return on ad spend' },
      { value: 45, suffix: '%', label: 'Lower average cost per lead' },
      { value: 120, suffix: '+', label: 'Campaigns managed' },
      { value: 98, suffix: '%', label: 'Client retention rate' },
    ],
    overview: {
      heading: 'Full-funnel marketing, one team',
      paragraphs: [
        'Marketing works best when every channel pulls in the same direction. We align paid ads, social media, content, and email under one strategy built around your real business numbers.',
        'We test relentlessly, cut what does not perform, and reinvest in what does. The result is predictable lead flow at a cost you can actually forecast.',
      ],
      bullets: [
        'Strategy built on your real sales numbers',
        'Paid, earned, and owned channels working together',
        'Constant testing lowers costs and lifts results',
        'Clear monthly reporting no jargon, no fluff',
      ],
      image: '/images/Services/Digital Marketing/overview.png',
      imageAlt: 'Digital marketing agency approach',
    },
    includes: [
      {
        icon: 'megaphone',
        title: 'Google Ads & PPC',
        description: 'High-intent search campaigns that capture buyers ready to purchase.',
      },
      {
        icon: 'share',
        title: 'Social Media Marketing',
        description: 'Content, community, and ads that build brands audiences actually love.',
      },
      {
        icon: 'file',
        title: 'Content Marketing',
        description: 'Blogs, guides, and copy that attract, educate, and convert readers.',
      },
      {
        icon: 'mail',
        title: 'Email Marketing',
        description: 'Automated funnels and newsletters that keep customers coming back.',
      },
      {
        icon: 'rocket',
        title: 'Lead Generation',
        description: 'Landing pages and offers engineered to capture qualified leads.',
      },
      {
        icon: 'trending',
        title: 'Analytics & Optimization',
        description: 'Calls, forms, and sales tracked from the first click to the closed deal.',
      },
    ],
    process: [
      { title: 'Strategy', description: 'We align channels, budgets, and targets with your business goals.' },
      { title: 'Launch', description: 'Campaigns, creative, and funnels go live fast then get measured.' },
      { title: 'Optimize', description: 'Daily testing and tweaks improve performance week over week.' },
      { title: 'Scale', description: 'We re-invest in what works and cut what does not.' },
    ],
    plans: [
      {
        name: 'Starter Campaign',
        price: '$800/mo',
        priceNote: 'Monthly',
        blurb: 'Get one channel performing before you scale.',
        features: [
          'Single-channel focus',
          'Ad creative & copy',
          'Monthly management',
          'Basic performance reporting',
        ],
      },
      {
        name: 'Growth Bundle',
        price: '$1,600/mo',
        priceNote: 'Monthly',
        blurb: 'Multi-channel campaigns with conversion assets built in.',
        features: [
          'Multi-channel (Ads + Social)',
          'Content calendar & creation',
          'Email automation setup',
          'Landing page design',
          'Monthly strategy session',
        ],
        featured: true,
      },
      {
        name: 'Full-Funnel Partner',
        price: 'Custom',
        priceNote: 'Monthly',
        blurb: 'Your outsourced marketing team, end to end.',
        features: [
          'All channels & funnels',
          'Dedicated strategist',
          'Sales & marketing alignment',
          'Quarterly growth planning',
        ],
      },
    ],
    faq: [
      {
        q: 'Which channel should I start with?',
        a: 'It depends on your audience and goals. We analyze your market and recommend a starting point often Google Ads or a focused social strategy before you spend a dollar.',
      },
      {
        q: 'How do you measure success?',
        a: 'Through the metrics that matter to you: leads, calls, sales, and return on ad spend. We track from click to close, never just vanity numbers.',
      },
      {
        q: 'Do I need a big budget?',
        a: 'No. We build campaigns that fit your budget and scale as results come in. Small budgets can work brilliantly with a sharp strategy and tight targeting.',
      },
      {
        q: 'How quickly will I see results?',
        a: 'Paid campaigns typically start converting within the first month. Organic channels build slower but compound we set honest expectations up front.',
      },
      {
        q: 'Do you work alongside my in-house team?',
        a: 'Yes. We slot in as your fractional marketing team, or partner alongside existing staff sharing tools, reports, and goals so everyone wins.',
      },
    ],
    related: [
      { slug: 'seo', blurb: 'Organic rankings that bring steady, compounding traffic.' },
      { slug: 'logo-branding', blurb: 'Brand assets that make every ad and post recognizable.' },
      { slug: 'web-design', blurb: 'High-converting pages for all that paid traffic to land on.' },
    ],
  },
  {
    slug: 'ecommerce',
    navLabel: 'E-commerce Solutions',
    blurb: 'High-converting stores that sell around the clock.',
    hero: {
      eyebrow: 'E-commerce Solutions',
      title: 'Stores that',
      accent: 'sell while you sleep',
      accentHighlight: ['sell'],
      lede: 'A pretty shop is not enough it has to convert. Maven builds e-commerce experiences that guide shoppers from browse to checkout without friction, on platforms you can actually manage.',
      image: '/images/Services/E-commerce Solutions/hero.png',
      imageAlt: 'E-commerce storefront on screen',
    },
    stats: [
      { value: 3.2, suffix: 'X', decimals: 1, label: 'Average checkout conversion lift' },
      { value: 40, suffix: '%', label: 'Faster pages after rebuild' },
      { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime on storefronts' },
      { value: 1000, suffix: '+', label: 'Products easily managed' },
    ],
    overview: {
      heading: 'From catalog to checkout, perfected',
      paragraphs: [
        'Shoppers judge your store in seconds. If it is slow, confusing, or clunky on mobile, they bounce and buy from someone else. We build storefronts that feel effortless at every step of the journey.',
        'Payments, shipping, tax, inventory, and marketing integrations are handled behind the scenes, so you can focus on products and growth while your store works around the clock.',
      ],
      bullets: [
        'Familiar, fast, mobile-first browsing experience',
        'Streamlined checkout that slashes cart abandonment',
        'Painless product, inventory, and order management',
        'Payments, shipping, tax, and integrations built in',
      ],
      image: '/images/Services/E-commerce Solutions/overview.png',
      imageAlt: 'E-commerce product showcase',
    },
    includes: [
      {
        icon: 'cart',
        title: 'Store Setup & Design',
        description: 'Conversion-tuned storefronts on Shopify, WooCommerce, or BigCommerce.',
      },
      {
        icon: 'package',
        title: 'Product & Catalog Management',
        description: 'Clean catalogs, variants, and inventory that are genuinely easy to run.',
      },
      {
        icon: 'credit-card',
        title: 'Payments & Shipping',
        description: 'Secure gateways, tax, and shipping rates configured for every market.',
      },
      {
        icon: 'smartphone',
        title: 'Mobile Checkout',
        description: 'Thumb-friendly checkout with autofill and express options baked in.',
      },
      {
        icon: 'trending',
        title: 'Conversion Optimization',
        description: 'A/B tests, upsells, and trust signals that lift average order value.',
      },
      {
        icon: 'share',
        title: 'Marketing Integrations',
        description: 'Email, ads, and analytics connected so you can drive repeat sales.',
      },
    ],
    tech: [
      { src: '/images/Services/E-commerce Solutions/shopify.png', alt: 'Shopify' },
      { src: '/images/Services/E-commerce Solutions/woo.webp', alt: 'WooCommerce' },
      { src: '/images/Services/E-commerce Solutions/bigcommerce.png', alt: 'BigCommerce' },
      { src: '/images/Services/E-commerce Solutions/wordpress.png', alt: 'WordPress' },
    ],
    process: [
      { title: 'Plan', description: 'Products, platforms, and goals are mapped before we design.' },
      { title: 'Design & Build', description: 'A storefront and catalog crafted around the buyer journey.' },
      { title: 'Launch', description: 'Payments, shipping, and orders are tested until flawless.' },
      { title: 'Scale', description: 'Conversion tests and marketing turn browsers into buyers.' },
    ],
    plans: [
      {
        name: 'Starter Store',
        price: '$1,500+',
        priceNote: 'One-time',
        blurb: 'Launch your first store and start selling fast.',
        features: ['Up to 20 products', 'Platform setup & theme', 'Payments & shipping', 'Mobile optimized'],
      },
      {
        name: 'Growth Storefront',
        price: '$4,000+',
        priceNote: 'One-time',
        blurb: 'A full store optimized to convert and scale.',
        features: [
          'Unlimited products',
          'Custom design',
          'SEO & analytics setup',
          'Marketing integrations',
          'Conversion-focused checkout',
        ],
        featured: true,
      },
      {
        name: 'Headless Enterprise',
        price: 'Custom',
        priceNote: 'Project-based',
        blurb: 'Complex catalogs and custom buyer journeys.',
        features: ['Headless architecture', 'Complex integrations', 'Dedicated dev team', 'SLA & scaling support'],
      },
    ],
    faq: [
      {
        q: 'Which platform should I choose?',
        a: 'Shopify for simplicity, WooCommerce for WordPress flexibility, BigCommerce for enterprise features. We recommend based on your catalog size, budget, and goals.',
      },
      {
        q: 'Can you migrate my existing store?',
        a: 'Yes. We migrate products, customers, and order history carefully preserving your data and SEO while moving to a better platform.',
      },
      {
        q: 'Do you handle payments and tax?',
        a: 'We configure secure payment gateways, sales tax, and shipping rates for your markets, and show you exactly how everything is set up.',
      },
      {
        q: 'What about my product photos and descriptions?',
        a: 'We can format, optimize, and even write descriptions that sell. And our content team can create beautiful product photography treatment if you need it.',
      },
      {
        q: 'How do you reduce cart abandonment?',
        a: 'A faster, simpler checkout, guest checkout, express pay, clear shipping costs, and trust signals plus email recovery funnels for the shoppers who do leave.',
      },
    ],
    related: [
      { slug: 'web-design', blurb: 'A brand website that turns one-time buyers into loyal customers.' },
      { slug: 'digital-marketing', blurb: 'Ads and emails that keep your products in front of shoppers.' },
      { slug: 'website-management', blurb: 'Store updates, security, and performance handled for you.' },
    ],
  },
  {
    slug: 'logo-branding',
    navLabel: 'Logo & Branding',
    blurb: 'Complete identities people see, trust, and remember.',
    hero: {
      eyebrow: 'Logo & Branding',
      title: 'A brand that',
      accent: 'people remember',
      accentHighlight: ['remember'],
      lede: 'Your brand is more than a logo it is the feeling people get whenever they meet you. Maven designs complete identities that make your business recognizable everywhere it shows up.',
      image: '/images/Services/Logo & Branding/hero.png',
      imageAlt: 'Maven 3D logo representing brand design',
    },
    stats: [
      { value: 80, suffix: '+', label: 'Brands built & refreshed' },
      { value: 7, label: 'Logo concepts per project' },
      { value: 3, suffix: 'X', label: 'Faster audience recognition' },
      { value: 100, suffix: '%', label: 'Original designs' },
    ],
    overview: {
      heading: 'Identity that leaves a mark',
      paragraphs: [
        'Great brands are built on strategy, not trends. We start by understanding your story, your market, and what makes you different then translate that into a visual identity with real personality.',
        'The result is a system, not just a logo: colors, typography, and messaging that work together so your brand looks and sounds unmistakably yours everywhere it appears.',
      ],
      bullets: [
        'Distinctive logos built on strategy, not trends',
        'Every touchpoint consistent and recognizable',
        'Guidelines that keep your brand on-message',
        'Ready for print, web, signage, and social',
      ],
      image: '/images/Services/Logo & Branding/overview.png',
      imageAlt: 'Brand and graphic design concepts',
    },
    includes: [
      {
        icon: 'palette',
        title: 'Logo Design',
        description: 'Original marks designed to stand out, scale anywhere, and last.',
      },
      {
        icon: 'layers',
        title: 'Color & Type System',
        description: 'Palettes and typography that carry your personality consistently.',
      },
      {
        icon: 'pen',
        title: 'Brand Guidelines',
        description: 'A rulebook that keeps every use of your brand perfectly on-brand.',
      },
      {
        icon: 'file',
        title: 'Brand Voice & Messaging',
        description: 'Tone, taglines, and message frameworks that sound like you.',
      },
      {
        icon: 'share',
        title: 'Social & Marketing Kits',
        description: 'Ready-made templates for profiles, posts, and ads.',
      },
      {
        icon: 'sparkles',
        title: 'Brand Refresh',
        description: 'Modernize an existing identity without losing the recognition you earned.',
      },
    ],
    process: [
      { title: 'Discover', description: 'We learn your story, market, and what makes you different.' },
      { title: 'Design', description: 'Moodboards and concepts explore bold, strategic directions.' },
      { title: 'Refine', description: 'You pick a favorite; we polish it to perfection.' },
      { title: 'Deliver', description: 'Every file, format, and guideline you need to go to market.' },
    ],
    plans: [
      {
        name: 'Logo Essential',
        price: '$500+',
        priceNote: 'One-time',
        blurb: 'A memorable logo that starts your brand the right way.',
        features: ['3 logo concepts', 'Vector & print files', 'Color & typography spec', 'Usage guide'],
      },
      {
        name: 'Brand Identity Kit',
        price: '$1,500+',
        priceNote: 'One-time',
        blurb: 'Everything you need to look professional everywhere.',
        features: [
          'Full logo suite',
          'Color & type system',
          'Brand guidelines PDF',
          'Social media kit',
          'Business card design',
        ],
        featured: true,
      },
      {
        name: 'Complete Brand System',
        price: 'Custom',
        priceNote: 'Project-based',
        blurb: 'A full identity, voice, and rollout for serious brands.',
        features: [
          'Everything in Identity Kit',
          'Brand voice & messaging',
          'Rebrand strategy',
          'Agency rollout support',
        ],
      },
    ],
    faq: [
      {
        q: 'How long does a logo take?',
        a: 'A focused logo project typically finishes in 2–3 weeks, including concepts, revisions, and final files. Full brand systems take 4–6 weeks.',
      },
      {
        q: 'What if I do not like the designs?',
        a: 'We refine until you love it. Every plan includes revision rounds, and if a direction is off, we pivot before we polish.',
      },
      {
        q: 'What files do I get?',
        a: 'Everything: vector (SVG, AI, PDF), raster (PNG, JPG), and optimized web files sized for print, screens, and social media.',
      },
      {
        q: 'Do you design more than the logo?',
        a: 'Yes. Packaging, signage, business cards, social graphics, and full marketing collateral our identity kits and brand systems cover it.',
      },
      {
        q: 'Can you refresh my existing brand?',
        a: 'Constantly. Brand refreshes keep you modern and relevant while preserving the equity your current brand has earned.',
      },
    ],
    related: [
      { slug: 'digital-marketing', blurb: 'An on-brand voice that makes every campaign unmistakably you.' },
      { slug: 'web-design', blurb: 'Your new identity, beautifully applied across your website.' },
      { slug: 'ecommerce', blurb: 'Storefronts that carry your brand from browse to checkout.' },
    ],
  },
  {
    slug: 'ai-consulting',
    navLabel: 'AI Consulting',
    blurb: 'AI strategy, custom development and production-grade automation that pays for itself.',
    hero: {
      eyebrow: 'AI Consulting & Implementation',
      title: 'We build the',
      accent: 'AI systems that run your business',
      accentHighlight: ['ai', 'systems'],
      lede: 'Full-service AI consulting, from enterprise strategy and roadmapping through custom development, production deployment and ongoing optimization. No slide decks without code. No pilots without a plan to ship.',
      image: '/images/Services/AI Consulting/card.png',
      imageLight: '/images/Services/AI Consulting/card.png',
      imageAlt: 'Abstract visualization of an AI network',
    },
    stats: [
      { value: 8, label: 'Core service lines' },
      { value: 90, suffix: ' days', label: 'Average time to production' },
      { value: 100, suffix: '%', label: 'Custom-built solutions' },
      { value: 2, suffix: ' weeks', label: 'Development sprints' },
    ],
    overview: {
      heading: 'AI that ships and pays for itself',
      headingHighlight: ['ships', 'pays'],
      paragraphs: [
        'Every engagement starts with your business goals, not the technology. We design, build and deploy AI systems that fit into your existing operations and deliver measurable ROI.',
        'Our strategists write code. Every consultant has deployed production systems. We model expected returns before we write a line of code, then track the KPIs that matter after launch.',
      ],
      bullets: [
        'Builders, not advisors: every strategist writes code',
        'Private, governed systems with audit trails and access controls',
        'Integration with your CRM, ERP and internal tools',
        'ROI modeled before we build, then tracked after launch',
        'Human-in-the-loop controls and ongoing optimization',
      ],
      image: '/images/Services/AI Consulting/overview.png',
      imageAlt: 'Diagram of an AI core connected to business systems',
    },
    includes: [
      {
        icon: 'target',
        title: 'AI Strategy & Roadmapping',
        description:
          'A structured approach to AI adoption that starts with your workflows, not the hype cycle. We map every process, model the return, and deliver a phased plan with governance guardrails.',
      },
      {
        icon: 'link',
        title: 'AI Implementation & Integration',
        description:
          'Production-grade integration that connects intelligent systems to your CRM, ERP and internal tools, including data pipelines, APIs, deployment and monitoring.',
      },
      {
        icon: 'code',
        title: 'Custom AI Development',
        description:
          'Private AI systems built from the ground up: internal copilots, RAG systems trained on your knowledge base, and intelligent dashboards.',
      },
      {
        icon: 'zap',
        title: 'AI Automation Services',
        description:
          'Systematic workflow automation that replaces manual work with intelligent processes, from back-office operations to customer-facing workflows.',
      },
      {
        icon: 'megaphone',
        title: 'AI for Marketing & Sales',
        description:
          'AI-powered revenue systems, from intelligent prospecting agents and lead generation to personalized follow-up sequences and campaign optimization.',
      },
      {
        icon: 'life-buoy',
        title: 'AI Customer Support Systems',
        description:
          'Intelligent support infrastructure that handles volume without sacrificing quality, using knowledgebase-powered copilots, smart triage and escalation logic.',
      },
      {
        icon: 'database',
        title: 'AI Data & Analytics Consulting',
        description:
          'Predictive analytics and business intelligence built on AI, from demand forecasting to KPI anomaly detection and decision support.',
      },
      {
        icon: 'sparkles',
        title: 'AI Agents & Autonomous Systems',
        description:
          'Purpose-built agents that reason, plan and execute multi-step tasks across your business systems with human-in-the-loop controls.',
      },
    ],
    process: [
      {
        title: 'Discover',
        description: 'We deep-dive into your workflows, systems and pain points to identify high-impact AI opportunities and model expected ROI.',
      },
      {
        title: 'Architect',
        description: 'We design the technical blueprint: data flows, model selection, integration points and the governance framework.',
      },
      {
        title: 'Build & Ship',
        description: 'Iterative development in two-week sprints puts working systems in your hands fast, with continuous feedback loops.',
      },
      {
        title: 'Optimize',
        description: 'Post-deployment monitoring, performance tuning and expansion planning, measured against the original ROI model.',
      },
    ],
    plans: [
      {
        name: 'AI Roadmap',
        price: 'Custom',
        priceNote: '2–3 week sprint',
        blurb: 'A prioritized, ROI-modeled plan for where AI fits in your business.',
        features: [
          'Workflow & opportunity audit',
          'ROI modeling',
          'Vendor & model selection',
          'Phased implementation plan',
          'Governance guardrails',
        ],
      },
      {
        name: 'AI Build',
        price: 'Custom',
        priceNote: 'Project-based',
        blurb: 'A production-ready AI system deployed into your workflow.',
        features: [
          'Custom development',
          'Data pipelines & integrations',
          'Two-week delivery sprints',
          'Deployment & monitoring',
          'Team training & handover',
        ],
        featured: true,
      },
      {
        name: 'AI Partner',
        price: 'Custom',
        priceNote: 'Monthly retainer',
        blurb: 'Ongoing optimization and new agents as you scale.',
        features: [
          'Dedicated AI engineer',
          'Agent monitoring & tuning',
          'New use cases each quarter',
          'Security & governance reviews',
          'Priority support',
        ],
      },
    ],
    faq: [
      {
        q: 'What is AI consulting and how can it help my business?',
        a: 'AI consulting connects your business goals to practical AI systems. We audit your workflows, identify high-impact opportunities, model the ROI, then build and deploy the solution so AI saves time or grows revenue instead of sitting in a slide deck.',
      },
      {
        q: 'How long does AI implementation typically take?',
        a: 'Most engagements move from discovery to a production system in about 90 days, delivered in two-week sprints. A focused automation or copilot can ship sooner; complex multi-system integrations take longer. We agree on milestones before work begins.',
      },
      {
        q: 'What types of custom AI solutions can you build?',
        a: 'Internal copilots, RAG systems trained on your own knowledge base, AI agents, intelligent dashboards, prospecting and follow-up automation, support assistants and predictive analytics, all built around your data and tools.',
      },
      {
        q: 'Do you integrate AI with our existing systems?',
        a: 'Yes. We connect AI to your CRM, ERP, internal APIs, databases and support tools, including data pipelines, API orchestration, access controls, deployment infrastructure and monitoring.',
      },
      {
        q: 'How do you ensure AI governance and security?',
        a: 'Governance is designed in from day one: data access controls, audit trails, human-in-the-loop approvals, model and vendor reviews, and compliance alignment for frameworks such as SOC 2, ISO/IEC 42001 and HIPAA.',
      },
      {
        q: 'What industries do you serve?',
        a: 'We work with professional services, healthcare, finance, manufacturing, e-commerce and B2B teams. The common thread is a workflow worth improving and data we can responsibly use.',
      },
      {
        q: 'What are AI agents and how are they different from chatbots?',
        a: 'A chatbot responds to a prompt. An AI agent can reason, plan and execute multi-step tasks across your systems, such as qualifying a lead, updating the CRM and scheduling follow-up, with humans approving the sensitive steps.',
      },
      {
        q: 'What kind of AI agents can you build?',
        a: 'Task-specific agents and multi-agent workflows for sales follow-up, support triage, research, reporting, operations and internal knowledge. Every agent is scoped with clear tools, guardrails and escalation paths.',
      },
    ],
    related: [
      { slug: 'seo', blurb: 'Get recommended in AI answers with AEO & GEO strategy.' },
      { slug: 'digital-marketing', blurb: 'Put AI to work in your campaigns, content and lead follow-up.' },
      { slug: 'web-development', blurb: 'Custom integrations and applications built around your AI systems.' },
    ],
  },
  {
    slug: 'cyber-security',
    navLabel: 'Cyber Security',
    blurb: 'Penetration testing, compliance readiness and audit support that close deals and prove your business is secure.',
    hero: {
      eyebrow: 'Cyber Security',
      title: 'Cyber security services for',
      accent: 'growing businesses',
      accentHighlight: ['growing', 'businesses'],
      lede: 'Your biggest prospects now ask for proof of security before they sign. Maven helps growing businesses pass penetration tests, close compliance gaps and get through SOC 2 and PCI audits without building a security team first.',
      image: '/images/Services/Cyber Security/card.png',
      imageLight: '/images/Services/Cyber Security/card.png',
      imageAlt: 'Abstract visualization of a security shield and network',
    },
    stats: [
      { value: 3, label: 'Core security services' },
      {
        value: 77,
        suffix: '%',
        label: 'of businesses say stakeholders now demand verified proof of compliance (Vanta, Oct 2025)',
      },
      {
        value: 57,
        suffix: '%',
        label: 'have ended a vendor relationship over security concerns (Vanta, Oct 2025)',
      },
      {
        value: 4.99,
        prefix: '$',
        suffix: 'M',
        decimals: 2,
        label: 'global average cost of a data breach in 2026 (IBM)',
      },
    ],
    overview: {
      heading: 'Security that stands up to scrutiny',
      headingHighlight: ['scrutiny'],
      paragraphs: [
        'Cybersecurity services are the assessments, controls and audit work that protect your systems and data and prove that protection to customers, auditors and insurers.',
        'For growing companies, that means penetration testing to find weaknesses, compliance readiness to close gaps against frameworks like SOC 2 and PCI DSS, and coordinated third-party attestation.',
        'We work with vendors facing a Fortune 1000 security review, companies handling regulated data, and 20-to-250-person teams without a security lead. Maven becomes the fractional owner of your security program and works alongside the IT provider you already have.',
      ],
      bullets: [
        'Penetration testing that finds gaps before buyers or attackers do',
        'Compliance readiness for SOC 2, HIPAA, ISO 27001, PCI DSS and NIST CSF',
        'Independent attestation coordinated under one contract',
        'Reports, policies and letters written for procurement teams',
        'One partner across web, infrastructure and security',
        'Chicago-area team, remote delivery nationwide, fixed-scope engagements',
      ],
      image: '/images/Services/Cyber Security/overview.png',
      imageAlt: 'Security shield connected to business systems',
    },
    includes: [
      {
        icon: 'shield',
        title: 'Penetration Testing',
        description:
          'Manual, human-led testing of your web applications, external and internal networks before an attacker or enterprise buyer finds the gap. You get a severity-ranked report, a retest and a letter of attestation you can share.',
      },
      {
        icon: 'code',
        title: 'Web Application Testing',
        description:
          'OWASP-aligned testing of your web apps, APIs and authentication flows, with a severity-ranked report and retest.',
      },
      {
        icon: 'server',
        title: 'Network & Segmentation Testing',
        description:
          'External and internal network testing, including PCI DSS segmentation testing to prove cardholder data is isolated.',
      },
      {
        icon: 'search',
        title: 'Social Engineering & Threat Monitoring',
        description:
          'Human-led social engineering plus OSINT and dark web monitoring to expose the people and data risks scanners miss.',
      },
      {
        icon: 'layers',
        title: 'Compliance Readiness',
        description:
          'Gap assessment, remediation roadmap, policies, control implementation and evidence collection for SOC 2, HIPAA, ISO 27001/42001, PCI DSS and NIST CSF 2.0.',
      },
      {
        icon: 'pen',
        title: 'Attestation & Audit Support',
        description:
          'Maven coordinates the independent CPA firm or PCI QSA, manages evidence and scope, and keeps the engagement under one contract.',
      },
      {
        icon: 'credit-card',
        title: 'SOC 2 & PCI Reports',
        description:
          'SOC 1 and SOC 2 Type I/II reports, PCI DSS AOC and ROC, bridge letters and annual renewal support.',
      },
      {
        icon: 'settings',
        title: 'Remediation & Documentation',
        description:
          'We fix what matters, write the policies and collect the evidence, with technical fixes handled by the web and server team that already manages your stack.',
      },
    ],
    process: [
      {
        title: 'Scope the Ask',
        description: 'We start from the actual questionnaire, contract clause or framework your customer named, not a generic checklist.',
      },
      {
        title: 'Assess and Prioritize',
        description: 'A penetration test, a gap assessment or both. Findings are ranked by business risk and by what is blocking the deal.',
      },
      {
        title: 'Remediate and Document',
        description: 'We fix what matters, write the policies and collect the evidence. Our web and server team handles technical fixes on stacks it already manages.',
      },
      {
        title: 'Attest and Maintain',
        description: 'An independent auditor issues the report. We keep the controls current so the next questionnaire is a reuse, not a restart.',
      },
    ],
    plans: [
      {
        name: 'Penetration Test',
        price: 'Custom',
        priceNote: 'Fixed-scope engagement',
        blurb: 'Find and rank the gaps before an attacker or enterprise buyer does.',
        features: [
          'External and internal network testing',
          'Web application testing (OWASP)',
          'Social engineering and OSINT',
          'PCI DSS segmentation testing',
          'Severity-ranked report, retest and attestation letter',
        ],
      },
      {
        name: 'Compliance Readiness',
        price: 'Custom',
        priceNote: 'Framework-based program',
        blurb: 'Close the gaps and build the evidence trail for your audit.',
        features: [
          'Gap assessment and remediation roadmap',
          'Policies and control implementation',
          'SOC 1/2, HIPAA, ISO 27001 and 42001',
          'PCI DSS v4.0.1 and NIST CSF 2.0',
          'Evidence collection and CMMC on request',
        ],
        featured: true,
      },
      {
        name: 'Attestation & Audit Support',
        price: 'Custom',
        priceNote: 'Independent engagement',
        blurb: 'Go from readiness to a signed report with one coordinated engagement.',
        features: [
          'SOC 1 and SOC 2 Type I and II',
          'PCI DSS AOC and ROC',
          'Independent CPA firm and QSA coordination',
          'Evidence chain-of-custody and scope verification',
          'Bridge letters and annual renewal',
        ],
      },
    ],
    faq: [
      {
        q: 'What do cybersecurity services include?',
        a: 'Typically assessment (penetration testing, vulnerability scanning, risk and gap analysis), program build-out (policies, access controls, monitoring, training) and verification (compliance readiness and third-party attestations such as SOC 2 or PCI DSS). Maven focuses on the three pieces growing businesses need when a customer asks for proof: testing, readiness and attestation.',
      },
      {
        q: 'How is cyber security different from website maintenance?',
        a: 'Website maintenance keeps one site updated, backed up, fast and online. Cybersecurity services go wider: testing your applications and network for exploitable weaknesses, building the controls a framework requires and producing audit evidence. Maintenance reduces risk on one asset; security services prove the whole business is protected.',
      },
      {
        q: 'Do we need this if we already have an MSP or IT provider?',
        a: "Usually yes. Most MSPs run day-to-day IT and some security tooling, but they rarely perform independent penetration tests, build a compliance program or coordinate a SOC 2 audit. Maven works alongside your IT provider and hands them the remediation list. We don't replace them.",
      },
      {
        q: 'Does Maven issue SOC 2 reports or PCI certifications?',
        a: 'No, and no agency should. SOC reports must be issued by an independent licensed CPA firm, and PCI Reports on Compliance by a QSA listed with the PCI Security Standards Council. Maven holds the engagement, prepares you, and manages evidence and remediation so the independent examination goes smoothly.',
      },
      {
        q: 'How long does it take to become SOC 2 or PCI compliant?',
        a: 'Readiness typically takes one to three months depending on how many controls already exist. A SOC 2 Type I can follow soon after; a Type II requires an observation period, usually three to twelve months. PCI timelines depend on your merchant level and whether a self-assessment or a QSA-led ROC is required.',
      },
      {
        q: 'How much do cybersecurity services cost for a mid-size business?',
        a: "It depends on scope. A penetration test of one web application is priced differently than a SOC 2 Type II readiness program plus the audit. Maven scopes each engagement to the specific requirement or framework you're facing and quotes fixed fees per phase, so you can start with what unblocks the deal.",
      },
      {
        q: 'What is the difference between cybersecurity consulting and managed security services?',
        a: "Consulting is project-based: assessments, pen tests, readiness programs and audit coordination with a defined start and finish. Managed security services are ongoing operations such as 24/7 monitoring and detection. Maven's core offer is consulting and readiness; for continuous monitoring we recommend or integrate with a managed detection provider.",
      },
      {
        q: 'Will a penetration test take our website or systems offline?',
        a: "A properly scoped test shouldn't. We agree on scope, test windows and excluded systems up front, use staging environments where possible and never run denial-of-service techniques. Production testing is coordinated with your IT team, and you get a findings report, a remediation plan and a retest.",
      },
    ],
    related: [
      { slug: 'website-management', blurb: 'The team that keeps your site fast, secure and online can fix the findings.' },
      { slug: 'ai-consulting', blurb: 'Put governed AI to work without creating new data or security risk.' },
      { slug: 'web-development', blurb: 'Build security into new applications and integrations from day one.' },
    ],
  },
]