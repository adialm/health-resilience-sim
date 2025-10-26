# React Component Structure

## 🏗️ Component Hierarchy

```
App.tsx
│
├── Layout/
│   ├── Header.tsx
│   │   ├── LocationSelector.tsx
│   │   ├── ScenarioDropdown.tsx
│   │   └── ActionButtons.tsx (Run, Save, Share)
│   │
│   └── MainLayout.tsx
│       ├── LeftPanel.tsx (Scenario Builder)
│       │   ├── InterventionControls.tsx
│       │   │   ├── AddClinicButton.tsx
│       │   │   ├── AddHospitalButton.tsx
│       │   │   └── VaccinationCampaignButton.tsx
│       │   │
│       │   ├── PolicyControls.tsx
│       │   │   ├── HealthcareAccessSlider.tsx
│       │   │   ├── FundingSlider.tsx
│       │   │   └── PollutionToggle.tsx
│       │   │
│       │   ├── EventsPanel.tsx
│       │   │   ├── AddEventButton.tsx
│       │   │   └── EventList.tsx
│       │   │
│       │   └── SimulationSettings.tsx
│       │
│       ├── CenterPanel.tsx (Map)
│       │   ├── MapContainer.tsx
│       │   │   ├── BostonMap.tsx (Mapbox GL)
│       │   │   ├── NeighborhoodLayer.tsx
│       │   │   ├── HeatmapLayer.tsx
│       │   │   ├── InterventionMarkers.tsx
│       │   │   └── MapTooltip.tsx
│       │   │
│       │   ├── MapControls.tsx
│       │   │   ├── LayerToggle.tsx
│       │   │   ├── ZoomControls.tsx
│       │   │   └── MapLegend.tsx
│       │   │
│       │   └── TimelineControl.tsx
│       │       ├── TimelineSlider.tsx
│       │       ├── PlaybackControls.tsx
│       │       └── SpeedSelector.tsx
│       │
│       └── RightPanel.tsx (Metrics & Analysis)
│           ├── MetricsOverview.tsx
│           │   ├── KPICard.tsx (reusable)
│           │   └── ResilienceScore.tsx
│           │
│           ├── SelectedAreaPanel.tsx
│           │   ├── AreaHeader.tsx
│           │   ├── HealthMetricsList.tsx
│           │   └── DemographicInfo.tsx
│           │
│           ├── ChartsSection.tsx
│           │   ├── TrendChart.tsx (Recharts)
│           │   ├── ComparisonBar.tsx
│           │   └── HeatmapChart.tsx
│           │
│           ├── InsightsPanel.tsx
│           │   ├── AIInsightCard.tsx
│           │   └── InsightDetails.tsx
│           │
│           └── RecommendationsPanel.tsx
│               └── RecommendationList.tsx
│
├── Shared/
│   ├── LoadingState.tsx
│   ├── ErrorBoundary.tsx
│   ├── SkeletonLoader.tsx
│   └── EmptyState.tsx
│
└── Modals/
    ├── ConfigureInterventionModal.tsx
    ├── ComparisonModal.tsx
    ├── NeighborhoodDetailModal.tsx
    └── SaveScenarioModal.tsx
```

---

## 📦 Component Responsibilities

### **Top Level**

#### `App.tsx`
- State management provider (Zustand store)
- Theme provider (Material-UI)
- Routing (if needed)
- Global error boundary

---

### **Layout Components**

#### `Header.tsx`
- Fixed top bar
- Platform branding
- Location selector (Boston)
- Scenario management
- Primary actions (Run simulation, Save, Share)

#### `MainLayout.tsx`
- 3-panel responsive grid
- Panel collapse/expand logic
- Responsive breakpoints
- Panel resize handlers (optional)

---

### **Left Panel: Scenario Builder**

#### `InterventionControls.tsx`
- Manages intervention state
- Add/remove interventions
- Drag-to-map functionality
- Intervention list display

#### `PolicyControls.tsx`
- Policy parameter sliders
- Real-time updates to simulation state
- Validation for parameter ranges
- Tooltips with explanations

#### `EventsPanel.tsx`
- Add environmental/social events
- Event timeline management
- Event configuration (severity, duration)

#### `SimulationSettings.tsx`
- Duration selector
- Advanced parameters
- Model configuration
- Reset button

---

### **Center Panel: Interactive Map**

#### `BostonMap.tsx` ⭐ CORE COMPONENT
- Mapbox GL JS integration
- Neighborhood polygons
- Click handlers
- Hover states
- Zoom/pan controls

#### `NeighborhoodLayer.tsx`
- Renders neighborhood boundaries
- Choropleth coloring based on data
- Click events for selection
- Styling based on active metrics

#### `HeatmapLayer.tsx`
- Toggleable overlay layers
- Heat intensity calculations
- Smooth color gradients
- Layer switching animations

#### `InterventionMarkers.tsx`
- Display intervention locations
- Custom icons (clinic, hospital, etc.)
- Markers update based on scenario
- Click handlers for editing

#### `TimelineControl.tsx`
- Time scrubber
- Playback controls (play/pause)
- Speed control
- Current year display
- Animation loop logic

---

### **Right Panel: Metrics & Analysis**

#### `MetricsOverview.tsx`
- Grid of KPI cards
- Real-time metric updates
- Comparison with baseline
- Trend indicators (up/down arrows)

#### `KPICard.tsx` (Reusable)
**Props:** `{ title, value, change, icon, trend }`
- Displays single metric
- Shows change vs baseline
- Color coding for positive/negative
- Click to drill down

#### `SelectedAreaPanel.tsx`
- Shows when neighborhood clicked
- Area-specific metrics
- Demographics
- Health disparities
- "Add intervention here" button

#### `ChartsSection.tsx`
- Container for multiple charts
- Chart type selector
- Data filtering
- Export chart functionality

#### `TrendChart.tsx`
- Line chart using Recharts
- Time series data
- Multiple series (baseline vs scenario)
- Responsive sizing

#### `InsightsPanel.tsx`
- AI-generated insights
- Impact predictions
- Confidence indicators
- "Learn more" expandable sections

#### `RecommendationsPanel.tsx`
- Optimization results
- Ranked interventions
- Cost-benefit display
- One-click apply recommendations

---

### **Shared Components**

#### `LoadingState.tsx`
- Skeleton screens
- Loading animations
- Progress indicators

#### `ErrorBoundary.tsx`
- Catches React errors
- Displays fallback UI
- Error reporting

---

### **Modals/Dialogs**

#### `ConfigureInterventionModal.tsx`
**Opens when:** User adds clinic/hospital
**Contains:**
- Location confirmation
- Capacity slider
- Specialty selection
- Cost estimate
- Save/Cancel buttons

#### `ComparisonModal.tsx`
**Opens when:** User clicks "Compare Scenarios"
**Contains:**
- Scenario selector
- Split-screen view
- Difference highlights
- Export comparison

#### `NeighborhoodDetailModal.tsx`
**Opens when:** User clicks "View Details" on neighborhood
**Contains:**
- Full demographic breakdown
- Historical trends
- Contributing factors
- Related research/sources

---

## 🗂️ Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.styles.ts
│   │   │   ├── LocationSelector.tsx
│   │   │   ├── ScenarioDropdown.tsx
│   │   │   └── ActionButtons.tsx
│   │   │
│   │   └── MainLayout/
│   │       ├── MainLayout.tsx
│   │       ├── MainLayout.styles.ts
│   │       ├── LeftPanel.tsx
│   │       ├── CenterPanel.tsx
│   │       └── RightPanel.tsx
│   │
│   ├── map/
│   │   ├── BostonMap/
│   │   │   ├── BostonMap.tsx
│   │   │   ├── BostonMap.styles.ts
│   │   │   └── mapConfig.ts
│   │   ├── layers/
│   │   │   ├── NeighborhoodLayer.tsx
│   │   │   ├── HeatmapLayer.tsx
│   │   │   └── InterventionMarkers.tsx
│   │   ├── controls/
│   │   │   ├── MapControls.tsx
│   │   │   ├── LayerToggle.tsx
│   │   │   └── MapLegend.tsx
│   │   └── timeline/
│   │       ├── TimelineControl.tsx
│   │       └── PlaybackControls.tsx
│   │
│   ├── scenario/
│   │   ├── InterventionControls/
│   │   │   ├── InterventionControls.tsx
│   │   │   ├── AddClinicButton.tsx
│   │   │   └── AddHospitalButton.tsx
│   │   ├── PolicyControls/
│   │   │   ├── PolicyControls.tsx
│   │   │   └── PolicySlider.tsx
│   │   └── EventsPanel/
│   │       ├── EventsPanel.tsx
│   │       └── EventList.tsx
│   │
│   ├── metrics/
│   │   ├── MetricsOverview/
│   │   │   ├── MetricsOverview.tsx
│   │   │   └── KPICard.tsx
│   │   ├── SelectedAreaPanel/
│   │   │   └── SelectedAreaPanel.tsx
│   │   └── charts/
│   │       ├── TrendChart.tsx
│   │       ├── ComparisonBar.tsx
│   │       └── HeatmapChart.tsx
│   │
│   ├── insights/
│   │   ├── InsightsPanel.tsx
│   │   └── RecommendationsPanel.tsx
│   │
│   ├── modals/
│   │   ├── ConfigureInterventionModal.tsx
│   │   ├── ComparisonModal.tsx
│   │   └── NeighborhoodDetailModal.tsx
│   │
│   └── shared/
│       ├── LoadingState.tsx
│       ├── ErrorBoundary.tsx
│       ├── SkeletonLoader.tsx
│       └── EmptyState.tsx
│
├── store/
│   ├── index.ts (Zustand store)
│   ├── scenarioSlice.ts
│   ├── mapSlice.ts
│   └── simulationSlice.ts
│
├── hooks/
│   ├── useSimulation.ts
│   ├── useMapInteraction.ts
│   └── useScenarioBuilder.ts
│
├── services/
│   ├── api.ts (Axios setup)
│   ├── simulationService.ts
│   └── dataService.ts
│
├── types/
│   ├── scenario.types.ts
│   ├── health.types.ts
│   └── geography.types.ts
│
├── utils/
│   ├── calculations.ts
│   ├── formatting.ts
│   └── colors.ts
│
├── constants/
│   ├── mapConfig.ts
│   ├── healthMetrics.ts
│   └── interventionTypes.ts
│
├── theme/
│   ├── theme.ts (MUI theme)
│   └── colors.ts
│
├── assets/
│   ├── icons/
│   └── images/
│
├── App.tsx
└── index.tsx
```

---

## 🎯 Development Order (Suggested)

### **Phase 1: Shell (Day 1)**
1. `App.tsx` + basic routing
2. `MainLayout.tsx` with 3-panel grid
3. `Header.tsx` with mock buttons
4. Empty panel placeholders
5. Theme setup (MUI)

### **Phase 2: Map Core (Day 1-2)**
6. `BostonMap.tsx` with Mapbox
7. Mock GeoJSON neighborhoods
8. `NeighborhoodLayer.tsx` with hover
9. `MapControls.tsx` (zoom, layers)
10. Click handlers

### **Phase 3: Scenario Builder (Day 2)**
11. `InterventionControls.tsx`
12. `PolicyControls.tsx` with sliders
13. State management (Zustand)
14. Panel interactions

### **Phase 4: Metrics Panel (Day 2-3)**
15. `KPICard.tsx` components
16. `MetricsOverview.tsx` layout
17. Mock data display
18. `TrendChart.tsx` basic chart

### **Phase 5: Connect Everything (Day 3)**
19. API service setup
20. Connect scenario → map updates
21. Connect map click → metrics update
22. Run simulation button logic

### **Phase 6: Polish (Day 3)**
23. Loading states
24. Error handling
25. Responsive tweaks
26. Animations

---

## 📊 Data Flow

```
User Action (Add Clinic)
    ↓
Update Zustand Store (scenarioSlice)
    ↓
Trigger Map Re-render
    ↓
Show Clinic Marker
    ↓
Update Metrics Panel (Predicted Impact)
    ↓
"Run Simulation" Button Enabled
    ↓
User Clicks "Run Simulation"
    ↓
POST /api/simulation/run
    ↓
Show Loading State
    ↓
Receive Results
    ↓
Update All Panels
    ↓
Animate Changes
```

---

## 🔧 Key Technologies per Component

| Component | Primary Tech | Secondary |
|-----------|-------------|-----------|
| `BostonMap.tsx` | Mapbox GL JS | GeoJSON |
| `TrendChart.tsx` | Recharts | D3 (if needed) |
| `PolicySlider.tsx` | MUI Slider | - |
| `KPICard.tsx` | MUI Card | Framer Motion |
| State Management | Zustand | - |
| Styling | MUI sx prop | Emotion |
| API Calls | Axios | - |
| Forms | react-hook-form | - |

---

## 🎨 Styling Approach

**Option 1: MUI `sx` prop (Recommended for hackathon)**
```tsx
<Box sx={{ p: 3, bgcolor: 'background.paper' }}>
  Content
</Box>
```
- Fast
- Consistent with theme
- No separate files

**Option 2: Styled Components (If team prefers)**
```tsx
const StyledCard = styled(Card)`
  padding: 24px;
  background: white;
`;
```

**Recommendation:** Use `sx` prop for speed, can refactor later.

---

## 🚀 Props & TypeScript

### Example: KPICard Component

```typescript
// types/metrics.types.ts
export interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  onClick?: () => void;
}

// components/metrics/KPICard.tsx
import { KPICardProps } from '../../types/metrics.types';

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  change,
  trend,
  icon,
  onClick
}) => {
  // Component implementation
};
```

---

## 🎯 Component Reusability

### **Highly Reusable:**
- `KPICard` - Use everywhere
- `PolicySlider` - Reuse for all parameters
- `LoadingState` - Use in all async operations
- `TrendChart` - Reuse for different metrics

### **Specific (Less Reusable):**
- `BostonMap` - Specific to this app
- `TimelineControl` - Specific to simulation
- `InterventionMarkers` - Specific to scenario building

---

## 🧪 Testing Strategy

**Priority for Hackathon:**
- Smoke tests (components render without crashing)
- Critical user flows (add clinic → run simulation)

**Post-Hackathon:**
- Unit tests for calculations
- Integration tests for API calls
- E2E tests for key scenarios

---

This structure is modular, scalable, and hackathon-friendly! 🚀

