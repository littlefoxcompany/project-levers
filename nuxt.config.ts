export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  head: {
    title: 'Project Levers by Littlefox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // og tags
      { hid: 'og:title', property: 'og:title', content: 'Project Levers by Littlefox' },
      { hid: 'og:description', property: 'og:description', content: 'Project Levers by Littlefox' },
      { hid: 'og:image', property: 'og:image', content: '/og-image.png' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    config: {
      darkMode: 'class',
      container: false
    }
  }
})
