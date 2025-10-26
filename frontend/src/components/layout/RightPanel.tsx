import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  LocalHospital,
  MonitorHeart,
  Accessible,
} from '@mui/icons-material';
import { useStore } from '../../store';

// Hook to animate number changes
function useAnimatedNumber(target: number, duration: number = 1000): number {
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    const start = current;
    const diff = target - start;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (ease out)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setCurrent(start + diff * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return current;
}

const RightPanel: React.FC = () => {
  const { currentMetrics, isSimulationRunning, simulationProgress } = useStore();

  // Animated values
  const animatedMortality = useAnimatedNumber(currentMetrics.mortality, 1200);
  const animatedCapacity = useAnimatedNumber(currentMetrics.hospitalCapacity, 1200);
  const animatedAccess = useAnimatedNumber(currentMetrics.accessScore, 1200);
  const animatedResilience = useAnimatedNumber(currentMetrics.resilienceScore, 1200);

  const animatedCardio = useAnimatedNumber(currentMetrics.healthProblems.cardiometabolic, 1200);
  const animatedAccessBarriers = useAnimatedNumber(currentMetrics.healthProblems.accessBarriers, 1200);
  const animatedMortProblem = useAnimatedNumber(currentMetrics.healthProblems.prematureMortality, 1200);
  const animatedAsthma = useAnimatedNumber(currentMetrics.healthProblems.pediatricAsthma, 1200);
  const animatedSubstance = useAnimatedNumber(currentMetrics.healthProblems.substanceUse, 1200);

  return (
    <Box
      sx={{
        width: 400,
        height: '100%',
        bgcolor: 'background.paper',
        borderLeft: 1,
        borderColor: 'divider',
        overflow: 'auto',
        p: 3,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        📊 Simulation Results
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        7 ZIP Codes • 5 Health Problems
      </Typography>

      {/* Simulation Progress */}
      {isSimulationRunning && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Alert severity="info" icon={false}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              Running simulation... {simulationProgress}%
            </Typography>
            <LinearProgress variant="determinate" value={simulationProgress} />
          </Alert>
        </Box>
      )}

      {/* KPI Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 2 }}>
        {/* Mortality Rate */}
        <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <MonitorHeart fontSize="small" color="error" />
              <Typography variant="caption" sx={{ ml: 1 }}>
                Mortality
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {animatedMortality.toFixed(1)}%
            </Typography>
            {currentMetrics.mortalityChange !== 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingDown fontSize="small" sx={{ color: 'success.main' }} />
                <Typography variant="caption" color="success.main">
                  {Math.abs(currentMetrics.mortalityChange).toFixed(1)}% better
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Hospital Capacity */}
        <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalHospital fontSize="small" color="primary" />
              <Typography variant="caption" sx={{ ml: 1 }}>
                Hospital Cap.
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {Math.round(animatedCapacity)}%
            </Typography>
            {currentMetrics.hospitalCapacityChange !== 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingDown fontSize="small" sx={{ color: 'success.main' }} />
                <Typography variant="caption" color="success.main">
                  {Math.abs(currentMetrics.hospitalCapacityChange)}% less strain
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Access Score */}
        <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Accessible fontSize="small" color="secondary" />
              <Typography variant="caption" sx={{ ml: 1 }}>
                Access Score
              </Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {animatedAccess.toFixed(1)}
            </Typography>
            {currentMetrics.accessScoreChange > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingUp fontSize="small" sx={{ color: 'success.main' }} />
                <Typography variant="caption" color="success.main">
                  +{currentMetrics.accessScoreChange.toFixed(1)} points
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Resilience Score */}
      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          🎯 Resilience Score
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {animatedResilience.toFixed(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            / 10
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={animatedResilience * 10}
          sx={{ mt: 2, height: 8, borderRadius: 1 }}
        />
        {currentMetrics.resilienceScoreChange > 0 && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            +{currentMetrics.resilienceScoreChange.toFixed(1)} from baseline (
            +{Math.round((currentMetrics.resilienceScoreChange / 8.2) * 100)}% improvement)
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Health Problem Impact Summary */}
      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          🎯 Health Problem Impact (Baseline vs. Scenario)
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          {/* 1. Cardiometabolic Diseases */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Cardiometabolic Diseases
              </Typography>
              <Typography 
                variant="body2" 
                color={animatedCardio < -14 ? "success.main" : "warning.main"} 
                sx={{ fontWeight: 600 }}
              >
                {Math.round(animatedCardio)}%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              Diabetes & heart disease prevalence
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, 100 + animatedCardio)}
              color={animatedCardio < -14 ? "success" : "warning"}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>

          {/* 2. Language & Cultural Access Barriers */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Access Barriers
              </Typography>
              <Typography 
                variant="body2" 
                color={animatedAccessBarriers < -22 ? "success.main" : "warning.main"} 
                sx={{ fontWeight: 600 }}
              >
                {Math.round(animatedAccessBarriers)}%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              Language & cultural access issues
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, 100 + animatedAccessBarriers)}
              color={animatedAccessBarriers < -22 ? "success" : "warning"}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>

          {/* 3. Life Expectancy & Maternal/Infant Health */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Premature Mortality
              </Typography>
              <Typography 
                variant="body2" 
                color={animatedMortProblem < -18 ? "success.main" : "warning.main"} 
                sx={{ fontWeight: 600 }}
              >
                {Math.round(animatedMortProblem)}%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              Life expectancy gaps & maternal/infant health
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, 100 + animatedMortProblem)}
              color={animatedMortProblem < -18 ? "success" : "warning"}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>

          {/* 4. Asthma & Respiratory (Children) */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Pediatric Asthma
              </Typography>
              <Typography 
                variant="body2" 
                color={animatedAsthma < -16 ? "success.main" : "warning.main"} 
                sx={{ fontWeight: 600 }}
              >
                {Math.round(animatedAsthma)}%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              Asthma & respiratory conditions in children
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, 100 + animatedAsthma)}
              color={animatedAsthma < -16 ? "success" : "warning"}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>

          {/* 5. Substance Use & Overdose */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Substance Use & Overdose
              </Typography>
              <Typography 
                variant="body2" 
                color={animatedSubstance < -9 ? "success.main" : "warning.main"} 
                sx={{ fontWeight: 600 }}
              >
                {Math.round(animatedSubstance)}%
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
              SUD with racial inequities
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min(100, 100 + animatedSubstance)}
              color={animatedSubstance < -9 ? "success" : "warning"}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RightPanel;
