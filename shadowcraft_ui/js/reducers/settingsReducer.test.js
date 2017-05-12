import { settingsReducer } from './settingsReducer';

describe('settingsReducer', () => {

    it('should handle CHANGE_SETTING', () => {

        const init = { current: { testsetting: 'init' } };
        const action = {
            type: 'CHANGE_SETTING',
            setting: 'testsetting',
            value: 'test'
        };
        const expected = { current: { testsetting: 'test' } };

        expect(settingsReducer(init, action)).toEqual(expected);
    });

    it('should handle SETTINGS_LAYOUT', () => {
        const init = { layout: {} };
        const action = {
            type: 'SETTINGS_LAYOUT',
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
        const action = { type: 'RESET_SETTINGS', data: { new: 'data' } };
        const expected = {old: 'data', new: 'data' };
        expect(settingsReducer(init, action)).toEqual(expected);
    });

});