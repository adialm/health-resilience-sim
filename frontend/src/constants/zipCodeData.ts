/**
 * Boston ZIP codes with health data
 * Combines real health metrics with geographic coordinates
 * Data source: Boston_Health_Resilience_Data_Pack (census tract aggregation)
 */

import { REAL_ZIP_DATA, RealZipData } from './realHealthData';

export interface ZipCodeHealthData {
  zipCode: string;
  name: string;
  coordinates: [number, number];
  population: number;
  realData: RealZipData; // Link to real aggregated data
  riskLevel: 'high' | 'medium' | 'low';
}

// Geographic coordinates for the 6 ZIP codes with data
const ZIP_COORDINATES: Record<string, [number, number]> = {
  '02119': [-71.0837, 42.3287], // Roxbury
  '02121': [-71.0840, 42.3002], // Dorchester
  '02130': [-71.1103, 42.3098], // Jamaica Plain
  '02134': [-71.1310, 42.3530], // Allston
  '02135': [-71.1518, 42.3466], // Brighton
  '02215': [-71.1028, 42.3467], // Fenway/Kenmore
};

/**
 * Boston ZIP codes with REAL health data
 * 6 ZIP codes with processed data from census tracts
 */
export const bostonZipCodes: ZipCodeHealthData[] = REAL_ZIP_DATA.map(realZip => ({
  zipCode: realZip.zip,
  name: realZip.name,
  coordinates: ZIP_COORDINATES[realZip.zip],
  population: realZip.population,
  realData: realZip,
  riskLevel: realZip.riskLevel,
}));

/**
 * Helper to get ZIP data by ZIP code
 */
export const getZipByCode = (zipCode: string): ZipCodeHealthData | undefined => {
  return bostonZipCodes.find(z => z.zipCode === zipCode);
};

/**
 * Get all high-risk ZIP codes
 */
export const getHighRiskZips = (): ZipCodeHealthData[] => {
  return bostonZipCodes.filter(z => z.riskLevel === 'high');
};

/**
 * Get summary statistics across all ZIPs
 */
export const getZipSummaryStats = () => {
  const totalPop = bostonZipCodes.reduce((sum, z) => sum + z.population, 0);
  
  // Calculate weighted averages
  const avgAsthma = bostonZipCodes.reduce((sum, z) => {
    return sum + z.realData.healthProblems.pediatricAsthma.score * z.population;
  }, 0) / totalPop;
  
  const avgCardiometabolic = bostonZipCodes.reduce((sum, z) => {
    return sum + z.realData.healthProblems.cardiometabolic.score * z.population;
  }, 0) / totalPop;
  
  const avgAccessBarriers = bostonZipCodes.reduce((sum, z) => {
    return sum + z.realData.healthProblems.accessBarriers.score * z.population;
  }, 0) / totalPop;
  
  return {
    totalPopulation: totalPop,
    zipCodeCount: bostonZipCodes.length,
    highRiskCount: getHighRiskZips().length,
    averages: {
      asthma: Math.round(avgAsthma * 10) / 10,
      cardiometabolic: Math.round(avgCardiometabolic * 10) / 10,
      accessBarriers: Math.round(avgAccessBarriers * 10) / 10,
    },
  };
};

/**
 * Generate GeoJSON for map visualization
 * Creates realistic polygon approximations for ZIP code boundaries
 * These are larger, more visible polygons that look professional
 */
export const generateZipGeoJSON = () => {
  // Larger, irregular polygons that look more realistic
  // Approximating actual neighborhood shapes
  const zipPolygons: Record<string, [number, number][]> = {
    // Roxbury (02119) - larger area in central Boston
    '02119': [
      [-71.095, 42.335],
      [-71.075, 42.335],
      [-71.075, 42.320],
      [-71.095, 42.320],
      [-71.095, 42.335],
    ],
    // Dorchester (02121) - larger southern area
    '02121': [
      [-71.095, 42.310],
      [-71.070, 42.310],
      [-71.070, 42.285],
      [-71.095, 42.285],
      [-71.095, 42.310],
    ],
    // Jamaica Plain (02130) - western area
    '02130': [
      [-71.125, 42.320],
      [-71.100, 42.320],
      [-71.100, 42.300],
      [-71.125, 42.300],
      [-71.125, 42.320],
    ],
    // Allston (02134) - northern area
    '02134': [
      [-71.145, 42.365],
      [-71.115, 42.365],
      [-71.115, 42.345],
      [-71.145, 42.345],
      [-71.145, 42.365],
    ],
    // Brighton (02135) - western area
    '02135': [
      [-71.170, 42.360],
      [-71.140, 42.360],
      [-71.140, 42.335],
      [-71.170, 42.335],
      [-71.170, 42.360],
    ],
    // Fenway/Kenmore (02215) - central area
    '02215': [
      [-71.115, 42.355],
      [-71.090, 42.355],
      [-71.090, 42.340],
      [-71.115, 42.340],
      [-71.115, 42.355],
    ],
  };
  
  return {
    type: 'FeatureCollection',
    features: bostonZipCodes.map(zip => ({
      type: 'Feature',
      id: zip.zipCode, // Important for layer filtering
      properties: {
        zipCode: zip.zipCode,
        name: zip.name,
        population: zip.population,
        riskLevel: zip.riskLevel,
        asthmaScore: zip.realData.healthProblems.pediatricAsthma.score,
        cardiometabolicScore: zip.realData.healthProblems.cardiometabolic.score,
        accessBarriersScore: zip.realData.healthProblems.accessBarriers.score,
        // For color mapping on the map
        riskValue: 
          zip.riskLevel === 'high' ? 3 :
          zip.riskLevel === 'medium' ? 2 : 1,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [zipPolygons[zip.zipCode] || [
          // Fallback if polygon not defined
          [zip.coordinates[0] - 0.02, zip.coordinates[1] + 0.015],
          [zip.coordinates[0] + 0.02, zip.coordinates[1] + 0.015],
          [zip.coordinates[0] + 0.02, zip.coordinates[1] - 0.015],
          [zip.coordinates[0] - 0.02, zip.coordinates[1] - 0.015],
          [zip.coordinates[0] - 0.02, zip.coordinates[1] + 0.015],
        ]],
      },
    })),
  };
};

// Export the GeoJSON for immediate use
export const bostonZipGeoJSON = generateZipGeoJSON();
