// Boston ZIP codes with data for the 5 priority health problems

export interface HealthProblemData {
  cardiometabolic: {
    diabetesPrevalence: number; // percentage
    heartDiseaseRate: number; // per 100k
    hospitalizationRate: number; // per 100k
  };
  accessBarriers: {
    languageBarrierScore: number; // 0-100, higher = more barriers
    culturalCompetenceScore: number; // 0-100, higher = better
    interpreterAvailability: number; // percentage
  };
  prematureMortality: {
    lifeExpectancyGap: number; // years below state average
    maternalMortalityRate: number; // per 100k births
    infantMortalityRate: number; // per 1k births
  };
  pediatricAsthma: {
    asthmaPrevalence: number; // percentage in children
    edVisitsRate: number; // per 1k children
    hospitalizationRate: number; // per 1k children
  };
  substanceUse: {
    overdoseDeathRate: number; // per 100k
    sudTreatmentAccess: number; // percentage
    racialDisparityIndex: number; // 0-100, higher = more disparity
  };
}

export interface ZipCodeData {
  zipCode: string;
  name: string;
  coordinates: [number, number];
  population: number;
  medianIncome: number;
  raceEthnicity: {
    latino: number;
    black: number;
    white: number;
    asian: number;
    other: number;
  };
  healthProblems: HealthProblemData;
  healthcareAccess: {
    clinicsCount: number;
    hospitalsCount: number;
    accessScore: number; // 0-100
  };
}

// 7 Boston ZIP codes with health problem data
export const bostonZipCodes: ZipCodeData[] = [
  {
    zipCode: '02134',
    name: 'Allston',
    coordinates: [-71.131, 42.353],
    population: 29196,
    medianIncome: 42500,
    raceEthnicity: {
      latino: 52,
      black: 8,
      white: 28,
      asian: 10,
      other: 2,
    },
    healthProblems: {
      cardiometabolic: {
        diabetesPrevalence: 14.2,
        heartDiseaseRate: 380,
        hospitalizationRate: 145,
      },
      accessBarriers: {
        languageBarrierScore: 68, // HIGH barriers
        culturalCompetenceScore: 42, // LOW competence
        interpreterAvailability: 35,
      },
      prematureMortality: {
        lifeExpectancyGap: 4.2, // 4.2 years below state average
        maternalMortalityRate: 28,
        infantMortalityRate: 6.8,
      },
      pediatricAsthma: {
        asthmaPrevalence: 16.5,
        edVisitsRate: 125,
        hospitalizationRate: 18,
      },
      substanceUse: {
        overdoseDeathRate: 42,
        sudTreatmentAccess: 38,
        racialDisparityIndex: 72, // HIGH disparity
      },
    },
    healthcareAccess: {
      clinicsCount: 3,
      hospitalsCount: 0,
      accessScore: 45,
    },
  },
  {
    zipCode: '02119',
    name: 'Roxbury',
    coordinates: [-71.084, 42.331],
    population: 23657,
    medianIncome: 38900,
    raceEthnicity: {
      latino: 35,
      black: 42,
      white: 15,
      asian: 5,
      other: 3,
    },
    healthProblems: {
      cardiometabolic: {
        diabetesPrevalence: 16.8,
        heartDiseaseRate: 420,
        hospitalizationRate: 168,
      },
      accessBarriers: {
        languageBarrierScore: 72,
        culturalCompetenceScore: 38,
        interpreterAvailability: 32,
      },
      prematureMortality: {
        lifeExpectancyGap: 5.8,
        maternalMortalityRate: 35,
        infantMortalityRate: 8.2,
      },
      pediatricAsthma: {
        asthmaPrevalence: 18.2,
        edVisitsRate: 145,
        hospitalizationRate: 22,
      },
      substanceUse: {
        overdoseDeathRate: 48,
        sudTreatmentAccess: 35,
        racialDisparityIndex: 78,
      },
    },
    healthcareAccess: {
      clinicsCount: 2,
      hospitalsCount: 1,
      accessScore: 38,
    },
  },
  {
    zipCode: '02130',
    name: 'Jamaica Plain',
    coordinates: [-71.114, 42.310],
    population: 38196,
    medianIncome: 68200,
    raceEthnicity: {
      latino: 25,
      black: 18,
      white: 45,
      asian: 8,
      other: 4,
    },
    healthProblems: {
      cardiometabolic: {
        diabetesPrevalence: 9.2,
        heartDiseaseRate: 220,
        hospitalizationRate: 85,
      },
      accessBarriers: {
        languageBarrierScore: 38,
        culturalCompetenceScore: 68,
        interpreterAvailability: 62,
      },
      prematureMortality: {
        lifeExpectancyGap: 1.5,
        maternalMortalityRate: 12,
        infantMortalityRate: 3.8,
      },
      pediatricAsthma: {
        asthmaPrevalence: 10.5,
        edVisitsRate: 72,
        hospitalizationRate: 9,
      },
      substanceUse: {
        overdoseDeathRate: 22,
        sudTreatmentAccess: 65,
        racialDisparityIndex: 42,
      },
    },
    healthcareAccess: {
      clinicsCount: 5,
      hospitalsCount: 1,
      accessScore: 72,
    },
  },
  {
    zipCode: '02118',
    name: 'South End',
    coordinates: [-71.073, 42.342],
    population: 31501,
    medianIncome: 89500,
    raceEthnicity: {
      latino: 15,
      black: 18,
      white: 55,
      asian: 8,
      other: 4,
    },
    healthProblems: {
      cardiometabolic: {
        diabetesPrevalence: 7.8,
        heartDiseaseRate: 195,
        hospitalizationRate: 68,
      },
      accessBarriers: {
        languageBarrierScore: 28,
        culturalCompetenceScore: 75,
        interpreterAvailability: 72,
      },
      prematureMortality: {
        lifeExpectancyGap: 0.8,
        maternalMortalityRate: 8,
        infantMortalityRate: 2.9,
      },
      pediatricAsthma: {
        asthmaPrevalence: 8.5,
        edVisitsRate: 58,
        hospitalizationRate: 6,
      },
      substanceUse: {
        overdoseDeathRate: 18,
        sudTreatmentAccess: 78,
        racialDisparityIndex: 35,
      },
    },
    healthcareAccess: {
      clinicsCount: 6,
      hospitalsCount: 2,
      accessScore: 85,
    },
  },
  {
    zipCode: '02215',
    name: 'Fenway/Kenmore',
    coordinates: [-71.100, 42.347],
    population: 28742,
    medianIncome: 52300,
    raceEthnicity: {
      latino: 18,
      black: 12,
      white: 58,
      asian: 10,
      other: 2,
    },
    healthProblems: {
      cardiometabolic: {
        diabetesPrevalence: 10.5,
        heartDiseaseRate: 245,
        hospitalizationRate: 92,
      },
      accessBarriers: {
        languageBarrierScore: 42,
        culturalCompetenceScore: 62,
        interpreterAvailability: 58,
      },
      prematureMortality: {
        lifeExpectancyGap: 2.1,
        maternalMortalityRate: 15,
        infantMortalityRate: 4.5,
      },
      pediatricAsthma: {
        asthmaPrevalence: 11.8,
        edVisitsRate: 82,
        hospitalizationRate: 11,
      },
      substanceUse: {
        overdoseDeathRate: 28,
        sudTreatmentAccess: 58,
        racialDisparityIndex: 48,
      },
    },
    healthcareAccess: {
      clinicsCount: 4,
      hospitalsCount: 1,
      accessScore: 65,
    },
  },
  {
    zipCode: '02121',
    name: 'Dorchester',
    coordinates: [-71.082, 42.304],
    population: 44213,
    medianIncome: 46800,
    raceEthnicity: {
      latino: 22,
      black: 38,
      white: 25,
      asian: 12,
      other: 3,
    },
    healthProblems: {
      cardiometabolic: {
        diabetesPrevalence: 15.2,
        heartDiseaseRate: 385,
        hospitalizationRate: 152,
      },
      accessBarriers: {
        languageBarrierScore: 65,
        culturalCompetenceScore: 45,
        interpreterAvailability: 42,
      },
      prematureMortality: {
        lifeExpectancyGap: 4.5,
        maternalMortalityRate: 32,
        infantMortalityRate: 7.5,
      },
      pediatricAsthma: {
        asthmaPrevalence: 17.2,
        edVisitsRate: 135,
        hospitalizationRate: 20,
      },
      substanceUse: {
        overdoseDeathRate: 38,
        sudTreatmentAccess: 42,
        racialDisparityIndex: 68,
      },
    },
    healthcareAccess: {
      clinicsCount: 4,
      hospitalsCount: 0,
      accessScore: 52,
    },
  },
  {
    zipCode: '02135',
    name: 'Brighton',
    coordinates: [-71.153, 42.347],
    population: 42634,
    medianIncome: 58900,
    raceEthnicity: {
      latino: 20,
      black: 8,
      white: 62,
      asian: 8,
      other: 2,
    },
    healthProblems: {
      cardiometabolic: {
        diabetesPrevalence: 10.8,
        heartDiseaseRate: 265,
        hospitalizationRate: 98,
      },
      accessBarriers: {
        languageBarrierScore: 45,
        culturalCompetenceScore: 58,
        interpreterAvailability: 52,
      },
      prematureMortality: {
        lifeExpectancyGap: 2.3,
        maternalMortalityRate: 18,
        infantMortalityRate: 4.8,
      },
      pediatricAsthma: {
        asthmaPrevalence: 12.5,
        edVisitsRate: 88,
        hospitalizationRate: 12,
      },
      substanceUse: {
        overdoseDeathRate: 32,
        sudTreatmentAccess: 55,
        racialDisparityIndex: 52,
      },
    },
    healthcareAccess: {
      clinicsCount: 5,
      hospitalsCount: 1,
      accessScore: 68,
    },
  },
];

// Calculate citywide averages for comparison
export const cityWideAverages = {
  totalPopulation: bostonZipCodes.reduce((sum, zip) => sum + zip.population, 0),
  averageIncome: Math.round(
    bostonZipCodes.reduce((sum, zip) => sum + zip.medianIncome, 0) / bostonZipCodes.length
  ),
  healthProblems: {
    avgDiabetesPrevalence: Number(
      (
        bostonZipCodes.reduce((sum, zip) => sum + zip.healthProblems.cardiometabolic.diabetesPrevalence, 0) /
        bostonZipCodes.length
      ).toFixed(1)
    ),
    avgLanguageBarriers: Math.round(
      bostonZipCodes.reduce((sum, zip) => sum + zip.healthProblems.accessBarriers.languageBarrierScore, 0) /
        bostonZipCodes.length
    ),
    avgLifeExpectancyGap: Number(
      (
        bostonZipCodes.reduce((sum, zip) => sum + zip.healthProblems.prematureMortality.lifeExpectancyGap, 0) /
        bostonZipCodes.length
      ).toFixed(1)
    ),
    avgPediatricAsthma: Number(
      (
        bostonZipCodes.reduce((sum, zip) => sum + zip.healthProblems.pediatricAsthma.asthmaPrevalence, 0) /
        bostonZipCodes.length
      ).toFixed(1)
    ),
    avgOverdoseRate: Math.round(
      bostonZipCodes.reduce((sum, zip) => sum + zip.healthProblems.substanceUse.overdoseDeathRate, 0) /
        bostonZipCodes.length
    ),
  },
  avgAccessScore: Math.round(
    bostonZipCodes.reduce((sum, zip) => sum + zip.healthcareAccess.accessScore, 0) /
      bostonZipCodes.length
  ),
};

