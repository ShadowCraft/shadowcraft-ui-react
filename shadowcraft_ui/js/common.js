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
    955: 74
};

export function getArtifactIlvlChange(oldRelic, newRelic)
{
    return RELIC_ILVL_MAPPING[newRelic] - RELIC_ILVL_MAPPING[oldRelic];
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
}

// Recalculates a stat block based on a change in item level.
export function recalculateStats(baseStats, ilvlChange) {
    let newStats;

    if (ilvlChange != 0) {
        newStats = {};
        let ilvlMultiplier = 1.0 / Math.pow(1.15, (ilvlChange / -15.0));
        let secondaryMultiplier = Math.pow(1.0037444020662509239443726693104, ilvlChange);

        for (let stat in baseStats) {
            newStats[stat] = baseStats[stat];
            if (stat == 'speed') {
                continue;
            }

            if (stat != 'agility' && stat != 'stamina') {
                newStats[stat] *= secondaryMultiplier;
            }

            newStats[stat] = Math.round(newStats[stat] * ilvlMultiplier);
        }
    }
    else
    {
        newStats = Object.assign({}, baseStats);
    }

    return newStats;
}

export function getStatValue(stats, weights) {
    let value = 0;
    //explicit to mind possible mismatched/missing property names
    value += (stats.agility || 0) * weights.agi;
    value += (stats.crit || 0) * weights.crit;
    value += (stats.haste || 0) * weights.haste;
    value += (stats.mastery || 0) * weights.mastery;
    value += (stats.versatility || 0) * weights.versatility;

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
