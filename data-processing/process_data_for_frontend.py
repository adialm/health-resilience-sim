#!/usr/bin/env python3
"""
Process Boston health data and export for frontend consumption.
Maps tract-level data to ZIP codes and aligns with the 5 health problems.
"""

import pandas as pd
import json
import numpy as np

# The 7 ZIP codes we're focusing on
TARGET_ZIPS = {
    '02134': 'Allston',
    '02119': 'Roxbury',
    '02130': 'Jamaica Plain',
    '02118': 'South End',
    '02215': 'Fenway/Kenmore',
    '02121': 'Dorchester',
    '02135': 'Brighton'
}

# Mapping of census tracts to ZIP codes (Boston/Suffolk County)
# This is a simplified mapping - in production you'd use HUD crosswalk
TRACT_TO_ZIP = {
    # Allston (02134)
    '25025010103': '02134', '25025010104': '02134', '25025010204': '02134',
    '25025010205': '02134', '25025010206': '02134',
    
    # Roxbury (02119)
    '25025080100': '02119', '25025080200': '02119', '25025080300': '02119',
    '25025080400': '02119', '25025080500': '02119', '25025080600': '02119',
    '25025080700': '02119', '25025080800': '02119',
    
    # Jamaica Plain (02130)
    '25025120100': '02130', '25025120200': '02130', '25025120300': '02130',
    '25025120400': '02130', '25025120500': '02130',
    
    # South End (02118)
    '25025070100': '02118', '25025070200': '02118', '25025070300': '02118',
    '25025070400': '02118',
    
    # Fenway/Kenmore (02215)
    '25025061000': '02215', '25025061100': '02215', '25025061200': '02215',
    '25025061300': '02215',
    
    # Dorchester (02121)
    '25025090100': '02121', '25025090200': '02121', '25025090300': '02121',
    '25025090400': '02121', '25025090500': '02121', '25025090600': '02121',
    '25025090700': '02121', '25025090800': '02121', '25025090900': '02121',
    
    # Brighton (02135)
    '25025010403': '02135', '25025010500': '02135', '25025010600': '02135',
    '25025010700': '02135', '25025010800': '02135',
}

def load_tract_data():
    """Load the tract-level baseline data."""
    df = pd.read_csv('Boston_Health_Resilience_Data_Pack/1_BASELINES/baseline_snapshot_Boston_tract.csv')
    return df

def load_levers():
    """Load intervention levers."""
    levers = pd.read_csv('Boston_Health_Resilience_Data_Pack/3_SIMULATOR_INPUTS/levers.csv')
    return levers

def aggregate_to_zip(tract_df):
    """Aggregate tract data to ZIP code level."""
    # Add ZIP code column
    tract_df['GEOID_str'] = tract_df['GEOID'].astype(str)
    tract_df['ZIP'] = tract_df['GEOID_str'].map(TRACT_TO_ZIP)
    
    # Filter to our target ZIPs only
    zip_df = tract_df[tract_df['ZIP'].notna()].copy()
    
    # Population-weighted aggregation
    numeric_cols = [
        'Asthma_Prevalence', 'Diabetes_Prevalence', 'Hypertension_Rate',
        'Obesity_Rate', 'PhysicalInactivity_%', 'Smoking_%', 'Uninsured_%',
        'LifeExpectancy', 'OverdoseRate', 'InfantMortality_per1k',
        'LowBirthweight_%', 'CliniciansPer10k', 'Resilience_Score_0'
    ]
    
    # Aggregate by ZIP
    agg_dict = {'Population': 'sum'}
    for col in numeric_cols:
        if col in zip_df.columns:
            # Weight by population
            zip_df[f'{col}_weighted'] = zip_df[col] * zip_df['Population']
    
    grouped = zip_df.groupby('ZIP')
    
    results = []
    for zip_code, group in grouped:
        if zip_code not in TARGET_ZIPS:
            continue
            
        total_pop = group['Population'].sum()
        
        result = {
            'zip': zip_code,
            'name': TARGET_ZIPS[zip_code],
            'population': int(total_pop),
            'metrics': {}
        }
        
        # Calculate weighted averages
        for col in numeric_cols:
            if col in zip_df.columns and f'{col}_weighted' in zip_df.columns:
                weighted_sum = group[f'{col}_weighted'].sum()
                result['metrics'][col] = round(weighted_sum / total_pop, 2) if total_pop > 0 else 0
        
        results.append(result)
    
    return results

def map_to_health_problems(zip_data):
    """Map raw metrics to the 5 health problems."""
    for item in zip_data:
        m = item['metrics']
        
        # Calculate composite scores for each health problem
        item['healthProblems'] = {
            # 1. Cardiometabolic Diseases (diabetes, hypertension, obesity)
            'cardiometabolic': {
                'score': round((m.get('Diabetes_Prevalence', 0) + 
                               m.get('Hypertension_Rate', 0) + 
                               m.get('Obesity_Rate', 0)) / 3, 1),
                'components': {
                    'diabetes': m.get('Diabetes_Prevalence', 0),
                    'hypertension': m.get('Hypertension_Rate', 0),
                    'obesity': m.get('Obesity_Rate', 0)
                }
            },
            
            # 2. Access Barriers (uninsured, clinicians per capita)
            'accessBarriers': {
                'score': round(m.get('Uninsured_%', 0), 1),
                'cliniciansPerCapita': m.get('CliniciansPer10k', 0)
            },
            
            # 3. Premature Mortality (life expectancy, infant mortality)
            'prematureMortality': {
                'lifeExpectancy': m.get('LifeExpectancy', 0),
                'infantMortality': m.get('InfantMortality_per1k', 0),
                'lowBirthweight': m.get('LowBirthweight_%', 0)
            },
            
            # 4. Pediatric Asthma
            'pediatricAsthma': {
                'score': round(m.get('Asthma_Prevalence', 0), 1)
            },
            
            # 5. Substance Use & Overdose
            'substanceUse': {
                'overdoseRate': m.get('OverdoseRate', 0),
                'score': round(m.get('OverdoseRate', 0), 1) if m.get('OverdoseRate', 0) else 0
            }
        }
        
        # Calculate overall risk level
        risk_factors = [
            m.get('Diabetes_Prevalence', 0),
            m.get('Hypertension_Rate', 0),
            m.get('Uninsured_%', 0),
            m.get('Asthma_Prevalence', 0)
        ]
        avg_risk = np.mean([r for r in risk_factors if r > 0])
        
        if avg_risk > 15:
            item['riskLevel'] = 'high'
        elif avg_risk > 10:
            item['riskLevel'] = 'medium'
        else:
            item['riskLevel'] = 'low'
    
    return zip_data

def export_for_frontend(zip_data, levers_data):
    """Export data in format ready for frontend."""
    # Export ZIP data
    output = {
        'zipCodes': zip_data,
        'interventions': []
    }
    
    # Add intervention metadata from levers
    for _, lever in levers_data.iterrows():
        output['interventions'].append({
            'name': lever['LeverName'],
            'cost': int(lever['UnitCost']),
            'targetMetric': lever['TargetMetric'],
            'effectPerMonth': float(lever['Effect_perUnit_perMonth_%']),
            'maxEffect': float(lever['MaxTotalEffect_%'])
        })
    
    # Write to JSON
    with open('processed_boston_health_data.json', 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"✅ Exported data for {len(zip_data)} ZIP codes")
    print(f"✅ Included {len(output['interventions'])} intervention types")
    
    # Also create a simplified version for quick import
    simplified = {}
    for item in zip_data:
        simplified[item['zip']] = {
            'name': item['name'],
            'population': item['population'],
            'cardiometabolic': item['healthProblems']['cardiometabolic']['score'],
            'accessBarriers': item['healthProblems']['accessBarriers']['score'],
            'asthma': item['healthProblems']['pediatricAsthma']['score'],
            'overdose': item['healthProblems']['substanceUse']['score'],
            'riskLevel': item['riskLevel']
        }
    
    with open('simplified_zip_data.json', 'w') as f:
        json.dump(simplified, f, indent=2)
    
    print("✅ Also created simplified_zip_data.json")
    
    return output

def main():
    print("🔄 Loading tract-level data...")
    tract_df = load_tract_data()
    print(f"   Loaded {len(tract_df)} census tracts")
    
    print("\n🔄 Loading intervention levers...")
    levers_df = load_levers()
    print(f"   Loaded {len(levers_df)} intervention types")
    
    print("\n🔄 Aggregating tracts to ZIP codes...")
    zip_data = aggregate_to_zip(tract_df)
    print(f"   Created data for {len(zip_data)} ZIP codes")
    
    print("\n🔄 Mapping to 5 health problems...")
    zip_data = map_to_health_problems(zip_data)
    
    print("\n🔄 Exporting for frontend...")
    output = export_for_frontend(zip_data, levers_df)
    
    print("\n✅ All done! Files created:")
    print("   - processed_boston_health_data.json (full data)")
    print("   - simplified_zip_data.json (quick reference)")
    print("\nNext steps:")
    print("   1. Review the JSON files")
    print("   2. Copy data to frontend/src/constants/realHealthData.ts")
    print("   3. Update simulation engine to use real lever effects")

if __name__ == '__main__':
    main()

