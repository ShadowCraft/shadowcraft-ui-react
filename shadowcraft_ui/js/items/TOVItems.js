import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// Odyn and Guarm items
export const _items = [
    142506, 142432, 142417, 142412, 142430, 142540, 142419, 142520, 
];

export const _itemBonusMap = {
    845: [3564, 1462], //rf
    860: [3561, 1477], //normal
    875: [3562, 1492], //heroic
    890: [3563, 1507], //mythic
};

// Helya items
export const _bossItems = [142541, 142416, 142418, 142428]

export const _bossItemBonuses = {
    850: [3564, 1467], //rf
    865: [3561, 1482], //normal
    880: [3562, 1497], //heroic
    895: [3563, 1512], //mythic    
};

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in TrialOfValor but was not found in ITEM_DATA`);
};

let cache = {};

export const getTOVItems = (slot = 'head', min = 0, max = 1000) => {
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
