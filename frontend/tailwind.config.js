/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enables toggling dark mode via a "class"
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // from the brief
        academicBlue: '#0077CC',
        darkBackground: '#121212',
        darkSurface: '#1E1E1E',
        darkText: '#F1F1F1',
        lightBackground: '#FFFFFF',
        lightSurface: '#F4F4F4',
        lightText: '#181818',
        grayBorderDark: '#3A3A3A',
        grayBorderLight: '#DDDDDD',
        graySecondary: '#AAAAAA'
      },
      fontFamily: {
        // using either 'Roboto' or 'Inter'
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
