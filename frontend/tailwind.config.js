/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
      './assets/**/*.{vue,js,css}',
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // https://colorhunt.co/palette/22283131363f76abaeeeeeee
        light: '#EEEEEE',
        medlight: '#76ABAE',
        meddark: '#42474F', //#31363F
        dark: '#222831'
      },
    },
  },
  plugins: [],
}

