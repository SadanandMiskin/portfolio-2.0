/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'main': ['EB Garamond' , 'serif']
    },
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};