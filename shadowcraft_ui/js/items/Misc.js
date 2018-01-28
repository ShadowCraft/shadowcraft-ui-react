import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// Relinquished/unsullied items
const relinquishedItemIds = [
    152754, 152755, 152756, 152757, 152758, 152759, 152760, 152761 // Arinor Keeper's set
];

const relinquishedBonusMap = [
    880: [1472, 3629],
    915: [1502, 3573]
];

const bsWorldBossItemIds = [
    147737, 147738, 147739, 147740, 147741, 147742, 147764, 147765, 147766, 147767
];

const bsWorldBossBonusMap = [
    900: [3572, 1482]
];

const worldDropItemIds = [
    134280, 134281, 134282, 134283, 134284, 134285, 134286, 134287, // Swordsinger's
];

const worldDropBonusMap = [
    845: [1826, 1507],
];

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in TrialOfValor but was not found in ITEM_DATA`);
};

let cache = {};
// note: need to change the default because not all slots are covered in this set
export const getMiscItems = (slot, min, max) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [...relinquishedItemIds].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = [
            ...getRaidTierPermutations(ITEM_DATA, relinquishedItemIds, relinquishedBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, bsWorldBossItemIds, bsWorldBossBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, worldDropItemIds, worldDropBonusMap, slot, min, max),
        ];
        
    return cache[key];
};
