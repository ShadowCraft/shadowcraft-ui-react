import { historyReducer, initialHistoryState, historyActionTypes }
    from './historyReducer';

describe('historyReducer', () => {

    it('should return initial state', () => {
        expect(historyReducer(undefined, {})).toEqual(initialHistoryState);
    });

    it('should handle CLEAR_HISTORY', () => {
        const init = { dps: ['stuff'], data: ['things'] };
        const action = { type: historyActionTypes.CLEAR_HISTORY };
        const expected = { dps: [], data: [] };
        expect(historyReducer(init, action)).toEqual(expected);
    });

    it('should handle ADD_HISTORY', () => {
        const init = { dps: [], data: [] };
        const action = {
            type: historyActionTypes.ADD_HISTORY,
            dps: 1000,
            character: { testcharcter: 'testcharcter' },
            settings: { testsetting: 'testsetting' }
        };
        const expected = {
            dps: [1000],
            data: [{
                character: { testcharcter: 'testcharcter' },
                settings: { testsetting: 'testsetting' }
            }]
        };
        expect(historyReducer(init, action)).toEqual(expected);
    });
});
