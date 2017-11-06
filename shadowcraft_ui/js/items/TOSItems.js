import { ITEM_DATA } from '../item_data';

// Just a very rough demo of declarative item definitions.
// these itemids could be imported from a generated list, or manually declared like here
// we could also use these lists to declare what items to fetch for item_data instead of depending on scraping wowhead
const TOS_ITEMS = [
    146984, 146985, 147004, 147006, 147007, 147009, 147010, 147011, 147012, 147013, 147014, 147015,
    147016, 147017, 147018, 147019, 147020, 147021, 147022, 147023, 147024, 147025, 147026, 147027,
    147028, 147029, 147030, 147031, 147032, 147033, 147034, 147035, 147036, 147037, 147039, 147040,
    147041, 147042, 147169, 147170, 147171, 147172, 147173, 147174, 147193, 147194, 147195, 147347,
    151190];
// we could do any arbitary mapping depending on how we want to handle this particular type of item
// in this case, we only need to append a predetermined set of bonusids for the tier
// but we could have multiple independant bonus lists, and simply map the permutations
// like for crafted items we would have a set of bonuses for ilvl possibilities and another for the various suffixes
// and return the union product, and still be able to easily tune the output of the large resulting dataset
// so in this example, we could permute both the warforge and difficulty bonuses, but instead we simply manually map
// the our own treatment to avoid making equivalent items that way, and still offer a functionally 'complete' selection
const TOS_BONUSES = {
    885: [3564, 1467], //rf
    890: [3564, 1472], //rf +5
    895: [3564, 1477], //rf +10
    900: [3561, 1482], //normal
    905: [3561, 1487], //normal +5
    910: [3561, 1492], //normal +10
    915: [3562, 1497], //heroic
    920: [3562, 1502], //heroic +5
    925: [3562, 1507], //heroic +10
    930: [3563, 1512], //mythic
    935: [3563, 1517], //mythic +5
    940: [3563, 1522], //mythic +10
    945: [3563, 1527], //mythic +15
};

// now we simply build the TOS items in whatever way we see fit
// i think this would simpler if the item data was a simple lookup instead of a search
// i think that would be faster, but idk because #javascriptm however this works for the demo
// these functions could probably be abstrated I think, but I kind of like that 
// everything you need to know about this list of items is right here
const baseTOSItems = (slot) => TOS_ITEMS
    .map(id => {
        const item = ITEM_DATA.find(item => item.id === id);
        if (item !== undefined) return item;
        else console.log(`${id} could not be found from TOS items`);
    })
    .filter(item => item !== undefined && item.equip_location === slot);
const mapItemsToBonuses = (slot, ilvl) => baseTOSItems(slot).map(item => makeTOSItem(item, ilvl));
// need to actually build the items here. so this still needs stat modifications. I am only modifying ilvl and bonuses here for now
const makeTOSItem = (item, ilvl) => Object.assign({}, item, { item_level: parseInt(ilvl), bonuses: [...TOS_BONUSES[ilvl]] });

export const getTOSItems = (slot, min = 0, max = 10000) =>
    Object.keys(TOS_BONUSES)
        .filter(key => key >= min && key <= max)
        .map(ilvl => mapItemsToBonuses(slot, ilvl))
        .reduce((acc, cur) => acc.concat(cur));