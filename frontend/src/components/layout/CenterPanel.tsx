import React from 'react';
import {
  Box,
  Chip,
} from '@mui/material';
import BostonMap from '../map/BostonMap';

const CenterPanel: React.FC = () => {
  const [isMapReady, setIsMapReady] = React.useState(false);

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        position: 'relative',
      }}
    >
      {/* Mapbox Map */}
      <Box sx={{ flex: 1, position: 'relative' }}>
        <BostonMap onMapReady={setIsMapReady} />
      </Box>

      {/* Legend - Only show when map is ready */}
      {isMapReady && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            zIndex: 10,
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="🔴 High Risk" size="small" />
            <Chip label="🟡 Medium Risk" size="small" />
            <Chip label="🟢 Low Risk" size="small" />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CenterPanel;

