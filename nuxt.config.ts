// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      title: "Alfathony - UI/UX Designer", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" },
      ],
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    },
  },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
  ],

  typescript: {
    typeCheck: true
  },

  vite: {
    plugins: [tailwindcss()],
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'primary-accent': 'var(--color-primary-accent)',
            'text-dark': 'var(--color-text-dark)',
            'text-light': 'var(--color-text-light)',
            'text-muted': 'var(--color-text-muted)',
            'text-muted-dark': 'var(--color-text-muted-dark)',
            'background-light': 'var(--color-background-light)',
            'background-dark': 'var(--color-background-dark)',
            'border-light': 'var(--color-border-light)',
            'border-dark': 'var(--color-border-dark)',
          },
          fontFamily: {
            serif: ['var(--font-serif)', 'serif'],
            sans: ['var(--font-sans)', 'sans-serif'],
          }
        }
      }
    }
  },
});
