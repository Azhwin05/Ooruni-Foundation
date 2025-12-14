/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         'admin-primary': '#1A237E', // Deep Blue
         'admin-secondary': '#304FFE',
         'admin-bg': '#F5F6FA'
      },
    },
  },
  plugins: [],
}
