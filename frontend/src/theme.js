// theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#54509B", // Dark primary variant
      light: "#A08FFE", // Light primary variant
    },
    secondary: {
      main: "#342C62", // Dark secondary variant
      light: "#C5C2DB", // Light secondary variant
    },
    surface: {
      100: "#FFFFFF", // Surface 100
      200: "#F4F4F4", // Surface 200
      300: "#B3B3B3", // Surface 300
      400: "#323232", // Surface 400
      500: "#000000", // Surface 500
    },
    error: {
      main: "#A72525", // Error
    },
    background: {
      default: "#F4F4F4", // Background
    },
    accent: {
      red: "#A72525",
      green: "#216342",
      yellow: "#FFDD67",
    },
  },
  typography: {
    fontFamily: '"Nunito Sans"',

    h1: {
      fontSize: "26px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 700,
    },
    h3: {
      fontSize: "22px",
      fontWeight: 700,
    },
    h4: {
      fontSize: "20px",
      fontWeight: 700,
    },
    h5: {
      fontSize: "16px",
      fontWeight: 600,
    },
    h6: {
      fontSize: "14px",
      fontWeight: 600,
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
    },
    button: {
      textTransform: "none",
    },
    chartlabel: {
      fontSize: "16px",
      fontWeight: 700,
    },
    chartlegend: {
      fontSize: "12px",
      fontWeight: 400,
    },
    
  },
  shape: {
    borderRadius: 3,
  },
  spacing: 8,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },


    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontSize: "14px",
          height: "40px",
          textTransform: "none",
          boxShadow: "none",
        },
      },
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            color: "white",
            padding: "0.5rem 1rem",
            backgroundColor: "#342C62",
            "&:hover": {
              backgroundColor: "#c5c2db",
              color: "#323232"
            },
            "&:disabled": {
              backgroundColor: "#a3a3a3",
            },
          },
        },
        {
          props: { variant: 'modaltab'},
          fullWidth: 'true',
          style: {
            justifyContent: "space-between",
            textTransform: "none",
            fontSize: "17px",
            borderBottom: "0.5px solid #808080",
            padding: "24px 0 24px 0",
            borderRadius: 0,
            height: "auto",
            color: "black",
            "&:last-of-type":{
              borderBottom: "none"
            }
          },
        },
        {
          props: { variant: 'logout' },
          style: {
            color: "white",
            padding: "0",
            fontSize: "16px",
            backgroundColor: "#342C62",
            "&:hover": {
              color: "#c5c2db"
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "red",
          backgroundColor: "white",
          margin: "0",
        },
      },
    },
  },

  // Breakpoints responsive design  (xs, sm, md, lg, xl)
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
