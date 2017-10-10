import Immutable from 'immutable';

export const Settings = Immutable.Record({ current: Immutable.Map(), layout: Immutable.List() });

export const settingsActionTypes = {
    CHANGE_SETTING: 'CHANGE_SETTING',
    SETTINGS_LAYOUT: 'SETTINGS_LAYOUT',
    RESET_SETTINGS: 'RESET_SETTINGS'
};

export const settingsReducer = function (state = new Settings(), action) {

    switch (action.type) {

        case settingsActionTypes.CHANGE_SETTING: {
            return state.setIn(['current', action.setting], action.value);
        }

        case settingsActionTypes.SETTINGS_LAYOUT: {
            for (let index in action.data) {
                let section = action.data[index];
                for (let item_index in section.items) {
                    let item = section.items[item_index];
                    let current = state.get('current');

                    if (!current.has(item.name)) {
                        state = state.setIn(['current', item.name], item.default);
                    }
                }
            }

            return state.set('layout', Immutable.fromJS(action.data));
        }

        case settingsActionTypes.RESET_SETTINGS: {
            return state.set('current', Immutable.fromJS(action.data));
        }
    }

    return state;
};
