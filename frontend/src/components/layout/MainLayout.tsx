import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import LeftPanel from './LeftPanel';
import CenterPanel from './CenterPanel';
import RightPanel from './RightPanel';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header />

      {/* Main Content - 3 Panel Layout */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left Panel - Scenario Builder */}
        <LeftPanel />

        {/* Center Panel - Map */}
        <CenterPanel />

        {/* Right Panel - Metrics */}
        <RightPanel />
      </Box>
    </Box>
  );
};

export default MainLayout;

