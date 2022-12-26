import { ThemeOptions } from "@mui/material";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: [
      "ui-sans-serif",
      "system-ui"
    ].join(",")
  }
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
  },
};

export const themeOptions = {
  lightThemeOptions,
  darkThemeOptions
}
