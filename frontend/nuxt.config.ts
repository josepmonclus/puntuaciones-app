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
    ],
    routeRules: {
        '/api/**': { proxy: 'http://localhost:3000/api/**' },
    },
    colorMode: {
        classSuffix: ''
    }
})