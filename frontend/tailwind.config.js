/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FEFAF6",
        secondary: "#1F1D2C",
        tertiary: "#FE705A",
      },
    },
    screens: {
      lg: { max: "2023px" },
      // => @media (max-width: 1023px) { ... }

      sm: { max: "1000px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
