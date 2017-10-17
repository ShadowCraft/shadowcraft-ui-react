import { Record, List, Map } from 'immutable';

const initItem = {
    id: 0,
    slot: '',
    name: 'Default Item',
    icon: 'inv_misc_questionmark',
    item_level: 0,
    gems: List(),
    stats: Map({ crit: 0, mastery: 0, agility: 0, stamina: 0 }), //this could probably be a record?
    bonuses: List([0]),
    quality: 0,
    socket_count: 0,
    enchant: 0,
    weaponStats: Map({ min_dmg: 0, max_dmg: 0, speed: 1.0, dps: 0 }), //this could probably be a record?
};

export default class Item extends Record(initItem) {
    constructor(item){
        let _item = item || new Record(initItem)();
        super(_item);
    }
}
