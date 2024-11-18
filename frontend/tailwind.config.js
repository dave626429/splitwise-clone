/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        p: "#9D9DAA",
        s: "#6C5DD3",
        "g-1": "#BBBBC4", // icon stroke/fill
        "g-2": "#FAFAFB", // main bg
        "b-1": "#1B1D21", // headings
        "b-2": "#676E7E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      screens: {
        xs: "320px",
        sm: "375px",
      },
      dropShadow: {
        1: [
          "0px 6px 10px rgba(128, 129, 145, 0.1)",
          "6px 1px 10px rgba(128, 129, 145, 0.1)",
        ],
        2: [
          "0px -6px 10px rgba(128, 129, 145, 0.1)",
          "6px -1px 10px rgba(128, 129, 145, 0.1)",
        ],
      },
      borderRadius: {
        1: "12px",
        2: "16px",
        3: "24px",
      },
      keyframes: {
        expanddown: {
          "0%": { opacity: 0, transform: "translateY(-100%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        collapse: {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-100%)" },
        },
      },
      animation: {
        expanddown: "expanddown 1s ",
      },
    },
  },
  plugins: [],
};
