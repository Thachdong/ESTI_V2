/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      success: "#2e7d32",
      warning: "#ed6c02",
      error: "#d32f2f",
      info: "#0288d1",
      white: "#fff",
      "grey-2": "rgba(0, 0, 0, 0.12)",
      "grey-3": "#e0e0e0",
      main: "#2684C5",
      "main-1": "#DB7844",
      "main-2": "#2684C5",
      "main-3": "#DBB918",
      "main-4": "#23DBD3",
    },
  },
  plugins: [],
  // USE TAILWINDCSS AND MUI TOGETHER
  // FOR MORE DETAIL, PLEASE VISIT: https://mui.com/material-ui/guides/interoperability/#tailwind-css
  corePlugins: {
    preflight: false,
  },
  important: "#__ESTI_ANCESTOR", // USE #__ESTI_ANCESTOR INSTEAD OF #__NEXT TO WRAP MUI MODALS
};
