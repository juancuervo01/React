/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        unicauca: "url('/unicauca.jpg')"
      },
      colors: {
        customColor: 'rgba(255, 254, 239, 1)'
      }
    }
  },
  plugins: []
}
