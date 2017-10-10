import { settingsActionTypes, settingsReducer, Settings } from './settingsReducer';
import Immutable from 'immutable';

describe('settingsReducer', () => {

    it('should return initial state', () => {
        expect(settingsReducer(undefined, {})).toEqual(new Settings());
    });

    it('should handle CHANGE_SETTING', () => {

        const init = new Settings();
        const action = {
            type: settingsActionTypes.CHANGE_SETTING,
            setting: 'testsetting',
            value: 'test'
        };

        const record = Immutable.Record({ current: Immutable.Map({ testsetting: 'test' }), layout: Immutable.List() });
        const expected = new record();

        expect(settingsReducer(init, action).equals(expected)).toBe(true);
    });

    it('should handle SETTINGS_LAYOUT', () => {
        const init = new Settings();
        const action = {
            type: settingsActionTypes.SETTINGS_LAYOUT,
            data: [{ items: [{ name: 'testname', default: 'testdefault' }] }]
        };

        const record = Immutable.Record(
            {
                layout: Immutable.fromJS([{ items: [{ name: 'testname', default: 'testdefault' }] }]),
                current: Immutable.fromJS({ testname: 'testdefault' })
            });

        const expected = new record();

        expect(settingsReducer(init, action).equals(expected)).toBe(true);
    });

    it('should handle SETTINGS_LAYOUT when current exists', () => {
        const init = new Settings().set('current', Immutable.fromJS({ testinit: 'testinit', testname: 'testdefault' }));
        const action = {
            type: settingsActionTypes.SETTINGS_LAYOUT,
            data: [{ items: [{ name: 'testname', default: 'testdefault' }] }]
        };

        const record = Immutable.Record({
            layout: Immutable.fromJS([{ items: [{ name: 'testname', default: 'testdefault' }] }]),
            current: Immutable.fromJS({ testinit: 'testinit', testname: 'testdefault' })
        });
        const expected = new record();

        expect(settingsReducer(init, action).equals(expected)).toBe(true);
    });

    it('should handle SETTINGS_LAYOUT when key in current exists', () => {
        const init = new Settings()
            .set('current', Immutable.fromJS({ testname: 'testdefault' }))
            .set('layout', Immutable.fromJS({}));
        const action = {
            type: settingsActionTypes.SETTINGS_LAYOUT,
            data: [{ items: [{ name: 'testname', default: 'testdefault' }] }]
        };

        const record = Immutable.Record({
            layout: Immutable.fromJS([{ items: [{ name: 'testname', default: 'testdefault' }] }]),
            current: Immutable.fromJS({ testname: 'testdefault' })
        });
        const expected = new record();

        expect(settingsReducer(init, action).equals(expected)).toBe(true);

    });

    it('should handle RESET_SETTINGS', () => {
        const init = new Settings().set('current', Immutable.fromJS({ old: 'data' }));
        const action = { type: settingsActionTypes.RESET_SETTINGS, data: { new: 'data' } };

        const record = Immutable.Record({
            current: Immutable.fromJS({ new: 'data' }),
            layout: Immutable.fromJS([])
        });
        const expected = new record();
        expect(settingsReducer(init, action).equals(expected)).toBe(true);
    });

    it('should handle RESET_SETTINGS when data is null', () => {
        const init = new Settings({ current: Immutable.Map(), layout: Immutable.List() });
        const action = { type: settingsActionTypes.RESET_SETTINGS, data: null };
        const expected = Immutable.Record({ current: Immutable.Map(), layout: Immutable.List() })();
        expect(settingsReducer(init, action).equals(expected)).toBe(true);
    });

    it('should handle RESET_SETTINGS when data is undefined', () => {
        const init = new Settings({ current: Immutable.Map(), layout: Immutable.List() });
        const action = { type: settingsActionTypes.RESET_SETTINGS};
        const expected = Immutable.Record({ current: Immutable.Map(), layout: Immutable.List() })();
        expect(settingsReducer(init, action).equals(expected)).toBe(true);
    });

});
