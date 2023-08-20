/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          50: "rgba(147, 155, 159, 0.2)", // guesses grid
          100: "rgba(86, 95, 126, 1)", // keyboard keys
          200: "rgba(218, 220, 224, 0.03)", // header / keyboard background
          300: "rgba(38, 43, 60, 1)", // container
          400: "rgba(38, 43, 60, 0.89)", // overlay
        },
      },
    },
  },
  plugins: [],
};
