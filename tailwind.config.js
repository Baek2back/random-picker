/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        urgent:
          "linear-gradient(146.13deg, #6AD79C 20%, #FFFFFF 46.81%, #F46B73 70.28%, #3F9DE1 90.89%)",
      },
      keyframes: {
        reveal: {
          "0%, 100%": { transform: "translateY(0px)" },
          "75%": { transform: "translateY(-39px)" },
        },
      },
      animation: {
        reveal: "reveal 10s 1",
      },
      colors: {
        gray: {
          900: "#18191C",
          700: "#2B2F3C",
          500: "#495066",
          300: "#808B97",
          80: "#343A40",
          30: "#DEE2E6",
        },
        purple: {
          40: "#C2B6FF",
          10: "#F1EFFF",
        },
        red: {
          40: "#FFC4CF",
          10: "#FFEFF2",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
