// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-14',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/google-fonts',
    'nuxt-security'
  ],

  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      contentSecurityPolicy: {
        'img-src': ["'self'", "data:", "https://images.unsplash.com"],
      }
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 'hour',
    },
  },

  css: ['~/assets/css/tokens.css', '~/assets/css/base.css'],

  // Chapters and WebGL pieces live in subfolders for maintainability, but they
  // are referenced by their own names, not by their folder.
  components: [{ path: '~/components', pathPrefix: false }],

  // One face, carrying everything from an architectural headline to a stencilled
  // mark — which is how real supergraphics work. The width axis is not
  // decoration here: it is what lets the same face be painted across a wall and
  // then whispered at 11px without swapping to a second family.
  googleFonts: {
    families: {
      Archivo: {
        wght: '100..900',
        wdth: '62..125'
      }
    },
    display: 'swap',
    download: true,
    inject: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Alfathony — Things I make, things I think about, and everything in between',
      meta: [
        { name: 'description', content: 'I spend a lot of time making things make sense. And somehow, this became my job.' },
        { name: 'theme-color', content: '#FAF9F5' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // SSR on: the narrative copy must exist in the HTML. It is what a visitor with
  // reduced motion, a screen reader, or a dead WebGL context actually reads, and
  // it is the whole of what a crawler sees. Every motion and WebGL layer mounts
  // on top of that document, never in place of it.
  ssr: true,

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: false
    }
  }
})
