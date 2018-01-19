import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// random enchant item world drop 845?
// 121232, 121236, 121237, 121238, 121239, 121240,
//    121241, 121242, 121243, 121244, 121247, 121248,

//boe world drop 810?
// 141580, 141582, 141583, 141588, 141589, 141590

// Skorpyron, Chronomatic Anomaly and Trilliax , boe
export const _firstTierItems = [
    140901, 140862, 140860, 140863, 140865, 140794, 140858,
    144399, 144400, 144401, 144403, 144405, 141324 // boe
];

export const _firstTierBonuses = {
    855: [3446, 1452], //rf
    870: [3443, 1467], //normal
    885: [3444, 1482], //heroic
    900: [3445, 1497], //mythic
};

// Spellblade Aluriel, Tichondrius, Krosus, High Botanist Tel'arn, Star Augur Etraeus, Elisande
export const _secondTierItems = [
    138326, 138329, 138332, 138335, 138338, 138371, 140796, 140802, 140806,
    140855, 140857, 140859, 140861, 140864, 140866, 140889, 140894, 140895,
    140896, 140897, 140898, 140899, 140900, 140905, 140906, 140908, 140909,
    140910, 141325
];

export const _secondTierBonuses = {
    860: [3520, 1457], //rf
    875: [3514, 1472], //normal
    890: [3516, 1487], //heroic
    905: [3518, 1502], //mythic
};

// Gul'dan
export const _finalBossItems = [140808, 140919, 141326];

export const _finalBossBonuses = {
    865: [3521, 1462], //rf
    880: [3515, 1477], //normal
    895: [3517, 1492], //heroic
    910: [3519, 1507], //mythic
};

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been delcared in NightHold but was not found in ITEM_DATA`);
};

let cache = {};

export const getNHItems = (slot = 'head', min = 0, max = 1000) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [..._firstTierItems, ..._secondTierItems, ..._finalBossItems].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = {
            ...getRaidTierPermutations(ITEM_DATA, _firstTierItems, _firstTierBonuses, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _secondTierItems, _secondTierBonuses, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _finalBossItems, _finalBossBonuses, slot, min, max),
        };

    return cache[key];
};
