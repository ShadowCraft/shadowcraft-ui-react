import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// Relinquished/unsullied items
const relinquishedItemIds = [
    152754, 152755, 152756, 152757, 152758, 152759, 152760, 152761, // Arinor Keeper's set
    153172, 152783, 152782, 152781, 152780, 152779, 152778,
];

const relinquishedBonusMap = {
    880: [1472, 3629],
    915: [1502, 3573]
};

// Broken Shore world boss items
const bsWorldBossItemIds = [
    147737, 147738, 147739, 147740, 147741, 147742, 147764, 147765, 147766, 147767
];

const bsWorldBossBonusMap = {
    900: [3572, 1482]
};


// World boss items from everywhere else
const worldBossItemIds = [
    141486, 141482, 141473, 141547, 141546, 141545, 141544, 141543, 141542, 141541,
    141540, 141539, 141538, 141537, 141535, 141534, 141533, 141506, 141492, 141488,
    141487, 141475, 141453, 141448, 141445, 141444, 141440, 141438, 141430, 141429,
    141419, 141418, 141417,
];

const worldBossBonusMap = {
    860: [3466, 1472]
};


// Various items that drop from lots of places in the world. Most of these items come
// from relinquished items.
const _845WorldDropItemIds = [
    134280, 134281, 134282, 134283, 134284, 134285, 134286, 134287, // Swordsinger's
    150990, 150989, 121288, 121284, 146867, 146858, 139103, 139101, 146776, 146767,
    139065, 134191, 134245, 134249, 134275, 134279, 134319, 134323, 134367, 134376,
    139063, 134157, 134161, 136733, 136737, 134187, 139063,
];

const _845WorldDropBonusMap = {
    845: [1826, 1507],
};


const _810WorldDropItemIds = [
    141585, 141590, 141589, 141588, 141587, 141583, 141582, 141581, 141580, 141571,
    141570, 141569, 141568,
];

const _810WorldDropBonusMap = {
    810: [1472]
};

// Items purchasable from various factions
const _820FactionItemIds = [
    139605, 139606, 139601
];

const _820FactionBonusMap = {
    820: [1472]
};

const _850FactionItemIds = [
    139596, 139607
];

const _850FactionBonusMap = {
    850: [1472]
};

// Various quest reward items
const questItemIds = [
    129997, 121804, 121801, 129993, 121759, 121739, 121738, 141867, 141008, 140624, 131796,
    139952, 139897,
];

const questBonusMap = {
    800: [1472]
};


let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in Misc but was not found in ITEM_DATA`);
};

let cache = {};
// note: need to change the default because not all slots are covered in this set
export const getMiscItems = (slot, min, max) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [...relinquishedItemIds,
        ...bsWorldBossItemIds,
        ...worldBossItemIds,
        ..._845WorldDropItemIds,
        ..._810WorldDropItemIds,
        ..._820FactionItemIds,
        ..._850FactionItemIds,
        ...questItemIds].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = [
            ...getRaidTierPermutations(ITEM_DATA, relinquishedItemIds, relinquishedBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, bsWorldBossItemIds, bsWorldBossBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, worldBossItemIds, worldBossBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _845WorldDropItemIds, _845WorldDropBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _810WorldDropItemIds, _810WorldDropBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _820FactionItemIds, _820FactionBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _850FactionItemIds, _850FactionBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, questItemIds, questBonusMap, slot, min, max),
        ];

    return cache[key];
};
