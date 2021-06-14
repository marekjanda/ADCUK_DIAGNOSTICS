from knowledgebase import *

'''
# Define High Pressure Causes
HP_causes = {
    '0': "Overcharged",
    '1': "Air in system",
    '2': "Choked liquid strainer",
    '3': "Lack of condeser water / air",
    '4': "Condeser scaled or dirty",
    '5': "Compressor not fully loaded",
    '6': "Compressor not unloading",
    '7': "Fractured bursting disc",
    '8': "Broken suction valve(s)",
    '9': "Broken delivery valve(s)",
    '10': "Partial seizure of compressor",
    '11': "Power failure or low voltage",
    '12': "Water / Air temperature on condeser too low", 
}

# Define Low pressure causes
LP_causes = {
    '0': "Undercharged",
    '1': "Lack of evaporator load",
    '2': "Excessive evaporator load",
    '3': "Moisture in system",
    '4': "Choked suction strainer",
    '5': "Faulty B.P.V. (open)",
    '6': "Faulty B.P.V. (closed)",
    '7': "Faulty expansion valve (open)",
    '8': "Faulty expansion valve (closed)",
    '9': "Loss of oil from crankcase",
    '10': "Dilution of oil by refrigerant",
    '11': "Choked oil filter or gland valve shut",
    '12': "Faulty liquid line solenoid valve (closed)"
}
'''

# Define diagnostics rules
diagnostics = {
    #(primary_cause, secondary_cause): {high_pressure: [], low_pressure: []}
    ("0","0"): {
        'HP': [HP_causes['0'], HP_causes['1'], HP_causes['2'], HP_causes['3'], HP_causes['4']],
        'LP': [LP_causes['3'], LP_causes['8'], LP_causes['12']]
    },
    ("0","1"): {
        'HP': [HP_causes['2'], HP_causes['6']],
        'LP': [LP_causes['0'], LP_causes['1'], LP_causes['3'], LP_causes['4'], LP_causes['6'], LP_causes['8'], LP_causes['12']]
    },
    ("0","2"): {
        'HP': [],
        'LP': [LP_causes['9'], LP_causes['10'], LP_causes['11']]
    },
    ("0","3"): {
        'HP': [HP_causes['3'], HP_causes['4'], HP_causes['10'], HP_causes['11']],
        'LP': [LP_causes['2']]
    },
    ("1","4"): {
        'HP': [HP_causes['5'], HP_causes['7'], HP_causes['8'], HP_causes['9']],
        'LP': [LP_causes['2'], LP_causes['5']]
    },
    ("1","5"): {
        'HP': [HP_causes['0']],
        'LP': [LP_causes['7']]
    },
    ("2","6"): {
        'HP': [HP_causes['2']],
        'LP': [LP_causes['0'], LP_causes['3'], LP_causes['6'], LP_causes['8'], LP_causes['12']]
    },
    ("2","4"): {
        'HP': [HP_causes['6']],
        'LP': [LP_causes['1'], LP_causes['4']]
    },
    ("3","7"): {
        'HP': [HP_causes['1']],
        'LP': []
    },
    ("3","8"): {
        'HP': [HP_causes['0'], HP_causes['3'], HP_causes['4']],
        'LP': [LP_causes['2']]
    },
    ("4","7"): {
        'HP': [HP_causes['7'], HP_causes['8'], HP_causes['9']],
        'LP': [LP_causes['0'], LP_causes['4'], LP_causes['6']]
    },
    ("4","8"): {
        'HP': [HP_causes['5']],
        'LP': [LP_causes['1']]
    },
    ("4","9"): {
        'HP': [HP_causes['0']],
        'LP': [LP_causes['7']]
    },
    ("5","10"): {
        'HP': [HP_causes['0'], HP_causes['1'], HP_causes['3'], HP_causes['4'], HP_causes['10']],
        'LP': [LP_causes['2']]
    },
    ("5","11"): {
        'HP': [HP_causes['2'], HP_causes['5'], HP_causes['7'], HP_causes['8']],
        'LP': [LP_causes['0'], LP_causes['1'], LP_causes['4'], LP_causes['6'], LP_causes['8'], LP_causes['12']]
    },
    ("6","12"): {
        'HP': [HP_causes['0'], HP_causes['1'], HP_causes['2'], HP_causes['12']],
        'LP': [LP_causes['8']]
    }
}