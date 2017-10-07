import Immutable from 'immutable';

export const settingsActionTypes = {
    CHANGE_SETTING: 'CHANGE_SETTING',
    SETTINGS_LAYOUT: 'SETTINGS_LAYOUT',
    RESET_SETTINGS: 'RESET_SETTINGS'
};

export const settingsReducer = function (state = { current: {}, layout: [] }, action) {

    state = Immutable.fromJS(state);

    switch (action.type) {
        //TODO: figure out how to properly merge a nested property, this is nasty
        case settingsActionTypes.CHANGE_SETTING: {
            return state.setIn(['current', action.setting], action.value).toJS();
        }

        case settingsActionTypes.SETTINGS_LAYOUT: {

            console.log(action.data);
            for (var index in action.data) {
                var section = action.data[index];
                for (var item_index in section.items) {
                    var item = section.items[item_index];
                    if (!state.get('current').has(item.name)) {
                        state = state.setIn(['current', item.name], item.default);
                    }
                }
            }

            return state.set('layout', action.data).toJS();
        }

        case settingsActionTypes.RESET_SETTINGS: {
            return state.set('current', action.data).toJS();
        }
    }

    return state.toJS();
};
