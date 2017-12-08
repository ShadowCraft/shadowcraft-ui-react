import { Map } from 'immutable';

let RELIC_ILVL_MAPPING = {
    650: 2,
    660: 2,
    680: 2,
    682: 2,
    685: 2,
    690: 2,
    694: 3,
    695: 3,
    700: 4,
    705: 5,
    707: 6,
    710: 7,
    715: 8,
    719: 9,
    720: 9,
    725: 10,
    730: 12,
    735: 13,
    740: 14,
    743: 15,
    745: 15,
    750: 17,
    755: 18,
    756: 18,
    760: 19,
    765: 21,
    768: 21,
    769: 21,
    770: 22,
    775: 23,
    780: 24,
    790: 27,
    805: 31,
    810: 32,
    815: 33,
    820: 35,
    825: 36,
    830: 37,
    835: 39,
    840: 40,
    845: 42,
    850: 43,
    855: 45,
    860: 46,
    865: 48,
    870: 49,
    875: 51,
    880: 52,
    885: 53,
    890: 55,
    895: 56,
    900: 58,
    905: 59,
    910: 61,
    915: 62,
    920: 64,
    925: 65,
    930: 67,
    935: 68,
    940: 70,
    945: 71,
    950: 72,
    955: 74,
    960: 75,
    965: 77,
    970: 78,
    975: 80,
    980: 81,
    985: 83
};

export function getArtifactIlvlChange(oldRelic, newRelic)
{
    if (oldRelic != 0) {
        return RELIC_ILVL_MAPPING[newRelic] - RELIC_ILVL_MAPPING[oldRelic];
    } else {
        return RELIC_ILVL_MAPPING[newRelic];
    }
}

export const MULTI_ITEM_SETS = {
    T19: {
        ids: [138326, 138329, 138332, 138335, 138338, 138371],
        bonuses: {4: "rogue_t19_4pc", 2: "rogue_t19_2pc"}
    },
    T20: {
        ids: [147169, 147170, 147171, 147172, 147173, 147174],
        bonuses: {4: "rogue_t20_4pc", 2: "rogue_t20_2pc"}
    },
    T21: {
        ids: [152160, 152161, 152162, 152163, 152164, 152165],
        bonuses: {4: "rogue_t21_4pc", 2: "rogue_t21_2pc"}
    },
    ORDERHALL: {
        ids: [139739, 139740, 139741, 139742, 139743, 139744, 139745, 139746],
        bonuses: {8: "rogue_orderhall_8pc"}
    },
    MARCH_OF_THE_LEGION: {
        ids: [134529, 134533],
        bonuses: {2: "march_of_the_legion_2pc"}
    },
    JOURNEY_THROUGH_TIME: {
        ids: [137419, 137487],
        bonuses: {2: "journey_through_time_2pc"}
    },
    JACINS_RUSE: {
        ids: [137480, 137397],
        bonuses: {2: "jacins_ruse_2pc"}
    },
    TOES_KNEES: {
        ids: [142164, 142203],
        bonuses: {2: 'kara_empowered_2pc'}
    },
    BLOODSTAINED: {
        ids: [142159, 142203],
        bonuses: {2: 'kara_empowered_2pc'}
    },
    EYE_OF_COMMAND: {
        ids: [142167, 142203],
        bonuses: {2: 'kara_empowered_2pc'}
    }
};

// Recalculates a stat block based on a change in item level. This function only works above
// ilvl 800, which honestly should be the only place people ever use it.
export function recalculateStats(baseStats, ilvlChange, slot) {

    if (ilvlChange == 0) {
        return baseStats;
    }

    let primaryMultiplier = Math.pow(1.15, (ilvlChange / 15.0));

    // Secondary multipler is different for jewelry than for everything else
    let secondaryMultiplier = 0.0;
    if (slot == 'neck' || (slot && slot.includes('finger'))) {
        secondaryMultiplier = Math.pow(0.996754034, ilvlChange);
    }
    else {
        secondaryMultiplier = Math.pow(0.9944435486, ilvlChange);
    }

    let newStats;

    if (Map.isMap(baseStats)) {
        newStats = new Map();
        baseStats.entrySeq().forEach(function([stat, value]) {
            // Ignore weapon speed
            if (stat != 'speed') {
                // For secondary stats, apply the secondary multipler too
                let newValue = value;
                if (stat != 'agility' && stat != 'stamina' && stat != 'dps' && stat != 'min_dmg' && stat != 'max_dmg') {
                    newValue *= secondaryMultiplier;
                }

                newValue = Math.round(newValue * primaryMultiplier);
                newStats = newStats.set(stat, newValue);
            }
            else {
                newStats = newStats.set(stat, value);
            }
        });
    }
    else {
        newStats = {};
        for (let stat in baseStats) {
            newStats[stat] = baseStats[stat];

            // Ignore weapon speed
            if (stat == 'speed') {
                continue;
            }

            // For secondary stats, apply the secondary multipler too
            if (stat != 'agility' && stat != 'stamina' && stat != 'dps' && stat != 'min_dmg' && stat != 'max_dmg') {
                newStats[stat] *= secondaryMultiplier;
            }

            newStats[stat] = Math.round(newStats[stat] * primaryMultiplier);
        }
    }

    return newStats;
}

export function getStatValue(stats, weights) {
    let value = 0;

    if (Map.isMap(stats)) {
        // TODO: weights might need the same treatment here depending on who's calling
        // this method.
        value += (stats.get('agility') || 0) * weights.agi;
        value += (stats.get('crit') || 0) * weights.crit;
        value += (stats.get('haste') || 0) * weights.haste;
        value += (stats.get('mastery') || 0) * weights.mastery;
        value += (stats.get('versatility') || 0) * weights.versatility;
    }
    else {
        //explicit to mind possible mismatched/missing property names
        value += (stats.agility || 0) * weights.agi;
        value += (stats.crit || 0) * weights.crit;
        value += (stats.haste || 0) * weights.haste;
        value += (stats.mastery || 0) * weights.mastery;
        value += (stats.versatility || 0) * weights.versatility;
    }

    return value;
}

// The istanbul statements below cause jest to ignore these methods when calculating coverage
// statistics. These methods are hard to unit test because they require the browser to
// be there to actually function.

// Good god I hope our users are using browsers that support local storage. This is a stupid
// method that makes sure they are. The
export /* istanbul ignore next */function storageAvailable() {
    try {
        var storage = window['localStorage'],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
               // acknowledge QuotaExceededError only if there's something already stored
               storage.length !== 0;
    }
}

export /* istanbul ignore next */function storageSet(name, value) {
    try {
        window['localStorage'].setItem(name, JSON.stringify(value));
    }
    catch(e) {
        console.log(e);
    }
}

export /* istanbul ignore next */function storageGet(name) {
    let value = window.localStorage.getItem(name);
    if (value != null) {
        value = JSON.parse(value);
    }
    return value;
}

export /* istanbul ignore next */function storageClear() {
    window['localStorage'].clear();
}
