import { getTOSItems } from './TombOfSargeras';
import { getNHItems } from './Nighthold';
import { getLegionCraftedItems } from './legionCraftedItems';
import { getDungeonItems } from './dungeonItems';
import { getENItems } from './EmeraldNightmare';
import { getTOVItems } from './TrialOfValor';
import { getAntorusItems } from './Antorus';

// we can just register the different definitions here (the multiple TOS entrys are just an example, they would all be different)
// we can also impliment any caching or local storage stategies here
export function getItems(slot = 'head', min = 0, max = 10000, currentIlvl) {
    return [
        ...getTOSItems(slot, min, max), // important to spread into this array, not just assign
        ...getNHItems(slot, min, max),
        ...getLegionCraftedItems(slot, currentIlvl),
        ...getDungeonItems(slot, currentIlvl),
        ...getENItems(slot, min, max),
        ...getTOVItems(slot, min, max),
        ...getAntorusItems(slot, min, max),
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
