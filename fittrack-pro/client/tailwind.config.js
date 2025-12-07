/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // The neon green color
        darkBg: '#0d1216',  // The very dark background
        cardBg: '#151f1b',  // The slightly lighter card background
        inputBg: '#1c2a26',
        inputBorder: '#2d403a'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}