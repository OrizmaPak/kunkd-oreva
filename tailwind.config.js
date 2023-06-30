/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Recoleta: ["Recoleta", "sans-serif"],
      Hanken: ["Hanken-Grotesk", "sans-serif"],
    },
    extend: {
      fontSize: {
        sm: ".2rem",
        md: "2px",
      },
    },
  },
  plugins: [],
};
