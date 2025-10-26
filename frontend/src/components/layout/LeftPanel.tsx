import React from 'react';
import {
  Box,
  Typography,
  Button,
  Slider,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Add,
  LocalHospital,
  Vaccines,
  Place,
  Delete,
} from '@mui/icons-material';
import { useStore } from '../../store';

const LeftPanel: React.FC = () => {
  const { 
    resetScenario, 
    placementMode, 
    setPlacementMode, 
    currentScenario,
    removeIntervention,
    healthcareAccessLevel,
    fundingLevel,
    simulationDuration,
    setHealthcareAccessLevel,
    setFundingLevel,
    setSimulationDuration,
  } = useStore();
  const [selectedZip, setSelectedZip] = React.useState('');

  const handlePlacementMode = (mode: 'clinic' | 'hospital' | 'vaccination') => {
    if (placementMode === mode) {
      setPlacementMode(null); // Toggle off
    } else {
      setPlacementMode(mode);
    }
  };

  const interventions = currentScenario?.interventions || [];

  const getInterventionIcon = (type: string) => {
    switch (type) {
      case 'clinic':
        return '⚕️';
      case 'hospital':
        return '🏥';
      case 'vaccination':
        return '💉';
      default:
        return '📍';
    }
  };

  return (
    <Box
      sx={{
        width: 350,
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        overflow: 'auto',
        p: 3,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        🎛️ Scenario Builder
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* ZIP Code Selection */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Select ZIP Code</InputLabel>
          <Select
            value={selectedZip}
            label="Select ZIP Code"
            onChange={(e) => setSelectedZip(e.target.value)}
          >
            <MenuItem value="">All ZIPs</MenuItem>
            <MenuItem value="02134">02134 - Allston</MenuItem>
            <MenuItem value="02119">02119 - Roxbury</MenuItem>
            <MenuItem value="02130">02130 - Jamaica Plain</MenuItem>
            <MenuItem value="02118">02118 - South End</MenuItem>
            <MenuItem value="02215">02215 - Fenway/Kenmore</MenuItem>
            <MenuItem value="02121">02121 - Dorchester</MenuItem>
            <MenuItem value="02135">02135 - Brighton</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Add Interventions */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          📍 Add Interventions
        </Typography>
        
        {placementMode && (
          <Alert severity="info" icon={<Place />} sx={{ mb: 1, fontSize: '0.875rem' }}>
            Click on the map to place {placementMode}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <Button
            variant={placementMode === 'clinic' ? 'contained' : 'outlined'}
            startIcon={<Add />}
            fullWidth
            sx={{ justifyContent: 'flex-start' }}
            onClick={() => handlePlacementMode('clinic')}
          >
            Add Clinic
          </Button>
          <Button
            variant={placementMode === 'hospital' ? 'contained' : 'outlined'}
            startIcon={<LocalHospital />}
            fullWidth
            sx={{ justifyContent: 'flex-start' }}
            onClick={() => handlePlacementMode('hospital')}
          >
            Add Hospital
          </Button>
          <Button
            variant={placementMode === 'vaccination' ? 'contained' : 'outlined'}
            startIcon={<Vaccines />}
            fullWidth
            sx={{ justifyContent: 'flex-start' }}
            onClick={() => handlePlacementMode('vaccination')}
          >
            Vaccination Campaign
          </Button>
        </Box>

        {/* Active Interventions List */}
        {interventions.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Active Interventions ({interventions.length})
            </Typography>
            <List dense sx={{ bgcolor: 'background.default', borderRadius: 1 }}>
              {interventions.map((intervention) => (
                <ListItem key={intervention.id}>
                  <ListItemText
                    primary={
                      <span>
                        {getInterventionIcon(intervention.type)} {intervention.name}
                      </span>
                    }
                    secondary={`ZIP: ${intervention.location.neighborhoodId || 'Unknown'}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => removeIntervention(intervention.id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Policy Changes */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          📊 Policy Changes
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Healthcare Access: {healthcareAccessLevel}%
          </Typography>
          <Slider
            value={healthcareAccessLevel}
            onChange={(_, value) => setHealthcareAccessLevel(value as number)}
            valueLabelDisplay="auto"
            marks
            min={0}
            max={100}
            sx={{ mt: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            Infrastructure quality (affects intervention effectiveness)
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" gutterBottom>
            Funding Level: {fundingLevel}%
          </Typography>
          <Slider
            value={fundingLevel}
            onChange={(_, value) => setFundingLevel(value as number)}
            valueLabelDisplay="auto"
            marks
            min={0}
            max={100}
            sx={{ mt: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            Budget adequacy (affects intervention effectiveness)
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Simulation Settings */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          ⚙️ Simulation Settings
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            Duration: {simulationDuration} {simulationDuration === 1 ? 'year' : 'years'}
          </Typography>
          <Slider
            value={simulationDuration}
            onChange={(_, value) => setSimulationDuration(value as number)}
            valueLabelDisplay="auto"
            marks
            min={1}
            max={10}
            step={1}
            sx={{ mt: 1 }}
          />
          <Typography variant="caption" color="text.secondary">
            Projection timeframe (scales intervention effects)
          </Typography>
        </Box>
      </Box>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        onClick={resetScenario}
      >
        Clear All
      </Button>
    </Box>
  );
};

export default LeftPanel;
