import { ITEM_DATA } from '../item_data';
import { getRaidTierPermutations } from './tools';

export const _helmWristBelt = [139742, 139745, 139746];

export const _helmWristBeltBonuses = {
    810: [3381],
    840: [3381, 1502],
};

export const _glovesLegs = [139741, 139743];

export const _glovesLegsBonuses = {
    820: [3382],
    840: [3382, 1492],
};

export const _chest = [139739];

export const _chestBonuses = {
    830: [3383],
    840: [3383, 1482],
};
export const _feet = [139740];

export const _feetBonuses = {
    840: [3384],
};
export const _shoulders = [139744];

export const _shouldersBonuses = {
    850: [3385],
};

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been delcared in OrderHallSet but was not found in ITEM_DATA`);
};

let cache = {};

export const getOrderHallSet = (slot = 'head', min = 0, max = 1000) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [..._helmWristBelt, ..._glovesLegs, ..._chest, ..._feet, ..._shoulders].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = {
            ...getRaidTierPermutations(ITEM_DATA, _helmWristBelt, _helmWristBeltBonuses, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _glovesLegs, _glovesLegsBonuses, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _chest, _chestBonuses, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _feet, _feetBonuses, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _shoulders, _shouldersBonuses, slot, min, max),
        };

    return cache[key];
};
