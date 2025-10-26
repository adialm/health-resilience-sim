import { Neighborhood } from '../types/health.types';
import { Scenario } from '../types/scenario.types';

// Mock Boston neighborhoods with realistic health data
export const mockNeighborhoods: Neighborhood[] = [
  {
    id: 'allston',
    name: 'Allston',
    coordinates: [-71.131, 42.353],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-71.141, 42.358],
        [-71.121, 42.358],
        [-71.121, 42.348],
        [-71.141, 42.348],
        [-71.141, 42.358],
      ]],
    },
    metrics: {
      cancerRate: 450, // per 100k (50% higher than average)
      mortalityRate: 3.8,
      accessScore: 35,
      hospitalCapacity: 72,
    },
    demographics: {
      population: 12450,
      medianIncome: 45000,
      ethnicityBreakdown: {
        latino: 52,
        white: 28,
        black: 12,
        asian: 6,
        other: 2,
      },
    },
    riskLevel: 'high',
  },
  {
    id: 'roxbury',
    name: 'Roxbury',
    coordinates: [-71.084, 42.331],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-71.094, 42.336],
        [-71.074, 42.336],
        [-71.074, 42.326],
        [-71.094, 42.326],
        [-71.094, 42.336],
      ]],
    },
    metrics: {
      cancerRate: 380,
      mortalityRate: 4.2,
      accessScore: 28,
      hospitalCapacity: 65,
    },
    demographics: {
      population: 18200,
      medianIncome: 38000,
      ethnicityBreakdown: {
        latino: 35,
        white: 15,
        black: 42,
        asian: 5,
        other: 3,
      },
    },
    riskLevel: 'high',
  },
  {
    id: 'jamaica-plain',
    name: 'Jamaica Plain',
    coordinates: [-71.114, 42.310],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-71.124, 42.315],
        [-71.104, 42.315],
        [-71.104, 42.305],
        [-71.124, 42.305],
        [-71.124, 42.315],
      ]],
    },
    metrics: {
      cancerRate: 280,
      mortalityRate: 2.8,
      accessScore: 65,
      hospitalCapacity: 88,
    },
    demographics: {
      population: 15600,
      medianIncome: 68000,
      ethnicityBreakdown: {
        latino: 25,
        white: 45,
        black: 18,
        asian: 8,
        other: 4,
      },
    },
    riskLevel: 'low',
  },
  {
    id: 'south-end',
    name: 'South End',
    coordinates: [-71.073, 42.342],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-71.083, 42.347],
        [-71.063, 42.347],
        [-71.063, 42.337],
        [-71.083, 42.337],
        [-71.083, 42.347],
      ]],
    },
    metrics: {
      cancerRate: 290,
      mortalityRate: 2.5,
      accessScore: 78,
      hospitalCapacity: 92,
    },
    demographics: {
      population: 11200,
      medianIncome: 95000,
      ethnicityBreakdown: {
        latino: 15,
        white: 55,
        black: 18,
        asian: 8,
        other: 4,
      },
    },
    riskLevel: 'low',
  },
  {
    id: 'back-bay',
    name: 'Back Bay',
    coordinates: [-71.082, 42.351],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-71.092, 42.356],
        [-71.072, 42.356],
        [-71.072, 42.346],
        [-71.092, 42.346],
        [-71.092, 42.356],
      ]],
    },
    metrics: {
      cancerRate: 250,
      mortalityRate: 2.2,
      accessScore: 85,
      hospitalCapacity: 95,
    },
    demographics: {
      population: 9800,
      medianIncome: 110000,
      ethnicityBreakdown: {
        latino: 8,
        white: 72,
        black: 8,
        asian: 10,
        other: 2,
      },
    },
    riskLevel: 'low',
  },
  {
    id: 'dorchester',
    name: 'Dorchester',
    coordinates: [-71.064, 42.299],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-71.074, 42.309],
        [-71.054, 42.309],
        [-71.054, 42.289],
        [-71.074, 42.289],
        [-71.074, 42.309],
      ]],
    },
    metrics: {
      cancerRate: 360,
      mortalityRate: 3.6,
      accessScore: 42,
      hospitalCapacity: 70,
    },
    demographics: {
      population: 24500,
      medianIncome: 48000,
      ethnicityBreakdown: {
        latino: 22,
        white: 25,
        black: 38,
        asian: 12,
        other: 3,
      },
    },
    riskLevel: 'medium',
  },
  {
    id: 'cambridge',
    name: 'Cambridge',
    coordinates: [-71.106, 42.373],
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [-71.116, 42.378],
        [-71.096, 42.378],
        [-71.096, 42.368],
        [-71.116, 42.368],
        [-71.116, 42.378],
      ]],
    },
    metrics: {
      cancerRate: 240,
      mortalityRate: 2.1,
      accessScore: 88,
      hospitalCapacity: 98,
    },
    demographics: {
      population: 28900,
      medianIncome: 92000,
      ethnicityBreakdown: {
        latino: 12,
        white: 58,
        black: 12,
        asian: 16,
        other: 2,
      },
    },
    riskLevel: 'low',
  },
];

// Baseline scenario
export const baselineScenario: Scenario = {
  id: 'baseline',
  name: 'Baseline',
  description: 'Current state of Boston health infrastructure with no interventions',
  baselineYear: 2024,
  duration: 5,
  interventions: [],
  policyChanges: [],
  events: [],
  createdAt: new Date(),
  lastModified: new Date(),
};

// City-wide averages
export const cityWideMetrics = {
  averageCancerRate: 300, // per 100k
  averageMortalityRate: 3.2,
  averageAccessScore: 62,
  totalPopulation: 120650,
};

