import { ITEM_DATA } from '../item_data';
import { createItem } from './createItem';

const CRAFTED_IDS = [
    // 146669, // sentenals eternal refuge --lego-- // need to handle this differently
    // 151588, // impyrial deep crown
    // 151577, // fiendish shouldergaurds
    // 144332, // rugged skullblasters
    127019, // imbued silkweave cover, theres like 4 different tailoring variations, only using one
    128884, // dreadleather jerkin
    128885, // ... footpads 
    128886, // ... gloves
    128887, // ... mask
    128888, // ... pants
    128889, // ... shoulderguard
    128890, // ... belt
    128891, // ... bindings
    132505, // sawed off cranial cannon
];

const baseItems = CRAFTED_IDS.map(id => {
    const item = ITEM_DATA.find(item => item.id === id);
    if (item !== undefined) return item;
    else console.log(`Item ${id} defined in LegionCraftedItems could not be found.`);
});
const filteredItems = (slot) => baseItems.filter(item => item !== undefined && item.equip_location === slot);
const getObliterumBonus = (ilvl) => {
    switch (ilvl) {
        case 815: return [596];
        case 820: return [597];
        case 825: return [598];
        case 830: return [599];
        case 835: return [666];
        case 840: return [667];
        case 845: return [668];
        case 850: return [669];
        case 855: return [670];
        case 860: return [671];
        case 865: return [672];
        case 870: return [673];
        case 875: return [674];
        case 880: return [675];
        case 885: return [676];
        case 890: return [677];
        case 895: return [678];
        case 900: return [679];
        default: return ilvl < 815 ? [596] : [679];
    }
};
const mapItemsToBonuses = (slot, ilvl) => filteredItems(slot).map(item => {
    // we only want to include an item equal to the current ilvl or min or max for crafted items
    let ilvlClamp = ilvl < 815 ? 815 : ilvl > 900 ? 900 : ilvl;
    return createItem(item, ilvlClamp, getObliterumBonus(ilvlClamp));
});

export const getLegionCraftedItems = (slot, ilvl) => mapItemsToBonuses(slot, ilvl);