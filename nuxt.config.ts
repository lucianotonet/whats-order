import { execSync } from "child_process";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      script: [
        {
          hid: "smartlook",
          innerHTML: `
            window.smartlook||(function(d) {
              var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
              var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
              c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', '8dd9938daac2d56c9b7d9dc873c48f68f98cc9f6', { region: 'eu' });
          `,
          type: "text/javascript",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  hooks: {
    "build:before": () => {
      console.log("Gerando informações de versão...");
      execSync("node scripts/generate-version.js");
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:8000/api",
        changeOrigin: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === "production" ? "" : "/api",
    },
  },
});
