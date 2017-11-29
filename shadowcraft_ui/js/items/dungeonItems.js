import { getRaidTierPermutations } from './tools';
import { ITEM_DATA } from '../item_data';

// 7.0 dungeons (N/H/M) - BRH, DHT, EoA, HoV, Maw, NL, VoW, VH
export const _70_nhmItems = [
    // BRH
    136977, 139242, 134442, 134490, 134440, 134412, 134373, 136979, 134528, 136715,
    // DHT
    134487, 134429, 139071, 134452, 121299, 134531, 134461, 139070, 137312, 137311, 137320, 134537, 134405, 121293, 134448,
    // EoA
    134240, 134441, 134492, 134525, 137364, 134238, 134406, 134539, 134456, 134239, 134438, 137373, 134497, 134532, 134459, 134237,
    // HoV
    133642, 134194, 133621, 134196, 133620, 133679, 133639, 136975, 133615, 133633, 133617, 133638, 121128, 133765, 133767, 136776, 134192, 139281,
    // Maw
    134199, 133637, 133616, 133644, 137324, 133771, 134197, 137332, 133636, 133618, 133634,
    // NL
    139105, 137336, 134491, 134443, 134530, 134152, 134408, 134458, 134524, 134455, 137353, 134495, 137357, 134154,
    // VoW
    134369, 137509, 137537, 137532, 137511, 137530, 137539, 137510, 137512, 137535, 137513, 137533, 137536, 137514, 137515, 134371, 137531,
    // VH
    134493, 134445, 134411, 134457, 137461, 134404, 137435, 137439, 134454, 137438, 134450, 137442, 134534, 137425, 137427, 134489, 134541, 134527, 137448, 137449, 134371, 137455, 134368, 137459, 134446, 134407, 137458,
];

export const _70_nhmBonusMap = {
    845: [3561, 1497], //normal
    865: [3562, 1517], //heroic
    885: [3563, 1537], //mythic
};

// 7.0 dungeons (H/M only) - CoS, Arcway
export const _70_suramarItems = [
    // CoS
    134280, 137480, 137483, 134460, 134374, 134529, 137487, 134447, 137486, 137497, 134287,
    // Arcway
    137397, 134280, 134526, 134488, 134402, 134453, 134373, 134449, 137406, 134533, 134540, 137409, 134410, 137418, 137415, 134444, 137419, 134286,
];

export const _70_suramarBonusMap = {
    865: [3562, 1517], //heroic
    885: [3563, 1537], //mythic
};

// 7.1 dungeons - Kara Upper, Kara Lower. Kara is broken into three sets of bbsses. The first
// four bosses (lower kara) are one set. The second four bosses (upper kara) are another set,
// and Nightbane is a set by himself.
export const _karaFirstSetItems = [
    142164, 142159, 142139, 142146, 142205, 142196, 142143, 142300, 142140, 142170, 142206, 142174, 142171,
];

export const _karaFirstSetBonusMap = {
    865: [3562, 1482], //heroic
    885: [3563, 1502], //mythic
};

export const _karaSecondSetItems = [
    142144, 142167, 142142, 142215, 142207, 142172, 142173, 142141
];

export const _karaSecondSetBonusMap = {
    865: [3562, 1477], //heroic
    885: [3563, 1497], //mythic
};

export const _karaThirdSetItems = [
    142203,
];

export const _karaThirdSetBonusMap = {
    865: [3562, 1462], //heroic
    885: [3563, 1482], //mythic
};

// 7.2 dungeons - CoEN (heroic and mythic only)
export const _72_items = [
    144483, 144468, 144477, 144479, 144485, 144484, 144481, 144476, 144489, 144488, 144478, 144486, 144487
];

export const _72_bonusMap = {
    865: [3562, 1517], //heroic
    885: [3563, 1537], //mythic
};

// 7.3 dungeons - SotT (heroic and mythic only)
export const _73_items = [
    151336, 151315, 151308, 151312, 151318, 151314, 151307, 151316, 151309, 151317, 151319, 151311, 151313
];

export const _73_bonusMap = {
    845: [3562, 1497], //heroic
    865: [3563, 1507], //mythic
};

let _isInitialized = false;

const _checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been declared in DungeonItems but was not found in ITEM_DATA`);
};

let cache = {};

export const getDungeonItems = (slot = 'head', min = 0, max = 1000) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!_isInitialized) {
        [..._70_nhmItems,
        ..._70_suramarItems,
        ..._karaFirstSetItems,
        ..._karaSecondSetItems,
        ..._karaThirdSetItems,
        ..._72_items,
        ..._73_items].forEach(_checkWhiteList);
        _isInitialized = true;
    }
    let key = slot + min + max;
    if (cache[key] === undefined)
        cache[key] = [
            ...getRaidTierPermutations(ITEM_DATA, _70_nhmItems, _70_nhmBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _70_suramarItems, _70_suramarBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _karaFirstSetItems, _karaFirstSetBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _karaSecondSetItems, _karaSecondSetBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _karaThirdSetItems, _karaThirdSetBonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _72_items, _72_bonusMap, slot, min, max),
            ...getRaidTierPermutations(ITEM_DATA, _73_items, _73_bonusMap, slot, min, max),
        ];

    return cache[key];
};
