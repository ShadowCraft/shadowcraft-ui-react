import { getItems } from './TOSItems';
import { ITEM_DATA } from '../item_data';

describe('getBossItems should', () => {

    it('should return an array', () => {
        expect(getItems([{}], [], {}) instanceof Array).toEqual(true);
    });

    it('should return an array of objects', () => {
        expect(typeof getItems([{}], [], { 900: [] })[0]).toEqual('object');
    });

    it('should filter items by slot', () => {
        const items = [
            { equip_location: 'head' },
            { equip_location: 'neck' },
            { equip_location: 'neck' },
            { equip_location: 'neck' },
            { equip_location: 'neck' },
        ];
        expect(getItems(items, [], { 900: [] }, 'neck')).toHaveLength(4);
    });

    it('should filter by min ilvl', () => {
        const bonusmap = { 991: [], 980: [], 990: [] };
        expect(getItems([{}], [], bonusmap, '', 990, 1000)).toHaveLength(2);
    });

    it('should filter by max ilvl', () => {
        const bonusmap = { 920: [], 930: [], 940: [], 950: [] };
        expect(getItems([{}], [], bonusmap, '', 900, 940)).toHaveLength(3);
    });

    it('should filter by ids', () => {
        const items = [
            { id: 123, },
            { id: 321, },
            { id: 998, },
        ];
        expect(getItems(items, [123, 321], { 900: [] })).toHaveLength(2);
    });

    it('should change bonuses to boss items', () => {
        expect(getItems([{}], [], { 900: [1234] }))
            .toEqual([{ bonuses: [1234], item_level: 900, stats: {} }]);
    });

    // this test is supposed to break when large changes are made
    // for instance, this id is dependant upon the TOS tier shoulders 
    // being present in the item data, the rest of the tests do not 
    // depend on much more than length properties
    // use this a smoke test for debugging
    // this will be skipped normally, remove skip to use
    it.skip('should integrate with ITEM_DATA (integration test)', () => {
        expect(getItems(ITEM_DATA, [147174], { 879: 1234 }))
            .toEqual(
            [{
                "armor_class": "Leather", "bonuses": 1234,
                "chance_bonus_lists": [40, 41, 42, 43, 1808],
                "equip_location": "shoulder", "icon": "inv_shoulder_leather_raidrogue_r_01",
                "id": 147174, "is_crafted": false, "is_gem": false, "item_level": 879,
                "name": "Fanged Slayer's Shoulderpads", "quality": 4, "socket_count": 0,
                "stats": { "agility": 1339, "mastery": 1150, "stamina": 2007, "versatility": 744 },
                "upgradable": false
            }]
            );
    });

});