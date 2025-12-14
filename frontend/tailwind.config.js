/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ngo-green": "#059669",
        "ngo-yellow": "#F59E0B",
        "ngo-dark": "#064E3B",
        "ngo-cream": "#FDFCF6",
        "ngo-text": "#1A1A1A",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Tamil", "sans-serif"],
        display: ["Catamaran", "sans-serif"],
        ancient: ["Kavivanar", "cursive"],
      },
      animation: {
        "text-shimmer": "text-shimmer 3s ease infinite",
      },
      keyframes: {
        "text-shimmer": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
