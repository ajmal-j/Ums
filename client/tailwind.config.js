/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        shadowFull: "0px 0px 10px #bc72f8",
        shadowFullBlack: "0px 0px 10px #878787",
        shadowFullWhite: "0px 0px 15px #ffffff",
      },
    },
  },
  plugins: [],
};
