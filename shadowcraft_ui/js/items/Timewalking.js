import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// Some of these items are also drops from the greater invasions on Argus
export const blackTempleItemIds = [
    152365, 152363, 152362, 152361, 152359, 152364, 152360, 152358, 
];

export const blackTempleBonusMap = [
    910: [3573, 1452], // relinquished
    930: [3614, 1472]  // TW
];

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in Timewalking but was not found in ITEM_DATA`);
};

let cache = {};
// note: need to change the default because not all slots are covered in this set
export const getTWItems = (slot, min, max) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [...blackTempleItemIds].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = [
            ...getRaidTierPermutations(ITEM_DATA, blackTempleItemIds, blackTempleBonusMap, slot, min, max),
        ];
        
    return cache[key];
};
