import { settingsActionTypes, settingsReducer } from './settingsReducer';

describe('settingsReducer', () => {

    it('should return initial state', () => {
        expect(settingsReducer(undefined, {})).toEqual({});
    });

    it('should handle CHANGE_SETTING', () => {

        const init = { current: { testsetting: 'init' } };
        const action = {
            type: settingsActionTypes.CHANGE_SETTING,
            setting: 'testsetting',
            value: 'test'
        };
        const expected = { current: { testsetting: 'test' } };

        expect(settingsReducer(init, action)).toEqual(expected);
    });

    it('should handle SETTINGS_LAYOUT', () => {
        const init = { layout: {} };
        const action = {
            type: settingsActionTypes.SETTINGS_LAYOUT,
            data: [{ items: [{ name: 'testname', default: 'testdefault' }] }]
        };
        const expected = {
            layout: [{ items: [{ name: 'testname', default: 'testdefault' }] }],
            current: { testname: 'testdefault' }
        };

        expect(settingsReducer(init, action)).toEqual(expected);
    });

    it('should handle SETTINGS_LAYOUT when current exists', () => {
        const init = { layout: {}, current: { testinit: 'testinit' } };
        const action = {
            type: settingsActionTypes.SETTINGS_LAYOUT,
            data: [{ items: [{ name: 'testname', default: 'testdefault' }] }]
        };
        const expected = {
            layout: [{ items: [{ name: 'testname', default: 'testdefault' }] }],
            current: {testinit: 'testinit', testname: 'testdefault' }
        };

        expect(settingsReducer(init, action)).toEqual(expected);
    });

    it('should handle SETTINGS_LAYOUT when key in current exists', () => {
        const init = { layout: {}, current: { testname: 'testdefault' } };
        const action = {
            type: settingsActionTypes.SETTINGS_LAYOUT,
            data: [{ items: [{ name: 'testname', default: 'testdefault' }] }]
        };
        const expected = {
            layout: [{ items: [{ name: 'testname', default: 'testdefault' }] }],
            current: { testname: 'testdefault' }
        };

        expect(settingsReducer(init, action)).toEqual(expected);
    });

    it('should handle RESET_SETTINGS', () => {
        const init = { old: 'data' };
        const action = { type: settingsActionTypes.RESET_SETTINGS, data: { new: 'data' } };
        const expected = { old: 'data', new: 'data' };
        expect(settingsReducer(init, action)).toEqual(expected);
    });

});