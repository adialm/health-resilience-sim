import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import { useStore } from './store';
import { baselineScenario } from './constants/mockData';

function App() {
  const { setCurrentScenario } = useStore();

  // Initialize with baseline scenario
  useEffect(() => {
    setCurrentScenario(baselineScenario);
  }, [setCurrentScenario]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
