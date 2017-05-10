import { characterReducer } from './store';

describe('character reducer', () => {
    it('should return initial state', () => {
        expect(
            characterReducer(undefined, {})
        ).toEqual({});
    });

    it('should handle RESET_CHARACTER_DATA', () => {
        expect(
            characterReducer(
                { test: 'test' },
                {
                    type: 'RESET_CHARACTER_DATA',
                    data: { test: 'test' }
                })
        ).toEqual({ test: 'test' });
    });

    it('should handle UPDATE_ARTIFACT_TRAITS', () => {
        expect(
            characterReducer(
                { artifact: { traits: {} } },
                {
                    type: 'UPDATE_ARTIFACT_TRAITS',
                    data: 'test'
                })
        ).toEqual(
            {
                artifact: {
                    traits: 'test'
                }
            }
            );
    });

    it('should handle UPDATE_ARTIFACT_RELIC', () => {
        expect(
            characterReducer(
                {
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
                },
                {
                    type: 'UPDATE_ARTIFACT_RELIC',
                    data: {
                        slot: 0,
                        trait: 2,
                        ilvl: 900,
                        stats: { agi: 2 },
                        weaponStats: {}
                    }
                }
            )
        ).toEqual(
            {
                gear: {
                    mainHand: {
                        item_level: 850, //this calc is probably incorrect
                        stats: { agi: 2 },
                        weaponStats: {}
                    },
                    offHand: {
                        item_level: 850, //this calc is probably incorrect
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

            }
            );
    });

    it('should handle UPDATE_SPEC', () => {

        let init = { active: 'anything' };
        let action = { type: 'UPDATE_SPEC', data: 'example' };
        let expected = { active: 'example' };

        expect(characterReducer(init, action)).toEqual(expected);
    }
    );
}

);