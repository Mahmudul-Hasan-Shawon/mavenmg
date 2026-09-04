/* ===== Maven Marketing Group — shared site JS ===== */

/* ---------- Data (ported from src/data/content.js) ---------- */
const brand = {
  name: 'Maven Marketing Group',
  shortName: 'Maven',
  tagline: 'Custom Built Websites',
  subtitle: 'We Build Websites With A Purpose',
  founded: 2019,
  phone: '(847) 558-9957',
  email: 'info@mavenmarketinggroup.com',
  address: { street: '715 Ela Rd.', city: 'Lake Zurich', state: 'IL', zip: '60047' },
  social: {
    instagram: 'https://www.instagram.com/mavenmg/',
    facebook: 'https://www.facebook.com/mavenmg',
    twitter: 'https://twitter.com/mavenmg',
    linkedin: 'https://www.linkedin.com/company/mavenmg/',
  },
}

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Our Work', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const partners = [
  { src: 'images/partner-woo.webp', alt: 'Certified WooCommerce Partner' },
  { src: 'images/partner-google.png', alt: 'Google Partner' },
  { src: 'images/partner-shopify.png', alt: 'Shopify Certified Partner' },
  { src: 'images/partner-hubspot.webp', alt: 'HubSpot Platinum Partner' },
  { src: 'images/partner-meta.png', alt: 'Meta Business Partner' },
  { src: 'images/partner-bigcommerce.png', alt: 'BigCommerce Certified Partner' },
  { src: 'images/partner-wordpress.png', alt: 'WordPress Partner' },
  { src: 'images/partner-semrush.png', alt: 'Semrush Partner' },
]

const services = [
  { id: 'web-design', title: 'Custom Website Solutions', features: ['Custom Web Design', 'Custom Web Development', 'Website Redesign', 'Ecommerce'] },
  { id: 'management', title: 'Website Management', features: ['Web Maintenance', 'Dedicated Management', 'Content Strategy', 'Rebrand'] },
  { id: 'seo', title: 'Search Engine Optimization', features: ['SEO', 'Conversion Rate Optimization', 'Lead Generation'] },
  { id: 'marketing', title: 'Digital Marketing', features: ['PPC/Google Ads', 'Social Media Marketing', 'Content Marketing', 'Logo Design'] },
]

const serviceLinks = [
  'Custom Website Design',
  'Website Development',
  'Website Management',
  'SEO Services',
  'Digital Marketing',
  'E-commerce Solutions',
  'Logo & Branding',
]

const portfolioItems = [
  { id: 1, name: 'HAQ Pickleball', category: 'E-Commerce', image: 'images/p1.jpg', color: '#E85D04' },
  { id: 2, name: 'Pirtano Construction', category: 'Construction & Real Estate', image: 'images/p2.jpg', color: '#2D6A4F' },
  { id: 3, name: 'LSC Development', category: 'Construction & Real Estate', image: 'images/p3.jpg', color: '#1A1A2E' },
  { id: 4, name: 'CRX Engines', category: 'Manufacturing', image: 'images/p4.jpg', color: '#3B82F6' },
  { id: 5, name: 'Simpson Cleaning', category: 'Manufacturing', image: 'images/p5.jpg', color: '#0D7377' },
  { id: 6, name: 'GXC Inc', category: 'Other', image: 'images/p6.jpg', color: '#7B2CBF' },
  { id: 7, name: 'TorHoerman Law', category: 'Law Firms', image: 'images/p1.jpg', color: '#C77DFF' },
  { id: 8, name: 'Waggon', category: 'Other', image: 'images/p2.jpg', color: '#E85D04' },
  { id: 9, name: 'Kieth Law Group', category: 'Law Firms', image: 'images/p3.jpg', color: '#612C8B' },
  { id: 10, name: 'Crypto Cache', category: 'E-Commerce', image: 'images/p4.jpg', color: '#FAA307' },
  { id: 11, name: 'Blueberry', category: 'Other', image: 'images/p5.jpg', color: '#4A1F6B' },
]

const categories = ['All', 'Construction & Real Estate', 'E-Commerce', 'Law Firms', 'Manufacturing', 'Other']

const testimonials = [
  { name: 'Slater Heil', role: 'Founder & CEO', company: 'Blueberry', text: 'When we at Blueberry needed a site to match our next-gen DeFi vision, Maven delivered something unreal. Their design is unmatched in this cutting-edge space—sleek, futuristic, and screaming innovation, it\'s like they pulled our protocol\'s soul straight onto the screen.' },
  { name: 'Edric Bol', role: 'Owner', company: 'Bolco Construction', text: 'Maven stepped up and delivered exactly what I wanted: simple and effective. They built a clean, no-nonsense site that puts our work front and center with great photos, easy navigation, and a straightforward layout that doesn\'t confuse anyone.' },
  { name: 'Mike Wall', role: 'Owner', company: 'Simpson Cleaning', text: 'Before maven we were on BigCommerce — high fees eating us alive. Maven swooped in, got us off that mess, and saved us a ton on monthly costs. The site they built? Tough, slick, and all-American, just like our breachers.' },
  { name: 'Jason Collicot', role: 'Owner', company: 'Crypto Cache', text: 'Maven\'s management of our Crypto Cache website has been phenomenal. They\'ve transformed it with a bold, cutting-edge design — sharp visuals, seamless flow, and a crypto-savvy vibe that grabs attention.' },
  { name: 'Quam Opere', role: 'Owner', company: 'Eminent Limo', text: 'Eminent Limo was stuck at zero, nothing coming through the website, until Maven turned it around. They shot us from $0 to averaging $50K a month, knocking out every competitor in search rankings. Maven\'s design and SEO magic are unreal.' },
  { name: 'John Skalla', role: 'Owner', company: '', text: 'If Maven Marketing Group was an NHL team they would be the Stanley Cup Champions. They shoot and always score. I wouldn\'t let anyone else touch my websites. The best.' },
  { name: 'Genaro Cavazos', role: 'Chief Executive Officer', company: '', text: 'Connor and his team were absolutely fantastic. They professionalized our website and have helped us cement ourselves as a top-notch provider in the Security Industry. I wish I had found them sooner!' },
  { name: 'Jim Hack', role: 'Owner', company: 'Haq Pickleball', text: 'Running Haq Pickle, I needed a site that screams our bold vibe and Maven delivered big time. The checkout? Smooth, and lightning-fast. It\'s not just a website; it\'s Haq Pickle to a T.' },
  { name: 'Jean Jodoin', role: 'Partner', company: 'LSC Development', text: 'Maven Marketing Group gave us exactly what we asked for; A functional site that we could use to communicate. We have had zero issues updating the site after launch and could not be more happy.' },
  { name: 'Mike Piraino', role: 'Owner', company: 'PirTano Construction', text: 'At PirTano Construction, we take pride in our work, and Maven\'s design of our featured projects on our website has been a big win for us. Maven keeps the site clean, updated, and easy to navigate.' },
  { name: 'Gus Alexander', role: 'Owner', company: 'Simpson Pressure Washers', text: 'Our site needed help, outdated, and a mess for our brand. Maven swooped in and saved it with their top-notch maintenance and management services. Now it\'s smooth, fast, and easy to use.' },
  { name: 'Robert Rajfer', role: 'Founder & CEO', company: '', text: 'Their website is not only visually stunning but also incredibly user-friendly, making navigation a breeze. Their marketing strategies are unparalleled, driving tangible results and elevating my online presence beyond expectations.' },
]

const networkApps = [
  { id: 'slack', img: 'images/slack.png', name: 'Slack', col: 'left' },
  { id: 'meet', img: 'images/google-meet.png', name: 'Meet', col: 'left' },
  { id: 'whatsapp', img: 'images/whatsapp.png', name: 'WhatsApp', col: 'left' },
  { id: 'firebase', img: 'images/firebase.png', name: 'Firebase', col: 'right' },
  { id: 'cloudflare', img: 'images/cloudflare.png', name: 'Cloudflare', col: 'right' },
  { id: 'github', img: 'images/github.png', name: 'GitHub', col: 'right' },
]

const beamColors = {
  slack: ['#36c5f0', '#c05cff'],
  meet: ['#4aa8ff', '#0F9D58'],
  whatsapp: ['#3ee18e', '#8868ff'],
  firebase: ['#F7820C', '#a45cff'],
  cloudflare: ['#FAAE40', '#bd5cff'],
  github: ['#8892b0', '#5d83ff'],
}

const currentPage = () => {
  const p = location.pathname
  return p === '' ? '/' : p
}

/* ---------- Navbar ---------- */
function renderNavbar() {
  const placeholders = document.querySelectorAll('[data-navbar]')
  if (!placeholders.length) return
  placeholders.forEach((ph) => {
    const links = navLinks.map((l) => {
      const active = currentPage() === l.href
      const cls = active
        ? 'px-4 py-2 rounded-full text-sm font-medium bg-[#612C8B]/20 text-white cursor-pointer'
        : 'px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer'
      return `<a href="${l.href}" class="${cls}">${l.label}</a>`
    }).join('')

    ph.outerHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b border-transparent py-5">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" class="flex items-center cursor-pointer">
          <img src="images/logo.png" alt="${brand.name}" class="h-10 w-auto" />
        </a>
        <div class="hidden lg:flex items-center gap-1">${links}</div>
        <a href="/contact" class="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#612C8B] to-[#8B4FBF] rounded-full text-sm font-semibold text-white hover:shadow-[0_8px_30px_rgba(97,44,139,0.4)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
          Start Your Project
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <button class="lg:hidden p-2 text-white z-50" data-mobile-toggle>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        </button>
      </div>
    </nav>
    <div class="fixed inset-0 bg-[#0A0A0F]/98 backdrop-blur-3xl z-40 hidden items-center justify-center" data-mobile-menu>
      <div class="flex flex-col items-center gap-6">
        ${navLinks.map((l, i) => {
          const active = currentPage() === l.href
          return `<a href="${l.href}" style="transition-delay:${i * 0.05}s" class="${active ? 'text-[#DACAFF]' : 'text-gray-500 hover:text-white'} text-3xl font-bold cursor-pointer">${l.label}</a>`
        }).join('')}
        <a href="/contact" class="mt-4 px-8 py-3 bg-gradient-to-r from-[#612C8B] to-[#8B4FBF] rounded-full font-semibold text-white cursor-pointer">Start Your Project</a>
      </div>
    </div>`
  })
}

/* ---------- Footer ---------- */
const socialIcons = {
  instagram: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  facebook: '<svg viewBox="0 0 320 512" width="16" height="16" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>',
  twitter: '<svg viewBox="0 0 512 512" width="15" height="15" fill="currentColor"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>',
  linkedin: '<svg viewBox="0 0 448 512" width="15" height="15" fill="currentColor"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/></svg>',
}

function renderFooter() {
  const placeholders = document.querySelectorAll('[data-footer]')
  if (!placeholders.length) return
  placeholders.forEach((ph) => {
    const socials = Object.entries(brand.social).map(([platform, url]) => `
      <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${platform}"
        class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-[#612C8B] hover:to-[#8B4FBF] hover:text-white transition-all duration-300 hover:-translate-y-1">
        ${socialIcons[platform] || socialIcons.instagram}
      </a>`).join('')

    ph.outerHTML = `
    <footer class="relative overflow-hidden bg-[#07070C] border-t border-white/5">
      <div class="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-[#612C8B]/10 blur-[140px] pointer-events-none"></div>
      <div class="absolute -bottom-40 right-1/5 w-[400px] h-[400px] rounded-full bg-[#8B4FBF]/10 blur-[140px] pointer-events-none"></div>

      <div class="relative max-w-6xl mx-auto px-6 pt-16">
        <div class="cta-card">
          <div class="cta-card-glow cta-card-glow-one"></div>
          <div class="cta-card-glow cta-card-glow-two"></div>
          <div class="cta-noise"></div>
          <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div class="max-w-xl text-center lg:text-left">
              <span class="cta-badge"><span class="cta-badge-dot"></span>Independent creative studio</span>
              <h2 class="cta-heading">Let&rsquo;s create something<br/>impossible to ignore.</h2>
              <p class="cta-sub">Strategy, design and digital experiences made for brands ready to move differently.</p>
              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a href="/contact" class="cta-primary">Start a project <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                <a href="/portfolio" class="cta-secondary">View selected work <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg></a>
              </div>
            </div>
            <div class="cta-art" aria-hidden="true">
              <div class="cta-art-halo"></div>
              <img src="images/maven.png" alt="" class="cta-art-img" />
            </div>
          </div>
        </div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 pt-16">
        <div class="rounded-3xl p-8 md:p-10 relative overflow-hidden" style="background: linear-gradient(135deg, #4A1F6B 0%, #612C8B 55%, #8B4FBF 100%)">
          <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10"></div>
          <div class="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-white/5"></div>
          <div class="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div class="max-w-md">
              <h3 class="text-2xl md:text-3xl font-black text-white mb-2">Stay in the Loop</h3>
              <p class="text-white/75 text-base">Get the latest marketing tips, success stories, and exclusive offers — straight to your inbox.</p>
            </div>
            <form class="w-full lg:w-auto" data-newsletter>
              <div class="flex flex-col sm:flex-row gap-3">
                <input type="email" required placeholder="Enter your email address" data-newsletter-email
                  class="flex-1 min-w-[260px] px-5 py-4 rounded-2xl bg-white/15 border border-white/20 text-white text-sm placeholder:text-white/60 focus:border-white/50 focus:ring-2 focus:ring-white/30 outline-none transition-all" />
                <button type="submit" class="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#4A1F6B] rounded-2xl font-bold text-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5">
                  Subscribe <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="relative max-w-6xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div class="sm:col-span-2 lg:col-span-2">
            <a href="/" class="block mb-5"><img src="images/logo.png" alt="${brand.name}" class="h-10 w-auto mb-1" /></a>
            <p class="text-gray-500 text-base leading-relaxed mb-5">Custom built websites and digital marketing services for businesses of all sizes. Based in ${brand.address.city}, ${brand.address.state} — serving clients nationwide and worldwide.</p>
            <div class="flex gap-3">${socials}</div>
          </div>
          <div>
            <h4 class="text-sm font-bold uppercase tracking-wider text-gray-300 mb-5">Explore</h4>
            <ul class="space-y-3">
              <li><a href="/" class="group inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#8B4FBF] transition-colors"><span class="h-px w-0 group-hover:w-4 bg-[#8B4FBF] transition-all duration-300"></span>Home</a></li>
              <li><a href="/services" class="group inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#8B4FBF] transition-colors"><span class="h-px w-0 group-hover:w-4 bg-[#8B4FBF] transition-all duration-300"></span>Services</a></li>
              <li><a href="/portfolio" class="group inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#8B4FBF] transition-colors"><span class="h-px w-0 group-hover:w-4 bg-[#8B4FBF] transition-all duration-300"></span>Our Work</a></li>
              <li><a href="/about" class="group inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#8B4FBF] transition-colors"><span class="h-px w-0 group-hover:w-4 bg-[#8B4FBF] transition-all duration-300"></span>About</a></li>
              <li><a href="/contact" class="group inline-flex items-center gap-2 text-gray-500 text-sm hover:text-[#8B4FBF] transition-colors"><span class="h-px w-0 group-hover:w-4 bg-[#8B4FBF] transition-all duration-300"></span>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-bold uppercase tracking-wider text-gray-300 mb-5">Services</h4>
            <ul class="space-y-3">
              ${serviceLinks.map((s) => `<li><a href="/services" class="text-gray-500 text-sm hover:text-[#8B4FBF] transition-colors">${s}</a></li>`).join('')}
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-bold uppercase tracking-wider text-gray-300 mb-5">Get in Touch</h4>
            <div class="flex items-start gap-3 mb-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4FBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.37 1.9.72 2.78a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.88.35 1.82.6 2.78.72A2 2 0 0 1 22 16.92z"/></svg><a href="tel:${brand.phone.replace(/[^+\d]/g, '')}" class="text-gray-500 text-sm hover:text-[#8B4FBF] transition-colors">${brand.phone}</a></div>
            <div class="flex items-start gap-3 mb-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4FBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="mailto:${brand.email}" class="text-gray-500 text-sm hover:text-[#8B4FBF] transition-colors break-all">${brand.email}</a></div>
            <div class="flex items-start gap-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4FBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg><span class="text-gray-500 text-sm">${brand.address.street}<br/>${brand.address.city}, ${brand.address.state} ${brand.address.zip}</span></div>
            <div class="flex items-start gap-3 mt-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4FBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span class="text-gray-500 text-sm">Open Mon-Sun · 9:00 AM – 5:00 PM</span></div>
          </div>
        </div>
      </div>

      <div class="relative border-t border-white/5">
        <div class="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-gray-600 text-xs text-center sm:text-left">&copy; ${new Date().getFullYear()} ${brand.name}. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <a href="#" class="text-gray-600 hover:text-[#8B4FBF] transition-colors text-xs">Privacy Policy</a>
            <a href="#" class="text-gray-600 hover:text-[#8B4FBF] transition-colors text-xs">Terms of Service</a>
            <a href="#" class="text-gray-600 hover:text-[#8B4FBF] transition-colors text-xs">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>`
  })
}

/* ---------- Scroll / navbar state ---------- */
function initScroll() {
  const nav = document.querySelector('[data-navbar-shell]')
  let lastY = window.scrollY
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    const scrolled = y > 50
    const hidden = Math.abs(y - lastY) > 4 && y > lastY && y > 80
    document.querySelectorAll('nav.fixed').forEach((n) => {
      n.className = `fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${
        scrolled ? 'bg-[#0A0A0F]/70 backdrop-blur-md border-white/5' : 'bg-transparent border-transparent'
      } ${hidden ? 'translate-y-[-110%]' : ''}`
    })
    if (nav) nav.dataset.scrolled = scrolled ? '1' : '0'
    lastY = y
  })
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-mobile-toggle]')
    if (btn) {
      const menu = document.querySelector('[data-mobile-menu]')
      if (!menu) return
      const hidden = menu.classList.contains('hidden')
      if (hidden) {
        menu.classList.remove('hidden')
        menu.classList.add('flex')
      } else {
        menu.classList.add('hidden')
        menu.classList.remove('flex')
      }
      return
    }
    if (e.target.closest('[data-mobile-menu] a')) {
      const menu = document.querySelector('[data-mobile-menu]')
      menu.classList.add('hidden')
      menu.classList.remove('flex')
    }
  })
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach((el) => el.classList.add('is-visible'))
    return
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        io.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  els.forEach((el) => io.observe(el))
}

/* ---------- Newsletter + contact forms (native mailto fallback) ---------- */
function initForms() {
  document.querySelectorAll('[data-newsletter]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const input = form.querySelector('[data-newsletter-email]')
      const subject = encodeURIComponent('Newsletter signup — ' + brand.name)
      const body = encodeURIComponent('Please subscribe this email to your newsletter:\n\n' + (input.value || '') + '\n')
      window.location.href = 'mailto:' + brand.email + '?subject=' + subject + '&body=' + body
      form.innerHTML = '<div class="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4"><span class="text-white font-semibold">Thanks! Opening your mail app — we\'ll be in touch.</span></div>'
    })
  })

  const contactForm = document.querySelector('[data-contact-form]')
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const f = contactForm
      const name = f.querySelector('[name="name"]')?.value || ''
      const email = f.querySelector('[name="email"]')?.value || ''
      const subj = f.querySelector('[name="subject"]')?.value || 'Project inquiry'
      const msg = f.querySelector('[name="message"]')?.value || ''
      const subject = encodeURIComponent('New inquiry: ' + subj)
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg)
      window.location.href = 'mailto:' + brand.email + '?subject=' + subject + '&body=' + body
    })
  }
}

/* ---------- Integration network beams ---------- */
function buildIntegrationNetwork() {
  const container = document.querySelector('[data-network]')
  if (!container) return
  const card = container.closest('.kb-card')
  const center = container.querySelector('[data-node="maven"]')

  const beams = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  beams.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:1;'
  card.appendChild(beams)

  const svgNS = 'http://www.w3.org/2000/svg'
  const defs = document.createElementNS(svgNS, 'defs')
  beams.appendChild(defs)

  const pathCache = {}
  container.querySelectorAll('[data-node]').forEach((node) => {
    const id = node.dataset.node
    if (id === 'maven') return
    const [start, stop] = beamColors[id] || ['#8b6bff', '#8b5cff']
    const grad = document.createElementNS(svgNS, 'linearGradient')
    grad.id = 'beam-' + id
    const s = document.createElementNS(svgNS, 'stop'); s.setAttribute('offset', '0%'); s.setAttribute('stop-color', start)
    const e = document.createElementNS(svgNS, 'stop'); e.setAttribute('offset', '100%'); e.setAttribute('stop-color', stop)
    grad.appendChild(s); grad.appendChild(e)
    defs.appendChild(grad)

    const path = document.createElementNS(svgNS, 'path')
    path.setAttribute('stroke', 'url(#beam-' + id + ')')
    path.setAttribute('stroke-width', '2')
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke-linecap', 'round')
    path.style.cssText = 'filter:drop-shadow(0 0 5px rgba(146,93,255,0.35));'
    pathCache[id] = path
    beams.appendChild(path)
  })

  const draw = () => {
    const cr = container.getBoundingClientRect()
    const cRect = center.getBoundingClientRect()
    const cX = cRect.left - cr.left + cRect.width / 2
    const cY = cRect.top - cr.top + cRect.height / 2
    container.querySelectorAll('[data-node]').forEach((node) => {
      const id = node.dataset.node
      if (id === 'maven') return
      const rect = node.getBoundingClientRect()
      const x = rect.left - cr.left + rect.width / 2
      const y = rect.top - cr.top + rect.height / 2
      const ctrlX = (x + cX) / 2
      const ctrlY = y - (node.dataset.curve || 0)
      const d = 'M ' + x + ',' + y + ' Q ' + ctrlX + ',' + ctrlY + ' ' + cX + ',' + cY
      pathCache[id].setAttribute('d', d)
    })
  }

  draw()
  const ro = new ResizeObserver(draw)
  ro.observe(container)
  container.querySelectorAll('[data-node]').forEach((n) => ro.observe(n))
  window.addEventListener('resize', draw)
}

/* ---------- Stats count-up ---------- */
function initStats() {
  const animate = (el) => {
    const target = parseFloat(el.dataset.count)
    const prefix = el.dataset.prefix || ''
    const suffix = el.dataset.suffix || ''
    const decimal = (el.dataset.count || '').includes('.') ? 2 : 0
    const dur = 2000
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const val = target * eased
      el.textContent = prefix + (decimal ? (Math.round(val * 100) / 100).toString() : Math.round(val).toLocaleString()) + suffix
      if (p < 1) requestAnimationFrame(tick)
      else el.textContent = prefix + (decimal ? (Math.round(target * 100) / 100).toString() : target.toLocaleString()) + suffix
    }
    requestAnimationFrame(tick)
  }

  const els = document.querySelectorAll('[data-count]')
  if (!('IntersectionObserver' in window) || !els.length) return
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target)
        io.unobserve(entry.target)
      }
    })
  }, { threshold: 0.4 })
  els.forEach((el) => io.observe(el))
}

/* ---------- Hero / scroll indicator ---------- */
function initHero() {
  document.body.classList.add('is-loaded')
}

/* ---------- Portfolio grid ---------- */
function portfolioCard(p) {
  const featured = p.id === 1
  return `
    <div class="group relative reveal is-visible">
      <div class="glass rounded-3xl overflow-hidden hover:border-[#612C8B]/30 transition-all duration-500 hover:-translate-y-2 h-full">
        <div class="h-52 relative overflow-hidden">
          <img src="${p.image}" alt="${p.name}" loading="lazy" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          ${featured ? '<div class="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E85D04]/90 text-white text-xs font-bold">FEATURED</div>' : ''}
        </div>
        <div class="p-6">
          <div class="text-xs font-semibold text-[#8B4FBF] uppercase tracking-wider mb-2">${p.category}</div>
          <h3 class="text-lg font-bold mb-2">${p.name}</h3>
        </div>
      </div>
    </div>`
}

function renderPortfolio() {
  const grid = document.querySelector('[data-portfolio-grid]')
  if (!grid) return
  grid.innerHTML = portfolioItems.map(portfolioCard).join('')
}

function initPortfolioFilters() {
  const wrap = document.querySelector('[data-portfolio-filters]')
  const grid = document.querySelector('[data-portfolio-grid]')
  if (!wrap || !grid) return
  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]')
    if (!btn) return
    const filter = btn.dataset.filter
    wrap.querySelectorAll('[data-filter]').forEach((b) => {
      const active = b === btn
      b.className = active
        ? 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-[#612C8B] text-white shadow-[0_4px_20px_rgba(97,44,139,0.4)]'
        : 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
    })
    const items = filter === 'All' ? portfolioItems : portfolioItems.filter((p) => p.category === filter)
    grid.innerHTML = items.map(portfolioCard).join('')
    // Smooth staggered fade-in of the freshly rendered cards.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ;[...grid.children].forEach((card, i) => {
        card.animate(
          [
            { opacity: 0, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 500, delay: i * 60, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }
        )
      })
    }
  })
}

/* ---------- Testimonials marquee ---------- */
function renderTestimonials() {
  const track = document.querySelector('[data-testimonials] .marquee-slow')
  if (!track) return
  const doubled = [...testimonials, ...testimonials].map((t) => `
    <div class="glass rounded-3xl p-7 min-w-[350px] max-w-[400px] flex-shrink-0 hover:border-[#612C8B]/30 transition-all duration-500 group">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B4FBF" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mb-4"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
      <p class="text-gray-300 text-base leading-relaxed mb-6 line-clamp-6">&ldquo;${t.text}&rdquo;</p>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#612C8B] to-[#8B4FBF] flex items-center justify-center font-bold text-sm">${t.name.charAt(0)}</div>
        <div>
          <div class="font-semibold text-sm">${t.name}</div>
          <div class="text-gray-500 text-xs">${t.role}${t.company ? ', ' + t.company : ''}</div>
        </div>
      </div>
    </div>`).join('')
  track.innerHTML = doubled
}

/* ---------- Boot ---------- */
function boot() {
  const scrolled = window.scrollY > 50
  renderNavbar()
  renderFooter()
  initScroll()
  initMobileMenu()
  initReveal()
  initStats()
  initForms()
  renderPortfolio()
  initPortfolioFilters()
  renderTestimonials()
  buildIntegrationNetwork()
  initHero()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot)
} else {
  boot()
}
