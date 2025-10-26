# Health Resilience Simulation Dashboard - Design Plan

## 🎯 Vision Statement
A command-center style dashboard that lets users explore Boston community health data, build intervention scenarios, run simulations, and visualize impacts on health equity and resilience.

---

## 📐 Layout Structure

### **Main Layout: 3-Panel Design**

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Societal Health Resilience Simulation Platform     │
│  [Boston, MA] [Scenario: Baseline] [Run Simulation]         │
├──────────┬────────────────────────────────┬─────────────────┤
│          │                                │                 │
│  LEFT    │         CENTER MAP             │  RIGHT PANEL    │
│  PANEL   │      (Interactive Boston)      │  (Metrics/Data) │
│          │                                │                 │
│ Scenario │  ┌──────────────────────────┐  │ ┌─────────────┐ │
│ Builder  │  │                          │  │ │Health Metrics│ │
│          │  │   [Boston Neighborhoods] │  │ │             │ │
│ • Add    │  │                          │  │ │ Cancer Rate │ │
│   Clinic │  │   [Heat map overlays]    │  │ │ Mortality   │ │
│ • Policy │  │                          │  │ │ Access Score│ │
│ • Event  │  │   [Click neighborhoods]  │  │ └─────────────┘ │
│          │  │                          │  │                 │
│          │  └──────────────────────────┘  │ ┌─────────────┐ │
│          │                                │ │  Charts     │ │
│          │  Timeline: [========>    ]     │ │             │ │
│          │  2024 ─────────────────> 2030  │ │ [Trend Line]│ │
│          │                                │ └─────────────┘ │
└──────────┴────────────────────────────────┴─────────────────┘
```

---

## 🎨 Visual References & Inspiration

### **1. Johns Hopkins COVID-19 Dashboard**
**Reference:** https://coronavirus.jhu.edu/map.html
- **What to borrow:** 
  - Large central map as focal point
  - Clean metric cards with big numbers
  - Color-coded geographic visualization
  - Simple, professional dark theme option
- **What to adapt:**
  - Make it more interactive (they're mostly view-only)
  - Add scenario building controls
  - More chart variety

### **2. Urban Institute's Health Policy Center Tools**
**Reference:** Urban Institute interactive data tools
- **What to borrow:**
  - Accessible color schemes (colorblind-friendly)
  - Clear data storytelling
  - Toggle switches for different scenarios
  - Before/after comparison views
- **What to adapt:**
  - More real-time simulation feel
  - Gaming-style interactivity

### **3. SimCity / City Skylines (Game UX)**
**Reference:** City simulation games
- **What to borrow:**
  - Layered overlays (toggle pollution, income, health)
  - Placement tools (add hospitals, clinics)
  - Resource meters (hospital capacity, funding)
  - Visual feedback when hovering over areas
- **What to adapt:**
  - Serious health data instead of game aesthetics
  - Evidence-based outcomes

### **4. Tableau Public Health Dashboards**
**Reference:** Tableau health equity dashboards
- **What to borrow:**
  - Multiple linked charts
  - Filter controls
  - Drill-down capabilities
  - Export/share features
- **What to adapt:**
  - Add simulation/prediction capability
  - More interactive scenario building

### **5. FloodMap / Climate Risk Visualizations**
**Reference:** Climate Central's sea level rise maps
- **What to borrow:**
  - Slider for time progression
  - Overlay scenarios
  - Geographic specificity
  - "What if" scenarios

---

## 📦 Component Breakdown

### **HEADER BAR**
```
┌─────────────────────────────────────────────────────────────┐
│ 🏥 Health Resilience Simulator          [Boston, MA ▾]      │
│                                                              │
│ Scenario: [Current: Baseline ▾]  [▶ Run Simulation] [Save] │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Platform title/logo
- Location selector (Boston focus, but scalable)
- Current scenario name (dropdown to switch)
- Primary action: Run Simulation button (prominent, colored)
- Save/Load/Share buttons
- Settings/Help icons

---

### **LEFT PANEL: Scenario Builder** (300-350px wide)

```
┌────────────────────┐
│ 🎛️ SCENARIO BUILDER│
├────────────────────┤
│                    │
│ 📍 Add Interventions│
│  ┌──────────────┐  │
│  │ + Add Clinic │  │
│  │ + Add Hospital│ │
│  │ + Vaccination│  │
│  │   Campaign   │  │
│  └──────────────┘  │
│                    │
│ 📊 Policy Changes  │
│  • Healthcare     │
│    Access         │
│    ▄▄▄▄▄▄░░░ 60% │
│                    │
│  • Funding        │
│    $$ ▄▄▄▄░░░░░  │
│                    │
│ 🌍 Environmental   │
│  • Pollution      │
│    Control        │
│    [Toggle: ON]   │
│                    │
│ 📅 Events          │
│  [+ Add Event]    │
│  • Flood (2026)   │
│  • Heat Wave      │
│                    │
│ ⚙️ Simulation      │
│  Duration: 5 yrs  │
│  [Advanced ▾]     │
│                    │
│ [Clear All]       │
└────────────────────┘
```

**Features:**
- Collapsible sections
- Interactive sliders
- Drag-and-drop to map functionality
- Preset scenario templates
- Parameter tooltips
- Visual icons for each intervention type

---

### **CENTER: Interactive Map** (Largest space)

```
┌────────────────────────────────────────┐
│  Map Controls: [Layers ▾] [Reset] [+/-] │
├────────────────────────────────────────┤
│                                        │
│        🗺️ BOSTON MAP                   │
│                                        │
│    [Allston - High Cancer Rate]       │
│    [Roxbury - Low Access Score]       │
│    [Jamaica Plain - Medium Risk]      │
│                                        │
│  Legend:                               │
│  🟥 High Risk  🟨 Medium  🟩 Low       │
│                                        │
│  Overlays: [✓] Cancer [✓] Access      │
│            [ ] Income [ ] Pollution    │
│                                        │
└────────────────────────────────────────┘
│  Timeline Control:                     │
│  2024 ═════●═════════════════════ 2030│
│  [◀] [Pause ⏸] [▶] Speed: [1x ▾]     │
└────────────────────────────────────────┘
```

**Features:**
- Mapbox GL JS for smooth interactions
- Neighborhood-level polygons (clickable)
- Heat map overlays (toggleable layers)
- Data-driven choropleth coloring
- Hover tooltips with quick stats
- Click for detailed neighborhood panel
- Zoom to specific communities
- Timeline scrubber for simulation playback
- Overlay toggle controls
- Legend (context-aware based on active layers)

**Visual States:**
1. **Baseline Mode:** Shows current health data
2. **Scenario Building:** Highlights intervention locations
3. **Simulation Running:** Animated changes over time
4. **Results View:** Before/after comparison

---

### **RIGHT PANEL: Metrics & Analysis** (350-400px wide)

```
┌─────────────────────────┐
│ 📊 HEALTH METRICS       │
├─────────────────────────┤
│                         │
│ ┌─────┐ ┌─────┐ ┌─────┐│
│ │ 📈  │ │ 🏥  │ │ ⚕️  ││
│ │ 3.2%│ │ 85% │ │ 7.1 ││
│ │Mort.│ │Cap. │ │Score││
│ └─────┘ └─────┘ └─────┘│
│   ↓12%    ↑8%     ↑1.2 │
│                         │
│ 🎯 RESILIENCE SCORE     │
│  ████████░░ 8.2/10      │
│  +1.5 from baseline     │
│                         │
├─────────────────────────┤
│ 📍 SELECTED AREA        │
│  Commonwealth Ave       │
│  (Latino Community)     │
├─────────────────────────┤
│  Cancer Incidence       │
│  ▇▇▇▇▇▇▇▇▇▇▇▇ 50% ↑    │
│  vs. city average       │
│                         │
│  Access to Care         │
│  ▇▇▇▇░░░░░░░░ 35%      │
│                         │
│  Population: 12,450     │
│  Median Income: $45k    │
│                         │
├─────────────────────────┤
│ 📈 TRENDS OVER TIME     │
│                         │
│  [Line Chart]           │
│   Cancer Screening Rate │
│   Baseline vs Scenario  │
│                         │
├─────────────────────────┤
│ 🤖 AI INSIGHTS          │
│                         │
│  "Adding 2 clinics in   │
│   Allston reduces       │
│   cancer mortality by   │
│   18% over 5 years"     │
│                         │
│  [View Details →]       │
│                         │
├─────────────────────────┤
│ 💡 RECOMMENDATIONS      │
│                         │
│  1. Priority: Add clinic│
│     in Roxbury ($2M)    │
│  2. Increase screening  │
│     outreach (High ROI) │
│                         │
└─────────────────────────┘
```

**Features:**
- Key Performance Indicator (KPI) cards
- Real-time metric updates during simulation
- Comparison indicators (↑↓ vs baseline)
- Neighborhood detail panel (appears on click)
- Health disparity highlights
- Multiple chart types:
  - Line charts (trends over time)
  - Bar charts (comparisons)
  - Heatmap matrices (correlation)
- AI-generated insights panel
- Optimization recommendations
- Scrollable content

---

## 🎨 Design System

### **Color Palette**

**Primary Colors:**
- **Navy Blue** (#1e3a8a): Headers, primary buttons
- **Teal** (#0d9488): Success states, positive changes
- **Coral** (#f97316): Warnings, high-risk areas
- **Purple** (#7c3aed): Interventions, scenarios

**Health Data Colors (Colorblind-Safe):**
- **Risk Levels:**
  - High Risk: #dc2626 (red)
  - Medium Risk: #f59e0b (amber)
  - Low Risk: #10b981 (green)
  
- **Demographic Overlays:**
  - Income: Blue scale (#dbeafe → #1e3a8a)
  - Health Access: Green scale (#d1fae5 → #065f46)
  - Pollution: Orange scale (#fed7aa → #9a3412)

**Background:**
- Light mode: #f8fafc (default)
- Dark mode option: #0f172a

### **Typography**
- **Headings:** Inter or SF Pro (system font) - Bold
- **Body:** Inter or SF Pro - Regular (16px base)
- **Data/Numbers:** JetBrains Mono or Roboto Mono
- **Scale:** 14px (small) | 16px (body) | 20px (h3) | 24px (h2) | 32px (h1)

### **Spacing System**
- Base unit: 8px
- Spacing scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Card padding: 16px (mobile) | 24px (desktop)
- Panel padding: 24px

### **Components Style**
- **Cards:** Subtle shadow, rounded corners (8px), white background
- **Buttons:** 
  - Primary: Solid color, 8px radius
  - Secondary: Outlined
  - Hover states: Slight elevation
- **Inputs/Sliders:** Clean, modern, large touch targets
- **Charts:** Minimalist, data-first (remove chart junk)

---

## 🔄 User Flow Examples

### **Flow 1: "Add a Clinic" Scenario**
1. User sees baseline map with health disparities
2. Clicks "+ Add Clinic" in left panel
3. Cursor changes to placement mode
4. Clicks Allston neighborhood on map
5. Popup: "Configure Clinic" (capacity, specialty, cost)
6. Confirms → Clinic icon appears on map
7. Right panel shows projected impact
8. Clicks "Run Simulation"
9. Timeline animates 5 years
10. Results show improved cancer screening rates in Allston
11. AI insights suggest complementary interventions

### **Flow 2: "Compare Scenarios"**
1. User loads "Baseline" scenario
2. Creates new scenario "High Investment"
3. Adds multiple interventions
4. Clicks "Compare" button
5. Split-screen map view appears
6. Side-by-side metrics comparison
7. Difference highlights (green/red indicators)
8. Export comparison report

### **Flow 3: "Explore Community Data"**
1. User clicks Commonwealth Ave on map
2. Right panel updates with neighborhood details
3. Sees "Latino population: 50% higher cancer incidence"
4. Clicks "Why?" tooltip
5. Detail modal shows contributing factors
6. Suggests targeted interventions
7. User clicks "Add Intervention Here"
8. Pre-populated scenario builder

---

## 📱 Responsive Considerations

### **Desktop (1920x1080+):** Full 3-panel layout
### **Laptop (1366x768):** Collapsible side panels
### **Tablet (768px):** Stacked panels with tabs
### **Mobile (375px):** 
- Map-first view
- Hamburger menu for controls
- Bottom sheet for metrics
- Simplified charts

---

## ⚡ Interactivity & Animations

### **Micro-interactions:**
- Hover over neighborhoods: Highlight border + tooltip
- Slider changes: Real-time map update
- Running simulation: Pulsing progress indicator
- Data loading: Skeleton screens (not spinners)
- Success state: Checkmark animation
- Metric changes: Number count-up animation

### **Transitions:**
- Panel collapse/expand: 300ms ease
- Map layer toggle: Fade in/out 200ms
- Timeline scrub: Smooth interpolation
- Chart updates: Animated transitions (not instant)

### **Loading States:**
- Initial load: Branded splash screen
- Simulation running: Progress bar + estimated time
- Data fetching: Skeleton screens in right panel

---

## 🧩 Component Library (Material-UI)

**Primary Components We'll Use:**
- `Box`, `Container`, `Grid` - Layout
- `Card`, `CardContent` - Metric cards
- `Drawer` - Side panels
- `AppBar`, `Toolbar` - Header
- `Button`, `IconButton` - Actions
- `Slider`, `TextField`, `Select` - Inputs
- `Chip` - Tags, status indicators
- `Tooltip` - Help text
- `Dialog`, `Modal` - Popups
- `Alert`, `Snackbar` - Notifications
- `LinearProgress`, `CircularProgress` - Loading

---

## 🎯 Key Differentiators

### **What makes this special:**
1. **Community-specific focus**: Not just city-wide, but neighborhood-level (Commonwealth Ave)
2. **Equity at the center**: Highlight disparities prominently
3. **Actionable**: Not just data viz, but intervention testing
4. **Predictive**: Show future trends, not just current state
5. **Accessible**: Designed for policymakers, not just data scientists
6. **Story-driven**: Data tells a story about real communities

---

## 📋 MVP Features for Hackathon

### **Must Have (Core Demo):**
- [ ] Interactive Boston map with 5-10 neighborhoods
- [ ] 2-3 key health metrics (cancer rate, access score, mortality)
- [ ] 1 working intervention ("Add Clinic")
- [ ] Simple simulation (even if just calculation)
- [ ] Before/after comparison
- [ ] Responsive layout (desktop)

### **Nice to Have (If Time):**
- [ ] Timeline animation
- [ ] Multiple scenario comparison
- [ ] AI insights panel
- [ ] Dark mode
- [ ] Export/share functionality
- [ ] Advanced filters

### **Post-Hackathon:**
- [ ] Real-time collaboration
- [ ] User accounts
- [ ] Historical data
- [ ] Mobile optimization
- [ ] API integrations with real health data sources

---

## 🎨 Mood Board Keywords

**Visual Style:** 
- Clean, modern, professional
- Data-driven but human-centered
- Serious but not sterile
- Accessible and inclusive
- Command center meets healthcare

**Feeling:**
- Empowering (users can make change)
- Trustworthy (backed by data)
- Urgent but not alarmist
- Hopeful (solutions-oriented)

---

## 🚀 Next Steps

1. **Review this plan** - Get team feedback
2. **Create wireframes** - Can use Figma or just sketch
3. **Set up component structure** - React component hierarchy
4. **Build shell first** - Layout without data
5. **Add mock data** - Test with fake data
6. **Integrate real API** - Connect when backend ready

---

## 📎 Design Tools We Can Use

- **Figma** (optional): High-fidelity mockups
- **Excalidraw**: Quick wireframes
- **Coolors**: Color palette generator
- **Material-UI Docs**: Component reference
- **Mapbox Studio**: Custom map styles


