// theme.ts
import { createTheme } from "@mui/material";

// Light theme configuration
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      paper: '#f5f5f5',
      default: '#ffffff',
    },
    primary: {
      main: '#1D4ED8',
    },
    secondary: {
      main: '#03dac6',
    },
  },
});

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#071429',
      default: '#0b0e11',
    },
    primary: {
      main: '#aa9Eff',
    },
    secondary: {
      main: '#03dac6',
    },
  },
});
