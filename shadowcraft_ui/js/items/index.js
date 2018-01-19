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
import { getMiscItems } from './Misc';
import { getTWItems } from './Timewalking';
import { ITEM_DATA } from '../item_data';

// we can just register the different definitions here (the multiple TOS entrys are just an example, they would all be different)
// we can also impliment any caching or local storage stategies here
export function getItems(slot = 'head', min = 0, max = 10000, currentIlvl, includeMissing = true, includeLegendaries = true) {

    const  variants = getVariants(slot, min, max, currentIlvl, includeLegendaries);
    let missing = {};
    if (includeMissing) {
        missing = getMissingItems(ITEM_DATA, variants, slot, min, max);
    }

    const allItems = {...variants, ...missing};
    let finalItems = [];
    for (var key in allItems) {
        finalItems.push(allItems[key]);
    }
    return finalItems;
}

export function getVariants(slot = 'head', min = 0, max = 10000, currentIlvl, includeLegendaries = true) {

    return {
        ...getTOSItems(slot, min, max), // important to spread into this array, not just assign
        ...getNHItems(slot, min, max),
        ...getLegionCraftedItems(slot, currentIlvl),
        ...getDungeonItems(slot, currentIlvl),
        ...getENItems(slot, min, max),
        ...getTOVItems(slot, min, max),
        ...getAntorusItems(slot, min, max),
        ...getPVPItems(slot, min, max),
        ...getOrderHallSet(slot, min, max),
        ...getMiscItems(slot, min, max),
        ...getTWItems(slot, min, max),
        ...(includeLegendaries ? getLegendarySet(slot, min, max) : []),
        ...{0: [{  // this is the empty slot icon
            id: 0,
            name: "None",
            icon: "inv_misc_questionmark",
            quality: 0,
            item_level: 0,
            stats: {},
            socket_count: 0,
            bonuses: [],
        }]}
    };
}

export function getMissingItems(unfiltered, variants, slot, min, max) {
    const variantIds = variants.map(i => i.id);
    const uniqueIds = [...new Set(variantIds)];
    const filter = i =>
        uniqueIds.indexOf(i.id) === -1
        && i.equip_location === slot
        && i.item_level >= min
        && i.item_level <= max;
    const filtered = unfiltered.filter(filter);
    return filtered;
}

export function findMissingItems() {

    // Ignore these items (artifact weapons, for example)
    const ignore = [134552, 128872, 128869, 128870, 128476, 128479];
    
    // Get the items for every slot and sort them.
    let ids = [];
    let slots = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet', 'finger', 'trinket', 'mainHand', 'offHand'];
    for (let slotIdx in slots) {
        let items = getItems(slots[slotIdx], 0, 10000, 0, false);
        ids = [...ids, ...Object.keys(ids)];
    }

    // This *should* already be unique, but do this just to be sure.
    let uniqueIds = [...new Set(ids)];

    // Get the items for every item in the ITEM_DATA and sort them.
    let missingItems = ITEM_DATA.filter(item => uniqueIds.indexOf(item.id) == -1 && !item.is_gem);
    let missingIds = [];
    for (let idx in missingItems) {
        if (ignore.indexOf(missingItems[idx].id) == -1) {
            console.log(`${missingItems[idx].id}: ${missingItems[idx].name} \n http://wowhead.com/item=${missingItems[idx].id}`);
            missingIds.push(missingItems[idx].id);
        }
    }
    //eslint-disable-next-line no-console
//    console.log(missingIds.join(","));
    return missingItems;
}
