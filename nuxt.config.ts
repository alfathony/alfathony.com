export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2024-11-01',

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts',
    'nuxt-security'
  ],

  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      contentSecurityPolicy: {
        'img-src': ["'self'", "data:", "https://*.supabase.co", "https://images.unsplash.com"],
      }
    },
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 'hour',
    },
  },

  supabase: {
    redirect: false
  },

  googleFonts: {
    families: {
      // Homepage (Hallmark · editorial · Atelier): display + body pairing
      'Fraunces': [300, 400, 500],
      'Newsreader': {
        wght: [300, 400, 500, 600],
        ital: [300, 400]
      },
      // Retained for /minimal, /creative, /brutalism, /new-homepage
      'Archivo': [300, 400, 500, 600, 700],
      'Space Grotesk': [300, 400, 500, 600, 700],
      'DM Sans': [400, 500, 600],
      'Caveat': [400]
    },
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

  css: ['~/assets/css/main.css'],

  ssr: false
})