export const settingsActionTypes = {
    CHANGE_SETTING: 'CHANGE_SETTING',
    SETTINGS_LAYOUT: 'SETTINGS_LAYOUT',
    RESET_SETTINGS: 'RESET_SETTINGS'
};

export const settingsReducer = function (state = {}, action) {

    switch (action.type) {
        //TODO: figure out how to properly merge a nested property, this is nasty
        case settingsActionTypes.CHANGE_SETTING: {
            let newcurrent = Object.assign({}, state.current);
            newcurrent[action.setting] = action.value;
            let newstate = Object.assign({}, state);
            newstate.current = newcurrent;
            return newstate;
        }

        case settingsActionTypes.SETTINGS_LAYOUT: {
            // Go through the defaults for the settings and add them to the value
            // state if it's not set yet.
            let current = state.current;
            if (!current) {
                current = {};
            }

            for (var index in action.data) {
                var section = action.data[index];
                for (var item_index in section.items) {
                    var item = section.items[item_index];
                    var key = item.name;
                    if (!(current.hasOwnProperty(key))) {
                        current[key] = item.default;
                    }
                }
            }

            return Object.assign({}, state, {
                layout: action.data,
                current: current,
            });
        }

        case settingsActionTypes.RESET_SETTINGS: {
            return Object.assign({}, state, action.data);
        }
    }

    return state;
};