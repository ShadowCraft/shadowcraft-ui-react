import { recalculateStats } from '../common';

export const modifyItem = (item, ilvl, bonuses) => Object.assign({}, item,
    {
        item_level: parseInt(ilvl),
        stats: recalculateStats(item.id, ilvl, item.equip_location, item.quality),
        bonuses,
    });


export const getRaidTierPermutations = (itemdata = [], whitelist = [], bonusmap = {}, slot = '', min = 0, max = 0) => {

    // i don't know why I can't get the unit test for this to fail with string min and max,
    // but the TOSItems.getTOSItems test will fail, and it's better to fix it here so...
    const _min = parseInt(min);
    const _max = parseInt(max);

    const whitelistfilter = item => whitelist.length ? whitelist.includes(item.id) : true;
    const slotfilter = item => slot !== '' ? item.equip_location === slot : true;

    // check that our items are included in the whitelist and that it is the right slot to avoid work
    const filteredItems = itemdata.filter(item => whitelistfilter(item) && slotfilter(item));

    // Get a set of ilvl keys from the bonusmap and sort them. If the minimum key from the bonus map
    // is greater than the requested minimum, clip it to that key and log something.
    const keys = Object.keys(bonusmap).sort();
    if (keys[0] > min) {
        console.log("Clipping the minimum to the available data");
        min = keys[0];
    }

    // Build a new set of bonuses stepping 5 ilvls for each one.
    let newBonusMap = {};
    let baseIndex = 0;
    for (let ilvl = _min; ilvl <= _max; ilvl += 5) {
        if (keys[baseIndex+1] && keys[baseIndex+1] == ilvl) {
            baseIndex++;
        }

        const base = bonusmap[keys[baseIndex]];
        const ilvlDiff = ilvl - keys[baseIndex];
        newBonusMap[ilvl] = [base[0], base[1] + ilvlDiff];
    }

    // Function that translates the raw items to final items with the right stats, ilvl and bonuses
    const mapBonusesToItems = item => Object.keys(newBonusMap).map(ilvl => modifyItem(item, ilvl, newBonusMap[ilvl]));

    // Many permutations, handle it. This returns an array of arrays of items.
    const modifiedItems = filteredItems.map(item => mapBonusesToItems(item));

    // Loop over all of the item arrays and build an object.
    let finalItems = {};
    for (let index in modifiedItems) {
        finalItems[modifiedItems[index][0]['id']] = modifiedItems[index];
    }

    return finalItems;
};
