/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'primary-blue': '#146C94',
        'primary-white': '#F6F1F1',
        'secondary-blue': '#19A7CE'
      },
      backgroundImage: {
        nav: "url('./src/assets/bgWhite.png')"
      }
    }
  },
  plugins: []
};
