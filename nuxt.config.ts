export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      script: [{src: 'https://cdn.tailwindcss.com'}]
    }
  },
  modules: [
    '@pinia/nuxt',
  ],
  // Remova a configuração do Nitro storage
})
