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

const obliterumBonusIds = {
    815: [596],
    820: [597],
    825: [598],
    830: [599],
    835: [666],
    840: [667],
    845: [668],
    850: [669],
    855: [670],
    860: [671],
    865: [672],
    870: [673],
    875: [674],
    880: [675],
    885: [676],
    890: [677],
    895: [678],
    900: [679],
};

// these items do not have different ilvls, just random props
const staticIlvlItemIds = [
    151588, // empyrial deep crown
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

const primalBonusIds = {
    885: [3598],
    890: [3599],
    895: [3600],
    900: [3601],
    905: [3602],
    910: [3603],
    915: [3604],
    920: [3605],
    925: [3606],
    930: [3607],
    935: [3608],
};

const getStaticItems = slot => {
    const filteredItems = filterItems(slot, staticIlvlItemIds);
    let finalItems = {};
    for (let index in filteredItems) {
        const item = filteredItems[index];
        finalItems[item['id']] = [modifyItem(item, item.item_level, [])];
    }

    console.log(finalItems);

    return finalItems;
};

const getLegos = slot => {
    const filteredItems = filterItems(slot, lego);
    let finalItems = {};
    for (let index in filteredItems) {
        const item = filteredItems[index];
        finalItems[item['id']] = [item];
    }

    return finalItems;
};

const checkItems = (itemids) => itemids.map(id => {
    const item = ITEM_DATA.find(item => item.id === id);
    if (item !== undefined) return item;
    //eslint-disable-next-line no-console    
    else console.warn(`Item ${id} defined in LegionCraftedItems could not be found.`);
});

const filterItems = (slot, itemids) => checkItems(itemids)
    .filter(item => item !== undefined && item.equip_location === slot);

export const getLegionCraftedItems = (slot, min = 0, max = 1000) => {
    return {
        ...getRaidTierPermutations(ITEM_DATA, obliterumItemIds, obliterumBonusIds, slot, min, max),
        ...getRaidTierPermutations(ITEM_DATA, primalItemIds, primalBonusIds, slot, min, max),
        ...getStaticItems(slot),
        ...getLegos(slot),
    }
};
