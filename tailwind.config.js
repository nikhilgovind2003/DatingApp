/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        Play:['Play','sans-serif']

      },
      colors: {
        'deep-plum': '#4b164c',
        'button-google': '#fcf4fb',
        'button-dark-gray': '#2c2c2c',
        'primary': '#ffffff',
        'text': '#22172a',
        'text-light': '#655d6a',
        'light-purple': '#dd88cf',
        'button-anti-flash-light': '#F0F3F5',
        'hot-purple':'#522052',
        'dark-wine':'#7a3456',
      },
    },
  },
  plugins: [],
}

