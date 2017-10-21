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

        let _item = new Record(initItem)();

        if (item !== undefined) {
            _item = _item.set('id', item.id);
            _item = _item.set('slot', item.slot);
            _item = _item.set('name', item.name);
            _item = _item.set('icon', item.icon);
            _item = _item.set('item_level', item.item_level);
            _item = _item.set('quality', item.quality);
            _item = _item.set('socket_count', item.socket_count);
            _item = _item.set('enchant', item.enchant);
            _item = _item.set('bonuses', new List(item.bonuses));
            _item = _item.set('stats', new Map(item.stats));

            let gemList = new List();
            for (let idx in item.gems) {
                gemList = gemList.push(Map(item.gems[idx]));
            }
            _item = _item.set('gems', gemList);

            if (item.weaponStats !== undefined) {
                _item = _item.set('weaponStats', new Map(item.weaponStats));
            }
        }

        super(_item);
    }
}
