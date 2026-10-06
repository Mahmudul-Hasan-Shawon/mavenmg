<div align="center">

<img src="public/images/logos/mavenlogo_light.png" alt="Maven Marketing Group" width="280" />

# Maven Marketing Group - Website

**Custom built websites with a purpose.**

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Node](https://img.shields.io/badge/node-%E2%89%A520-339933?logo=nodedotjs&logoColor=white)](./.nvmrc)

The production marketing site for Maven Marketing Group - a Chicago-based web
design and digital marketing agency. A fully custom, animation-rich single-page
app with hand-rolled routing, a dual theme system, WebGL accent scenes, and a
100% data-driven content layer.

</div>

---

## ✨ Features

- **Custom SPA router** - history-based navigation with an animated page-transition
  veil, per-route `<title>` / meta / canonical management, in-page hash anchors,
  scroll-position memory for back/forward, and a real **404 page**.
- **Dual theme system** - dark / light / *system* preference that genuinely
  follows the OS, applied **before first paint** (zero flash), synced with
  WebGL scene palettes at runtime.
- **Motion-first design** - GSAP + ScrollTrigger choreography, Lenis smooth
  scrolling, magnetic buttons, a depth carousel, animated text - all of it
  **fully disabled under `prefers-reduced-motion`** with static fallbacks.
- **WebGL accent scenes** - react-three-fiber (hero/about logo, particle
  network) and a raymarched ogl shader, lazily mounted, paused offscreen,
  capability-probed, and wrapped in an ErrorBoundary so unsupported browsers
  degrade gracefully to CSS.
- **Data-driven content** - services, projects, blog, testimonials, sitemap
  and navigation all live in typed data modules under `src/data/`. Adding a
  service page or blog post is a data change, not a code change.
- **Working contact + newsletter pipelines** - both forms POST to Cloudflare
  Pages Functions with validation, loading/error states, and an honest mailto
  fallback.
- **SEO built in** - build-time `sitemap.xml` generation, `robots.txt`,
  canonical URLs, Open Graph / Twitter cards, and JSON-LD `LocalBusiness`
  structured data.

## 🧱 Tech Stack

| Layer | Choice |
| --- | --- |
| UI | [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Build | [Vite 6](https://vitejs.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` tokens in `src/index.css`) |
| Animation | [GSAP 3](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering) smooth scroll |
| 3D / WebGL | [three.js](https://threejs.org) + [@react-three/fiber](https://docs.pmnd.rs), [ogl](https://github.com/oframe/ogl) shaders |
| Icons | [lucide-react](https://lucide.dev) + inline brand SVGs |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) + Pages Functions |
| Lint | [oxlint](https://oxc.rs) |

## 🚀 Getting Started

### Prerequisites

- **Node.js ≥ 20** (`.nvmrc` pins 22 - `nvm use`)
- npm (comes with Node)

### Install & run

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:5173)
npm run dev:lan    # expose on your LAN at :4000 (great for phone testing)
```

### Production build & preview

```bash
npm run build      # typecheck + bundle → dist/
npm run preview    # serve the production build locally
```

The `build` script runs `tsc --noEmit` first - type errors fail the deploy,
not just the editor.

### Lint

```bash
npm run lint       # oxlint over src/ (static/ legacy folder is ignored)
```

## 📜 Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run dev:lan` | Dev server bound to `0.0.0.0:4000` |
| `npm run build` | `tsc --noEmit` + production bundle to `dist/` |
| `npm run preview` | Local preview of `dist/` |
| `npm run lint` | oxlint |

## 📁 Project Structure

```
mavenmg/
├── functions/               # Cloudflare Pages Functions (serverless API)
│   └── api/
│       ├── contact.ts       # POST /api/contact - validates + forwards leads
│       └── subscribe.ts     # POST /api/subscribe - newsletter signup
├── public/                  # Static assets copied verbatim (images, robots.txt)
├── src/
│   ├── components/
│   │   ├── text/            # AnimatedText, Eyebrow
│   │   └── ui/              # Navbar, Footer, SmartLink, MagneticButton,
│   │                        # ThemeToggle, ReadyVeil, DepthCarousel,
│   │                        # GradientWaves, ErrorBoundary, ...
│   ├── data/                # ← the content layer (single source of truth)
│   │   ├── blog.ts          #   all blog posts (full article bodies)
│   │   ├── servicePages.ts  #   service detail pages
│   │   ├── projects.ts      #   portfolio entries
│   │   ├── sitemap.ts       #   feeds /sitemap page AND sitemap.xml
│   │   ├── site.ts          #   NAP, socials, SITE_URL, review data
│   │   └── ...
│   ├── hooks/               # useGsap (context helper), useDevice
│   ├── pages/               # route-level pages (Home, WorkPage, 404, legal…)
│   ├── sections/            # page sections (Hero, Results, WorkShowcase…)
│   ├── three/               # R3F scenes (LazyCanvas, AboutLogo, MavenNetwork)
│   └── utils/               # theme, motion/reduced-motion, lenis, date, cn
├── static/                  # ⚠️ legacy pre-React site - reference only,
│                            #    not built or deployed
├── index.html               # head: meta, OG, JSON-LD, pre-paint theme script
├── vite.config.js           # plugins + sitemap.xml generation
└── wrangler.toml            # Cloudflare Pages config
```

## 🧭 Architecture Notes

### Routing (no router library)

`src/App.tsx` owns routing with a tiny route table + `history.pushState`.
Route changes play a clip-path veil wipe; the URL, document title, meta
description, canonical, and OG/Twitter tags are derived per route from the
data layer (see `getRouteMeta`). Unknown paths render `NotFoundPage` - the
homepage is never served at a wrong URL. `public/_redirects`
(`/* /index.html 200`) lets Cloudflare serve the SPA on deep links.

### Theming

Three-state cycle (**system → light → dark**). The persisted preference lives
in `localStorage['maven-theme']`; an inline script in `index.html` resolves it
against `prefers-color-scheme` **before first paint**. `src/utils/theme.ts` is
the single API (`applyTheme`, `resolveTheme`, `onThemeChange`) and broadcasts
changes so the WebGL scenes retint live. Theme tokens are defined once per
theme in `src/index.css` under `[data-theme='…']`.

### Motion & accessibility

Everything animated goes through `useGsapContext`, which is a no-op under
`prefers-reduced-motion` - and every animated component ships a static
fallback so no content is ever hidden behind a skipped animation. Navigation
uses real `<a href>` elements (via `SmartLink`) with `preventDefault` + SPA
navigation, so keyboard, middle-click, and crawlers all work. The mobile menu
traps focus, closes on Escape, and restores focus on close.

### WebGL

`src/utils/motion.ts` computes a device tier once at load and exports
`skipWebGL`. Scenes mount through `LazyCanvas` (dynamic import + viewport
gating + `frameloop` pausing) inside an `ErrorBoundary`, so a missing/failing
WebGL context simply leaves the CSS background instead of crashing the page.

## 📮 Forms & Webhooks

Both forms POST JSON to Pages Functions. Each function validates input, then
forwards to a webhook **only if the corresponding environment variable is
configured** in Cloudflare Pages:

| Endpoint | Env var | Expected payload |
| --- | --- | --- |
| `POST /api/contact` | `CONTACT_WEBHOOK_URL` | `{ name, email, phone?, service?, message }` |
| `POST /api/subscribe` | `SUBSCRIBE_WEBHOOK_URL` | `{ email, source: 'mavenmg-site' }` |

Point the env vars at Zapier/Make/n8n hooks, a CRM endpoint, or an email API
worker. **Without configuration the functions return `503 not_configured`**
and the UI shows an honest error with a pre-filled `mailto:` fallback - no
lead is ever silently dropped or faked.

Test the functions locally with Wrangler:

```bash
npm run build && npx wrangler pages dev dist        # functions + static build
```

## 🔎 SEO

- **`sitemap.xml`** is generated at build time (and served in dev) by a plugin
  in `vite.config.js`, assembled from `src/data/sitemap.ts` +
  `src/data/servicePages.ts` using `SITE_URL` from `src/data/site.ts`. Add a
  page there and it lands in the sitemap automatically.
- **`robots.txt`** lives in `public/` and points at the sitemap.
- Per-route titles/descriptions/canonicals are set in `src/App.tsx`
  (`getRouteMeta`); the homepage defaults live in `index.html`.
- `LocalBusiness` JSON-LD is in `index.html` - keep address/phone/socials in
  sync with `src/data/site.ts` when they change.

## ☁️ Deployment

The site deploys to **Cloudflare Pages** (project `mavenmg`):

```bash
npm run build
npx wrangler pages deploy dist --project-name mavenmg --branch main
```

`wrangler.toml` sets `pages_build_output_dir = "./dist"`. Remember to set the
`CONTACT_WEBHOOK_URL` / `SUBSCRIBE_WEBHOOK_URL` environment variables in the
Cloudflare Pages dashboard (Settings → Environment variables) so the forms
deliver.

> The canonical production domain is `https://mavenmg.pages.dev` -
> defined once as `SITE_URL` in `src/data/site.ts` and referenced by the
> sitemap generator and data files. Update it there first if it ever changes.

## 🎨 Design Tokens

The visual system is CSS-first Tailwind v4: colors, fonts, and shadows are
`@theme` tokens in `src/index.css`, duplicated per theme under
`:root` / `[data-theme='light']`. Key families:

- `maven` (brand violet scale), `mist` (body text), `void` / `ink` (surfaces)
- `--mist-dim` is contrast-tuned to ≥ 4.5:1 against both theme backgrounds
- Fonts: Poppins (display), DM Sans (body), JetBrains Mono (labels),
  Playfair Display (accents) - loaded from Google Fonts

## 🧹 Housekeeping

- `static/` contains the legacy hand-coded site kept for reference. It is not
  built, deployed, or linted. Safe to delete once nobody needs it.
- Prefer `npm run lint` + `npm run build` (which typechecks) before handing
  off changes.
