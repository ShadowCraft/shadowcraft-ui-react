import { warningsReducer, initialWarningsState, warningsActionTypes }
    from './warningsReducer';

describe('warningsReducer', () => {

    it('should return initial state', () => {
        expect(warningsReducer(undefined, {})).toEqual(initialWarningsState);
    });

    it('should handle CLEAR_WARNINGS', () => {
        const init = { warnings: ["test"] };
        const action = { type: warningsActionTypes.CLEAR_WARNINGS };
        const expected = { warnings: [] };
        expect(warningsReducer(init, action)).toEqual(expected);
    });

    it('should handle ADD_WARNING', () => {
        const init = { warnings: ["test"] };
        const action = { type: warningsActionTypes.ADD_WARNING };
        const expected = { warnings: ["test"] };
        expect(warningsReducer(init, action)).toEqual(expected);
    });
});