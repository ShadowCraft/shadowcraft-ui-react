import { characterReducer } from './store';

describe('characterReducer', () => {
    it('should return initial state', () => {
        expect(characterReducer(undefined, {})).toEqual({});
    });

    it('should handle RESET_CHARACTER_DATA', () => {

        let init = { test: 'initial' };
        let action = {
            type: 'RESET_CHARACTER_DATA', data: { test: 'test' }
        };
        let expected = { test: 'test' };
        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle UPDATE_ARTIFACT_TRAITS', () => {

        let init = { artifact: { traits: {} } };
        let action = {
            type: 'UPDATE_ARTIFACT_TRAITS',
            data: 'test'
        };
        let expected = {
            artifact: {
                traits: 'test'
            }
        };
        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle UPDATE_ARTIFACT_RELIC', () => {
        let init = {
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
                    { id: 1, ilvl: 850 },
                    { id: 1, ilvl: 850 }
                ],
                traits: { 1: 3, 2: 0 }
            }
        };
        let action = {
            type: 'UPDATE_ARTIFACT_RELIC',
            data: {
                slot: 0,
                trait: 2,
                ilvl: 900,
                stats: { agi: 2 },
                weaponStats: {}
            }
        };
        let expected = {
            gear: {
                mainHand: {
                    item_level: 865,
                    stats: { agi: 2 },
                    weaponStats: {}
                },
                offHand: {
                    item_level: 865,
                    stats: { agi: 2 },
                    weaponStats: {}
                }
            },
            artifact: {
                relics: [
                    { id: 2, ilvl: 900 },
                    { id: 1, ilvl: 850 },
                    { id: 1, ilvl: 850 }
                ],
                traits: { 1: 2, 2: 1 }
            }

        };
        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle UPDATE_SPEC', () => {

        let init = { active: 'anything' };
        let action = { type: 'UPDATE_SPEC', data: 'example' };
        let expected = { active: 'example' };

        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle UPDATE_TALENTS', () => {

        let init = { talents: { current: 'initial' } };
        let action = { type: 'UPDATE_TALENTS', data: 'result' };
        let expected = { talents: { current: 'result' } };

        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle CHANGE_ITEM', () => {
        let init = {
            gear: {
                slot: {
                    bonuses: ['nobonuses'],
                    context: "nocontexts",
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
        let action = {
            type: 'CHANGE_ITEM',
            data: {
                slot: 'slot',
                item: {
                    remote_id: 'remote_id',
                    item_level: 'item_level',
                    contexts: ['contexts'],
                    properties: {
                        icon: 'icon',
                        name: 'name',
                        quality: 'quality',
                        stats: 'stats',
                        socket_count: 'socket_count'
                    }
                }
            }
        };
        let expected = {
            gear: {
                slot: {
                    bonuses: [],
                    context: "contexts",
                    gems: [0],
                    icon: "icon",
                    id: "remote_id",
                    item_level: "item_level",
                    name: "name",
                    quality: "quality",
                    socket_count: "socket_count",
                    stats: "stats"
                }
            }
        };
        expect(characterReducer(init, action)).toEqual(expected);
    });

    it('should handle CHANGE_BONUSES', () => {

        let init = {
            gear: {
                slot: {
                    bonuses: [],
                    gems: [],
                    socket_count: 0,
                    stats: {},
                    itemLevel: 0,
                    hasBonusSocket: true,
                    canHaveBonusSocket: true
                }
            }
        };
        let action = {
            type: 'CHANGE_BONUSES', data: {
                slot: 'slot',
                bonuses: [],
                ilvl: 1,
                newStats: { test: 'test' },
                hasBonusSocket: true,
                canHaveBonusSocket: true
            }
        };
        let expected = {
            gear: {
                slot: {
                    bonuses: [],
                    gems: [0],
                    socket_count: 1,
                    stats: { test: 'test' },
                    itemLevel: 1,
                    hasBonusSocket: true,
                    canHaveBonusSocket: true
                }
            }
        };

        expect(characterReducer(init, action)).toEqual(expected);

    });
}
);
