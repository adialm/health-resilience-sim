# Quick Start Guide

## 🚀 Running the Dashboard

### **Start the Frontend**

```bash
cd /Users/adialm/Desktop/health-resilience-sim/frontend
npm start
```

The app will open at: **http://localhost:3000**

### **Stop the Server**
Press `Ctrl + C` in the terminal

---

## 🎮 Testing the Dashboard

### **What to Try:**

1. **Header Actions**
   - Click "Run Simulation" → Watch progress indicator
   - Change scenario dropdown
   - Click Save/Share buttons (not yet functional)

2. **Left Panel (Scenario Builder)**
   - Drag the Healthcare Access slider
   - Adjust Funding Level slider
   - Toggle Pollution Control switch
   - Click "Clear All" to reset

3. **Center Panel (Map)**
   - Toggle overlay checkboxes (Cancer, Access, Income, Pollution)
   - Drag the timeline slider (2024-2030)
   - Click play/pause button
   - Change playback speed (0.5x, 1x, 2x, 5x)

4. **Right Panel (Metrics)**
   - View the three KPI cards
   - See the Resilience Score bar
   - Read AI insights
   - Check recommendations

---

## 📸 Screenshot Tour

### **What You Should See:**

**Header:**
- 🏥 Logo and title on the left
- Boston, MA location selector
- Scenario dropdown (Baseline selected)
- Blue "Run Simulation" button
- Save and Share buttons

**Left Panel:**
- Three "Add" buttons (Clinic, Hospital, Vaccination)
- Two sliders with percentage indicators
- Pollution toggle switch
- "Add Event" button
- Settings section
- Red "Clear All" button at bottom

**Center Panel:**
- Light blue placeholder with "🗺️ Boston Map" text
- Layer controls (top-left)
- Zoom controls (top-right)
- Legend box (bottom-left) with:
  - Risk level chips
  - Four checkboxes for overlays
- Timeline bar at bottom with:
  - Year slider (2024-2030)
  - Playback controls
  - Speed selector buttons

**Right Panel:**
- "📊 Health Metrics" heading
- Three metric cards in a grid:
  - Mortality: 3.2% with down arrow
  - Hospital Cap: 85% with up arrow
  - Access Score: 7.1 with up arrow
- Resilience Score: 8.2/10 with progress bar
- Empty state message: "Click a neighborhood on the map..."
- Blue AI Insights card
- Two recommendation cards

---

## 🎨 Customization Tips

### **Change Colors:**
Edit: `src/theme/theme.ts`

```typescript
export const colors = {
  primary: {
    navy: '#1e3a8a', // ← Change this
    teal: '#0d9488',
    // ...
  },
};
```

### **Update Mock Data:**
Edit: `src/constants/mockData.ts`

```typescript
export const mockNeighborhoods: Neighborhood[] = [
  {
    id: 'allston',
    name: 'Allston',
    metrics: {
      cancerRate: 450, // ← Change metrics
      // ...
    },
  },
];
```

### **Add New Metrics:**
1. Update type: `src/types/health.types.ts`
2. Add to mock data: `src/constants/mockData.ts`
3. Display in RightPanel: `src/components/layout/RightPanel.tsx`

---

## 🐛 Troubleshooting

### **Issue: "npm start" fails**

**Solution 1:** Install dependencies
```bash
cd frontend
npm install
```

**Solution 2:** Clear cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Issue: Port 3000 already in use**

**Solution:** Kill the process
```bash
lsof -ti:3000 | xargs kill -9
npm start
```

### **Issue: TypeScript errors**

**Solution:** Check file paths are correct
- All imports should use relative paths
- Check that all types are exported

### **Issue: White screen / crashes**

**Solution:** Check browser console
- Open DevTools (F12)
- Look at Console tab
- Share error messages

---

## 📁 Project Structure Overview

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # React components
│   │   └── layout/  # Header, panels, etc.
│   ├── store/       # Zustand state management
│   ├── types/       # TypeScript definitions
│   ├── theme/       # Material-UI theme
│   ├── constants/   # Mock data
│   ├── App.tsx      # Main app component
│   └── index.tsx    # Entry point
├── package.json     # Dependencies
└── tsconfig.json    # TypeScript config
```

---

## 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Check TypeScript errors
npx tsc --noEmit
```

---

## 📊 Current Features Checklist

### ✅ Working
- [x] 3-panel responsive layout
- [x] Header with controls
- [x] Scenario builder panel
- [x] Map placeholder with controls
- [x] Metrics display panel
- [x] KPI cards with trends
- [x] Resilience score
- [x] Timeline controls
- [x] Layer toggles
- [x] State management (Zustand)
- [x] Mock Boston data
- [x] Theme system
- [x] Run simulation button

### ⏳ Coming Soon
- [ ] Interactive Mapbox map
- [ ] Clickable neighborhoods
- [ ] Add intervention modals
- [ ] Charts (Recharts)
- [ ] Backend API integration
- [ ] Scenario save/load
- [ ] Real health data

---

## 💡 Demo Tips

### **For Team Meetings:**
1. Start the server before the meeting
2. Have the dashboard open in browser
3. Walk through each panel
4. Show interactive elements (sliders, toggles)
5. Explain: "Map will show real Boston data here"

### **For Judges/Demo Day:**
1. Prepare 2-minute walkthrough
2. Focus on the community-specific story:
   - "Click Allston → See 50% higher cancer rate"
   - "Add a clinic → See mortality drop 18%"
3. Highlight the equity focus
4. Show the optimization recommendations

### **What to Say:**
> "This is the Health Resilience Simulation Platform. On the left, we build scenarios—adding clinics, adjusting policy. The center map shows real Boston neighborhoods with health disparities. Click Allston, and you'll see the Latino community has 50% higher cancer incidence. Our AI recommends targeted interventions, and you can simulate 5-10 years into the future to see the impact."

---

## 🎯 Next Development Priorities

### **Phase 2: Make it Visual** (2-3 hours)
- Integrate Mapbox
- Add neighborhood polygons
- Make neighborhoods clickable
- Show real data on the map

### **Phase 3: Make it Interactive** (2-3 hours)
- "Add Clinic" modal
- Intervention placement on map
- Save/load scenarios
- Charts for trends

### **Phase 4: Make it Smart** (2-3 hours)
- Connect to backend API
- Real simulation execution
- AI insights generation
- Optimization recommendations

---

## 📚 Documentation

- **Design Plan:** `docs/DASHBOARD_DESIGN_PLAN.md`
- **Component Structure:** `docs/COMPONENT_STRUCTURE.md`
- **Wireframes:** `docs/WIREFRAMES.md`
- **Progress:** `docs/FRONTEND_PROGRESS.md`
- **Mapbox Guide:** `docs/MAPBOX_INTEGRATION_GUIDE.md`

---

## 🆘 Need Help?

### **Common Questions:**

**Q: How do I change the metrics displayed?**
A: Edit `src/components/layout/RightPanel.tsx` and `src/constants/mockData.ts`

**Q: How do I add a new neighborhood?**
A: Add to `mockNeighborhoods` array in `src/constants/mockData.ts`

**Q: How do I change the color scheme?**
A: Edit `src/theme/theme.ts`

**Q: The simulation button doesn't do anything?**
A: It shows progress but doesn't call a backend yet. Add API call in `src/store/index.ts` → `runSimulation()`

---

## 🎉 You're All Set!

Your dashboard is running and ready for development. The foundation is solid, and you can now:
1. Show your partners the UI
2. Discuss how to integrate their data
3. Plan the backend simulation logic
4. Add the map visualization

**Have fun building!** 🚀

