import { ITEM_DATA } from '../item_data';
import { getRaidTierPermutations } from './tools';

export const _items = [
    137030, 137031, 137032, 132444, 132452, 141321, 133976, 150936, 151815, 151817, 151818,
    144236, 144249, 144258, 144259, 152626, 137021, 137049, 137069, 137098, 137099, 137100,
    154172, 146669
];

// For legendaries, include the current tier and the one before
export const _itemBonuses = {
    970: [3459, 3570],
    1000: [1811, 3630]
};

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been delcared in Legendaries but was not found in ITEM_DATA`);
};

let cache = {};

export const getLegendarySet = (slot = 'head', min = 0, max = 1000) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [..._items].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = {
            ...getRaidTierPermutations(ITEM_DATA, _items, _itemBonuses, slot, min, max)
        };

    return cache[key];
};
