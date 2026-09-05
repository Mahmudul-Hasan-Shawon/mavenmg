# CLAUDE.md

Guidance for Claude Code (and any contributor) working on this repo. Follow these conventions on every task.

## Project

Marketing site for **Maven Marketing Group** — React 19 + Vite + TypeScript + Tailwind CSS 4, animated with GSAP + ScrollTrigger and Lenis smooth scroll, with react-three-fiber for select 3D moments. Deployed to Cloudflare Pages (`wrangler.toml`).

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run lint     # oxlint
npm run preview  # Preview production build
```

## Project structure

```
src/
├── components/
│   ├── ui/         # App-level reusable UI (Navbar, Footer, buttons, cards, Preloader…)
│   ├── text/       # Shared typographic components (section headings, etc.)
│   └── three/      # react-three-fiber scenes
├── data/           # All page content as typed constants (site, content, services, projects, testimonials, navigation)
├── hooks/          # Shared React hooks (useDevice, useGsap)
├── pages/          # Route-level pages only — compose sections
├── sections/       # Page sections, one component per section (PascalCase, e.g. ManagementPlans.tsx)
├── three/          # Three.js helpers/materials
└── utils/          # Framework-agnostic helpers (cn, lenis, motion, theme)
```

**Placement rules:** page content lives in `data/`, never hardcoded deep in components. A component used by 2+ sections belongs in `components/ui/` or `components/text/`, not copied. Sections are composed by `pages/` — pages hold no layout styling of their own.

## Design system

One source of truth: the semantic tokens and utility classes in `src/index.css`. Never hardcode raw colors, shadows, or fonts in components when a token exists.

### Theme tokens (dark default, `data-theme="light"` remaps them)

| Token | Tailwind utility | Role |
|---|---|---|
| `--bg` | `bg-void`, `text-void` | Page background |
| `--surface` / `-2` / `-3` | `bg-ink`, `bg-ink-2`, `bg-ink-3` | Card/panel backgrounds |
| `--line` / `--line-hover` | `border-line` | Hairline borders |
| `--fg` | `text-white` (maps to foreground) | Primary text |
| `--mist` / `--mist-dim` | `text-mist`, `text-mist-dim` | Secondary/tertiary text |
| `--maven`, `--maven-light`, `--maven-lighter`, `--maven-dark` | `*-maven*` utilities | Brand violet ramp |

Typography: **Sora** (headings, `font-sora` / `.display`), **DM Sans** (body), **JetBrains Mono** (labels, `font-mono` / `.mono-label`).

### Shared utility classes (reuse before inventing)

- Layout: `.section` (inline padding + mobile gap tightening), `.container-maven` (max-width wrapper)
- Surfaces: `.panel` / `.panel-hover` (tinted bordered card), `.glass` (frosted card), `.spotlight` (mouse-tracked wash), `.glow-tl` (top-left ambient light)
- Type: `.display`, `.mono-label`, `.index-tag`, `.grad-text`, `.text-stroke`, `.text-stroke-faint`
- Interaction: `.link-line` (animated underline), `.field` (input underline focus), `.marquee-track`, `.border-beam` / `.beam-*`
- Motion: `.animate-float-slow`, `.animate-float-drift` ( + `-alt` counter-phase variant)
- Global scroll/entrance animation goes through `src/utils/motion.ts` (`trackSpotlight` for spotlight cards) + `src/hooks/useGsap.ts` — don't hand-roll new scroll observers

### Buttons — one component, no hand-rolled pills

All CTA pills go through `src/components/ui/MagneticButton.tsx`. Never write a bespoke pill class string; pick a variant + size:

| Variant | Look | Use for |
|---|---|---|
| `primary` | solid brand violet, glow shadow | main CTAs (navbar, hero, forms) |
| `ghost` | hairline outline, transparent | secondary CTAs |
| `accent` | brighter solid violet (`maven-light`, hover `maven-light-hover`) | emphasis CTAs on tinted cards |
| `deep` | quiet dark-violet tier | subdued card CTAs (e.g. pricing) |
| `frost` | translucent white pill + blur | CTAs over imagery (featured project, FinalCTA) |

Sizes: `default` (page CTAs) · `sm` (navbar) · `md` (inline / featured) · `lg` (banner CTA); `fullWidth` for stretch-to-container. Segmented controls, filters, icon buttons and toggles are not pills — style those as scoped section-local markup.

### Spacing rhythm

- Standard content sections: `py-28 md:py-36` (mobile is auto-tightened to 3rem by the `.section` media query in `index.css`).
- Asymmetric transition sections (below a hero or before the footer) use explicit `pt-`/`pb-` pairs owned by the call site.
- Page sections keep their identity via content treatment — not by divergent vertical rhythm.

### Theming rules

- Dark is default; light theme only remaps the vars in `[data-theme="light"]`. New colors must be added as semantic vars in **both** blocks, then exposed via `@theme inline` — never as one-off hex values.
- Theme-aware logo/image swaps use `data-logo="dark"` / `data-logo="light"` (CSS handles visibility).

## Conventions

### Naming & identifiers

- Files: PascalCase components (`WhyMaven.tsx`), camelCase hooks/utils (`useDevice.ts`, `motion.ts`).
- Every `<section>` root gets a unique `id` (kebab-case, matches the section name, e.g. `id="management-plans"`) — used by anchor links, nav, and for scoping CSS. Sections rendered by multiple pages (e.g. `MavensTeam`, `PageHero`) take their `id` as a required prop.
- Section eyebrows open with the shared `Eyebrow` component (`src/components/text/Eyebrow.tsx`): **hairline rule + mono label + hairline rule — no index numbers**.
- Class names and IDs must be descriptive and unique; prefer a named utility over an anonymous pile of classes when a pattern repeats 2+ times.

### Reuse-first

Before creating any new style, class, component, or copy block: search for an existing one (`components/ui`, `components/text`, `index.css` utilities, `data/` constants) and reuse or extend it. No duplicated styles, components, or near-identical JSX blocks.

### Responsive & scoping

- Design desktop-first with Tailwind breakpoints (`md:`, `lg:`); the site must hold up at mobile, tablet, and desktop.
- Any handwritten CSS beyond utilities must be scoped to a section's unique `id` or a named class — no bare element selectors that leak across sections. The mobile section-gap media query in `index.css` keys off `.section.py-*` on purpose; keep that mechanism if you touch it.
- Respect `prefers-reduced-motion` for any new animation (see the reduced-motion block in `index.css`).

### Content & quality

- Copy, stats, services, projects, testimonials come from `src/data/*` — update data, not markup, when content changes.
- Keep the overall UI visually consistent; sections may have their own identity within the shared system.
- Run `npm run lint` and `npm run build` before finishing a task.
