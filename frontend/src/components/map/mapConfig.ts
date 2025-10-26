import { colors } from '../../theme/theme';

// Boston center coordinates
export const bostonCenter: [number, number] = [-71.0589, 42.3601];

// Default zoom level
export const defaultZoom = 11.5;

// Mapbox style - light theme
export const mapStyle = 'mapbox://styles/mapbox/light-v11';

// Risk level color mapping
export const riskColorMap = {
  high: colors.risk.high,
  medium: colors.risk.medium,
  low: colors.risk.low,
};

// Map configuration options
export const mapConfig = {
  center: bostonCenter,
  zoom: defaultZoom,
  style: mapStyle,
  attributionControl: true,
  logoPosition: 'bottom-right' as const,
};

// Layer IDs
export const LAYER_IDS = {
  NEIGHBORHOODS: 'neighborhoods',
  NEIGHBORHOODS_OUTLINE: 'neighborhoods-outline',
  NEIGHBORHOODS_HOVER: 'neighborhoods-hover',
  INTERVENTIONS: 'interventions',
  HEATMAP: 'heatmap',
  ZIP_BOUNDARIES: 'zip-boundaries',
  ZIP_INTERACTION: 'zip-interaction', // Invisible layer for mouse events
};

// Source IDs
export const SOURCE_IDS = {
  NEIGHBORHOODS: 'neighborhoods-source',
  INTERVENTIONS: 'interventions-source',
  HEATMAP: 'heatmap-source',
};

