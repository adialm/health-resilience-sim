import { createTheme } from '@mui/material/styles';

// Color palette from design plan
export const colors = {
  primary: {
    navy: '#1e3a8a',
    teal: '#0d9488',
    coral: '#f97316',
    purple: '#7c3aed',
  },
  risk: {
    high: '#dc2626',
    medium: '#f59e0b',
    low: '#10b981',
  },
  background: {
    light: '#f8fafc',
    dark: '#0f172a',
    paper: '#ffffff',
  },
  text: {
    primary: '#0f172a',
    secondary: '#64748b',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.navy,
      light: '#3b82f6',
      dark: '#1e293b',
    },
    secondary: {
      main: colors.primary.teal,
      light: '#14b8a6',
      dark: '#0f766e',
    },
    error: {
      main: colors.risk.high,
    },
    warning: {
      main: colors.risk.medium,
    },
    success: {
      main: colors.risk.low,
    },
    background: {
      default: colors.background.light,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Inter',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  spacing: 8, // Base unit: 8px
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

export default theme;

