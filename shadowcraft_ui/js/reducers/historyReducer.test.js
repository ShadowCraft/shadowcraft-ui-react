import { historyReducer, History, historyActionTypes } from './historyReducer';

describe('historyReducer', () => {

    it('should return initial state', () => {
        expect(historyReducer(undefined, {})).toEqual(new History());
    });

    it('should handle CLEAR_HISTORY', () => {
        const init = new History({ dps: ['stuff'], data: ['things'] });
        const action = { type: historyActionTypes.CLEAR_HISTORY };
        const expected = { dps: [], data: [] };
        expect(historyReducer(init, action)).toEqual(expected);
    });

    it('should handle ADD_HISTORY', () => {
        const init = new History({ dps: [], data: [] });
        const action = {
            type: historyActionTypes.ADD_HISTORY,
            dps: 1000,
            character: { testcharcter: 'testcharcter' },
            settings: { testsetting: 'testsetting' }
        };
        const expected = new History({
            dps: [1000],
            data: [{
                character: { testcharcter: 'testcharcter' },
                settings: { testsetting: 'testsetting' }
            }]
        });
        expect(historyReducer(init, action)).toEqual(expected);
    });
});
