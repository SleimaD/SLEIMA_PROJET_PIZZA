/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner': 'inset 8px -8px 8px 0px rgba(21, 21, 21, 0.5)', 
      }
    },
  },
  plugins: [],  
}