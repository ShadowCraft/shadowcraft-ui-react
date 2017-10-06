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
        const init = { warnings: [{ component: 'init', text: 'init' }] };
        const action = { type: warningsActionTypes.ADD_WARNING, component: 'new', text: "new" };
        const expected = { warnings: [{ component: 'init', text: 'init' }, { component: 'new', text: 'new' }] };
        expect(warningsReducer(init, action)).toEqual(expected);
    });

    it('ADD_WARNING should not allow duplicate entries', () => {
        const init = { warnings: [{ component: 'init', text: 'init' }] };
        const action = { type: warningsActionTypes.ADD_WARNING, component: 'init', text: 'init' };
        const expected = { warnings: [{ component: 'init', text: 'init' }] };
        expect(warningsReducer(init, action)).toEqual(expected);
    });

    it('should handle ADD_MULTIPLE_WARNINGS', () => {
        const init = { warnings: [{ component: 'init', text: 'init' }] };
        const action = { type: warningsActionTypes.ADD_MULTIPLE_WARNINGS, component: 'new', warnings: ['first', 'second'] };
        const expected = { warnings: [{ component: 'init', text: 'init' }, { component: 'new', text: 'first' },  { component: 'new', text: 'second' }] };
        expect(warningsReducer(init, action)).toEqual(expected);
    });

    it('ADD_MULTIPLE_WARNINGS should not allow duplicate entries', () => {
        const init = { warnings: [{ component: 'init', text: 'first' }] };
        const action = { type: warningsActionTypes.ADD_MULTPLE_WARNINGS, component: 'init', warnings: ['first', 'second', 'third'] };
        const expected = { warnings: [{ component: 'init', text: 'first' }, { component: 'init', text: 'second' }, { component: 'init', text: 'third' }] };
        expect(warningsReducer(init, action)).toEqual(expected);
    });
});
