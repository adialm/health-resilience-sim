# Dashboard Wireframes

## 🖼️ Main Dashboard - Full View

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│  🏥 Societal Health Resilience Simulation Platform              Boston, MA ▾   Settings ⚙️     │
│                                                                                                 │
│  📋 Scenario: Baseline ▾                    [ ▶️  Run Simulation ]  [ 💾 Save ]  [ 🔗 Share ]  │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────────────────────────────┬────────────────────────┐
│              │                                                          │                        │
│  SCENARIO    │                    MAP VIEW                              │   HEALTH METRICS       │
│  BUILDER     │                                                          │                        │
│              │  ┌────────────────────────────────────────────────────┐  │  ┌──────┐ ┌──────┐    │
│ 📍 Add       │  │                                                    │  │  │ 3.2% │ │ 85%  │    │
│ Intervention │  │                                                    │  │  │ ━━━━ │ │ ━━━━ │    │
│              │  │          🗺️  Greater Boston                        │  │  │Mort. │ │Hosp. │    │
│ ┌──────────┐ │  │                                                    │  │  │Rate  │ │Cap.  │    │
│ │+ Add     │ │  │     ┌─────┐ Allston                                │  │  └──────┘ └──────┘    │
│ │  Clinic  │ │  │     │ 🔴  │ (High Cancer)                          │  │    ↓12%     ↑8%       │
│ └──────────┘ │  │     └─────┘                                        │  │                        │
│              │  │                                                    │  │  RESILIENCE SCORE      │
│ ┌──────────┐ │  │             ┌─────┐ Roxbury                        │  │  ████████░░  8.2/10   │
│ │+ Add     │ │  │             │ 🟡  │ (Low Access)                   │  │                        │
│ │  Hospital│ │  │             └─────┘                                │  │ ────────────────────   │
│ └──────────┘ │  │                                                    │  │ 📍 SELECTED AREA       │
│              │  │                   ┌─────┐                          │  │                        │
│ ┌──────────┐ │  │                   │ 🟢  │ Jamaica                  │  │  Commonwealth Ave      │
│ │+ Vaccine │ │  │                   └─────┘ Plain                    │  │  Latino Community      │
│ │  Campaign│ │  │                                                    │  │                        │
│ └──────────┘ │  │                                                    │  │  Cancer Incidence      │
│              │  │                                                    │  │  ▓▓▓▓▓▓▓▓▓▓▓▓ +50%     │
│ ────────────  │  │  Legend: 🔴 High Risk  🟡 Medium  🟢 Low          │  │  vs. city average      │
│              │  │                                                    │  │                        │
│ 📊 Policy    │  │  Overlays: [✓] Cancer [✓] Access [ ] Income       │  │  Access to Care        │
│              │  │                                                    │  │  ▓▓▓░░░░░░░░░  35%     │
│ Healthcare   │  └────────────────────────────────────────────────────┘  │                        │
│ Access       │                                                          │  Population: 12,450    │
│ ▓▓▓▓▓▓░░░ 60%│  ┌────────────────────────────────────────────────────┐ │  Income: $45k          │
│              │  │ Timeline Control                                   │ │                        │
│ Funding      │  │ 2024 ═══════════●════════════════════════════ 2030│ │ ────────────────────   │
│ $$           │  │ [◀️ ]  [ ⏸️  Pause ]  [ ▶️ ]   Speed: 1x ▾         │ │                        │
│ ▓▓▓▓░░░░░ 40%│  └────────────────────────────────────────────────────┘ │ 📈 TRENDS              │
│              │                                                          │                        │
│ ────────────  │                                                          │  ┌──────────────────┐ │
│              │                                                          │  │    Screening     │ │
│ 🌍 Events    │                                                          │  │      Rate        │ │
│              │                                                          │  │  ╱╲              │ │
│ ┌──────────┐ │                                                          │  │ ╱  ╲_____        │ │
│ │+ Add     │ │                                                          │  │╱         ╲___    │ │
│ │  Event   │ │                                                          │  └──────────────────┘ │
│ └──────────┘ │                                                          │   Baseline | Scenario │
│              │                                                          │                        │
│ • Flood 2026 │                                                          │ ────────────────────   │
│ • Heat Wave  │                                                          │                        │
│   (Remove)   │                                                          │ 🤖 AI INSIGHTS         │
│              │                                                          │                        │
│ ────────────  │                                                          │  "Adding 2 clinics in │
│              │                                                          │   Allston reduces     │
│ ⚙️ Settings   │                                                          │   cancer mortality by │
│              │                                                          │   18% over 5 years"   │
│ Duration:    │                                                          │                        │
│ ● 5 years    │                                                          │   [View Details →]    │
│ ○ 10 years   │                                                          │                        │
│              │                                                          │ ────────────────────   │
│ [Advanced ▾] │                                                          │                        │
│              │                                                          │ 💡 RECOMMENDATIONS     │
│ ┌──────────┐ │                                                          │                        │
│ │  Reset   │ │                                                          │  1. 🎯 Add clinic in  │
│ │   All    │ │                                                          │     Roxbury (~$2M)    │
│ └──────────┘ │                                                          │                        │
│              │                                                          │  2. 📢 Increase       │
│              │                                                          │     screening         │
│              │                                                          │     outreach          │
└──────────────┴──────────────────────────────────────────────────────────┴────────────────────────┘
```

---

## 🔍 Zoomed View: Header Detail

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  🏥 Societal Health Resilience Simulation Platform         [👤 Profile ▾]   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  📍 Location: Boston, MA ▾        🕐 Last updated: 2 min ago                │
│                                                                              │
│  📋 Current Scenario: Baseline ▾                                            │
│     ┌─────────────────────────┐                                             │
│     │ • Baseline              │                                             │
│     │ • High Investment       │                                             │
│     │ • Climate Adaptation    │                                             │
│     │ ─────────────────────   │                                             │
│     │ + New Scenario          │                                             │
│     │ 📁 Load Scenario        │                                             │
│     └─────────────────────────┘                                             │
│                                                                              │
│  ┌─────────────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  ▶️  Run Simulation  │  │ 💾 Save  │  │ 📊 Export│  │ 🔗 Share │        │
│  │    (Ready)           │  │          │  │          │  │          │        │
│  └─────────────────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎮 Interaction: Adding a Clinic

### Step 1: Click "Add Clinic" Button
```
┌────────────────────┐
│  SCENARIO BUILDER  │
├────────────────────┤
│                    │
│ 📍 Add Intervention│
│                    │
│ ┌────────────────┐ │
│ │ ✓ Add Clinic   │ │ ← Clicked, cursor changes
│ │   (Click map)  │ │
│ └────────────────┘ │
│                    │
│ ┌────────────────┐ │
│ │ + Add Hospital │ │
│ └────────────────┘ │
└────────────────────┘
```

### Step 2: Click on Map Location
```
┌─────────────────────────────────────┐
│         MAP VIEW                    │
│                                     │
│                                     │
│      ┌─────────┐                    │
│      │  👆      │  ← User clicks here│
│      │ Allston │                    │
│      │  (High  │                    │
│      │ Cancer) │                    │
│      └─────────┘                    │
│                                     │
│  Cursor: 🏥 (clinic placement mode) │
└─────────────────────────────────────┘
```

### Step 3: Configuration Modal Appears
```
┌─────────────────────────────────────────────────────┐
│  Configure Clinic - Allston                    ✕    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📍 Location: Commonwealth Ave, Allston             │
│                                                     │
│  🏥 Clinic Type:                                    │
│     ● Primary Care                                  │
│     ○ Specialty (Cancer Screening)                  │
│     ○ Urgent Care                                   │
│                                                     │
│  👥 Capacity: 500 patients/day                      │
│     ▓▓▓▓▓▓░░░░ [slider]                            │
│     (Small)     (Medium)      (Large)               │
│                                                     │
│  💰 Estimated Cost: $2.4M                           │
│     Annual Operating: $850K/year                    │
│                                                     │
│  📊 Projected Impact:                               │
│     • Reduce cancer mortality: -15% (5 years)       │
│     • Improve access score: +22%                    │
│     • Serve additional: 8,200 patients/year         │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐                │
│  │   Cancel     │  │  Add Clinic  │                │
│  └──────────────┘  └──────────────┘                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 4: Clinic Added to Map
```
┌─────────────────────────────────────┐
│         MAP VIEW                    │
│                                     │
│                                     │
│      ┌─────────┐                    │
│      │  🏥 ✨  │  ← New clinic icon │
│      │ Allston │     (pulsing)      │
│      │  (High  │                    │
│      │ Cancer) │                    │
│      └─────────┘                    │
│                                     │
│  Overlays: [✓] Interventions        │
└─────────────────────────────────────┘
```

---

## 📊 Metrics Panel Detail

```
┌──────────────────────────────────────────┐
│  📊 HEALTH METRICS                       │
├──────────────────────────────────────────┤
│                                          │
│  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │   📉     │  │   🏥     │  │   ⚕️   │ │
│  │          │  │          │  │        │ │
│  │  3.2%    │  │   85%    │  │  7.1   │ │
│  │  ━━━━    │  │  ━━━━    │  │  ━━━━  │ │
│  │ Mortality│  │ Hospital │  │ Access │ │
│  │   Rate   │  │ Capacity │  │ Score  │ │
│  │          │  │          │  │        │ │
│  │  ↓ 12%  │  │  ↑ 8%   │  │ ↑ 1.2 │ │
│  │  Better  │  │  Higher  │  │ Better │ │
│  └──────────┘  └──────────┘  └────────┘ │
│                                          │
├──────────────────────────────────────────┤
│  🎯 RESILIENCE SCORE                     │
│                                          │
│     ████████░░░                          │
│        8.2 / 10                          │
│                                          │
│     +1.5 from baseline                   │
│     ▲ 18% improvement                    │
│                                          │
│  Components:                             │
│  • Healthcare Access    ████████░ 8.5   │
│  • Response Capacity    ███████░░ 7.8   │
│  • Community Health     ████████░ 8.3   │
│                                          │
└──────────────────────────────────────────┘
```

---

## 📈 Chart Examples

### Trend Chart
```
┌─────────────────────────────────────────────────┐
│  Cancer Screening Rate Over Time               │
├─────────────────────────────────────────────────┤
│                                                 │
│  90%│                         ╱────────         │
│     │                    ╱───╱                  │
│  80%│               ╱───╱  ← Scenario           │
│     │          ╱───╱                            │
│  70%│     ╱───╱                                 │
│     │────╱         ← Baseline                   │
│  60%│                                           │
│     │                                           │
│  50%│                                           │
│     └────┬────┬────┬────┬────┬────┬────        │
│       2024  25   26   27   28   29  2030       │
│                                                 │
│  ━━━ Baseline    ━━━ Current Scenario          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Comparison Bar Chart
```
┌─────────────────────────────────────────────────┐
│  Health Impact by Neighborhood                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Allston       ▓▓▓▓▓▓▓▓▓▓▓▓ +42%               │
│  Roxbury       ▓▓▓▓▓▓▓ +28%                     │
│  Jamaica Plain ▓▓▓▓▓ +18%                       │
│  South End     ▓▓▓ +12%                         │
│  Back Bay      ▓ +3%                            │
│                                                 │
│  0%        25%         50%         75%   100%   │
│                                                 │
│  ▓ Improvement in Access Score                  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🕹️ Timeline Control Detail

```
┌──────────────────────────────────────────────────────────────────┐
│  📅 SIMULATION TIMELINE                                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Current Year: 2027  (3 of 5 years)                             │
│                                                                  │
│  2024 ═══════════════●════════════════════════════════════ 2030 │
│       |         |         |         |         |         |       │
│     2024      2025      2026      2027      2028      2029      │
│       ✓         ✓         ✓        ⏺️                            │
│                                                                  │
│  ┌───────┐  ┌─────────┐  ┌───────┐  ┌──────────────────┐       │
│  │  ◀️◀️  │  │  ◀️ Prev │  │ ⏸️ Pause│  │ Next ▶️  │  ▶️▶️  │       │
│  │ Start │  │   Year  │  │        │  │  Year    │   End  │       │
│  └───────┘  └─────────┘  └───────┘  └──────────────────┘       │
│                                                                  │
│  Playback Speed:  ○ 0.5x  ● 1x  ○ 2x  ○ 5x                     │
│                                                                  │
│  Key Events:                                                     │
│  • 2026 - Clinic Opens (Allston)                                │
│  • 2026 - Flood Event (Simulated)                               │
│  • 2028 - Vaccination Campaign Starts                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile View (Collapsed)

```
┌─────────────────────────┐
│  ☰  Health Resilience   │
│                         │
│  Scenario: Baseline ▾   │
│  [▶️  Run]  [💾]  [🔗]   │
├─────────────────────────┤
│                         │
│   🗺️                    │
│   BOSTON MAP            │
│   (Full width)          │
│                         │
│   ┌─────┐               │
│   │ 🔴  │ Allston       │
│   └─────┘               │
│                         │
│        ┌─────┐          │
│        │ 🟡  │ Roxbury  │
│        └─────┘          │
│                         │
│   Timeline              │
│   ═══●═══════           │
│   [◀️ ] [⏸️] [▶️]        │
│                         │
├─────────────────────────┤
│  📊 Metrics             │
│  [Tap to expand]        │
│                         │
│  3.2%  |  85%  |  7.1   │
│  Mort  | Hosp  | Access │
│                         │
├─────────────────────────┤
│  🎛️ Scenario            │
│  [Tap to expand]        │
└─────────────────────────┘
```

---

## 🎨 Color States

### Map Neighborhood Colors

**Risk Level (Default View):**
```
🟥 High Risk    #dc2626  (Allston, high cancer)
🟨 Medium Risk  #f59e0b  (Roxbury, medium access)
🟩 Low Risk     #10b981  (Jamaica Plain, good)
⬜ No Data      #e5e7eb  (Areas outside study)
```

**Selected State:**
```
Blue Border + Glow: #3b82f6
```

**Hover State:**
```
Lighten 10% + Border
```

---

## 🔔 Notification Examples

### Success
```
┌────────────────────────────────────────┐
│  ✅ Simulation Complete!               │
│  Your scenario "High Investment"       │
│  shows 18% improvement in 5 years.     │
│                                        │
│  [View Results]  [Dismiss]             │
└────────────────────────────────────────┘
```

### Warning
```
┌────────────────────────────────────────┐
│  ⚠️  Large Investment Detected          │
│  This scenario costs $12M. Consider    │
│  phased implementation.                │
│                                        │
│  [Optimize]  [Continue Anyway]         │
└────────────────────────────────────────┘
```

### Loading
```
┌────────────────────────────────────────┐
│  ⏳ Running Simulation...              │
│                                        │
│  ████████░░░░░░░░░░░  42%             │
│                                        │
│  Processing year 2027...               │
│  Estimated time: 8 seconds             │
└────────────────────────────────────────┘
```

---

## 🎯 Empty States

### No Scenario Selected
```
┌────────────────────────────────────────┐
│                                        │
│           📋                           │
│                                        │
│      No Scenario Selected              │
│                                        │
│  Create a new scenario or load an      │
│  existing one to begin.                │
│                                        │
│  ┌──────────────────────┐              │
│  │  + New Scenario      │              │
│  └──────────────────────┘              │
│                                        │
│  ┌──────────────────────┐              │
│  │  📁 Load Scenario    │              │
│  └──────────────────────┘              │
│                                        │
└────────────────────────────────────────┘
```

### No Neighborhood Selected
```
┌────────────────────────────────────────┐
│  📍 SELECTED AREA                      │
├────────────────────────────────────────┤
│                                        │
│           🗺️                           │
│                                        │
│  Click a neighborhood on the map       │
│  to view detailed health metrics       │
│  and demographics.                     │
│                                        │
└────────────────────────────────────────┘
```

---

## 🎭 Loading Skeleton

```
┌────────────────────────────────────────┐
│  📊 HEALTH METRICS                     │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │ ▒▒▒▒▒▒   │  │ ▒▒▒▒▒▒   │  │ ▒▒▒▒ │ │
│  │ ▒▒▒▒     │  │ ▒▒▒▒     │  │ ▒▒▒  │ │
│  │ ▒▒▒▒▒    │  │ ▒▒▒▒▒    │  │ ▒▒▒▒ │ │
│  └──────────┘  └──────────┘  └──────┘ │
│                                        │
│  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒                        │
│  ▒▒▒▒▒▒▒▒▒▒                            │
│                                        │
└────────────────────────────────────────┘
```

---

This wireframe spec should give you and your team a clear visual reference! 🎨

