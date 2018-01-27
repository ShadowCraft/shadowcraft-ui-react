import { engineReducer, engineActionTypes } from './engineReducer';

describe('engineReducer', () => {

    it('should return initial state', () => {
        const expected = {
            ui_build: "0",
            build: "7.2.0-Test",
            ep: {
                agi: 0,
                crit: 0,
                haste: 0,
                mastery: 0,
                versatility: 0
            },
            mh_ep: {
                mh_dps: 0
            },
            oh_ep: {
                oh_dps: 0
            },
            other_ep: {},
            proc_ep: {},
            stats: {
                agility: 0,
                crit: 0,
                haste: 0,
                mastery: 0,
                versatility: 0
            },
            trinket_map: {},
            engine_info: {
                wow_build_target: ''
            },
            talentRanking: {},
            dps_breakdown: [],
            totalDps: 0.0
        };
        expect(engineReducer(undefined, {})).toEqual(expected);
    });

    it('should handle SET_ENGINE_STATE', () => {

        const init = {};
        const action = { type: engineActionTypes.SET_ENGINE_STATE, response: { test: 'test' } };
        const expected = { test: 'test' };

        expect(engineReducer(init, action)).toEqual(expected);
    });
});
