# Societal Health Resilience Simulation Platform

Interactive data-driven system for testing healthcare policy impacts on community health outcomes.

---

## 🎯 Project Overview

A virtual policy lab that translates community health data into actionable strategies. This platform allows users to:
- **Model** real-world health systems (clinics, hospitals, demographics)
- **Simulate** interventions (add resources, change policies, model events)
- **Visualize** community-specific health disparities
- **Predict** health outcomes over 5-10 years
- **Optimize** for equitable, effective interventions

### **Key Innovation**
Focus on **hyper-local** community data — showing that Latino populations around Commonwealth Avenue near Boston University have 50% higher cancer incidence, not just city-wide averages.

---

## 🚀 Quick Start

### **Frontend Dashboard**
```bash
cd frontend
npm install  # First time only
npm start    # Opens http://localhost:3000
```

### **Backend API** (Coming Soon)
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

---

## 📁 Project Structure

```
health-resilience-sim/
├── frontend/              # React + TypeScript dashboard
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── store/        # State management (Zustand)
│   │   ├── types/        # TypeScript types
│   │   ├── theme/        # Material-UI theme
│   │   └── constants/    # Mock data
│   └── package.json
│
├── backend/              # FastAPI + Python
│   ├── requirements.txt  # Dependencies installed
│   └── venv/            # Virtual environment
│
├── data-processing/      # Data ingestion & processing
├── docs/                 # Comprehensive documentation
│   ├── DASHBOARD_DESIGN_PLAN.md
│   ├── COMPONENT_STRUCTURE.md
│   ├── WIREFRAMES.md
│   ├── FRONTEND_PROGRESS.md
│   ├── MAPBOX_INTEGRATION_GUIDE.md
│   └── QUICKSTART.md
│
└── README.md
```

---

## 🎨 Current Status

### ✅ **Phase 1: Dashboard Shell (COMPLETE)**

**What's Built:**
- ✅ Professional 3-panel layout (Scenario Builder | Map | Metrics)
- ✅ Material-UI design system with custom theme
- ✅ Zustand state management
- ✅ TypeScript types for health data
- ✅ Mock Boston neighborhood data (7 neighborhoods)
- ✅ Interactive controls (sliders, toggles, timeline)
- ✅ KPI metrics display
- ✅ Scenario builder interface
- ✅ Timeline playback controls
- ✅ Map overlay toggles

**Screenshot:** (See dashboard at http://localhost:3000 after running `npm start`)

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2** + **TypeScript** - UI framework
- **Material-UI** - Component library
- **Zustand** - State management
- **Mapbox GL** - Geographic visualization (next phase)
- **Recharts** - Data visualization
- **D3.js** - Advanced charts
- **Axios** - API client
- **Framer Motion** - Animations

### **Backend** (Installed, awaiting implementation)
- **FastAPI** - Web framework
- **Pandas** + **NumPy** - Data processing
- **Scikit-learn** - Machine learning
- **GeoPandas** - Geospatial analysis
- **Shapely** - Geographic operations
- **Uvicorn** - ASGI server

### **Planned Additions**
- PostgreSQL + PostGIS - Database
- Redis - Caching
- Celery - Background tasks

---

## 📊 Features

### **Scenario Builder** (Left Panel)
- Add interventions (clinics, hospitals, campaigns)
- Adjust policy parameters (healthcare access, funding)
- Environmental toggles (pollution control)
- Add events (floods, heat waves)
- Simulation settings

### **Interactive Map** (Center Panel)
- Boston neighborhood visualization (placeholder ready)
- Risk-level color coding (red/yellow/green)
- Overlay toggles (cancer, access, income, pollution)
- Timeline scrubber (2024-2030)
- Playback controls

### **Metrics Dashboard** (Right Panel)
- KPI cards (mortality, capacity, access score)
- Resilience score (0-10 scale)
- Selected neighborhood details
- Health disparity indicators
- AI-generated insights
- Optimization recommendations

---

## 🗺️ Sample Data

**7 Boston Neighborhoods:**
1. **Allston** - High risk, 50% higher cancer rate, Latino community
2. **Roxbury** - High risk, low healthcare access
3. **Jamaica Plain** - Low risk
4. **South End** - Low risk, high access
5. **Back Bay** - Low risk, affluent
6. **Dorchester** - Medium risk
7. **Cambridge** - Low risk, high access

Each includes:
- Cancer incidence rates
- Mortality rates
- Healthcare access scores
- Demographics (income, ethnicity)
- GeoJSON boundaries

---

## 📚 Documentation

### **For Developers:**
- [`COMPONENT_STRUCTURE.md`](docs/COMPONENT_STRUCTURE.md) - Code architecture
- [`FRONTEND_PROGRESS.md`](docs/FRONTEND_PROGRESS.md) - What's built and what's next
- [`QUICKSTART.md`](docs/QUICKSTART.md) - How to run and test

### **For Designers:**
- [`DASHBOARD_DESIGN_PLAN.md`](docs/DASHBOARD_DESIGN_PLAN.md) - Complete design spec
- [`WIREFRAMES.md`](docs/WIREFRAMES.md) - ASCII wireframes and mockups

### **For Next Steps:**
- [`MAPBOX_INTEGRATION_GUIDE.md`](docs/MAPBOX_INTEGRATION_GUIDE.md) - How to add the map

---

## 🎯 Roadmap

### **Phase 2: Map Visualization** (Next - 2-3 hours)
- [ ] Integrate Mapbox GL JS
- [ ] Render neighborhood polygons
- [ ] Clickable neighborhoods
- [ ] Hover tooltips
- [ ] Intervention markers

### **Phase 3: Interactive Features** (2-3 hours)
- [ ] Add intervention modals
- [ ] Drag-to-map placement
- [ ] Scenario save/load
- [ ] Charts (time series, comparisons)

### **Phase 4: Backend Integration** (3-4 hours)
- [ ] API endpoints
- [ ] Simulation engine
- [ ] ML models for forecasting
- [ ] Database integration

### **Phase 5: Real Data** (Variable time)
- [ ] CDC PLACES API integration
- [ ] US Census data
- [ ] MA Dept of Public Health data
- [ ] Boston Public Health Commission data

### **Phase 6: Polish** (1-2 hours)
- [ ] Animations
- [ ] Loading states
- [ ] Mobile responsive
- [ ] Accessibility
- [ ] Performance optimization

---

## 🤝 Team Collaboration

### **Current Division:**
- **You:** Frontend development ✓
- **Partners:** 
  - Finding top 5 health problems to focus on
  - Gathering datasets

### **When Datasets Arrive:**
Update these files:
1. `frontend/src/constants/mockData.ts` - Replace mock data
2. `frontend/src/types/health.types.ts` - Add new data fields
3. `backend/` - Create data ingestion scripts

---

## 🏆 Hackathon Demo Tips

### **The Story:**
1. **Problem:** Health disparities hidden in city-wide averages
2. **Solution:** Hyper-local simulation platform
3. **Demo:** "Click Allston → See 50% higher cancer rate → Add clinic → See impact"
4. **Impact:** Evidence-based policy decisions, health equity

### **Key Talking Points:**
- Community-specific (not just citywide)
- Predictive (not just descriptive)
- Actionable (not just informative)
- Equitable (targets disparities)

### **Wow Moments:**
- Interactive map with real neighborhoods
- Live simulation with timeline
- AI recommendations
- Before/after comparisons

---

## 🐛 Known Issues

None! Dashboard shell is fully functional.

---

## 📝 License

[Add license here]

---

## 👥 Contributors

[Add team members here]

---

## 🆘 Support

For questions or issues:
1. Check `docs/QUICKSTART.md`
2. Review component documentation
3. Check browser console for errors

---

## 🎉 Acknowledgments

- Boston Public Health Commission for inspiration
- Material-UI for the component library
- Mapbox for mapping capabilities
- The open health data community

---

**Built with ❤️ for better health equity**
