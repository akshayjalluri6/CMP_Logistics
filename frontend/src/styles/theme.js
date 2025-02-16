// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
      light: '#66b2ff',
      dark: '#0062cc',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d9534f',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
    },
  },
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
        },
        columnHeader: {
          backgroundColor: '#e9ecef',
        },
        cell: {
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
  },
});

export default theme;