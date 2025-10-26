// Health metrics and data types

export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change?: number; // % change from baseline
  trend?: 'up' | 'down' | 'neutral';
}

export interface Neighborhood {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  metrics: {
    cancerRate: number;
    mortalityRate: number;
    accessScore: number;
    hospitalCapacity: number;
  };
  demographics: {
    population: number;
    medianIncome: number;
    ethnicityBreakdown: {
      latino: number;
      white: number;
      black: number;
      asian: number;
      other: number;
    };
  };
  riskLevel: 'high' | 'medium' | 'low';
}

export interface HealthData {
  neighborhoods: Neighborhood[];
  cityWideMetrics: {
    averageCancerRate: number;
    averageMortalityRate: number;
    averageAccessScore: number;
    totalPopulation: number;
  };
}

export interface ResilienceScore {
  overall: number; // 0-10
  components: {
    healthcareAccess: number;
    responseCapacity: number;
    communityHealth: number;
  };
}

