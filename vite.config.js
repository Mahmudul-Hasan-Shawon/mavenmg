import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { servicePages } from './src/data/servicePages'
import { sitemapGroups } from './src/data/sitemap'
import { SITE_URL } from './src/data/site'

/**
 * Generates /sitemap.xml from the site's route data so crawlers finally get
 * one. Serves it from the dev server via middleware and emits it into the
 * build bundle as a static asset.
 */
function sitemapPlugin() {
  // Canonical routes: home, every service detail page, plus every internal
  // SPA route declared in sitemap.ts (main pages, legal pages, local posts).
  const paths = [
    ...new Set([
      '/',
      ...servicePages.map((page) => `/services/${page.slug}`),
      ...sitemapGroups.flatMap((group) => group.links.filter((link) => !link.external).map((link) => link.href)),
    ]),
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`),
    '</urlset>',
  ].join('\n')

  return {
    name: 'maven-sitemap',
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/xml; charset=utf-8')
        res.end(xml)
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), sitemapPlugin()],
})
