import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem,
  Box,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  PlayArrow,
  Settings,
} from '@mui/icons-material';
import { useStore } from '../../store';

const Header: React.FC = () => {
  const { currentScenario, isSimulationRunning, runSimulation } = useStore();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [prevRunning, setPrevRunning] = React.useState(isSimulationRunning);

  // Detect when simulation completes
  React.useEffect(() => {
    if (prevRunning && !isSimulationRunning) {
      setShowSuccess(true);
    }
    setPrevRunning(isSimulationRunning);
  }, [isSimulationRunning, prevRunning]);

  const handleRunSimulation = () => {
    runSimulation();
  };

  return (
    <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      <Toolbar sx={{ gap: 2, py: 1 }}>
        {/* Logo/Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            🏥 Health Resilience Simulator
          </Typography>
        </Box>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            📍
          </Typography>
          <Select
            value="boston"
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="boston">Boston, MA</MenuItem>
          </Select>
        </Box>

        {/* Scenario Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Scenario:
          </Typography>
          <Select
            value={currentScenario?.id || 'baseline'}
            size="small"
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="baseline">Baseline</MenuItem>
            <MenuItem value="high-investment">High Investment</MenuItem>
            <MenuItem value="climate-adaptation">Climate Adaptation</MenuItem>
          </Select>
        </Box>

        {/* Action Buttons */}
        <Button
          variant="contained"
          color="primary"
          startIcon={isSimulationRunning ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <PlayArrow />}
          onClick={handleRunSimulation}
          disabled={isSimulationRunning}
          sx={{ minWidth: 180 }}
        >
          {isSimulationRunning ? 'Running...' : 'Run Simulation'}
        </Button>

        <IconButton size="small" disabled sx={{ opacity: 0.3 }}>
          <Settings />
        </IconButton>
      </Toolbar>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          ✨ Simulation complete! {currentScenario?.interventions.length || 0} interventions analyzed.
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Header;

