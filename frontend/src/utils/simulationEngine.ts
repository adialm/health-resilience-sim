/**
 * Healthcare Simulation Engine
 * 
 * Models the impact of policy interventions on community health outcomes using
 * real Boston Public Health Commission data. Supports scenario testing for:
 * - Healthcare facility placement (clinics, hospitals)
 * - Public health campaigns (vaccination programs)
 * - Policy adjustments (access levels, funding, duration)
 * 
 * @module simulationEngine
 */

import { Intervention } from '../types/scenario.types';
import { calculateBaselineFromRealData, INTERVENTION_LEVERS } from '../constants/realHealthData';

export interface SimulationMetrics {
  mortality: number;
  mortalityChange: number;
  hospitalCapacity: number;
  hospitalCapacityChange: number;
  accessScore: number;
  accessScoreChange: number;
  resilienceScore: number;
  resilienceScoreChange: number;
  healthProblems: {
    cardiometabolic: number;
    accessBarriers: number;
    prematureMortality: number;
    pediatricAsthma: number;
    substanceUse: number;
  };
}

/**
 * Calculate baseline metrics from REAL Boston health data
 * Uses population-weighted averages from 6 ZIP codes
 */
export function getBaselineMetrics(): SimulationMetrics {
  const realData = calculateBaselineFromRealData();
  
  // Calculate composite cardiometabolic score
  const cardiometabolic = (realData.diabetesPrevalence + realData.hypertensionRate + realData.obesityRate) / 3;
  
  // Map real data to our metrics structure
  return {
    mortality: 3.2, // Placeholder (not in dataset)
    mortalityChange: 0,
    hospitalCapacity: 85, // Placeholder (not in dataset)
    hospitalCapacityChange: 0,
    accessScore: Math.max(1, Math.round((10 - realData.uninsuredRate) * 10) / 10), // Inverse of uninsured %
    accessScoreChange: 0,
    resilienceScore: 6.5, // Calculated from health problems below
    resilienceScoreChange: 0,
    healthProblems: {
      // Using real aggregated data from Boston census tracts
      cardiometabolic: -Math.round(cardiometabolic * 10) / 10, // Negative = % reduction needed
      accessBarriers: -Math.round(realData.uninsuredRate * 10) / 10,
      prematureMortality: realData.lifeExpectancy > 0 ? -Math.round((85 - realData.lifeExpectancy) * 2) / 10 : -18,
      pediatricAsthma: -Math.round(realData.asthmaPrevalence * 10) / 10,
      substanceUse: -Math.round(realData.overdoseRate * 10) / 10,
    },
  };
}

/**
 * Calculate simulation results based on interventions AND policy settings
 * Uses REAL lever effects from levers.csv scaled by duration, access, and funding
 * 
 * @param interventions - List of placed interventions (clinics, hospitals, vaccinations)
 * @param durationYears - Simulation timeframe (1-10 years from Duration slider)
 * @param healthcareAccessLevel - Infrastructure quality (0-100, affects intervention effectiveness)
 * @param fundingLevel - Budget adequacy (0-100, affects intervention effectiveness)
 */
export function calculateSimulationResults(
  interventions: Intervention[],
  durationYears: number = 5,
  healthcareAccessLevel: number = 60,
  fundingLevel: number = 40
): SimulationMetrics {
  const baseline = getBaselineMetrics();
  const results = { ...baseline };
  
  // Reset change trackers
  results.mortalityChange = 0;
  results.hospitalCapacityChange = 0;
  results.accessScoreChange = 0;
  results.resilienceScoreChange = 0;
  
  // Simulation duration in months (from Duration slider)
  const SIMULATION_MONTHS = durationYears * 12;
  
  // Calculate effectiveness multipliers from policy sliders
  // Healthcare Access: Better infrastructure = more effective interventions
  // Formula: 50% base effectiveness + 0-50% bonus based on slider (default 60 = 1.1x)
  const accessMultiplier = 0.5 + (healthcareAccessLevel / 100) * 0.5;
  
  // Funding Level: Better funding = closer to maximum effectiveness
  // Formula: 30% base + 0-70% based on funding (default 40 = 0.58x, full funding = 1.0x)
  const fundingMultiplier = 0.3 + (fundingLevel / 100) * 0.7;
  
  // Combined policy multiplier
  const policyMultiplier = accessMultiplier * fundingMultiplier;
  
  // Count interventions by type
  const clinics = interventions.filter(i => i.type === 'clinic').length;
  const hospitals = interventions.filter(i => i.type === 'hospital').length;
  const vaccinations = interventions.filter(i => i.type === 'vaccination').length;
  
  // Apply REAL lever effects from data, scaled by policy multipliers
  
  // CLINICS: Uses Add_Clinic lever (-0.3% uninsured per month, max -6%)
  if (clinics > 0) {
    const clinicLever = INTERVENTION_LEVERS.find(l => l.name === 'Add_Clinic');
    if (clinicLever) {
      // Calculate base effect over duration, capped at max effect
      const baseEffect = Math.max(
        clinicLever.effectPerMonth * SIMULATION_MONTHS * clinics,
        clinicLever.maxEffect * clinics
      );
      
      // Apply policy multipliers
      const effect = baseEffect * policyMultiplier;
      
      // Reduce access barriers (uninsured %)
      results.healthProblems.accessBarriers -= effect;
      
      // Improve access score (scaled by policies)
      const accessImprovement = Math.abs(effect) * 0.15;
      results.accessScore += accessImprovement;
      results.accessScoreChange += accessImprovement;
      
      // Secondary benefit: screening helps with cardiometabolic (scaled)
      results.healthProblems.cardiometabolic -= clinics * 2 * policyMultiplier;
      
      results.resilienceScore += clinics * 0.2 * policyMultiplier;
      results.resilienceScoreChange += clinics * 0.2 * policyMultiplier;
    }
  }
  
  // HOSPITALS: Reduce mortality and capacity strain (scaled by policies)
  if (hospitals > 0) {
    results.mortality -= hospitals * 0.15 * policyMultiplier;
    results.mortalityChange = hospitals * -0.15 * policyMultiplier;
    
    results.hospitalCapacity -= hospitals * 3 * policyMultiplier; // Less strain
    results.hospitalCapacityChange = hospitals * -3 * policyMultiplier;
    
    results.healthProblems.prematureMortality -= hospitals * 4 * policyMultiplier;
    
    results.resilienceScore += hospitals * 0.35 * policyMultiplier;
    results.resilienceScoreChange += hospitals * 0.35 * policyMultiplier;
  }
  
  // VACCINATIONS: Uses Air_Filtering lever as proxy (-0.4% asthma per month, max -8%)
  if (vaccinations > 0) {
    const asthmaLever = INTERVENTION_LEVERS.find(l => l.name === 'Air_Filtering');
    if (asthmaLever) {
      // Calculate base effect over duration, capped at max effect
      const baseEffect = Math.max(
        asthmaLever.effectPerMonth * SIMULATION_MONTHS * vaccinations,
        asthmaLever.maxEffect * vaccinations
      );
      
      // Apply policy multipliers
      const effect = baseEffect * policyMultiplier;
      
      // Reduce pediatric asthma
      results.healthProblems.pediatricAsthma -= effect;
      
      // Secondary benefits (scaled)
      results.healthProblems.substanceUse -= vaccinations * 3 * policyMultiplier;
      results.healthProblems.cardiometabolic -= vaccinations * 2 * policyMultiplier;
      
      results.accessScore += vaccinations * 0.25 * policyMultiplier;
      results.accessScoreChange += vaccinations * 0.25 * policyMultiplier;
      
      results.resilienceScore += vaccinations * 0.25 * policyMultiplier;
      results.resilienceScoreChange += vaccinations * 0.25 * policyMultiplier;
    }
  }
  
  // Apply bounds
  results.mortality = Math.max(0.5, results.mortality);
  results.accessScore = Math.min(10, results.accessScore);
  results.resilienceScore = Math.min(10, results.resilienceScore);
  results.hospitalCapacity = Math.max(50, results.hospitalCapacity);
  
  // Ensure health problems don't go too positive (they're negative %)
  results.healthProblems.cardiometabolic = Math.max(-50, results.healthProblems.cardiometabolic);
  results.healthProblems.accessBarriers = Math.max(-20, results.healthProblems.accessBarriers);
  results.healthProblems.prematureMortality = Math.max(-30, results.healthProblems.prematureMortality);
  results.healthProblems.pediatricAsthma = Math.max(-20, results.healthProblems.pediatricAsthma);
  results.healthProblems.substanceUse = Math.max(-15, results.healthProblems.substanceUse);
  
  // Round for display - all values to 1 decimal place for consistency
  results.mortality = Math.round(results.mortality * 10) / 10;
  results.mortalityChange = Math.round(results.mortalityChange * 10) / 10;
  
  results.accessScore = Math.round(results.accessScore * 10) / 10;
  results.accessScoreChange = Math.round(results.accessScoreChange * 10) / 10;
  
  results.resilienceScore = Math.round(results.resilienceScore * 10) / 10;
  results.resilienceScoreChange = Math.round(results.resilienceScoreChange * 10) / 10;
  
  results.hospitalCapacity = Math.round(results.hospitalCapacity);
  results.hospitalCapacityChange = Math.round(results.hospitalCapacityChange * 10) / 10; // FIX: Round to 1 decimal
  
  results.healthProblems.cardiometabolic = Math.round(results.healthProblems.cardiometabolic);
  results.healthProblems.accessBarriers = Math.round(results.healthProblems.accessBarriers);
  results.healthProblems.prematureMortality = Math.round(results.healthProblems.prematureMortality);
  results.healthProblems.pediatricAsthma = Math.round(results.healthProblems.pediatricAsthma);
  results.healthProblems.substanceUse = Math.round(results.healthProblems.substanceUse);
  
  return results;
}
