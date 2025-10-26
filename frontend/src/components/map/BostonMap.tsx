import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Typography, Alert, ToggleButtonGroup, ToggleButton, Paper } from '@mui/material';
import { useStore } from '../../store';
import { mockNeighborhoods } from '../../constants/mockData';
import { bostonZipCodes } from '../../constants/zipCodeData';
import { 
  neighborhoodsToGeoJSON, 
  neighborhoodsToHeatmapGeoJSON,
} from '../../utils/geoJsonUtils';
import { mapConfig, SOURCE_IDS, LAYER_IDS } from './mapConfig';

interface BostonMapProps {
  onMapReady?: (isReady: boolean) => void;
}

type MapMode = 'heatmap' | 'boundaries';

const BostonMap: React.FC<BostonMapProps> = ({ onMapReady }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapMode, setMapMode] = useState<MapMode>('heatmap'); // Start with smooth heatmap
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Use refs to access current values in event handlers
  const placementModeRef = useRef<'clinic' | 'hospital' | 'vaccination' | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  
  const { 
    setSelectedNeighborhood, 
    mapLayers, 
    currentScenario,
    placementMode,
    setPlacementMode,
    addIntervention,
  } = useStore();

  // Update ref whenever placementMode changes
  useEffect(() => {
    placementModeRef.current = placementMode;
  }, [placementMode]);

  useEffect(() => {
    // Check for Mapbox token
    const token = process.env.REACT_APP_MAPBOX_TOKEN;
    
    if (!token || token === 'YOUR_MAPBOX_TOKEN_HERE' || token === 'pk.your_mapbox_token_here') {
      setMapError('Mapbox token not configured. Please add REACT_APP_MAPBOX_TOKEN to your .env file.');
      if (onMapReady) onMapReady(false);
      return;
    }

    if (!mapContainer.current) return;
    if (map.current) return; // Initialize map only once

    try {
      mapboxgl.accessToken = token;

      // Create map instance
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapConfig.style,
        center: mapConfig.center,
        zoom: mapConfig.zoom,
        attributionControl: mapConfig.attributionControl,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');

      // Wait for map to load
      map.current.on('load', () => {
        if (!map.current) return;
        
        // Notify parent that map is ready
        if (onMapReady) onMapReady(true);
        setMapLoaded(true);

        // Use mockNeighborhoods for beautiful visualization (organic shapes, stays on land)
        // Filter out areas where we don't have real data (Cambridge, South End)
        const filteredNeighborhoods = mockNeighborhoods.filter(n => 
          n.name !== 'Cambridge' && n.name !== 'South End'
        );
        
        // We'll overlay real ZIP data in popups and metrics
        const neighborhoodsGeoJSON = neighborhoodsToGeoJSON(filteredNeighborhoods);
        const heatmapGeoJSON = neighborhoodsToHeatmapGeoJSON(filteredNeighborhoods);

        // Add source for neighborhoods (polygons with realistic shapes)
        map.current.addSource(SOURCE_IDS.NEIGHBORHOODS, {
          type: 'geojson',
          data: neighborhoodsGeoJSON,
        });

        // Add source for heatmap (dense points for smooth gradient)
        map.current.addSource(SOURCE_IDS.HEATMAP, {
          type: 'geojson',
          data: heatmapGeoJSON,
        });

        // Add heatmap layer (smooth, organic visualization) - visible by default
        map.current.addLayer({
          id: LAYER_IDS.HEATMAP,
          type: 'heatmap',
          source: SOURCE_IDS.HEATMAP,
          paint: {
            // Increase weight as health risk increases
            'heatmap-weight': ['get', 'weight'],
            
            // Increase intensity for better visibility
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10, 1.2,
              15, 2.5,
            ],
            
            // Color ramp: Green (low risk) → Yellow (medium) → Red (high risk)
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(0, 0, 0, 0)',           // transparent
              0.1, 'rgba(16, 185, 129, 0.3)',  // green (low risk) - subtle
              0.3, 'rgba(16, 185, 129, 0.6)',  // green - more visible
              0.5, 'rgba(245, 158, 11, 0.7)',  // yellow/orange (medium)
              0.7, 'rgba(249, 115, 22, 0.85)', // orange
              0.9, 'rgba(220, 38, 38, 0.9)',   // red (high risk)
              1, 'rgba(153, 27, 27, 1)',       // dark red
            ],
            
            // Larger radius for smoother gradient
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10, 25,
              12, 35,
              15, 50,
            ],
            
            // Overall opacity
            'heatmap-opacity': 0.7,
          },
          layout: {
            'visibility': 'visible', // Start visible (heatmap mode is default)
          },
        });

        // Add invisible interaction layer (always visible, for mouse events)
        map.current.addLayer({
          id: LAYER_IDS.ZIP_INTERACTION,
          type: 'fill',
          source: SOURCE_IDS.NEIGHBORHOODS,
          paint: {
            'fill-color': '#000000',
            'fill-opacity': 0, // Completely invisible
          },
        });

        // Add subtle ZIP boundaries layer (always visible)
        map.current.addLayer({
          id: LAYER_IDS.ZIP_BOUNDARIES,
          type: 'line',
          source: SOURCE_IDS.NEIGHBORHOODS,
          paint: {
            'line-color': '#ffffff',
            'line-width': 1.5,
            'line-opacity': 0.4,
          },
        });

        // Add fill layer for neighborhoods (hidden by default, for boundaries mode)
        map.current.addLayer({
          id: LAYER_IDS.NEIGHBORHOODS,
          type: 'fill',
          source: SOURCE_IDS.NEIGHBORHOODS,
          paint: {
            'fill-color': [
              'match',
              ['get', 'riskLevel'],
              'high', '#dc2626',
              'medium', '#f59e0b',
              'low', '#10b981',
              '#94a3b8' // default
            ],
            'fill-opacity': 0.35,
          },
          layout: {
            'visibility': 'none', // Start hidden (heatmap mode is default)
          },
        });

        // Add outline layer for neighborhoods (hidden by default, for boundaries mode)
        map.current.addLayer({
          id: LAYER_IDS.NEIGHBORHOODS_OUTLINE,
          type: 'line',
          source: SOURCE_IDS.NEIGHBORHOODS,
          paint: {
            'line-color': [
              'match',
              ['get', 'riskLevel'],
              'high', '#dc2626',
              'medium', '#f59e0b',
              'low', '#10b981',
              '#94a3b8' // default
            ],
            'line-width': 3,
            'line-opacity': 0.8,
          },
          layout: {
            'visibility': 'none', // Start hidden (heatmap mode is default)
          },
        });

        // Add hover layer
        map.current.addLayer({
          id: LAYER_IDS.NEIGHBORHOODS_HOVER,
          type: 'line',
          source: SOURCE_IDS.NEIGHBORHOODS,
          paint: {
            'line-color': '#3b82f6',
            'line-width': 4,
            'line-opacity': 1,
          },
          filter: ['==', 'id', ''],
        });

        // Change cursor based on mode
        map.current.on('mouseenter', LAYER_IDS.ZIP_INTERACTION, () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = placementModeRef.current ? 'crosshair' : 'pointer';
          }
        });

        map.current.on('mouseleave', LAYER_IDS.ZIP_INTERACTION, () => {
          if (map.current) map.current.getCanvas().style.cursor = '';
        });

        // Handle hover with single popup
        let hoveredNeighborhoodId: string | null = null;
        let currentPopup: mapboxgl.Popup | null = null;

        map.current.on('mousemove', LAYER_IDS.ZIP_INTERACTION, (e) => {
          if (!map.current || !e.features || e.features.length === 0) return;

          if (hoveredNeighborhoodId) {
            map.current.setFilter(LAYER_IDS.NEIGHBORHOODS_HOVER, ['==', 'id', '']);
          }

          hoveredNeighborhoodId = e.features[0].id as string;
          map.current.setFilter(LAYER_IDS.NEIGHBORHOODS_HOVER, [
            '==',
            'id',
            hoveredNeighborhoodId,
          ]);

          // Remove any existing popup first
          if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
          }

          // Show popup on hover
          const feature = e.features[0];
          const coordinates = e.lngLat;
          const properties = feature.properties;

          if (properties) {
            // Map neighborhood to real ZIP data for accurate health metrics
            const neighborhoodName = properties.name;
            
            // Try to find matching real ZIP data
            // (This maps mock neighborhood names to real ZIP codes)
            const nameToZip: Record<string, string> = {
              'Roxbury': '02119',
              'Dorchester': '02121',
              'Jamaica Plain': '02130',
              'Allston': '02134',
              'Brighton': '02135',
              'Fenway': '02215',
              'Back Bay': '02215', // Also Fenway/Kenmore
            };
            
            const matchedZip = nameToZip[neighborhoodName];
            const realZipData = matchedZip ? bostonZipCodes.find(z => z.zipCode === matchedZip) : null;
            
            // Use real data if available, otherwise fallback to mock data
            const displayData = realZipData ? {
              name: `${neighborhoodName} (${matchedZip})`,
              riskLevel: realZipData.riskLevel,
              asthma: realZipData.realData.healthProblems.pediatricAsthma.score,
              cardiometabolic: realZipData.realData.healthProblems.cardiometabolic.score,
              accessBarriers: realZipData.realData.healthProblems.accessBarriers.score,
              population: realZipData.population,
              isReal: true,
              message: null,
            } : {
              name: neighborhoodName,
              riskLevel: properties.riskLevel || 'medium',
              asthma: properties.cancerRate ? Math.round(properties.cancerRate / 20) : 12,
              cardiometabolic: properties.cancerRate ? Math.round(properties.cancerRate / 15) : 20,
              accessBarriers: properties.accessScore || 8,
              population: properties.population || 10000,
              isReal: false,
              message: '(Estimated data)',
            };
            
            // Determine risk level styling
            const riskColors: Record<string, string> = {
              high: '#dc2626',
              medium: '#f59e0b',
              low: '#10b981',
              unknown: '#64748b',
            };
            const riskColor = riskColors[displayData.riskLevel] || '#64748b';
            const riskLabel = displayData.riskLevel.toUpperCase();
            
            currentPopup = new mapboxgl.Popup({ 
              closeButton: false, 
              closeOnClick: false,
              maxWidth: '340px'
            })
              .setLngLat(coordinates)
              .setHTML(
                `
                <div style="padding: 14px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #1e293b;">${displayData.name}</h4>
                    <span style="padding: 2px 8px; font-size: 11px; font-weight: 600; color: white; background: ${riskColor}; border-radius: 4px;">${riskLabel}</span>
                  </div>
                  ${displayData.isReal 
                    ? '<div style="font-size: 11px; color: #10b981; margin-bottom: 8px;">✓ Real Census Data</div>' 
                    : `<div style="font-size: 11px; color: #94a3b8; margin-bottom: 8px; font-style: italic;">${displayData.message}</div>`
                  }
                  <div style="font-size: 13px; color: #475569; line-height: 1.8;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                      <span>🫁 Asthma:</span>
                      <strong>${typeof displayData.asthma === 'number' ? displayData.asthma.toFixed(1) + '%' : displayData.asthma}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                      <span>❤️ Cardiometabolic:</span>
                      <strong>${typeof displayData.cardiometabolic === 'number' ? displayData.cardiometabolic.toFixed(1) + '%' : displayData.cardiometabolic}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                      <span>🏥 Access Barriers:</span>
                      <strong>${typeof displayData.accessBarriers === 'number' ? displayData.accessBarriers.toFixed(1) + '%' : displayData.accessBarriers}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding-top: 6px; border-top: 1px solid #e2e8f0;">
                      <span>👥 Population:</span>
                      <strong>${typeof displayData.population === 'number' ? displayData.population.toLocaleString() : displayData.population}</strong>
                    </div>
                  </div>
                </div>
              `
              )
              .addTo(map.current);
          }
        });

        // Clean up popup on mouse leave
        map.current.on('mouseleave', LAYER_IDS.ZIP_INTERACTION, () => {
          if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
          }
          if (map.current) {
            map.current.setFilter(LAYER_IDS.NEIGHBORHOODS_HOVER, ['==', 'id', '']);
          }
        });

        // Handle click for interventions or neighborhood selection
        map.current.on('click', (e) => {
          if (!map.current) return;

          // If in placement mode, add intervention (use ref to get current value)
          const currentPlacementMode = placementModeRef.current;
          
          if (currentPlacementMode) {
            const lngLat = e.lngLat;
            
            // Find which neighborhood was clicked
            const features = map.current.queryRenderedFeatures(e.point, {
              layers: [LAYER_IDS.ZIP_INTERACTION],
            });

            const neighborhoodId = features.length > 0 && features[0].properties 
              ? features[0].properties.id 
              : 'unknown';

            // Create intervention
            const intervention = {
              id: `${currentPlacementMode}-${Date.now()}`,
              type: currentPlacementMode as any,
              name: `${currentPlacementMode.charAt(0).toUpperCase() + currentPlacementMode.slice(1)} ${Date.now()}`,
              location: {
                neighborhoodId: neighborhoodId,
                coordinates: [lngLat.lng, lngLat.lat] as [number, number],
              },
              parameters: {
                capacity: currentPlacementMode === 'hospital' ? 100 : currentPlacementMode === 'clinic' ? 50 : 1000,
                cost: currentPlacementMode === 'hospital' ? 5000000 : currentPlacementMode === 'clinic' ? 500000 : 100000,
              },
            };

            addIntervention(intervention);
            setPlacementMode(null); // Exit placement mode after placing
            return;
          }

          // Otherwise, handle neighborhood selection
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: [LAYER_IDS.ZIP_INTERACTION],
          });

          if (features.length === 0) return;

          const feature = features[0];
          const neighborhoodId = feature.id as string;

          // Find the neighborhood data (excluding areas without real data)
          const filteredNeighborhoods = mockNeighborhoods.filter(n => 
            n.name !== 'Cambridge' && n.name !== 'South End'
          );
          const neighborhood = filteredNeighborhoods.find((n) => n.id === neighborhoodId);
          if (neighborhood) {
            setSelectedNeighborhood(neighborhood);
          }

          // Fly to the neighborhood
          if (map.current && feature.properties) {
            const coordinates = feature.geometry.type === 'Polygon' 
              ? feature.geometry.coordinates[0][0]
              : [feature.properties.lng, feature.properties.lat];
            
            map.current.flyTo({
              center: coordinates as [number, number],
              zoom: 13,
              duration: 1000,
            });
          }
        });
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your Mapbox token.');
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle map mode toggle
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    if (mapMode === 'heatmap') {
      map.current.setLayoutProperty(LAYER_IDS.HEATMAP, 'visibility', 'visible');
      map.current.setLayoutProperty(LAYER_IDS.NEIGHBORHOODS, 'visibility', 'none');
      map.current.setLayoutProperty(LAYER_IDS.NEIGHBORHOODS_OUTLINE, 'visibility', 'none');
    } else {
      map.current.setLayoutProperty(LAYER_IDS.HEATMAP, 'visibility', 'none');
      map.current.setLayoutProperty(LAYER_IDS.NEIGHBORHOODS, 'visibility', 'visible');
      map.current.setLayoutProperty(LAYER_IDS.NEIGHBORHOODS_OUTLINE, 'visibility', 'visible');
    }
  }, [mapMode, mapLoaded]);

  // Update cursor based on placement mode
  useEffect(() => {
    if (!map.current) return;
    
    if (placementMode) {
      map.current.getCanvas().style.cursor = 'crosshair';
    } else {
      map.current.getCanvas().style.cursor = '';
    }
  }, [placementMode]);

  // Update map layers based on toggle state
  useEffect(() => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    // TODO: Implement layer visibility toggles
    // This will be used to show/hide different data overlays
  }, [mapLayers]);

  // Update interventions when scenario changes using DOM markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    const interventions = currentScenario?.interventions || [];

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Helper to get emoji for intervention type
    const getEmoji = (type: string) => {
      switch (type) {
        case 'clinic': return '⚕️';
        case 'hospital': return '🏥';
        case 'vaccination': return '💉';
        default: return '📍';
      }
    };

    // Create new markers for each intervention
    interventions.forEach((intervention) => {
      // Create custom HTML element for the marker
      const el = document.createElement('div');
      el.className = 'intervention-marker';
      el.innerHTML = getEmoji(intervention.type);
      el.style.fontSize = '28px';
      el.style.cursor = 'pointer';
      el.style.textShadow = '0 0 3px white, 0 0 6px white';
      el.style.userSelect = 'none';
      
      // Create popup
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: false,
      }).setHTML(`
        <div style="padding: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <strong>${intervention.name}</strong><br/>
          <span style="color: #64748b; font-size: 12px;">${intervention.type}</span>
        </div>
      `);

      // Create and add marker
      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'center',
      })
        .setLngLat(intervention.location.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    // Cleanup function
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [currentScenario, mapLoaded]);

  // Handle mode change
  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: MapMode | null) => {
    if (newMode !== null) {
      setMapMode(newMode);
    }
  };

  // Show error state if Mapbox token is missing
  if (mapError) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          bgcolor: '#e8f4f8',
        }}
      >
        <Box sx={{ maxWidth: 500 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            {mapError}
          </Alert>
          <Typography variant="body2" gutterBottom>
            <strong>To get a Mapbox token:</strong>
          </Typography>
          <Typography variant="body2" component="ol" sx={{ pl: 2 }}>
            <li>Go to <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noopener noreferrer">mapbox.com/signup</a></li>
            <li>Sign up for a free account</li>
            <li>Copy your access token</li>
            <li>Create a <code>.env</code> file in the frontend directory</li>
            <li>Add: <code>REACT_APP_MAPBOX_TOKEN=your_token_here</code></li>
            <li>Restart the development server</li>
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map Mode Toggle */}
      <Paper
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1,
          padding: 1,
        }}
      >
        <ToggleButtonGroup
          value={mapMode}
          exclusive
          onChange={handleModeChange}
          size="small"
          aria-label="map visualization mode"
        >
          <ToggleButton value="heatmap" aria-label="heatmap mode">
            🔥 Heat Map
          </ToggleButton>
          <ToggleButton value="boundaries" aria-label="boundaries mode">
            📍 Boundaries
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      <Box
        ref={mapContainer}
        sx={{
          width: '100%',
          height: '100%',
          '& .mapboxgl-popup-content': {
            padding: 0,
            borderRadius: 1,
          },
          '& .mapboxgl-popup-anchor-top .mapboxgl-popup-tip': {
            borderBottomColor: 'white',
          },
          '& .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': {
            borderTopColor: 'white',
          },
        }}
      />
    </Box>
  );
};

export default BostonMap;
