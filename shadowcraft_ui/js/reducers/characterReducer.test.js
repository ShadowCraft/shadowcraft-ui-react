import { characterActionTypes, characterReducer } from './characterReducer';
import Character from '../viewModels/Character';
import Gear from '../viewModels/Gear';
import Item from '../viewModels/Item';
import { Map, List } from 'immutable';

describe('characterReducer', () => {
    it('should return initial state', () => {
        expect(characterReducer(undefined, {})).toEqual(new Character());
    });

    it('should handle RESET_CHARACTER_DATA', () => {

        const init = new Character();
        const action = {
            type: characterActionTypes.RESET_CHARACTER_DATA,
            data: new Character({ active: 'test', name: 'joe' })
        };
        expect(characterReducer(init, action).active).toEqual('test');
        expect(characterReducer(init, action).name).toEqual('joe');
    });

    it('should handle UPDATE_SPEC', () => {

        const init = { active: 'anything' };
        const action = { type: characterActionTypes.UPDATE_SPEC, data: 'example' };
        const expected = new Map({ active: 'example' });

        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle UPDATE_TALENTS', () => {

        const init = { talents: { current: 'initial' } };
        const action = { type: characterActionTypes.UPDATE_TALENTS, data: 'result' };
        const expected = new Map({ talents: new Map({ current: 'result' }) });

        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle CHANGE_ITEM', () => {
        const init = new Character({
            gear: new Gear({
                head: new Item({
                    slot: 'head',                    
                    bonuses: ['nobonuses'],
                    gems: [],
                    icon: "noicon",
                    id: "noremote_id",
                    item_level: "noitem_level",
                    name: "noname",
                    quality: "noquality",
                    socket_count: 0,
                    stats: {}
                })
            })
        });
        const action = {
            type: characterActionTypes.CHANGE_ITEM,
            data: {
                slot: 'head',
                ilvl: 10,
                item: new Item({
                    id: 'remote_id',
                    icon: 'icon',
                    name: 'name',
                    socket_count: 1,
                    quality: 3,
                    item_level: 10,
                    bonuses: [10],
                    gems: [{
                        icon: '',
                        id: 0,
                        name: '',
                        quality: 0,
                        bonus: ''
                    }],
                    stats: { agi: 10 }
                })
            }
        };
        const expected = new Character({
            gear: new Gear({
                head: new Item({
                    slot: 'head',
                    bonuses: [10],
                    gems: [{
                        icon: '',
                        id: 0,
                        name: 'Empty Gem Socket',
                        quality: 0,
                        bonus: ''
                    }],
                    icon: "icon",
                    id: "remote_id",
                    item_level: 10,
                    name: "name",
                    quality: 3,
                    socket_count: 1,
                    stats: { agi: 10 }
                })
            }),
            avg_item_level: 0.63,
        });
        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle CHANGE_BONUSES suffix name addition', () => {

        const init = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: [],
                    gems: [],
                    socket_count: 0,
                    stats: {},
                    item_level: 0,
                    name: "Meh Item"
                })
            })
        });
        const action = {
            type: characterActionTypes.CHANGE_BONUSES, data: {
                slot: 'head',
                bonuses: ['test'],
                ilvl: 1,
                newStats: { },
                hasBonusSocket: true,
                canHaveBonusSocket: false,
                name: "Awesome Item",
                suffix: "of Awesomeness"
            }
        };
        const expected = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: ['test'],
                    gems: [],
                    socket_count: 0,
                    stats: { },
                    item_level: 1,
                    name: "Awesome Item of Awesomeness"
                })
            }),
            avg_item_level: 0.06,
        });

        expect(characterReducer(init, action)).toEqual(expected);

    });

    it('should handle CHANGE_BONUSES suffix name removal', () => {

        const init = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: [],
                    gems: [],
                    socket_count: 0,
                    stats: {},
                    item_level: 0,
                    name: "Awesome Item of Awesomeness"
                })
            })
        });
        const action = {
            type: characterActionTypes.CHANGE_BONUSES, data: {
                slot: 'head',
                bonuses: ['test'],
                ilvl: 1,
                newStats: { },
                hasBonusSocket: true,
                canHaveBonusSocket: false,
                name: "Awesome Item",
                suffix: ""
            }
        };
        const expected = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: ['test'],
                    gems: [],
                    socket_count: 0,
                    stats: { },
                    item_level: 1,
                    name: "Awesome Item"
                })
            }),
            avg_item_level: 0.06,
        });

        expect(characterReducer(init, action)).toEqual(expected);

    });

    it('should handle CHANGE_BONUSES when !canHaveBonusSocket', () => {

        const init = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: [],
                    gems: [],
                    socket_count: 0,
                    stats: {},
                    item_level: 0,
                    name: ""
                })
            })
        });
        const action = {
            type: characterActionTypes.CHANGE_BONUSES, data: {
                slot: 'head',
                bonuses: ['test'],
                ilvl: 1,
                newStats: { },
                hasBonusSocket: true,
                canHaveBonusSocket: false,
                name: "",
                suffix: ""
            }
        };
        const expected = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: ['test'],
                    gems: [],
                    socket_count: 0,
                    stats: { },
                    item_level: 1,
                    name: ""
                })
            }),
            avg_item_level: 0.06,
        });

        expect(characterReducer(init, action)).toEqual(expected);

    });

    it('should handle CHANGE_BONUSES removing a bonus socket', () => {

        const init = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: [1808],
                    gems: [],
                    socket_count: 1,
                    stats: {},
                    item_level: 0,
                    name: ""
                })
            })
        });
        const action = {
            type: characterActionTypes.CHANGE_BONUSES,
            data: {
                slot: 'head',
                bonuses: [],
                ilvl: 1,
                newStats: { },
                hasBonusSocket: false,
                canHaveBonusSocket: true,
                name: "",
                suffix: ""
            }
        };
        const expected = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: [],
                    gems: [],
                    socket_count: 0,
                    stats: { },
                    item_level: 1,
                    name: ""
                })
            }),
            avg_item_level: 0.06,
        });

        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle CHANGE_BONUSES disallow removing a fixed socket', () => {

        const init = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: [],
                    gems: [],
                    socket_count: 1,
                    stats: {},
                    item_level: 0,
                    name: ""
                })
            })
        });
        const action = {
            type: characterActionTypes.CHANGE_BONUSES,
            data: {
                slot: 'head',
                bonuses: [],
                ilvl: 1,
                newStats: { },
                hasBonusSocket: false,
                canHaveBonusSocket: false,
                name: "",
                suffix: ""
            }
        };
        const expected = new Character({
            gear: new Gear({
                head: new Item({
                    bonuses: [],
                    gems: [],
                    socket_count: 1,
                    stats: { },
                    item_level: 1,
                    name: ""
                })
            }),
            avg_item_level: 0.06,
        });

        expect(characterReducer(init, action)).toEqual(expected);

    });



    it('should handle CHANGE_ENCHANT', () => {

        const init = new Character({});
        const action = {
            type: characterActionTypes.CHANGE_ENCHANT,
            data: {
                slot: "neck",
                enchant: 12345
            }
        };
        let expected = new Character({});
        expected = expected.setIn(['gear','neck','enchant'], 12345);

        expect(characterReducer(init, action)).toEqual(expected);

    });

    it('should handle CHANGE_GEM', () => {

        let init = new Character({});
        init = init.setIn(['gear', 'neck', 'socket_count'], 1);
        init = init.setIn(['gear', 'neck', 'gems', 0], new Map({
            name: "gem1",
            id: 1,
            icon: "icon1",
            quality: 3,
            bonus: "+150 Mastery",
        }));

        const action = {
            type: characterActionTypes.CHANGE_GEM,
            data: {
                slot: "neck",
                gemSlot: 0,
                gem: {
                    id: 130222,
                    is_gem: true,
                    name: "Masterful Shadowruby",
                    icon: "inv_jewelcrafting_70_cutgem03_purple",
                    gem_slot: "Prismatic",
                    quality: 3,
                    stats: {
                        haste: 200
                    }
                }
            }
        };

        let expected = new Character({});
        expected = expected.setIn(['gear', 'neck', 'socket_count'], 1);
        expected = expected.setIn(['gear', 'neck', 'gems', 0], new Map({
            name: "Masterful Shadowruby",
            id: 130222,
            icon: "inv_jewelcrafting_70_cutgem03_purple",
            quality: 3,
            bonus: "+200 Haste",
        }));

        expect(characterReducer(init, action)).toEqual(expected);

    });

    it('should handle OPTIMIZE_GEMS with no epic gem', () => {

        let init = new Character({});
        init = init.setIn(['gear','head','socket_count'], 1);
        init = init.setIn(['gear','head','gems',0], new Map({
            name: "gem1",
            id: 1,
            icon: "icon1",
            quality: 3,
            bonus: "+150 Mastery"}));
        init = init.setIn(['gear','neck','socket_count'], 2);
        init = init.setIn(['gear','neck','gems',0], new Map({
            name: "gem1",
            id: 1,
            icon: "icon1",
            quality: 3,
            bonus: "+150 Mastery"}));
        init = init.setIn(['gear','neck','gems',1], new Map({
            name: "gem1",
            id: 1,
            icon: "icon1",
            quality: 3,
            bonus: "+150 Mastery"}));
        init = init.setIn(['gear','chest','socket_count'], 1);
        init = init.setIn(['gear','chest','gems',0], new Map({
            name: "gem1",
            id: 1,
            icon: "icon1",
            quality: 3,
            bonus: "+150 Mastery"}));

        const action = {
            type: characterActionTypes.OPTIMIZE_GEMS,
            data: {
                nonjc: {
                    id: 12345,
                    is_gem: true,
                    name: "Rare Gem of Rareness",
                    icon: "blue_gem",
                    gem_slot: "Prismatic",
                    quality: 3,
                    stats: {
                        haste: 200
                    }
                },
                jc: {
                    id: 67890,
                    is_gem: true,
                    name: "Epic Gem of Epicness",
                    icon: "purple_gem",
                    gem_slot: "Prismatic",
                    quality: 4,
                    stats: {
                        agility: 500
                    }
                }
            }
        };

        let expected = new Character({});
        expected = expected.setIn(['gear','head','socket_count'], 1);
        expected = expected.setIn(['gear','head','gems',0], new Map({
            name: "Epic Gem of Epicness",
            id: 67890,
            icon: "purple_gem",
            quality: 4,
            bonus: "+500 Agility"}));
        expected = expected.setIn(['gear','neck','socket_count'], 2);
        expected = expected.setIn(['gear','neck','gems',0], new Map({
            name: "Rare Gem of Rareness",
            id: 12345,
            icon: "blue_gem",
            quality: 3,
            bonus: "+200 Haste"}));
        expected = expected.setIn(['gear','neck','gems',1], new Map({
            name: "Rare Gem of Rareness",
            id: 12345,
            icon: "blue_gem",
            quality: 3,
            bonus: "+200 Haste"}));
        expected = expected.setIn(['gear','chest','socket_count'], 1);
        expected = expected.setIn(['gear','chest','gems',0], new Map({
            name: "Rare Gem of Rareness",
            id: 12345,
            icon: "blue_gem",
            quality: 3,
            bonus: "+200 Haste"}));

        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle OPTIMIZE_GEMS with epic gem', () => {

        let init = new Character({});
        init = init.setIn(['gear','head','socket_count'], 1);
        init = init.setIn(['gear','head','gems',0], new Map({
            name: "gem1",
            id: 1,
            icon: "icon1",
            quality: 3,
            bonus: "+150 Mastery"}));
        init = init.setIn(['gear','neck','socket_count'], 2);
        init = init.setIn(['gear','neck','gems',0], new Map({
            name: "gem1",
            id: 1,
            icon: "icon1",
            quality: 3,
            bonus: "+150 Mastery"}));
        init = init.setIn(['gear','neck','gems',1], new Map({
            name: "Epic Gem of Epicness",
            id: 67890,
            icon: "purple_gem",
            quality: 4,
            bonus: "+500 Agility"}));
        init = init.setIn(['gear','chest','socket_count'], 1);
        init = init.setIn(['gear','chest','gems',0], new Map({
            name: "gem1",
            id: 1,
            icon: "icon1",
            quality: 3,
            bonus: "+150 Mastery"}));

        const action = {
            type: characterActionTypes.OPTIMIZE_GEMS,
            data: {
                nonjc: {
                    id: 12345,
                    is_gem: true,
                    name: "Rare Gem of Rareness",
                    icon: "blue_gem",
                    gem_slot: "Prismatic",
                    quality: 3,
                    stats: {
                        haste: 200
                    }
                },
                jc: {
                    id: 67890,
                    is_gem: true,
                    name: "Epic Gem of Epicness",
                    icon: "purple_gem",
                    gem_slot: "Prismatic",
                    quality: 4,
                    stats: {
                        agility: 500
                    }
                }
            }
        };

        let expected = new Character({});
        expected = expected.setIn(['gear','head','socket_count'], 1);
        expected = expected.setIn(['gear','head','gems',0], new Map({
            name: "Rare Gem of Rareness",
            id: 12345,
            icon: "blue_gem",
            quality: 3,
            bonus: "+200 Haste"}));
        expected = expected.setIn(['gear','neck','socket_count'], 2);
        expected = expected.setIn(['gear','neck','gems',0], new Map({
            name: "Rare Gem of Rareness",
            id: 12345,
            icon: "blue_gem",
            quality: 3,
            bonus: "+200 Haste"}));
        expected = expected.setIn(['gear','neck','gems',1], new Map({
            name: "Epic Gem of Epicness",
            id: 67890,
            icon: "purple_gem",
            quality: 4,
            bonus: "+500 Agility"}));
        expected = expected.setIn(['gear','chest','socket_count'], 1);
        expected = expected.setIn(['gear','chest','gems',0], new Map({
            name: "Rare Gem of Rareness",
            id: 12345,
            icon: "blue_gem",
            quality: 3,
            bonus: "+200 Haste"}));

        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle OPTIMIZE_GEMS with no sockets', () => {

        const init = new Character({});

        const action = {
            type: characterActionTypes.OPTIMIZE_GEMS,
            data: {
                rare: {
                    id: 12345,
                    is_gem: true,
                    name: "Rare Gem of Rareness",
                    icon: "blue_gem",
                    gem_slot: "Prismatic",
                    quality: 3,
                    stats: {
                        haste: 200
                    }
                },
                epic: {
                    id: 67890,
                    is_gem: true,
                    name: "Epic Gem of Epicness",
                    icon: "purple_gem",
                    gem_slot: "Prismatic",
                    quality: 4,
                    stats: {
                        agility: 500
                    }
                }
            }
        };

        const expected = new Character({});

        expect(characterReducer(init, action)).toEqual(expected);
    });


    it('should handle OPTIMIZE_ENCHANTS', () => {
        const init = new Character({});
        const action = {
            type: characterActionTypes.OPTIMIZE_ENCHANTS,
            data: {
                neck: 1234,
                back: 2345,
                finger: 3456,
            }
        };

        let expected = new Character({});
        expected = expected.setIn(['gear','neck','enchant'], 1234);
        expected = expected.setIn(['gear','back','enchant'], 2345);
        expected = expected.setIn(['gear','finger1','enchant'], 3456);
        expected = expected.setIn(['gear','finger2','enchant'], 3456);

        expect(characterReducer(init, action)).toEqual(expected);
    });

}
);
