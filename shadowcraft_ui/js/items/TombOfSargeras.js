import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

export const _items = [
    146984, 146985, 147009, 147010, 147011, 147012, 147013, 147014, 147015, 147020, 147021, 147027,
    147028, 147029, 147030, 147031, 147032, 147033, 147035, 147037, 147039, 147040, 147041, 147042,
    147169, 147170, 147171, 147172, 147173, 147174, 147193, 147194, 147425, 147424, 147038, 
];

export const _itemBonusMap = {
    885: [3564, 1467], //rf
    900: [3561, 1482], //normal
    915: [3562, 1497], //heroic
    930: [3563, 1512], //mythic
};

// kil'jaden items
export const _bossItems = [147195, 147347, 147034, 151190];

export const _bossItemBonuses = {
    895: [3564, 1477], //rf
    910: [3561, 1492], //normal
    925: [3562, 1507], //heroic
    940: [3563, 1522], //mythic    
};

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in TOSItems but was not found in ITEM_DATA`);
};

let cache = {};

export const getTOSItems = (slot = 'head', min = 0, max = 1000) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [..._items, ..._bossItems].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = {
            ...getRaidTierPermutations(ITEM_DATA, _items, _itemBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _bossItems, _bossItemBonuses, slot, min, max),
        };

    return cache[key];
};
