import { characterActionTypes, characterReducer } from './characterReducer';
import Character from '../viewModels/Character';
import Artifact from '../viewModels/Artifact';
import Traits from '../viewModels/Traits';
import Gear from '../viewModels/Gear';
import Item from '../viewModels/Item';
import Relic from '../viewModels/Relic';
import { Map, List, toJS } from 'immutable';

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

    it('should handle UPDATE_ARTIFACT_TRAITS', () => {

        const action = {
            type: characterActionTypes.UPDATE_ARTIFACT_TRAITS,
            data: Map({ test: 'test' })
        };
        expect(characterReducer(undefined, action).artifact.traits.get('test')).toEqual('test');
    });

    it('should handle RESET_ARTIFACT when active (spec) is "a" (assassination)', () => {
        const init = { artifact: { traits: { 0: 0, 1: 1 } } };
        const action = {
            type: characterActionTypes.RESET_ARTIFACT,
            data: 'a'
        };
        const expected = {
            artifact: {
                traits: {
                    214368: 0,
                    192657: 0,
                    192326: 0,
                    192923: 0,
                    192323: 0,
                    192428: 0,
                    192759: 1,
                    192329: 0,
                    192318: 0,
                    192349: 0,
                    192376: 0,
                    192315: 0,
                    192422: 0,
                    192345: 0,
                    192424: 0,
                    192310: 0,
                    192384: 0,
                    214928: 0,
                    241152: 0,
                    238066: 0,
                    238102: 0,
                    238138: 0,
                    239042: 0,
                },
                relics: [{ id: 0, ilvl: 835 }, { id: 0, ilvl: 835 }, { id: 0, ilvl: 835 }],
                netherlight: [{ tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }]
            }
        };
        expect(characterReducer(init, action).toJS()).toEqual(expected);
    });

    it('should handle RESET_ARTIFACT when active (spec) is "Z" (outlaw)', () => {
        const init = { artifact: { traits: { 0: 0, 1: 1 } } };
        const action = {
            type: characterActionTypes.RESET_ARTIFACT,
            data: 'Z'
        };
        const expected = {
            artifact: {
                traits: {
                    216230: 0,
                    202507: 0,
                    202628: 0,
                    202897: 0,
                    202769: 0,
                    202665: 1,
                    202463: 0,
                    202521: 0,
                    202755: 0,
                    202524: 0,
                    202514: 0,
                    202907: 0,
                    202530: 0,
                    202533: 0,
                    202820: 0,
                    202522: 0,
                    202753: 0,
                    214929: 0,
                    241153: 0,
                    238067: 0,
                    238103: 0,
                    238139: 0,
                    239042: 0,
                },
                relics: [{ id: 0, ilvl: 835 }, { id: 0, ilvl: 835 }, { id: 0, ilvl: 835 }],
                netherlight: [{ tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }]
            }
        };
        expect(characterReducer(init, action).toJS()).toEqual(expected);
    });

    it('should handle RESET_ARTIFACT when active (spec) is "b" (subtlety)', () => {
        const init = { artifact: { traits: { 0: 0, 1: 1 } } };
        const action = {
            type: characterActionTypes.RESET_ARTIFACT,
            data: 'b'
        };
        const expected = {
            artifact: {
                traits: {
                    209835: 0,
                    197241: 0,
                    197233: 0,
                    197604: 0,
                    197239: 0,
                    197256: 0,
                    197406: 0,
                    197369: 0,
                    197244: 0,
                    209782: 1,
                    197234: 0,
                    197235: 0,
                    197231: 0,
                    197610: 0,
                    221856: 0,
                    209781: 0,
                    197386: 0,
                    214930: 0,
                    241154: 0,
                    238068: 0,
                    242707: 0,
                    238140: 0,
                    239042: 0,
                },
                relics: [{ id: 0, ilvl: 835 }, { id: 0, ilvl: 835 }, { id: 0, ilvl: 835 }],
                netherlight: [{ tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }]
            }
        };
        expect(characterReducer(init, action).toJS()).toEqual(expected);
    });

    it('should handle UPDATE_ARTIFACT_RELIC when current relic trait != 0', () => {
        // using wowhead calcuator for verification
        const init = {
            gear: {
                mainHand: {
                    item_level: 879,
                    stats: {
                        agility: 765,
                        stamina: 1147,
                        crit: 332,
                        mastery: 319
                    },
                    weaponStats: {
                        min_dmg: 3203,
                        max_dmg: 5338,
                        speed: 1.8,
                        dps: 2372.51
                    }
                },
                offHand: {
                    item_level: 879,
                    stats: {
                        agility: 765,
                        stamina: 1147,
                        crit: 332,
                        mastery: 319
                    },
                    weaponStats: {
                        min_dmg: 3203,
                        max_dmg: 5338,
                        speed: 1.8,
                        dps: 2372.51
                    }
                }
            },
            artifact: new Artifact({
                relics: [
                    { id: 1, ilvl: 850 },
                    { id: 1, ilvl: 850 },
                    { id: 1, ilvl: 850 }
                ],
                traits: { 1: 3, 2: 0 },
                spec: 'a'
            })
        };
        const action = {
            type: characterActionTypes.UPDATE_ARTIFACT_RELIC,
            data: {
                slot: 0,
                trait: 2,
                ilvl: 860,
            }
        };
        const expected = {
            gear: {
                mainHand: {
                    item_level: 882,
                    stats: {
                        agility: 787,
                        stamina: 1180,
                        crit: 336,
                        mastery: 323
                    },
                    weaponStats: {
                        min_dmg: 3294,
                        max_dmg: 5489,
                        speed: 1.8,
                        dps: 2440,
                    }
                },
                offHand: {
                    item_level: 882,
                    stats: {
                        agility: 787,
                        stamina: 1180,
                        crit: 336,
                        mastery: 323
                    },
                    weaponStats: {
                        min_dmg: 3294,
                        max_dmg: 5489,
                        speed: 1.8,
                        dps: 2440,
                    }
                }
            },
            artifact: {
                relics: [
                    { id: 2, ilvl: 860 },
                    { id: 1, ilvl: 850 },
                    { id: 1, ilvl: 850 }
                ],
                traits: { 1: 2, 2: 1 },
                netherlight: [{ tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }],
                spec: 'a'
            }

        };
        expect(characterReducer(init, action).toJS()).toEqual(expected);
    });

    it('should handle UPDATE_ARTIFACT_RELIC when current relic trait = 0', () => {
        const init = {
            gear: {
                mainHand: {
                    item_level: 836,
                    stats: {
                        agility: 512,
                        stamina: 768,
                        crit: 283,
                        mastery: 272
                    },
                    weaponStats: {
                        min_dmg: 2145,
                        max_dmg: 3576,
                        speed: 1.8,
                        dps: 1589.33
                    }
                },
                offHand: {
                    item_level: 836,
                    stats: {
                        agility: 512,
                        stamina: 768,
                        crit: 283,
                        mastery: 272
                    },
                    weaponStats: {
                        min_dmg: 2145,
                        max_dmg: 3576,
                        speed: 1.8,
                        dps: 1589.33
                    }
                }
            },
            artifact: new Artifact({
                relics: [
                    { id: 0, ilvl: 0 },
                    { id: 1, ilvl: 850 },
                    { id: 1, ilvl: 850 }
                ],
                traits: { 1: 2 },
                spec: 'a'
            })
        };
        const action = {
            type: characterActionTypes.UPDATE_ARTIFACT_RELIC,
            data: {
                slot: 0,
                trait: 1,
                ilvl: 860
            }
        };
        const expected = {
            gear: {
                mainHand: {
                    item_level: 882,
                    stats: {
                        agility: 786,
                        stamina: 1179,
                        crit: 336,
                        mastery: 323
                    },
                    weaponStats: {
                        min_dmg: 3293,
                        max_dmg: 5490,
                        speed: 1.8,
                        dps: 2440,
                    }
                },
                offHand: {
                    item_level: 882,
                    stats: {
                        agility: 786,
                        stamina: 1179,
                        crit: 336,
                        mastery: 323
                    },
                    weaponStats: {
                        min_dmg: 3293,
                        max_dmg: 5490,
                        speed: 1.8,
                        dps: 2440,
                    }
                }
            },
            artifact: {
                relics: [
                    { id: 1, ilvl: 860 },
                    { id: 1, ilvl: 850 },
                    { id: 1, ilvl: 850 }
                ],
                traits: { 1: 3 },
                netherlight: [{ tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }],
                spec: 'a'
            }

        };
        expect(characterReducer(init, action).toJS()).toEqual(expected);
    });

    it('should handle UPDATE_ARTIFACT_RELIC when ilvl are equal', () => {
        // using wowhead for verification
        const init = {
            gear: {
                mainHand: {
                    item_level: 850,
                    stats: { agi: 1 },
                    weaponStats: {}
                },
                offHand: {
                    item_level: 850,
                    stats: { agi: 1 },
                    weaponStats: {}
                }
            },
            artifact: new Artifact({
                relics: [
                    { id: 1, ilvl: 850 },
                    { id: 1, ilvl: 865 },
                    { id: 1, ilvl: 850 }
                ],
                traits: { 1: 3, 2: 0 },
                spec: 'a'
            })
        };
        const action = {
            type: characterActionTypes.UPDATE_ARTIFACT_RELIC,
            data: {
                slot: 1,
                trait: 2,
                ilvl: 865,
            }
        };
        const expected = {
            gear: {
                mainHand: {
                    item_level: 850,
                    stats: { agi: 1 },
                    weaponStats: {}
                },
                offHand: {
                    item_level: 850,
                    stats: { agi: 1 },
                    weaponStats: {}
                }
            },
            artifact: {
                relics: [
                    { id: 1, ilvl: 850 },
                    { id: 2, ilvl: 865 },
                    { id: 1, ilvl: 850 }
                ],
                traits: { 1: 2, 2: 1 },
                netherlight: [{ tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }, { tier2: 0, tier3: 0 }],
                spec: 'a'
            }

        };
        expect(characterReducer(init, action).toJS()).toEqual(expected);
    });

    it('should handle UPDATE_NETHERLIGHT', () => {
        const init = {
            artifact: {
                netherlight: [
                    { tier2: 0, tier3: 0 },
                    { tier2: 0, tier3: 0 },
                    { tier2: 0, tier3: 0 }
                ]
            }
        };
        const action = {
            type: characterActionTypes.UPDATE_NETHERLIGHT,
            data: {
                slot: 1,
                tier2: 12345,
                tier3: 67890
            }
        };
        const expected = new Map({
            artifact: new Map({
                netherlight: new List([
                    new Map({ tier2: 0, tier3: 0 }),
                    new Map({ tier2: 12345, tier3: 67890 }),
                    new Map({ tier2: 0, tier3: 0 })])
            })
        });
        expect(characterReducer(init, action)).toEqual(expected);
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
        const init = {
            gear: {
                slot: {
                    bonuses: ['nobonuses'],
                    gems: [0],
                    icon: "noicon",
                    id: "noremote_id",
                    item_level: "noitem_level",
                    name: "noname",
                    quality: "noquality",
                    socket_count: "nosocket_count",
                    stats: "nostats"
                }
            }
        };
        const action = {
            type: characterActionTypes.CHANGE_ITEM,
            data: {
                slot: 'slot',
                ilvl: 10,
                item: {
                    id: 'remote_id',
                    icon: 'icon',
                    name: 'name',
                    socket_count: 'socket_count',
                    quality: 3,
                    item_level: 10,
                    bonuses: [10],
                    gems: [0],
                    stats: { agi: 10 }
                }
            }
        };
        const expected = {
            gear: {
                slot: {
                    bonuses: [10],
                    gems: [{
                        icon: '',
                        id: 0,
                        name: '',
                        quality: 0,
                        bonus: ''
                    }],
                    icon: "icon",
                    id: "remote_id",
                    item_level: 10,
                    name: "name",
                    quality: 3,
                    socket_count: "socket_count",
                    stats: { agi: 10 }
                }
            }
        };
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
                newStats: { test: 'test' },
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
                    stats: { test: 'test' },
                    item_level: 1,
                    name: "Awesome Item of Awesomeness"
                })
            })
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
                newStats: { test: 'test' },
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
                    stats: { test: 'test' },
                    item_level: 1,
                    name: "Awesome Item"
                })
            })
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
                newStats: { test: 'test' },
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
                    stats: { test: 'test' },
                    item_level: 1,
                    name: ""
                })
            })
        });

        expect(characterReducer(init, action)).toEqual(expected);

    });

    it('should handle CHANGE_BONUSES when !hasBonusSocket', () => {

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
                newStats: { test: 'test' },
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
                    stats: { test: 'test' },
                    item_level: 1,
                    name: ""
                })
            })
        });

        expect(characterReducer(init, action)).toEqual(expected);

    });

    it('should handle CHANGE_BONUSES when socket_count is 0', () => {

        const action = {
            type: characterActionTypes.CHANGE_BONUSES,
            data: {
                slot: 'head',
                bonuses: [],
                ilvl: 1,
                newStats: { test: 'test' },
                hasBonusSocket: true,
                canHaveBonusSocket: true,
                name: "",
                suffix: ""
            }
        };
        const expected = new Item({
            enchant: 0,
            icon: 'inv_misc_questionmark',
            id: 0,
            quality: 0,
            slot: '',
            bonuses: [],
            gems: [{
                icon: '',
                id: 0,
                name: '',
                quality: 0,
                bonus: ''
            }],
            socket_count: 1,
            stats: { test: 'test' },
            item_level: 1,
            name: "",
            weaponStats: { min_dmg: 0, max_dmg: 0, speed: 1.0, dps: 0 }
        });

        expect(characterReducer(undefined, action).gear.head).toEqual(expected);

    });

    it('should handle CHANGE_BONUSES when socket_count is !0', () => {

        const init = {
            gear: {
                slot: {
                    bonuses: [],
                    gems: [],
                    socket_count: 1,
                    stats: {},
                    item_level: 0,
                    name: ""
                }
            }
        };
        const action = {
            type: characterActionTypes.CHANGE_BONUSES,
            data: {
                slot: 'slot',
                bonuses: [],
                ilvl: 1,
                newStats: { test: 'test' },
                hasBonusSocket: true,
                canHaveBonusSocket: true,
                name: "",
                suffix: ""
            }
        };
        const expected = {
            gear: {
                slot: {
                    bonuses: [],
                    gems: [],
                    socket_count: 1,
                    stats: { test: 'test' },
                    item_level: 1,
                    name: ""
                }
            }
        };

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

    it('should handle SWAP_ARTIFACT_WEAPON', () => {
        const init = { gear: { mainHand: 'oldweapon' } };
        const action = {
            type: characterActionTypes.SWAP_ARTIFACT_WEAPON,
            data: 'Z'
        };
        const expected = new Map({ gear: new Map({ mainHand: 'newWeapon' })});
        console.log(characterReducer(init, action).getIn(['gear','mainHand','name']));
        expect(characterReducer(init, action).getIn(['gear','mainHand','name'])).toEqual('The Dreadblades');
    });

}
);
