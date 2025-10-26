# Mapbox Integration Guide

## 🗺️ Next Big Step: Add the Interactive Map

The map is the centerpiece of your dashboard. Here's how to integrate it.

---

## Step 1: Get Mapbox API Key

### **Option A: Use Existing Account**
If you already have a Mapbox account:
1. Go to https://account.mapbox.com/
2. Navigate to "Tokens"
3. Copy your default public token
4. **OR** create a new token for this project

### **Option B: Create New Account** (Free)
1. Go to https://account.mapbox.com/auth/signup/
2. Sign up (free tier includes 50,000 map loads/month)
3. Confirm email
4. Copy your default public token

---

## Step 2: Add API Key to Project

Create a `.env` file in the frontend directory:

```bash
# frontend/.env
REACT_APP_MAPBOX_TOKEN=pk.your_token_here
```

**Important:** Make sure `.env` is in your `.gitignore` (it already is!)

---

## Step 3: Install Mapbox Types

```bash
cd frontend
npm install --save-dev @types/mapbox-gl
```

---

## Step 4: Create the BostonMap Component

I'll create this for you, but here's the overview:

**What we'll build:**
- Mapbox GL JS map centered on Boston
- Neighborhood polygons from our mock data
- Color-coded by risk level (red/yellow/green)
- Click handler to select neighborhoods
- Hover tooltips with quick stats
- Zoom controls integration

**Files to create:**
- `src/components/map/BostonMap.tsx` - Main map component
- `src/components/map/mapConfig.ts` - Map configuration
- `src/components/map/NeighborhoodLayer.tsx` - Polygon rendering

---

## Step 5: Quick Implementation Plan

### **Basic Map (30 min):**
```typescript
// Render map centered on Boston
// Add navigation controls
// Set up base style
```

### **Add Neighborhoods (45 min):**
```typescript
// Convert mock data to GeoJSON
// Add source and layer to map
// Style polygons by risk level
```

### **Make Interactive (30 min):**
```typescript
// Click handler → select neighborhood
// Update right panel with details
// Hover effect → highlight + tooltip
```

### **Polish (30 min):**
```typescript
// Smooth zoom transitions
// Legend integration
// Loading states
// Error handling
```

---

## What You'll Get

### **Before (Current):**
```
┌─────────────────────┐
│                     │
│   🗺️ Boston Map    │
│   (Placeholder)     │
│                     │
└─────────────────────┘
```

### **After (With Mapbox):**
```
┌─────────────────────┐
│  [Real Boston Map]  │
│  ┌────┐ Allston     │
│  │🔴🔴│ (Clickable)  │
│  └────┘             │
│     ┌────┐ Roxbury  │
│     │🟡🟡│           │
│     └────┘          │
│  ┌────┐ J.Plain     │
│  │🟢🟢│             │
│  └────┘             │
└─────────────────────┘
```

---

## Example Code Preview

### **mapConfig.ts**
```typescript
export const bostonCenter: [number, number] = [-71.0589, 42.3601];
export const defaultZoom = 12;

export const mapStyle = 'mapbox://styles/mapbox/light-v11';

export const riskColorMap = {
  high: '#dc2626',
  medium: '#f59e0b',
  low: '#10b981',
};
```

### **BostonMap.tsx (simplified)**
```typescript
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

const BostonMap = () => {
  const mapContainer = useRef(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;
    
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-71.0589, 42.3601],
      zoom: 12,
    });
    
    // Add neighborhoods, controls, etc.
    
    return () => map.remove();
  }, []);
  
  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};
```

---

## Alternative: If Mapbox is Too Complex

### **Option B: Use React-Leaflet (Simpler)**
```bash
npm install react-leaflet leaflet
```
- Free, no API key needed
- Easier to learn
- Less fancy but functional

### **Option C: Use SVG (Fastest for Demo)**
- Just use inline SVG polygons
- No external dependencies
- Perfect for hackathon MVP
- Can upgrade later

---

## Troubleshooting

### **Issue: "Mapbox token not found"**
- Check `.env` file exists in `frontend/` directory
- Restart React dev server (`npm start`)
- Verify token starts with `pk.`

### **Issue: "Map is blank"**
- Check browser console for errors
- Verify token is valid
- Check network tab for 401 errors

### **Issue: "Polygons not showing"**
- Verify GeoJSON format
- Check layer is added after map loads
- Use `map.on('load', ...)` callback

---

## Timeline Estimate

| Task | Time | Difficulty |
|------|------|------------|
| Get API key | 5 min | Easy |
| Basic map render | 30 min | Medium |
| Add neighborhoods | 45 min | Medium |
| Click interactions | 30 min | Medium |
| Styling & polish | 30 min | Easy |
| **Total** | **~2.5 hours** | **Medium** |

---

## Demo Impact

### **Without Map:**
"This is a health dashboard..." (looks like every dashboard)

### **With Map:**
"Click Allston and see the 50% higher cancer rate light up in red" 
🤯 **WOW FACTOR**

The map makes your project **memorable** and shows the community-specific focus.

---

## Ready to Build?

Let me know if you want me to:
1. **Implement the Mapbox integration now** (I'll build the BostonMap component)
2. **Start with a simpler SVG approach** (faster for demo)
3. **Show you how to do it yourself** (step-by-step guidance)

The dashboard shell is complete and looking great! 🎉 
The map is the cherry on top that'll make your demo shine. 🗺️✨

