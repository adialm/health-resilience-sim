import { Neighborhood } from '../types/health.types';
import { Intervention } from '../types/scenario.types';

// Convert neighborhoods to GeoJSON FeatureCollection
export const neighborhoodsToGeoJSON = (neighborhoods: Neighborhood[]): GeoJSON.FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: neighborhoods.map((neighborhood) => ({
      type: 'Feature',
      id: neighborhood.id,
      geometry: neighborhood.geometry,
      properties: {
        id: neighborhood.id,
        name: neighborhood.name,
        riskLevel: neighborhood.riskLevel,
        cancerRate: neighborhood.metrics.cancerRate,
        mortalityRate: neighborhood.metrics.mortalityRate,
        accessScore: neighborhood.metrics.accessScore,
        hospitalCapacity: neighborhood.metrics.hospitalCapacity,
        population: neighborhood.demographics.population,
        medianIncome: neighborhood.demographics.medianIncome,
      },
    })),
  };
};

/**
 * Generate random points within a polygon for heatmap visualization
 * Uses a simple bounding box approach for quick hackathon implementation
 */
const generatePointsInPolygon = (
  coordinates: number[][],
  count: number,
  weight: number
): GeoJSON.Feature[] => {
  const points: GeoJSON.Feature[] = [];
  
  // Get bounding box of the polygon
  const lngs = coordinates.map(coord => coord[0]);
  const lats = coordinates.map(coord => coord[1]);
  
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  
  // Generate random points within bounding box
  for (let i = 0; i < count; i++) {
    const lng = minLng + Math.random() * (maxLng - minLng);
    const lat = minLat + Math.random() * (maxLat - minLat);
    
    points.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
      properties: {
        weight: weight,
      },
    });
  }
  
  return points;
};

/**
 * Convert neighborhood data to heatmap point data
 */
export const neighborhoodsToHeatmapGeoJSON = (
  neighborhoods: Neighborhood[]
): GeoJSON.FeatureCollection => {
  const allPoints: GeoJSON.Feature[] = [];
  
  neighborhoods.forEach((neighborhood) => {
    // Calculate intensity based on health metrics
    // Higher mortality + cancer rate + lower access = more intense heat
    const mortalityNormalized = neighborhood.metrics.mortalityRate / 100;
    const cancerNormalized = neighborhood.metrics.cancerRate / 100;
    const accessInverted = (100 - neighborhood.metrics.accessScore) / 100;
    const weight = (mortalityNormalized + cancerNormalized + accessInverted) / 3;
    
    // Generate more points for larger populations
    const pointCount = Math.max(20, Math.floor(neighborhood.demographics.population / 1000));
    
    // Extract coordinates from the polygon
    const coords = neighborhood.geometry.type === 'Polygon' 
      ? neighborhood.geometry.coordinates[0]
      : neighborhood.geometry.coordinates[0][0];
    
    const points = generatePointsInPolygon(
      coords,
      pointCount,
      weight
    );
    
    allPoints.push(...points);
  });
  
  return {
    type: 'FeatureCollection',
    features: allPoints,
  };
};

// Convert interventions to GeoJSON FeatureCollection
export const interventionsToGeoJSON = (interventions: Intervention[]): GeoJSON.FeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: interventions.map((intervention) => ({
      type: 'Feature',
      id: intervention.id,
      geometry: {
        type: 'Point',
        coordinates: intervention.location.coordinates,
      },
      properties: {
        id: intervention.id,
        type: intervention.type,
        name: intervention.name,
        neighborhoodId: intervention.location.neighborhoodId,
      },
    })),
  };
};

// Get color based on risk level
export const getRiskColor = (riskLevel: 'high' | 'medium' | 'low'): string => {
  const colors = {
    high: '#dc2626',
    medium: '#f59e0b',
    low: '#10b981',
  };
  return colors[riskLevel];
};

// Create color expression for Mapbox based on property
export const createColorExpression = (property: string): any => {
  return [
    'match',
    ['get', property],
    'high', '#dc2626',
    'medium', '#f59e0b',
    'low', '#10b981',
    '#e5e7eb', // default
  ] as any;
};

