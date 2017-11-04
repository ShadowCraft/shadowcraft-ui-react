import { warningsReducer, WarningState, warningsActionTypes } from './warningsReducer';
import { Map } from 'immutable';

describe('warningsReducer', () => {

    it('should return initial state', () => {
        expect(warningsReducer(undefined, {})).toEqual(new WarningState());
    });

    it('should handle SET_ENGINE_WARNING', () => {
        const init = new Map({engineWarning: ''});
        const action = { type: warningsActionTypes.SET_ENGINE_WARNING, data: 'test' };
        const expected = new Map({ engineWarning: 'test' });
        expect(warningsReducer(init, action)).toEqual(expected);
    });
});
