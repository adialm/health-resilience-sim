# Interactive Intervention Placement Feature

## Overview
Users can now click buttons in the left panel to activate "placement mode" and then click on the map to drop intervention markers (clinics, hospitals, vaccination campaigns).

## Features Implemented

### 1. **State Management** (`store/index.ts`)
- Added `placementMode` state to track active intervention type
- Added `setPlacementMode()` action
- Existing intervention actions already support add/remove

### 2. **Left Panel** (`components/layout/LeftPanel.tsx`)
- ✅ Buttons highlight when placement mode is active
- ✅ Alert message appears: "Click on the map to place [intervention]"
- ✅ List of active interventions with delete buttons
- ✅ Shows count of interventions
- ✅ Icons for each intervention type (⚕️ 🏥 💉)

### 3. **Map Component** (`components/map/BostonMap.tsx`)
- ✅ Crosshair cursor when in placement mode
- ✅ Click handler creates intervention at clicked location
- ✅ Detects which ZIP code was clicked
- ✅ Exits placement mode after placing
- ✅ Visual markers with color-coded circles:
  - 🟢 Green = Clinic
  - 🔴 Red = Hospital
  - 🔵 Blue = Vaccination
- ✅ Emoji icons overlay on circles
- ✅ Hover tooltips on markers
- ✅ Markers update in real-time as interventions are added/removed

## How to Use

1. **Activate Placement Mode:**
   - Click "Add Clinic", "Add Hospital", or "Vaccination Campaign" in left panel
   - Button will highlight blue
   - Alert appears: "Click on the map to place..."
   - Cursor changes to crosshair

2. **Place Intervention:**
   - Click anywhere on the map
   - Marker appears instantly
   - Intervention is added to the list in left panel
   - Placement mode automatically deactivates

3. **Remove Intervention:**
   - Find the intervention in the left panel list
   - Click the trash icon
   - Marker disappears from map

4. **View Details:**
   - Hover over any marker to see its name and type

## Next Steps (Not Yet Implemented)

- [ ] Connect interventions to simulation logic
- [ ] Show impact calculations in right panel
- [ ] Add intervention details modal on click
- [ ] Limit interventions per ZIP code
- [ ] Add cost tracking for budget constraints
- [ ] Persist interventions to backend
- [ ] Add edit/move functionality
- [ ] Add intervention range/coverage circles

## Technical Details

**Data Structure:**
```typescript
{
  id: "clinic-1234567890",
  type: "clinic",
  name: "Clinic 1234567890",
  location: {
    neighborhoodId: "02118",
    coordinates: [-71.0589, 42.3601]
  },
  parameters: {
    capacity: 50,
    cost: 500000
  }
}
```

**Map Layers:**
- `interventions`: Circle layer with color-coded markers
- `interventions-icons`: Symbol layer with emoji icons

**Performance:**
- Real-time updates using Zustand reactive state
- Efficient GeoJSON source updates
- No page reloads required

