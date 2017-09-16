module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nagoosh',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Better application for magoosh with PWA' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
  },

  modules: [
    // Simple usage
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  proxy: [        
    process.env.API_URL || 'http://localhost:3000/api'
  ]
}
