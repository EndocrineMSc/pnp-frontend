/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        notefit: "repeat(auto-fit, minmax(300px, 640px))",
      },
      gridTemplateRows: {
        autofill: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      width: {
        "card-image": "200px",
      },
      height: {
        "card-image": "200px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        wgray: {
          50: "#f2f7fb",
          100: "#e7f0f8",
          200: "#d3e2f2",
          300: "#b9cfe8",
          400: "#9cb6dd",
          500: "#839dd1",
          600: "#6a7fc1",
          700: "#6374ae",
          800: "#4a5989",
          900: "#414e6e",
          950: "#262c40",
        },
      },
      animation: {
        "button-shake": "shake 0.1s linear 1",
      },
      keyframes: {
        shake: {
          "0%": { transform: "translate(1px) rotate(0deg)" },
          "10%": { transform: "translate(-1px) rotate(-1deg)" },
          "20%": { transform: "translate(-3px) rotate(1deg)" },
          "30%": { transform: "translate(3px) rotate(0deg)" },
          "40%": { transform: "translate(1px) rotate(1deg)" },
          "50%": { transform: "translate(-1px) rotate(-1deg)" },
          "60%": { transform: "translate(-3px) rotate(0deg)" },
          "70%": { transform: "translate(3px) rotate(-1deg)" },
          "80%": { transform: "translate(-1px) rotate(1deg)" },
          "90%": { transform: "translate(1px) rotate(0deg)" },
          "100%": { transform: "translate(1px) rotate(-1deg)" },
        },
      },
    },
    plugins: [],
  },
};
