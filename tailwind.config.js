/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bitBg: "#001E24",
        col_1: "#D8DD00"
      }
    },
    fontFamily: {
      nico: ["Nico", "sans-serif"],
      syne: ["Syne", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      syncopate: ["Syncopate", "sans-serif"],
      synco_thin: ["Syncopate-Thin", "sans-serif"]
    }
  }
};
