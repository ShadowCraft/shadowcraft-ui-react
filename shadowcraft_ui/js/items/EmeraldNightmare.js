import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// Emerald Nightmare doesn't have split ilvls like other raids do. All bosses drop the
// same set of ilvls.
export const _items = [
    139320, 139325, 139334, 139329, 139204, 139205, 139206, 139207, 139208,
    138219, 139209, 139202, 139197, 139198, 139201, 139203, 139199, 139200,
    138221, 139248, 139239, 139332, 138220, 139236, 139237, 139238, 141696,
    141006, 140996
];

export const _itemBonusMap = {
    835: [3564, 1457], //rf
    850: [3561, 1472], //normal
    865: [3562, 1487], //heroic
    880: [3563, 1502], //mythic
};

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in EmeraldNightmareItems but was not found in ITEM_DATA`);
};

let cache = {};

export const getENItems = (slot = 'head', min = 0, max = 1000) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        _items.forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = [
            ...getRaidTierPermutations(ITEM_DATA, _items, _itemBonusMap, slot, min, max),
        ];

    return cache[key];
};
