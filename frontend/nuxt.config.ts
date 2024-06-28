// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
        port: parseInt(process.env.PORT || '3001')  // Cambia esto a cualquier puerto disponible, por ejemplo, 3001
    },
    devtools: { 
        enabled: false 
    },
    modules: [
        '@pinia/nuxt', 
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        'nuxt-security',
        '@nuxtjs/google-adsense',
    ],
    routeRules: {
        // '/api/**': { proxy: `${process.env.API_HTTP_HTTPS || 'http'}://${process.env.API_URL || 'localhost'}:${process.env.API_PORT == '80' ? '' : process.env.API_URL || 3000}/api/**` },
        '/api/**': { proxy: `${process.env.API_URL || 'http://localhost:3000'}/api/**` },
    },
    colorMode: {
        classSuffix: ''
    },
    googleAdsense: {
        id: 'ca-pub-4117247409305175'
    }
})