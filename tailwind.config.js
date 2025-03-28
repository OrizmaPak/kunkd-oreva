/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Recoleta: ["Recoleta", "sans-serif"],
      Hanken: ["Hanken-Grotest", "sans-serif"],
      Brico: ["Brico", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      InterReg: ["InterReg", "san-serif"],
      DMSans: ["DMSans", "san-serif"],
      BalooSemiBold: ["BalooSemiBold", "san-serif"],
      Arimo: ["ArimoRegular", "san-serif"],
    },
    extend: {
      colors: {
        customGreen: "#9FC43E",
        customGreen2: "#C2DBB0",
      },
    },
  },
  plugins: [],
};
