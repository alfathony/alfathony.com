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

  googleFonts: {
    families: {},
    display: 'swap'
  },

  app: {
    head: {
      title: 'Alfathony - UI/UX Designer',
      meta: [
        { name: 'description', content: 'A UI/UX Designer based in Jakarta. I design digital products that focus on clarity, empathy, and usefulness.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  ssr: false
})
