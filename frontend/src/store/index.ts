import { create } from 'zustand';
import { Scenario, Intervention, PolicyChange, Event, SimulationResult } from '../types/scenario.types';
import { Neighborhood } from '../types/health.types';
import { calculateSimulationResults, getBaselineMetrics, SimulationMetrics } from '../utils/simulationEngine';

interface AppState {
  // Scenario state
  currentScenario: Scenario | null;
  scenarios: Scenario[];
  isSimulationRunning: boolean;
  simulationProgress: number;
  simulationResults: SimulationResult[];
  currentMetrics: SimulationMetrics;

  // Map state
  selectedNeighborhood: Neighborhood | null;
  mapLayers: {
    cancer: boolean;
    access: boolean;
    income: boolean;
    pollution: boolean;
  };
  currentYear: number;
  placementMode: 'clinic' | 'hospital' | 'vaccination' | null;

  // Timeline state
  isPlaying: boolean;
  playbackSpeed: number;

  // Actions
  setCurrentScenario: (scenario: Scenario | null) => void;
  addScenario: (scenario: Scenario) => void;
  updateScenario: (scenario: Scenario) => void;
  deleteScenario: (scenarioId: string) => void;
  
  addIntervention: (intervention: Intervention) => void;
  removeIntervention: (interventionId: string) => void;
  updateIntervention: (intervention: Intervention) => void;
  
  addPolicyChange: (policy: PolicyChange) => void;
  updatePolicyChange: (policy: PolicyChange) => void;
  
  addEvent: (event: Event) => void;
  removeEvent: (eventId: string) => void;
  
  setSelectedNeighborhood: (neighborhood: Neighborhood | null) => void;
  toggleMapLayer: (layer: keyof AppState['mapLayers']) => void;
  setPlacementMode: (mode: 'clinic' | 'hospital' | 'vaccination' | null) => void;
  
  runSimulation: () => Promise<void>;
  setSimulationProgress: (progress: number) => void;
  setSimulationResults: (results: SimulationResult[]) => void;
  
  setCurrentYear: (year: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  
  resetScenario: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  currentScenario: null,
  scenarios: [],
  isSimulationRunning: false,
  simulationProgress: 0,
  simulationResults: [],
  currentMetrics: getBaselineMetrics(),
  
  selectedNeighborhood: null,
  mapLayers: {
    cancer: true,
    access: true,
    income: false,
    pollution: false,
  },
  currentYear: 2024,
  placementMode: null,
  
  isPlaying: false,
  playbackSpeed: 1,

  // Scenario actions
  setCurrentScenario: (scenario) => set({ currentScenario: scenario }),
  
  addScenario: (scenario) => set((state) => ({
    scenarios: [...state.scenarios, scenario],
    currentScenario: scenario,
  })),
  
  updateScenario: (scenario) => set((state) => ({
    scenarios: state.scenarios.map((s) => (s.id === scenario.id ? scenario : s)),
    currentScenario: state.currentScenario?.id === scenario.id ? scenario : state.currentScenario,
  })),
  
  deleteScenario: (scenarioId) => set((state) => ({
    scenarios: state.scenarios.filter((s) => s.id !== scenarioId),
    currentScenario: state.currentScenario?.id === scenarioId ? null : state.currentScenario,
  })),

  // Intervention actions
  addIntervention: (intervention) => set((state) => {
    if (!state.currentScenario) return state;
    const updatedScenario = {
      ...state.currentScenario,
      interventions: [...state.currentScenario.interventions, intervention],
      lastModified: new Date(),
    };
    return { currentScenario: updatedScenario };
  }),
  
  removeIntervention: (interventionId) => set((state) => {
    if (!state.currentScenario) return state;
    const updatedScenario = {
      ...state.currentScenario,
      interventions: state.currentScenario.interventions.filter((i) => i.id !== interventionId),
      lastModified: new Date(),
    };
    return { currentScenario: updatedScenario };
  }),
  
  updateIntervention: (intervention) => set((state) => {
    if (!state.currentScenario) return state;
    const updatedScenario = {
      ...state.currentScenario,
      interventions: state.currentScenario.interventions.map((i) =>
        i.id === intervention.id ? intervention : i
      ),
      lastModified: new Date(),
    };
    return { currentScenario: updatedScenario };
  }),

  // Policy actions
  addPolicyChange: (policy) => set((state) => {
    if (!state.currentScenario) return state;
    const updatedScenario = {
      ...state.currentScenario,
      policyChanges: [...state.currentScenario.policyChanges, policy],
      lastModified: new Date(),
    };
    return { currentScenario: updatedScenario };
  }),
  
  updatePolicyChange: (policy) => set((state) => {
    if (!state.currentScenario) return state;
    const updatedScenario = {
      ...state.currentScenario,
      policyChanges: state.currentScenario.policyChanges.map((p) =>
        p.id === policy.id ? policy : p
      ),
      lastModified: new Date(),
    };
    return { currentScenario: updatedScenario };
  }),

  // Event actions
  addEvent: (event) => set((state) => {
    if (!state.currentScenario) return state;
    const updatedScenario = {
      ...state.currentScenario,
      events: [...state.currentScenario.events, event],
      lastModified: new Date(),
    };
    return { currentScenario: updatedScenario };
  }),
  
  removeEvent: (eventId) => set((state) => {
    if (!state.currentScenario) return state;
    const updatedScenario = {
      ...state.currentScenario,
      events: state.currentScenario.events.filter((e) => e.id !== eventId),
      lastModified: new Date(),
    };
    return { currentScenario: updatedScenario };
  }),

  // Map actions
  setSelectedNeighborhood: (neighborhood) => set({ selectedNeighborhood: neighborhood }),
  
  toggleMapLayer: (layer) => set((state) => ({
    mapLayers: {
      ...state.mapLayers,
      [layer]: !state.mapLayers[layer],
    },
  })),

  setPlacementMode: (mode) => set({ placementMode: mode }),

  // Simulation actions
  runSimulation: async () => {
    const { currentScenario } = get();
    if (!currentScenario) return;

    set({ isSimulationRunning: true, simulationProgress: 0 });
    
    // Simulate progress with realistic steps
    const steps = [
      { progress: 0, delay: 100 },
      { progress: 30, delay: 300 },
      { progress: 60, delay: 400 },
      { progress: 85, delay: 300 },
      { progress: 100, delay: 200 },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      set({ simulationProgress: step.progress });
    }

    // Calculate results based on interventions
    const interventions = currentScenario.interventions;
    const metrics = calculateSimulationResults(interventions);
    
    set({ 
      currentMetrics: metrics,
      isSimulationRunning: false, 
      simulationProgress: 100 
    });
  },
  
  setSimulationProgress: (progress) => set({ simulationProgress: progress }),
  
  setSimulationResults: (results) => set({ simulationResults: results }),

  // Timeline actions
  setCurrentYear: (year) => set({ currentYear: year }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  // Reset
  resetScenario: () => set((state) => {
    if (!state.currentScenario) return state;
    return {
      currentScenario: {
        ...state.currentScenario,
        interventions: [],
        policyChanges: [],
        events: [],
        lastModified: new Date(),
      },
      selectedNeighborhood: null,
      currentYear: state.currentScenario.baselineYear,
    };
  }),
}));

