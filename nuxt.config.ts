// https://nuxt.com/docs/api/configuration/nuxt-config
import { projectRoutes } from './app/content/work'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-14',
  devtools: { enabled: false },

  modules: ['@nuxtjs/google-fonts', 'nuxt-security'],

  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none'
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 'hour'
    }
  },

  css: ['~/assets/css/design-tokens.css', '~/assets/css/design-base.css'],

  // Chapters, ribbon pieces and chrome live in subfolders for maintainability,
  // but they are referenced by their own names, not by their folder.
  components: [{ path: '~/components', pathPrefix: false }],

  // Instrument Sans in the four weights the handoff names: Regular, Medium,
  // SemiBold and Bold. Self-hosted at build so the first paint does not wait on
  // a third party, and so no font request leaves the visitor's browser.
  googleFonts: {
    families: {
      'Instrument Sans': [400, 500, 600, 700]
    },
    display: 'swap',
    download: true,
    inject: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Alfathony — Designer',
      meta: [
        {
          name: 'description',
          content:
            'Everything starts with a reason. A scroll narrative about why I make, who I make for, what I make, and the work that proves it.'
        },
        // Every scene background is pure White; the browser chrome matches it.
        { name: 'theme-color', content: '#FFFFFF' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  // SSR on: the narrative copy must exist in the HTML. It is what a visitor with
  // reduced motion, a screen reader, or a failed script actually reads, and it
  // is the whole of what a crawler sees. Phase 2's motion layer mounts on top of
  // that document, never in place of it.
  ssr: true,

  nitro: {
    prerender: {
      routes: [
        '/',
        '/about',
        '/work',
        '/library',
        '/journal',
        '/contact',
        /* Case-study routes come from the project source, so adding a project
           cannot leave its page unprerendered. */
        ...projectRoutes
      ],
      crawlLinks: false
    }
  }
})
