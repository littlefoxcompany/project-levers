export default defineNuxtConfig({
  css: ['@/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    config: {
      darkMode: 'class'
    }
  }
})
