import { Map } from 'immutable';
import { RAND_PROP_POINTS, ITEM_SPARSE } from './item_data';
import { JEWELRY_COMBAT_RATINGS_MULT_BY_ILVL,
         TRINKET_COMBAT_RATINGS_MULT_BY_ILVL,
         WEAPON_COMBAT_RATINGS_MULT_BY_ILVL,
         ARMOR_COMBAT_RATINGS_MULT_BY_ILVL } from './multipliers';

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

const STAT_LOOKUP = {
    1: "health",
    2: "mana",
    3: "agility",
    4: "strength",
    5: "intellect",
    6: "spirit",
    7: "stamina",
    12: "defense",
    13: "dodge",
    14: "parry",
    15: "shield_block",
    31: "hit",
    32: "crit",
    33: "hit_avoidance",
    34: "critical_strike_avoidance",
    35: "pvp_resilience",
    36: "haste",
    37: "expertise",
    38: "attack_power",
    40: "versatility",
    41: "damage_done",
    42: "healing_done",
    43: "mana_every_5_seconds",
    44: "armor_penetration",
    45: "power",
    46: "health_every_5_seconds",
    47: "penetration",
    48: "block_value",
    49: "mastery",
    50: "bonus_armor",
    57: "pvp_power",
    58: "amplify",
    59: "multistrike",
    61: "speed",
    62: "leech",
    63: "avoidance",
    64: "indestructible",
    67: "versatility",
    71: "agility",
    72: "agility",
    73: "agility",
}

// Recalculates a stat block based on a change in item level. This function only works above
// ilvl 800, which honestly should be the only place people ever use it.
export function recalculateStats(itemId, itemLevel, slot, quality) {

    let slotType = -1;
    switch (slot) {
        case 'mainHand':
        case 'offHand':
            slotType = 4;
            break;
        case 'head':
        case 'chest':
        case 'legs':
            slotType = 1;
            break;
        case 'shoulder':
        case 'waist':
        case 'feet':
        case 'hands':
        case 'trinket':
            slotType = 2;
            break;
        case 'neck':
        case 'wrist':
        case 'finger':
        case 'back':
            slotType = 3;
            break;
        default:
            slotType = -1;
            break;
    }
    if (slotType == -1) {
        console.log(`item ${itemId} has an unknown slot type ${slot}`);
        return {};
    }

    if (!RAND_PROP_POINTS.hasOwnProperty(itemLevel)) {
        return {};
    }

    const props = RAND_PROP_POINTS[itemLevel];

    let budget = 0;
    if (quality == 4 || quality == 5) {
        budget = parseInt(props[0 + slotType]);
    } else if (quality == 3 || quality == 7) {
        budget = parseInt(props[5 + slotType]);
    } else {
        budget = parseInt(props[10 + slotType]);
    }

    if (!ITEM_SPARSE.hasOwnProperty(itemId)) {
        return {};
    }

    const itemData = ITEM_SPARSE[itemId];
    let stats = {};
    for (let i = 0; i < 10; i++) {
        const statType = parseInt(itemData[52 + i]);
        if (STAT_LOOKUP.hasOwnProperty(statType)) {
            const stat = STAT_LOOKUP[statType];
            let value = Math.round(parseInt(itemData[5 + i]) * budget / 10000.0);

            let multiplier = 1;
            if (stat != 'agility' && stat != 'stamina') {
                switch (slot) {
                    case 'mainHand':
                    case 'offHand':
                        multiplier = WEAPON_COMBAT_RATINGS_MULT_BY_ILVL[itemLevel-1];
                        break;
                    case 'trinket':
                        multiplier = TRINKET_COMBAT_RATINGS_MULT_BY_ILVL[itemLevel-1];
                        break;
                    case 'neck':
                    case 'finger':
                        multiplier = JEWELRY_COMBAT_RATINGS_MULT_BY_ILVL[itemLevel-1];
                        break;
                    default:
                        multiplier = ARMOR_COMBAT_RATINGS_MULT_BY_ILVL[itemLevel-1];
                        break;
                }

                value = value * multiplier;
            }

            stats[stat] = Math.round(value);
        }
        else if (statType != -1) {
            console.log(`STAT type missing: ${statType}`)
        }
    }

    return stats;
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
