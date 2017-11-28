import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// TODO: add tier items
export const _items = [
    151968, 151964, 151963, 151993, 152087, 152413, 151985, 152681, 151988, 151989, 151980, 151979, 151992, 152414, 152086, 151984, 151990, 151991, 151987, 152282, 151983, 151981, 152412, 151937, 151938, 152062, 152063, 152688, 152284, 152064, 151973, 151965, 151966, 152160, 152161, 152162, 152163, 152164, 152165,
];

export const _itemBonusMap = {
    915: [3564, 1532], //rf
    930: [3561, 1547], //normal
    945: [3562, 1462], //heroic
    960: [3563, 1577], //mythic
};

// Argus the Unmaker items
export const _bossItems = [
    154174, 151982, 151986, 151972, 152283
];

export const _bossItemBonuses = {
    925: [3564, 1457], //rf
    940: [3561, 1472], //normal
    955: [3562, 1487], //heroic
    970: [3563, 1502], //mythic
};

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in TrialOfValor but was not found in ITEM_DATA`);
};

let cache = {};

export const getAntorusItems = (slot = 'head', min = 0, max = 1000) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [..._items, ..._bossItems].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = [
            ...getRaidTierPermutations(ITEM_DATA, _items, _itemBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _bossItems, _bossItemBonuses, slot, min, max),
        ];

    return cache[key];
};
