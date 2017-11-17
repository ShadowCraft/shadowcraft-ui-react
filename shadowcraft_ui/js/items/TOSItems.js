import { ITEM_DATA } from '../item_data';
import { createItem } from './createItem';

const items = [
    146984, 146985, 147004, 147006, 147007, 147009, 147010, 147011, 147012, 147013, 147014, 147015,
    147016, 147017, 147018, 147019, 147020, 147021, 147022, 147023, 147024, 147025, 147026, 147027,
    147028, 147029, 147030, 147031, 147032, 147033, 147035, 147036, 147037, 147039, 147040,
    147041, 147042, 147169, 147170, 147171, 147172, 147173, 147174, 147193, 147194, 151190
];

const itemBonusMap = {
    885: [3564, 1467], //rf
    900: [3561, 1482], //normal
    915: [3562, 1497], //heroic
    930: [3563, 1512], //mythic
};

// kil'jaden items
const bossItems = [147195, 147347, 147034];

const bossItemBonuses = {
    895: [3564, 1477], //rf
    910: [3561, 1492], //normal
    925: [3562, 1507], //heroic
    940: [3563, 1522], //mythic    
};

export const getItems = (itemdata, whitelist = [], bonusmap, slot = '', min, max) => {

    const whitelistfilter = item => whitelist.length ? whitelist.includes(item.id) : true;

    const slotfilter = item => slot !== '' ? item.equip_location === slot : true;

    // check that our items are included in the whitelist and that it is the right slot to avoid work
    const filteredItems = itemdata.filter(item => whitelistfilter(item) && slotfilter(item));

    const minfilter = ilvl => parseInt(min) ? ilvl >= parseInt(min) : true;

    const maxfilter = ilvl => parseInt(max) ? ilvl <= parseInt(max) : true;

    //filtering on bonusmap to minimize the coming permutations
    const filteredBonusMap = Object.keys(bonusmap).filter(ilvl => minfilter(ilvl) && maxfilter(ilvl));

    // this translates the raw items to final items with the right stats, ilvl and bonuses
    const mapBonusesToItems = item => filteredBonusMap.map(ilvl => createItem(item, ilvl, bonusmap[ilvl]));

    //many permutations, handle it
    const modifiedItems =
        filteredItems
            .map(item => mapBonusesToItems(item))
            .reduce((p, c) => p.concat(c), []);

    return modifiedItems;
};

let isChecked = false;

const checkWhiteList = id => {
    if (ITEM_DATA.find(i => i.id === id) !== undefined) return;
    //eslint-disable-next-line no-console
    console.warn(`Itemid ${id} has been delcared in TOSItems but was not found in ITEM_DATA`);
};

export const getTOSItems = (slot, min, max) => {
    // do a check and send a warning log if we have an item defined but not found in item data
    // uses a flag to only check it once
    if (!isChecked) {
        [...items, ...bossItems].forEach(checkWhiteList);
        isChecked = true;
    }
    return [
        ...getItems(ITEM_DATA, items, itemBonusMap, slot, min, max),
        ...getItems(ITEM_DATA, bossItems, bossItemBonuses, slot, min, max),
    ];
};
