import { ITEM_DATA } from '../item_data';
import { modifyItem, getRaidTierPermutations } from './tools';

//reference: https://github.com/simulationcraft/simc/blob/legion-dev/SpellDataDump/bonus_ids.txt

// 7.0 crafted items
const obliterumItemIds = [
    127019, // imbued silkweave cover. There's also drape, shade, flourish. They're all the same
            // item just with different names.
    127020,
    127033,
    127034,
    128884, // dreadleather jerkin
    128885, // ... footpads 
    128886, // ... gloves
    128887, // ... mask
    128888, // ... pants
    128889, // ... shoulderguard
    128890, // ... belt
    128891, // ... bindings
    132505, // sawed off cranial cannon
    127842, // infernal alchemist stone
    128705, // darkmoon deck: dominion
    130236, // subtle shadowruby pendant
    130229, // prophetic band
    130230, // maelstrom band
    130231, // dawnlight band
    136713, // shadowruby band
];

// these items do not have different ilvls, just random props
const staticIlvlItemIds = [
    151588, // impyrial deep crown
    144332, // 880 rugged skullblasters
];

// special handling for legendaries
const lego = [
    146669, // sentinals eternal refuge
];

// 7.3 crafted items
const primalItemIds = [
    151577, // fiendish shouldergaurds
];

const getStaticItems = slot => filterItems(slot, staticIlvlItemIds)
    .map(i => modifyItem(i, i.item_level, []));

const getLegos = slot => filterItems(slot, lego);

const checkItems = (itemids) => itemids.map(id => {
    const item = ITEM_DATA.find(item => item.id === id);
    if (item !== undefined) return item;
    //eslint-disable-next-line no-console    
    else console.warn(`Item ${id} defined in LegionCraftedItems could not be found.`);
});

const filterItems = (slot, itemids) => checkItems(itemids)
    .filter(item => item !== undefined && item.equip_location === slot);

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

const mapItemsToObliterum = (slot, ilvl, itemids) => filterItems(slot, itemids).map(item => {
    // we only want to include an item equal to the current ilvl or min or max for crafted items
    let ilvlClamp = ilvl < 815 ? 815 : ilvl > 900 ? 900 : ilvl;
    return modifyItem(item, ilvlClamp, getObliterumBonus(ilvlClamp));
});

const getPrimalBonus = (ilvl) => {
    switch (ilvl) {
        case 885: return [3598];
        case 890: return [3599];
        case 895: return [3600];
        case 900: return [3601];
        case 905: return [3602];
        case 910: return [3603];
        case 915: return [3604];
        case 920: return [3605];
        case 925: return [3606];
        case 930: return [3607];
        case 935: return [3608];
        default: return ilvl < 885 ? [3598] : [679];
    }
};

const mapItemsToPrimal = (slot, ilvl, itemids) => filterItems(slot, itemids).map(item => {
    // we only want to include an item equal to the current ilvl or min or max for crafted items
    let ilvlClamp = ilvl < 885 ? 885 : ilvl > 935 ? 935 : ilvl;
    return modifyItem(item, ilvlClamp, getPrimalBonus(ilvlClamp));
});

export const getLegionCraftedItems = (slot, ilvl) =>
    [
        ...mapItemsToObliterum(slot, ilvl, obliterumItemIds),
        ...mapItemsToPrimal(slot, ilvl, primalItemIds),
        ...getStaticItems(slot),
        ...getLegos(slot),
    ];
