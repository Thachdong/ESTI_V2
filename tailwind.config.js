/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // USE TAILWINDCSS AND MUI TOGETHER
  // FOR MORE DETAIL, PLEASE VISIT: https://mui.com/material-ui/guides/interoperability/#tailwind-css
  corePlugins: {
    preflight: false
  },
  important: "#__next"
}
