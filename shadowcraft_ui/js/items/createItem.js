import { recalculateStats } from '../common';

export const createItem = (item, ilvl, bonuses) => Object.assign({}, item,
        {
            item_level: parseInt(ilvl),
            stats : recalculateStats(item.stats, ilvl - item.item_level, item.slot),
            bonuses
        });
