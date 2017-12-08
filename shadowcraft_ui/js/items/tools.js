import { recalculateStats } from '../common';

export const modifyItem = (item, ilvl, bonuses) => Object.assign({}, item,
    {
        item_level: parseInt(ilvl),
        stats: recalculateStats(item.stats, ilvl - item.item_level, item.equip_location),
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

    const minfilter = ilvl => _min ? ilvl >= _min : true;

    const maxfilter = ilvl => _max ? ilvl <= _max : true;

    //filtering on bonusmap to minimize the coming permutations
    const filteredBonusMap = Object.keys(bonusmap).filter(ilvl => minfilter(ilvl) && maxfilter(ilvl));

    // this translates the raw items to final items with the right stats, ilvl and bonuses
    const mapBonusesToItems = item => filteredBonusMap.map(ilvl => modifyItem(item, ilvl, bonusmap[ilvl]));

    //many permutations, handle it
    const modifiedItems =
        filteredItems
            .map(item => mapBonusesToItems(item)) // this returns an array of arrays of objects(items)
            .reduce((p, c) => p.concat(c), []); // and this flattens it

    return modifiedItems;
};