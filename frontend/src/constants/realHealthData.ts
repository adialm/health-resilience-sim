/**
 * Real health data from Boston census tracts
 * Aggregated from Boston_Health_Resilience_Data_Pack
 * Source: Census tract baseline data, aggregated to ZIP level
 */

export interface RealZipData {
  zip: string;
  name: string;
  population: number;
  metrics: {
    Asthma_Prevalence: number;
    Diabetes_Prevalence: number;
    Hypertension_Rate: number;
    Obesity_Rate: number;
    PhysicalInactivity: number;
    Smoking: number;
    Uninsured: number;
    LifeExpectancy: number;
    OverdoseRate: number;
    InfantMortality_per1k: number;
    LowBirthweight: number;
    CliniciansPer10k: number;
    Resilience_Score_0: number;
  };
  healthProblems: {
    cardiometabolic: {
      score: number;
      components: {
        diabetes: number;
        hypertension: number;
        obesity: number;
      };
    };
    accessBarriers: {
      score: number;
      cliniciansPerCapita: number;
    };
    prematureMortality: {
      lifeExpectancy: number;
      infantMortality: number;
      lowBirthweight: number;
    };
    pediatricAsthma: {
      score: number;
    };
    substanceUse: {
      overdoseRate: number;
      score: number;
    };
  };
  riskLevel: 'high' | 'medium' | 'low';
}

export interface InterventionLever {
  name: string;
  cost: number;
  targetMetric: string;
  effectPerMonth: number;
  maxEffect: number;
}

// Real data from processed Boston health dataset
export const REAL_ZIP_DATA: RealZipData[] = [
  {
    zip: '02119',
    name: 'Roxbury',
    population: 8424,
    metrics: {
      Asthma_Prevalence: 13.37,
      Diabetes_Prevalence: 12.98,
      Hypertension_Rate: 31.83,
      Obesity_Rate: 34.0,
      PhysicalInactivity: 31.37,
      Smoking: 16.53,
      Uninsured: 8.86,
      LifeExpectancy: 48.02,
      OverdoseRate: 0.0,
      InfantMortality_per1k: 0.0,
      LowBirthweight: 0.0,
      CliniciansPer10k: 0.0,
      Resilience_Score_0: 0.5
    },
    healthProblems: {
      cardiometabolic: {
        score: 26.3,
        components: {
          diabetes: 12.98,
          hypertension: 31.83,
          obesity: 34.0
        }
      },
      accessBarriers: {
        score: 8.9,
        cliniciansPerCapita: 0.0
      },
      prematureMortality: {
        lifeExpectancy: 48.02,
        infantMortality: 0.0,
        lowBirthweight: 0.0
      },
      pediatricAsthma: {
        score: 13.4
      },
      substanceUse: {
        overdoseRate: 0.0,
        score: 0
      }
    },
    riskLevel: 'high'
  },
  {
    zip: '02121',
    name: 'Dorchester',
    population: 22602,
    metrics: {
      Asthma_Prevalence: 13.53,
      Diabetes_Prevalence: 12.71,
      Hypertension_Rate: 31.62,
      Obesity_Rate: 32.92,
      PhysicalInactivity: 30.84,
      Smoking: 16.32,
      Uninsured: 8.32,
      LifeExpectancy: 77.56,
      OverdoseRate: 0.0,
      InfantMortality_per1k: 0.0,
      LowBirthweight: 0.0,
      CliniciansPer10k: 0.0,
      Resilience_Score_0: 0.5
    },
    healthProblems: {
      cardiometabolic: {
        score: 25.8,
        components: {
          diabetes: 12.71,
          hypertension: 31.62,
          obesity: 32.92
        }
      },
      accessBarriers: {
        score: 8.3,
        cliniciansPerCapita: 0.0
      },
      prematureMortality: {
        lifeExpectancy: 77.56,
        infantMortality: 0.0,
        lowBirthweight: 0.0
      },
      pediatricAsthma: {
        score: 13.5
      },
      substanceUse: {
        overdoseRate: 0.0,
        score: 0
      }
    },
    riskLevel: 'high'
  },
  {
    zip: '02130',
    name: 'Jamaica Plain',
    population: 8429,
    metrics: {
      Asthma_Prevalence: 10.5,
      Diabetes_Prevalence: 7.35,
      Hypertension_Rate: 20.72,
      Obesity_Rate: 23.25,
      PhysicalInactivity: 18.43,
      Smoking: 8.74,
      Uninsured: 3.59,
      LifeExpectancy: 81.18,
      OverdoseRate: 0.0,
      InfantMortality_per1k: 0.0,
      LowBirthweight: 0.0,
      CliniciansPer10k: 0.0,
      Resilience_Score_0: 0.5
    },
    healthProblems: {
      cardiometabolic: {
        score: 17.1,
        components: {
          diabetes: 7.35,
          hypertension: 20.72,
          obesity: 23.25
        }
      },
      accessBarriers: {
        score: 3.6,
        cliniciansPerCapita: 0.0
      },
      prematureMortality: {
        lifeExpectancy: 81.18,
        infantMortality: 0.0,
        lowBirthweight: 0.0
      },
      pediatricAsthma: {
        score: 10.5
      },
      substanceUse: {
        overdoseRate: 0.0,
        score: 0
      }
    },
    riskLevel: 'medium'
  },
  {
    zip: '02134',
    name: 'Allston',
    population: 20263,
    metrics: {
      Asthma_Prevalence: 11.38,
      Diabetes_Prevalence: 3.84,
      Hypertension_Rate: 13.86,
      Obesity_Rate: 18.96,
      PhysicalInactivity: 17.98,
      Smoking: 8.41,
      Uninsured: 3.83,
      LifeExpectancy: 0.0,
      OverdoseRate: 0.0,
      InfantMortality_per1k: 0.0,
      LowBirthweight: 0.0,
      CliniciansPer10k: 0.0,
      Resilience_Score_0: 0.5
    },
    healthProblems: {
      cardiometabolic: {
        score: 11.9,
        components: {
          diabetes: 3.84,
          hypertension: 13.86,
          obesity: 18.96
        }
      },
      accessBarriers: {
        score: 3.8,
        cliniciansPerCapita: 0.0
      },
      prematureMortality: {
        lifeExpectancy: 0.0,
        infantMortality: 0.0,
        lowBirthweight: 0.0
      },
      pediatricAsthma: {
        score: 11.4
      },
      substanceUse: {
        overdoseRate: 0.0,
        score: 0
      }
    },
    riskLevel: 'low'
  },
  {
    zip: '02135',
    name: 'Brighton',
    population: 10584,
    metrics: {
      Asthma_Prevalence: 10.79,
      Diabetes_Prevalence: 6.75,
      Hypertension_Rate: 19.91,
      Obesity_Rate: 25.17,
      PhysicalInactivity: 19.49,
      Smoking: 9.29,
      Uninsured: 3.44,
      LifeExpectancy: 0.0,
      OverdoseRate: 0.0,
      InfantMortality_per1k: 0.0,
      LowBirthweight: 0.0,
      CliniciansPer10k: 0.0,
      Resilience_Score_0: 0.5
    },
    healthProblems: {
      cardiometabolic: {
        score: 17.3,
        components: {
          diabetes: 6.75,
          hypertension: 19.91,
          obesity: 25.17
        }
      },
      accessBarriers: {
        score: 3.4,
        cliniciansPerCapita: 0.0
      },
      prematureMortality: {
        lifeExpectancy: 0.0,
        infantMortality: 0.0,
        lowBirthweight: 0.0
      },
      pediatricAsthma: {
        score: 10.8
      },
      substanceUse: {
        overdoseRate: 0.0,
        score: 0
      }
    },
    riskLevel: 'medium'
  },
  {
    zip: '02215',
    name: 'Fenway/Kenmore',
    population: 2416,
    metrics: {
      Asthma_Prevalence: 12.04,
      Diabetes_Prevalence: 7.84,
      Hypertension_Rate: 22.28,
      Obesity_Rate: 30.23,
      PhysicalInactivity: 27.56,
      Smoking: 13.78,
      Uninsured: 6.19,
      LifeExpectancy: 0.0,
      OverdoseRate: 0.0,
      InfantMortality_per1k: 0.0,
      LowBirthweight: 0.0,
      CliniciansPer10k: 0.0,
      Resilience_Score_0: 0.5
    },
    healthProblems: {
      cardiometabolic: {
        score: 20.1,
        components: {
          diabetes: 7.84,
          hypertension: 22.28,
          obesity: 30.23
        }
      },
      accessBarriers: {
        score: 6.2,
        cliniciansPerCapita: 0.0
      },
      prematureMortality: {
        lifeExpectancy: 0.0,
        infantMortality: 0.0,
        lowBirthweight: 0.0
      },
      pediatricAsthma: {
        score: 12.0
      },
      substanceUse: {
        overdoseRate: 0.0,
        score: 0
      }
    },
    riskLevel: 'medium'
  }
];

// Real intervention levers from the levers.csv
export const INTERVENTION_LEVERS: InterventionLever[] = [
  {
    name: 'Add_Clinic',
    cost: 50000,
    targetMetric: 'Uninsured_%',
    effectPerMonth: -0.3,
    maxEffect: -6.0
  },
  {
    name: 'Screening_Van',
    cost: 10000,
    targetMetric: 'Diabetes_Prevalence',
    effectPerMonth: -0.2,
    maxEffect: -4.0
  },
  {
    name: 'Air_Filtering',
    cost: 5000,
    targetMetric: 'Asthma_Prevalence',
    effectPerMonth: -0.4,
    maxEffect: -8.0
  },
  {
    name: 'Maternal_Program',
    cost: 20000,
    targetMetric: 'InfantMortality_per1k',
    effectPerMonth: -0.25,
    maxEffect: -5.0
  },
  {
    name: 'Addiction_Treatment',
    cost: 15000,
    targetMetric: 'OverdoseRate',
    effectPerMonth: -0.3,
    maxEffect: -6.0
  }
];

// Helper to get ZIP data by ZIP code
export const getZipData = (zipCode: string): RealZipData | undefined => {
  return REAL_ZIP_DATA.find(z => z.zip === zipCode);
};

// Helper to calculate baseline metrics from real data
export const calculateBaselineFromRealData = () => {
  const totalPop = REAL_ZIP_DATA.reduce((sum, z) => sum + z.population, 0);
  
  // Population-weighted averages
  const weightedAvg = (metric: keyof RealZipData['metrics']) => {
    const sum = REAL_ZIP_DATA.reduce((s, z) => {
      return s + (z.metrics[metric] || 0) * z.population;
    }, 0);
    return sum / totalPop;
  };
  
  return {
    asthmaPrevalence: weightedAvg('Asthma_Prevalence'),
    diabetesPrevalence: weightedAvg('Diabetes_Prevalence'),
    hypertensionRate: weightedAvg('Hypertension_Rate'),
    obesityRate: weightedAvg('Obesity_Rate'),
    uninsuredRate: weightedAvg('Uninsured'),
    lifeExpectancy: weightedAvg('LifeExpectancy'),
    overdoseRate: weightedAvg('OverdoseRate'),
    infantMortality: weightedAvg('InfantMortality_per1k')
  };
};

