require('dotenv').config();
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    titleTemplate: '%s - GROCERY STORE',
    title: 'Default Title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@assets/style/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/event-bus.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/store-init.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/fontawesome',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa'
  ],
  fontawesome: {
    icons: {
      solid: [
        'faFilter',
        'faShoppingBag',
        'faPlus',
        'faMinus',
        'faArrowCircleLeft'
      ]
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.spoonacular.com/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
