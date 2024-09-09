import { execSync } from 'child_process';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      script: [{src: 'https://cdn.tailwindcss.com'}],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap', rel: 'stylesheet' }
      ]
    }
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  hooks: {
    'build:before': () => {
      console.log('Gerando informações de versão...');
      execSync('node scripts/generate-version.js');
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'production' ? '' : '/api',
    },
  },
})