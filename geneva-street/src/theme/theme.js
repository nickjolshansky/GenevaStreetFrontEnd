import { createTheme } from "@mui/material/styles";

const CREAM = {
  main: "#e2b48a",
  light: "#eddab5",
  dark: "#c8876a",
  contrast: "#142117",
};

const ORANGE = {
  main: "#cc6635",
  light: "#c9866c",
  dark: "#cc6635",
  contrast: "#142117",
};

const RED = {
  main: "#993831",
  light: "#a93e39",
  dark: "#87312d",
  contrast: "#eddab5",
};

const GREEN = {
  main: "#46624a",
  light: "#597d61",
  dark: "#2e422f",
  contrast: "#eddab5",
};

const BROWN = {
  main: "#2b211a",
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.red.main,
          color: theme.palette.red.contrast,
          "&:hover": {
            backgroundColor: theme.palette.red.dark,
          },
          "&:active": {
            backgroundColor: theme.palette.red.light,
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiFilledInput-root": {
            backgroundColor: theme.palette.green.dark, // Set initial background
            color: theme.palette.green.contrast,
            "&:hover": {
              backgroundColor: theme.palette.green.dark, // Keep the background green on hover
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.green.dark, // Keep the background green on focus
            },
            "&.Mui-disabled": {
              backgroundColor: theme.palette.grey[100], // Change background on disabled state
            },
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.green.contrast,
            "&.Mui-focused": {
              color: theme.palette.green.contrast, // Keep label color consistent when focused
            },
          },
          "& .MuiInputBase-root": {
            backgroundColor: theme.palette.green.dark,
            color: theme.palette.green.contrast,
            "&:after": {
              borderBottomColor: theme.palette.green.contrast,
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottomColor: theme.palette.green.contrast,
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.green.dark,
            },
          },
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.green.dark,
          color: theme.palette.green.contrast,
        }),
        option: ({ theme }) => ({
          '&[aria-selected="true"]': {
            backgroundColor: theme.palette.green.main + "!important",
          },
          '&[aria-selected="true"].Mui-focused': {
            backgroundColor: theme.palette.green.light + "!important",
          },
          "&:hover": {
            backgroundColor: theme.palette.green.main + "!important",
          },
        }),
        popupIndicator: ({ theme }) => ({
          // Dropdown arrow
          color: theme.palette.green.contrast,
        }),
        clearIndicator: ({ theme }) => ({
          // Clear button
          color: theme.palette.green.contrast,
        }),
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.green.contrast + "!important",
          "& .MuiSelect-select": {
            color: theme.palette.green.contrast + "!important",
          },
        }),
        icon: ({ theme }) => ({
          color: theme.palette.green.contrast + "!important",
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.green.dark + "!important",
          "& .MuiOutlinedInput-notchedOutline": {},
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.cream.light + "!important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.cream.light + "!important",
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.green.contrast + "!important",
          "&.Mui-focused": {
            color: theme.palette.green.contrast + "!important",
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiPopover-paper": {
            backgroundColor: theme.palette.green.dark + "!important",
          },
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.green.main + "!important",
          color: theme.palette.green.contrast + "!important",
        }),
        deleteIcon: ({ theme }) => ({
          color: theme.palette.green.contrast + "!important",
          "&:hover": {
            color: theme.palette.green.light + "!important",
          },
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.green.contrast + "!important",
          "&.Mui-selected": {
            backgroundColor: theme.palette.green.main + "!important",
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.green.light + "!important",
          },
          "&:hover": {
            backgroundColor: theme.palette.green.main + "!important",
          },
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: theme.palette.green.dark,
          color: theme.palette.green.contrast,
        }),
        arrow: ({ theme }) => ({
          color: theme.palette.green.dark,
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.green.main,
          color: theme.palette.green.contrast,
          "& .MuiAccordionSummary-root": {
            color: theme.palette.green.contrast,
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            color: theme.palette.green.contrast,
          },
          "& .MuiAccordionDetails-root": {
            color: theme.palette.green.contrast,
          },
        }),
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiSlider-rail": {
            backgroundColor: theme.palette.brown.main,
          },
          "& .MuiSlider-track": {
            backgroundColor: theme.palette.red.main,
            border: theme.palette.red.main,
          },
          "& .MuiSlider-thumb": {
            backgroundColor: theme.palette.red.dark,
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "none",
            },
            "&:before": {
              boxShadow: "none",
            },
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: theme.palette.green.dark,
            color: theme.palette.green.contrast,
          },
          "&.Mui-focused": {
            "& .MuiSlider-thumb": {
              boxShadow: "none",
            },
          },
          "& .MuiTouchRipple-root": {
            display: "none",
          },
        }),
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiInputBase-root": {
            backgroundColor: theme.palette.green.dark, // Keep the background color as green.dark
            color: theme.palette.green.contrast,
            "&:after": {
              borderBottomColor: theme.palette.green.contrast,
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottomColor: theme.palette.green.contrast,
            },
            "&:hover": {
              backgroundColor: theme.palette.green.dark, // Ensure the background stays green on hover
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.green.dark, // Ensure the background stays green when focused
            },
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.green.contrast,
            "&.Mui-focused": {
              color: theme.palette.green.contrast,
            },
          },
          "& .MuiFilledInput-root": {
            backgroundColor: theme.palette.green.dark, // For filled variant, keep the background green
            "&:hover": {
              backgroundColor: theme.palette.green.dark, // Keep the hover background green
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.green.dark, // Keep the focused background green
            },
          },
        }),
      },
    },
  },

  palette: {
    cream: CREAM,
    orange: ORANGE,
    red: RED,
    green: GREEN,
    brown: BROWN,
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
