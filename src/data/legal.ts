import { site } from './site'

export interface LegalSection {
  heading: string
  content: string[]
}

export interface LegalPage {
  id: string
  eyebrow: string
  title: string
  lede: string
  lastUpdated: string
  sections: LegalSection[]
}

const companyName = site.name
const companyEmail = site.email
const companyAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`

export const privacyPolicy: LegalPage = {
  id: 'privacy-policy',
  eyebrow: 'Privacy Policy',
  title: 'Privacy Policy',
  lede: 'How Maven Marketing Group collects, uses, and protects the information you share with us.',
  lastUpdated: 'September 1, 2026',
  sections: [
    {
      heading: 'Introduction',
      content: [
        `${companyName}  is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.`,
        `Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.`,
      ],
    },
    {
      heading: 'Information We Collect',
      content: [
        `We may collect information that you provide directly to us, including but not limited to your name, email address, phone number, business name, and any other information you submit through our contact forms or during the course of our services.`,
        `We automatically collect certain data when you visit our website, such as your IP address, browser type, operating system, referring URLs, pages viewed, links clicked, and other usage information. This data is collected through cookies and similar tracking technologies.`,
      ],
    },
    {
      heading: 'How We Use Your Information',
      content: [
        `We use the information we collect to operate and improve our website and services, to communicate with you, to respond to your inquiries, to send marketing communications (with your consent where required), to analyze website usage and trends, and to protect against fraudulent or unauthorized activity.`,
      ],
    },
    {
      heading: 'Information Sharing',
      content: [
        `We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential.`,
        `We may also disclose your information when we believe disclosure is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.`,
      ],
    },
    {
      heading: 'Cookies and Tracking Technologies',
      content: [
        `Our website uses cookies and similar tracking technologies to enhance your experience. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.`,
        `Please refer to our Cookie Policy for detailed information about the specific cookies we use and how to manage your cookie preferences.`,
      ],
    },
    {
      heading: 'Data Security',
      content: [
        `We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.`,
      ],
    },
    {
      heading: 'Your Rights',
      content: [
        `Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete, or restrict processing of your data. To exercise any of these rights, please contact us at ${companyEmail}.`,
      ],
    },
    {
      heading: 'Third-Party Links',
      content: [
        `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policy of every website you visit.`,
      ],
    },
    {
      heading: 'Children\'s Privacy',
      content: [
        `Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.`,
      ],
    },
    {
      heading: 'Changes to This Policy',
      content: [
        `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of the site after any changes constitutes acceptance of the updated policy.`,
      ],
    },
    {
      heading: 'Contact Us',
      content: [
        `If you have any questions about this Privacy Policy, please contact us at ${companyName}, ${companyAddress}, or email us at ${companyEmail}.`,
      ],
    },
  ],
}

export const termsOfService: LegalPage = {
  id: 'terms-of-service',
  eyebrow: 'Terms of Service',
  title: 'Terms of Service',
  lede: 'The terms that govern your use of our website and the services we provide.',
  lastUpdated: 'September 1, 2026',
  sections: [
    {
      heading: 'Acceptance of Terms',
      content: [
        `By accessing or using the website and services provided by ${companyName} , you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.`,
      ],
    },
    {
      heading: 'Services',
      content: [
        `We provide web design, development, digital marketing, SEO, and related services. The specific scope, deliverables, timeline, and pricing for services will be outlined in a separate written agreement or statement of work between you and ${companyName}.`,
        `We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.`,
      ],
    },
    {
      heading: 'Intellectual Property',
      content: [
        `All content on this website, including text, graphics, logos, images, and software, is the property of ${companyName} and is protected by applicable intellectual property laws.`,
        `Upon full payment for custom work, you will receive ownership of the final deliverables as specified in your service agreement. ${companyName} retains the right to display completed work in its portfolio and marketing materials unless otherwise agreed in writing.`,
      ],
    },
    {
      heading: 'User Responsibilities',
      content: [
        `You agree to provide accurate and complete information when engaging our services. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.`,
        `You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our website or services.`,
      ],
    },
    {
      heading: 'Payment Terms',
      content: [
        `Payment terms, including amounts, schedules, and accepted methods, will be specified in your service agreement. Late payments may result in suspension of services and may be subject to late fees as outlined in your agreement.`,
        `All fees are non-refundable unless otherwise specified in writing.`,
      ],
    },
    {
      heading: 'Limitation of Liability',
      content: [
        `To the maximum extent permitted by law, ${companyName} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.`,
        `Our total liability for any claim arising from or related to our services shall not exceed the amount you paid to us for the specific service giving rise to the claim.`,
      ],
    },
    {
      heading: 'Warranties and Disclaimers',
      content: [
        `We strive to provide high-quality services. However, we make no warranties or representations about the accuracy, completeness, or reliability of our website content or services.`,
        `We warrant that our services will be performed in a professional and workmanlike manner consistent with industry standards. Specific warranties for individual projects will be outlined in the applicable service agreement.`,
      ],
    },
    {
      heading: 'Indemnification',
      content: [
        `You agree to indemnify, defend, and hold harmless ${companyName}, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising from your use of our services or violation of these terms.`,
      ],
    },
    {
      heading: 'Termination',
      content: [
        `Either party may terminate a service agreement as outlined in the applicable contract. Upon termination, you remain responsible for payment of all services rendered up to the termination date.`,
        `We may also suspend or terminate your access to our website at our discretion, without notice, for conduct that we believe violates these terms or is harmful to others.`,
      ],
    },
    {
      heading: 'Governing Law',
      content: [
        `These Terms of Service are governed by the laws of the State of Illinois, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts located in Lake County, Illinois.`,
      ],
    },
    {
      heading: 'Changes to Terms',
      content: [
        `We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Your continued use of our website and services after any changes constitutes acceptance of the revised terms.`,
      ],
    },
    {
      heading: 'Contact Us',
      content: [
        `If you have any questions about these Terms of Service, please contact us at ${companyName}, ${companyAddress}, or email us at ${companyEmail}.`,
      ],
    },
  ],
}

export const cookiePolicy: LegalPage = {
  id: 'cookie-policy',
  eyebrow: 'Cookie Policy',
  title: 'Cookie Policy',
  lede: 'How cookies and similar tracking technologies are used on our website, and how to control them.',
  lastUpdated: 'September 1, 2026',
  sections: [
    {
      heading: 'What Are Cookies',
      content: [
        `Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to website owners.`,
      ],
    },
    {
      heading: 'How We Use Cookies',
      content: [
        `${companyName} uses cookies to improve your experience on our website, to analyze site traffic and usage patterns, to remember your preferences and settings, and to deliver relevant content and advertisements.`,
      ],
    },
    {
      heading: 'Types of Cookies We Use',
      content: [
        `Essential Cookies: These are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.`,
        `Analytics Cookies: These help us understand how visitors interact with our website by collecting and reporting information anonymously. We use tools like Google Analytics to analyze site usage.`,
        `Marketing Cookies: These are used to track visitors across websites to display relevant and engaging advertisements. These cookies may be set through our site by our advertising partners.`,
        `Preference Cookies: These allow the website to remember choices you make (such as your language preference or region) and provide enhanced, personalized features.`,
      ],
    },
    {
      heading: 'Third-Party Cookies',
      content: [
        `Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies. We recommend checking the privacy policies of these third parties for more information.`,
      ],
    },
    {
      heading: 'Managing Cookies',
      content: [
        `You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies. Please note that blocking certain cookies may affect the functionality of our website.`,
      ],
    },
    {
      heading: 'Changes to This Policy',
      content: [
        `We may update this Cookie Policy from time to time to reflect changes in technology or legislation. We will notify you of any significant changes by posting the updated policy on this page.`,
      ],
    },
    {
      heading: 'Contact Us',
      content: [
        `If you have any questions about our use of cookies, please contact us at ${companyName}, ${companyAddress}, or email us at ${companyEmail}.`,
      ],
    },
  ],
}
