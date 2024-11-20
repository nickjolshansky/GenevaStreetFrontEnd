import { createTheme } from "@mui/material/styles";

/*
#eedbb3
#cc6635
#e2b58b

#bab99a
#493729
#49624d

#9aa587
#142117
#c9866c

#5a7e62
#2e4230
  #9a3933
*/
const CREAM = {
  main: "#e2b58b",
  light: "#fbcfa7",
  dark: "#c39870",
  contrast: "#ffffff",
};

const ORANGE = {
  main: "#cc6635",
  light: "#c9866c",
  dark: "#cc6635",
  contrast: "#142117",
};

const RED = {
  main: "#9a3933",
  light: "#a93e39",
  dark: "#87312d",
  contrast: "#142117",
};

const GREEN = {
  main: "#2e4230",
  light: "#3e5941",
  dark: "#243325",
  contrast: "#ffffff",
};

const SUCCESS = {
  main: "#2e7d32",
  light: "#4caf50",
  dark: "#1b5e20",
  contrast: "#ffffff",
};

const ERROR = {
  main: "#d32f2f",
  light: "#ef5350",
  dark: "#c62828",
  contrast: "#ffffff",
};

const WARNING = {
  main: "#ed6c02",
  light: "#ff9800",
  dark: "#e65100",
  contrast: "#ffffff",
};

const INFO = {
  main: "#0288d1",
  light: "#03a9f4",
  dark: "#01579b",
  contrast: "#ffffff",
};

const GREY = {
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
};

export const theme = createTheme({
  palette: {
    cream: CREAM,
    orange: ORANGE,
    red: RED,
    green: GREEN,
    success: SUCCESS,
    error: ERROR,
    warning: WARNING,
    info: INFO,
    grey: GREY,
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
