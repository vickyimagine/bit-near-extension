/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bitBg: "#001E24"
      }
    }
  },
  plugins: [require("daisyui")]
};
