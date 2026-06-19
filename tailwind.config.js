/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19', // Dark space theme
        surface: '#111827', // Lighter dark for cards
        surfaceHighlight: '#1F2937', // Hover state
        primary: '#3B82F6', // Blue accent
        accent: '#EF4444', // Red accent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
