// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
        port: 3001 // Cambia esto a cualquier puerto disponible, por ejemplo, 3001
    },
    devtools: { 
        enabled: true 
    },
    modules: [
        '@pinia/nuxt', 
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        'nuxt-icon',
        'nuxt-security',
        // ['@nuxtjs/google-adsense', {
        //     id: 'ca-pub-4117247409305175', // replace "#" with "2112345678904791",
        //     // onPageLoad: true, // this is required to be true for our ads to show in our 
        //     // overlayBottom: true,
        //     test: true // if we are using development env. the test variable will help us to show where your ads will appear
        // }],
    ],
    routeRules: {
        '/api/**': { proxy: 'http://localhost:3000/api/**' },
    },
    colorMode: {
        classSuffix: ''
    }
})