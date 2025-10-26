// Scenario and intervention types

export type InterventionType = 'clinic' | 'hospital' | 'vaccination' | 'policy' | 'event';

export interface Intervention {
  id: string;
  type: InterventionType;
  name: string;
  location: {
    neighborhoodId: string;
    coordinates: [number, number]; // [lng, lat]
  };
  parameters: {
    capacity?: number;
    cost?: number;
    specialty?: string;
    startYear?: number;
    duration?: number;
  };
  projectedImpact?: {
    mortalityReduction: number;
    accessImprovement: number;
    patientsServed: number;
  };
}

export interface PolicyChange {
  id: string;
  name: string;
  category: 'healthcare' | 'funding' | 'environment';
  value: number; // 0-100 scale
}

export interface Event {
  id: string;
  name: string;
  type: 'flood' | 'heatwave' | 'pandemic' | 'economic';
  year: number;
  severity: number; // 0-100
  affectedNeighborhoods: string[];
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  baselineYear: number;
  duration: number; // years
  interventions: Intervention[];
  policyChanges: PolicyChange[];
  events: Event[];
  createdAt: Date;
  lastModified: Date;
}

export interface SimulationResult {
  scenarioId: string;
  year: number;
  metrics: {
    mortalityRate: number;
    accessScore: number;
    hospitalCapacity: number;
    resilienceScore: number;
  };
  neighborhoodResults: {
    [neighborhoodId: string]: {
      mortalityRate: number;
      accessScore: number;
      cancerRate: number;
    };
  };
}

