/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      success: "#2e7d32",
      warning: "#ed6c02",
      error: "#d32f2f",
      info: "#0288d1"
    }
  },
  plugins: [],
  // USE TAILWINDCSS AND MUI TOGETHER
  // FOR MORE DETAIL, PLEASE VISIT: https://mui.com/material-ui/guides/interoperability/#tailwind-css
  corePlugins: {
    preflight: false
  },
  important: "#__next"
}
