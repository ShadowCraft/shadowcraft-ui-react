import { getTOSItems } from './TombOfSargeras';
import { getNHItems } from './Nighthold';
import { getLegionCraftedItems } from './legionCraftedItems';
import { getDungeonItems } from './dungeonItems';
import { getENItems } from './EmeraldNightmare';
import { getTOVItems } from './TrialOfValor';
import { getAntorusItems } from './Antorus';
import { getPVPItems } from './pvpItems';
import { getOrderHallSet } from './OrderHallSet';
import { getLegendarySet } from './Legendaries';
import { ITEM_DATA } from '../item_data';

// we can just register the different definitions here (the multiple TOS entrys are just an example, they would all be different)
// we can also impliment any caching or local storage stategies here
export function getItems(slot = 'head', min = 0, max = 10000, currentIlvl, includeMissing = true) {

    let variants = getVariants(slot, min, max, currentIlvl);
    let missing = getMissingItems(ITEM_DATA, variants, slot, min, max);
    return [...variants, ...missing];
}

export function getVariants(slot = 'head', min = 0, max = 10000, currentIlvl) {
    return [
        ...getTOSItems(slot, min, max), // important to spread into this array, not just assign
        ...getNHItems(slot, min, max),
        ...getLegionCraftedItems(slot, currentIlvl),
        ...getDungeonItems(slot, currentIlvl),
        ...getENItems(slot, min, max),
        ...getTOVItems(slot, min, max),
        ...getAntorusItems(slot, min, max),
        ...getPVPItems(slot, min, max),
        ...getOrderHallSet(slot, min, max),
        ...getLegendarySet(slot, min, max),
        { // this is the empty slot icon
            id: 0,
            name: "None",
            icon: "inv_misc_questionmark",
            quality: 0,
            item_level: 0,
            stats: {},
            socket_count: 0,
            bonuses: [],
        }
    ];
}

export function getMissingItems(unfiltered, variants, slot, min, max) {
    const variantIds = variants.map(i => i.id);
    const uniqueIds = [... new Set(variantIds)];
    const filter = i =>
        uniqueIds.indexOf(i.id) === -1
        && i.equip_location === slot
        && i.item_level >= min
        && i.item_level <= max;
    const filtered = unfiltered.filter(filter);
    return filtered;
}

export function findMissingItems() {

    // Get the items for every slot and sort them.
    let ids = [];
    let slots = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet', 'finger', 'trinket', 'mainHand', 'offHand'];
    for (let slotIdx in slots) {
        let items = getItems(slots[slotIdx], 0, 10000, 0);
        for (let itemIdx in items) {
            ids.push(items[itemIdx].id);
        }
    }
    let uniqueIds = [...new Set(ids)];

    // Get the items for every item in the ITEM_DATA and sort them.
    let missingItems = ITEM_DATA.filter(item => uniqueIds.indexOf(item.id) == -1 && !item.is_gem);
    let missingIds = [];
    for (let idx in missingItems) {
        missingIds.push({ "id": missingItems[idx].id, "name": missingItems[idx].name });
    }
    //eslint-disable-next-line no-console
    console.log(missingIds);
    return missingItems;
}
