/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'kanit-regular': 'Kanit-Regular',
      'kanit-medium': 'Kanit-Medium',
      body: 'Sarabun-Regular'
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, addBase, config }) {
      const newUtilities = {
        '.safe-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight: 'env(safe-area-inset-right)'
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)'
        }
      }
      addUtilities(newUtilities)
      addBase({
        h1: { fontFamily: config('theme.fontFamily.kanit-medium') },
        h2: { fontFamily: config('theme.fontFamily.kanit-medium') },
        body: { fontFamily: config('theme.fontFamily.body') }
      })
    })
  ],
}
