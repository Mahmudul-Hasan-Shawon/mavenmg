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
    image: string
    imageAlt: string
  }
  stats: ServiceStat[]
  overview: {
    heading: string
    paragraphs: string[]
    bullets: string[]
    image: string
    imageAlt: string
  }
  includes: { icon: ServiceIcon; title: string; description: string }[]
  process: { title: string; description: string }[]
  plans: ServicePlan[]
  faq: ServiceFaq[]
  /** Related-service slugs to cross-link at the bottom of the page. */
  related: { slug: string; blurb: string }[]
  /** Optional partner/tool logos rendered as a strip. */
  tech?: { src: string; alt: string }[]
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
      lede: 'Every business is different — your website should be too. Maven crafts bespoke, conversion-focused websites that capture your brand, guide your visitors, and turn clicks into customers. No templates, no compromises.',
      image: '/images/Services/Custom Website Design/hero.jpg',
      imageAlt: 'Custom website design displayed on a laptop',
    },
    stats: [
      { value: 200, suffix: '+', label: 'Websites launched' },
      { value: 2.8, suffix: '×', decimals: 1, label: 'Average conversion lift' },
      { value: 100, suffix: '%', label: 'Responsive by default' },
      { value: 98, label: 'Average Lighthouse score' },
    ],
    overview: {
      heading: 'Design that works as hard as you do',
      paragraphs: [
        'A great website is equal parts art and strategy. We start with your business goals and your visitors\u2019 behavior, then design an interface that looks stunning and quietly does its job — guiding people toward the action you want them to take.',
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
        description: 'Design systems built from your colors, typography, and personality — not a generic look.',
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
        a: 'We love redesigns. We audit what you have, keep what works, and rebuild the rest — often lifting conversions within weeks of relaunch.',
      },
    ],
    related: [
      { slug: 'web-development', blurb: 'Clean, scalable code that makes your design fast, secure, and future-proof.' },
      { slug: 'ecommerce', blurb: 'High-converting storefronts built on the platforms your customers trust.' },
      { slug: 'logo-branding', blurb: 'A complete identity that makes your site — and business — unmistakable.' },
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
      lede: 'A design is only as good as the code behind it. Maven builds fast, secure, and scalable websites and web apps — engineered to perform today and grow with your business tomorrow.',
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
        'Behind every fast, reliable website is thoughtful engineering. We write clean, modular, documented code that follows modern best practices — not a patchwork of plugins held together with hope.',
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
        description: 'WordPress, headless, or fully custom — we build the foundation your content needs.',
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
        a: 'Design defines how your site looks and feels; development builds it so it works. Maven offers both seamlessly — designing the experience, then engineering the code behind it.',
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
      { slug: 'ecommerce', blurb: 'Storefront engineering — payments, catalogs, and checkout that just works.' },
      { slug: 'website-management', blurb: 'Keep your build fast, secure, and up to date after launch.' },
    ],
  },
  {
    slug: 'website-management',
    navLabel: 'Website Management',
    blurb: 'Monitoring, updates, and content — your site handled for you.',
    hero: {
      eyebrow: 'Website Management',
      title: 'Your website,',
      accent: 'fully handled.',
      accentHighlight: ['handled'],
      lede: 'Your website should work for you — never the other way around. Maven manages updates, security, monitoring, and content so your site stays fast, fresh, and online with a 99.9% uptime guarantee.',
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
      paragraphs: [
        'Too many businesses lose customers when their website goes down, loads slowly, or gets hacked. We put systems in place so those things simply do not happen — and when issues do appear, we usually catch them before you ever notice.',
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
        description: 'Uptime, performance, and security watched around the clock — with alerts before outages.',
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
        a: 'Monitoring alerts us within minutes. We diagnose and restore the site — usually before your visitors even notice — and keep you updated throughout.',
      },
      {
        q: 'How are updates tested so nothing breaks?',
        a: 'We test updates in a staging environment first, then apply them to your live site. If anything conflicts, we roll it back instead of shipping a broken page.',
      },
      {
        q: 'Who writes the content updates?',
        a: 'Content changes are handled by our team — including writers and editors for posts, pages, and images. You tell us the topic; we produce it.',
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
      lede: 'When people search for what you offer, you should be there. Maven combines technical expertise, quality content, and real authority building to grow your rankings — and the revenue that follows.',
      image: '/images/Services/SEO Services/hero.jpg',
      imageAlt: 'Search engine optimization analytics',
    },
    stats: [
      { value: 3.5, suffix: '×', decimals: 1, label: 'Average organic traffic growth' },
      { value: 87, suffix: '%', label: 'Of searches start with organic results' },
      { value: 40, suffix: '+', label: 'Keywords tracked per client' },
      { value: 3, label: 'Months to first page-1 rankings' },
    ],
    overview: {
      heading: 'Visibility that compounds over time',
      paragraphs: [
        'SEO is the gift that keeps giving: unlike ads, the traffic keeps coming month after month. We start with a deep audit, fix the technical foundation, and then build the content and authority that moves you up the rankings.',
        'We do not chase vanity metrics. Every optimization ties back to keywords your ideal customers actually search — and to leads and sales you can measure.',
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
        a: 'Ads deliver immediate traffic for as long as you pay. SEO earns free, compounding traffic. Most businesses do best with a mix — we will tell you honestly which to prioritize.',
      },
      {
        q: 'Do you guarantee #1 rankings?',
        a: 'No honest agency does. We guarantee quality work, transparent reporting, and aggressive progress — and we are transparent about feasibility from day one.',
      },
      {
        q: 'Will SEO work for my industry?',
        a: 'Whether you run a local law firm or a national e-commerce brand, the fundamentals apply. We tailor the strategy to your market and competition.',
      },
      {
        q: 'What do your reports include?',
        a: 'Rankings, organic traffic, leading pages, and conversions — tied to your business goals, with clear recommendations for the month ahead.',
      },
    ],
    related: [
      { slug: 'digital-marketing', blurb: 'Paid ads and content that amplify your organic wins.' },
      { slug: 'website-management', blurb: 'A fast, healthy site that ranks better over time.' },
      { slug: 'web-design', blurb: 'Conversion-ready design that turns SEO traffic into customers.' },
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
      lede: 'From paid ads to social media and email, Maven builds data-driven campaigns that fill your funnel with qualified leads — and turn them into loyal, repeat customers.',
      image: '/images/Services/Digital Marketing/hero.jpg',
      imageAlt: 'Digital marketing strategy and analytics',
    },
    stats: [
      { value: 5, suffix: '×', label: 'Average return on ad spend' },
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
        'Clear monthly reporting — no jargon, no fluff',
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
      { title: 'Launch', description: 'Campaigns, creative, and funnels go live fast — then get measured.' },
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
        a: 'It depends on your audience and goals. We analyze your market and recommend a starting point — often Google Ads or a focused social strategy — before you spend a dollar.',
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
        a: 'Paid campaigns typically start converting within the first month. Organic channels build slower but compound — we set honest expectations up front.',
      },
      {
        q: 'Do you work alongside my in-house team?',
        a: 'Yes. We slot in as your fractional marketing team, or partner alongside existing staff — sharing tools, reports, and goals so everyone wins.',
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
      lede: 'A pretty shop is not enough — it has to convert. Maven builds e-commerce experiences that guide shoppers from browse to checkout without friction, on platforms you can actually manage.',
      image: '/images/Services/E-commerce Solutions/hero.png',
      imageAlt: 'E-commerce storefront on screen',
    },
    stats: [
      { value: 3.2, suffix: '×', decimals: 1, label: 'Average checkout conversion lift' },
      { value: 40, suffix: '%', label: 'Faster pages after rebuild' },
      { value: 99.9, suffix: '%', decimals: 1, label: 'Uptime on storefronts' },
      { value: 1000, suffix: '+', label: 'Products easily managed' },
    ],
    overview: {
      heading: 'From catalog to checkout, perfected',
      paragraphs: [
        'Shoppers judge your store in seconds. If it is slow, confusing, or clunky on mobile, they bounce — and buy from someone else. We build storefronts that feel effortless at every step of the journey.',
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
        a: 'Yes. We migrate products, customers, and order history carefully — preserving your data and SEO while moving to a better platform.',
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
        a: 'A faster, simpler checkout, guest checkout, express pay, clear shipping costs, and trust signals — plus email recovery funnels for the shoppers who do leave.',
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
      lede: 'Your brand is more than a logo — it is the feeling people get whenever they meet you. Maven designs complete identities that make your business recognizable everywhere it shows up.',
      image: '/images/Services/Logo & Branding/hero.png',
      imageAlt: 'Maven 3D logo representing brand design',
    },
    stats: [
      { value: 80, suffix: '+', label: 'Brands built & refreshed' },
      { value: 7, label: 'Logo concepts per project' },
      { value: 3, suffix: '×', label: 'Faster audience recognition' },
      { value: 100, suffix: '%', label: 'Original designs' },
    ],
    overview: {
      heading: 'Identity that leaves a mark',
      paragraphs: [
        'Great brands are built on strategy, not trends. We start by understanding your story, your market, and what makes you different — then translate that into a visual identity with real personality.',
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
        a: 'Everything: vector (SVG, AI, PDF), raster (PNG, JPG), and optimized web files — sized for print, screens, and social media.',
      },
      {
        q: 'Do you design more than the logo?',
        a: 'Yes. Packaging, signage, business cards, social graphics, and full marketing collateral — our identity kits and brand systems cover it.',
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
]