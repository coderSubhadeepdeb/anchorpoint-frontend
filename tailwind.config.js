/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Makes Montserrat the default font
        // OR as a custom utility:
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}