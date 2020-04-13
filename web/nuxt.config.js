// Load environment configuration with dotenv
const results = require('dotenv').config({
  path: `.${process.env.NODE_ENV}.env`
})
if (results.error) {
  throw results.error
}
const envConfig = results.parsed

const path = require('path');
const parseArgs = require('minimist')
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: 'hostname',
    p: 'port'
  },
  string: ['H'],
  unknown: parameter => false
})

const port =
  argv.port ||
  process.env.PORT ||
  process.env.npm_package_config_nuxt_port ||
  '3000'
const host =
  argv.hostname ||
  process.env.HOST ||
  process.env.npm_package_config_nuxt_host ||
  'localhost'

module.exports = {
  mode: "spa",
  env: envConfig,
  router: {
    middleware: ["init", "check-auth"]
  },
  head: {
    titleTemplate: "%s - POI",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "POI" },
      { name: "msapplication-config" }
    ],
    link: [
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }
    ]
  },
  loading: { color: "#2ecc71", height: "3px" },
  build: {
    analyze: false,
    vendor: [
      "axios",
      "vuex-class",
      "nuxt-class-component",
      "nuxt-property-decorator",
      "vue-class-component",
      "@johmun/vue-tags-input",
      "vue-notifications"
    ],
    extend(config, ctx) {
      if (!ctx.isDev) {
        config.devtool = false;
      }
    }
  },
  modules: ["@nuxtjs/axios", ["@nuxtjs/browserconfig", { TileColor: "#3f51b5" }], "~/modules/typescript.js"],
  plugins: [
    { src: "~plugins/elementui.ts" },
    { src: "~plugins/fetch.ts" },
    { src: "~plugins/scrolltop.ts" },
    { src: "~plugins/notifications.ts" },
    { src: "~plugins/tags-input.ts" },
    { src: "~plugins/clipboard.ts" }
  ],
  axios: {
    baseURL: process.env.GRAPHQL_ENDPOINT,
    timeout: 30,
    headers: {
      "Content-Type": "application/json"
    }
  }
};
