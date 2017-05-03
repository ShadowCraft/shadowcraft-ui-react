import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'whatwg-fetch';

const characterReducer = function (state = {}, action) {

    switch (action.type) {

        // Full reset of the character data. This is used on page load and
        // whenever the user presses the refresh button.
        case 'RESET_CHARACTER_DATA': {
            return Object.assign({}, state, action.data);
        }

        case 'UPDATE_ARTIFACT_TRAITS': {
            let newState = Object.assign({}, state);
            newState.artifact.traits = action.data;
            return Object.assign({}, state, newState);
        }

        case 'UPDATE_ARTIFACT_RELIC': {
            let newState = state;
            if (newState.artifact.relics[action.data.slot].id != 0) {
                newState.artifact.traits[newState.artifact.relics[action.data.slot].id] -= 1;
            }

            newState.artifact.relics[action.data.slot].id = action.data.trait;
            newState.artifact.relics[action.data.slot].ilvl = action.data.ilvl;

            // Update the new trait
            newState.artifact.traits[action.data.trait] += 1;

            return Object.assign({}, state, newState);
        }

        case 'UPDATE_SPEC': {
            return Object.assign({}, state, {
                active: action.data
            });
        }

        case 'UPDATE_TALENTS': {
            let newState = state;
            newState.talents.current = action.data;
            return Object.assign({}, state, newState);
        }

        case 'CHANGE_ITEM': {

            // look away now, lest ye dispair
            
            //TODO: clean up the data models so this mapping isn't required.
            //not clearing bonuses and gems because idk the right mapping right now
            //not change base ilvl, since I do not know how that works and it is not in item db entry
            //context may not be mapped correctly, I'm just pulling the first entry and calling it good for now

            let item = Object.assign({}, state.gear[action.data.slot]);
            item.context = action.data.item.contexts[0];
            item.gems = [];
            item.bonuses = [];
            item.icon = action.data.item.properties.icon;
            item.id = action.data.item.remote_id;
            item.item_level = action.data.item.item_level;
            item.name = action.data.item.properties.name;
            item.quality = action.data.item.properties.quality;
            item.stats = action.data.item.properties.stats;

            let gear = Object.assign({}, state.gear, { [action.data.slot]: item });
            return Object.assign({}, state, { gear: gear });
        }
    }

    return state;
};

// Thunk for calling the events in the character reducer. Using this to dispatch events
// into the character reducer will also make a call to the engine to update that data.
export function updateCharacterState(event, data) {
    return function (dispatch) {
        dispatch({ type: event, data: data });
        dispatch(getEngineData());
    };
}

const settingsReducer = function (state = {}, action) {

    switch (action.type) {
        //TODO: figure out how to properly merge a nested property, this is nasty
        case 'CHANGE_SETTING': {
            let newcurrent = Object.assign({}, state.current);
            newcurrent[action.setting] = action.value;
            let newstate = Object.assign({}, state);
            newstate.current = newcurrent;
            return newstate;
        }

        case 'SETTINGS_LAYOUT': {
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

        case 'RESET_SETTINGS': {
            return Object.assign({}, state, action.data);
        }
    }

    return state;
};

export function changeSetting(setting) {
    return function (dispatch) {
        dispatch({
            type: 'CHANGE_SETTING',
            setting: setting.setting,
            value: setting.value
        });
        dispatch(getEngineData());
    };
}

const initialEngineState = {

    ui_build: "7.2.0-UI-Test",
    build: "7.2.0-Test",

    // TODO: I'm not a huge fan of hard-coding the layout of the data we get back
    // from the engine here like this, but I don't know if requesting it from the
    // backend or engine is any better.
    ep: {
        agi: 0,
        crit: 0,
        haste: 0,
        mastery: 0,
        versatility: 0
    },
    mh_ep: {
        mh_dps: 0
    },
    oh_ep: {
        oh_dps: 0
    },
    stats: {
        agility: 0,
        crit: 0,
        haste: 0,
        mastery: 0,
        versatility: 0
    },
    engine_info: {
        wow_build_target: ''
    },

    talentRanking: {},
    traitRanking: {},
    dps_breakdown: [],
    totalDps: 0.0
};

const engineReducer = function (state = initialEngineState, action) {

    switch (action.type) {
        case 'SET_ENGINE_STATE':
            return Object.assign({}, state, action.response);
    }

    return state;
};

// Thunk for handling incoming engine state. It updates the engine state, plus passes
// the current character and settings state to the history reducer.
export function updateEngineState(data) {
    return function (dispatch, getState) {
        const state = getState();
        dispatch({ type: 'SET_ENGINE_STATE', response: data });
        dispatch({
            type: 'ADD_HISTORY', dps: data.totalDps,
            character: state.character,
            settings: state.settings.current
        });
    };
}


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function getEngineData() {
    // TODO: this needs error handling
    return function (dispatch, getState) {
        const state = getState();

        fetch('/engine', {
            method: 'POST',
            body: JSON.stringify({
                character: state.character,
                settings: state.settings.current
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkStatus)
            .then(r => r.json())
            .then(r => dispatch(updateEngineState(r)))
            .catch(ex => console.log(ex))
    };
}

const initialWarningsState = {
    warnings: [
        "Band of Crystalline Bone needs an enchantment"
    ]
};

const warningsReducer = function (state = initialWarningsState, action) {
    switch (action.type) {
        case 'CLEAR_WARNINGS':
            var newState = state;
            newState.warnings = [];
            return Object.assign({}, state, newState);

        case 'ADD_WARNING':
            return state;
    }

    return state;
};

const initialHistoryState = {
    dps: [],
    data: []
};

const historyReducer = function (state = initialHistoryState, action) {
    switch (action.type) {
        case 'CLEAR_HISTORY':
            var newState = state;
            newState.dps = [];
            newState.data = [];
            return Object.assign({}, state, newState);

        case 'ADD_HISTORY':
            var newState = state;
            newState.dps.push(Math.round(action.dps * 10.0) / 10.0);
            newState.data.push({
                character: JSON.parse(JSON.stringify(action.character)),
                settings: Object.create(action.settings)
            });
            return Object.assign({}, state, newState);
    }

    return state;
};

export function historyTimeMachine(character, settings) {
    return function (dispatch) {
        dispatch({ type: 'RESET_CHARACTER_DATA', data: character });
        dispatch({ type: 'RESET_SETTINGS', data: settings });
        dispatch(getEngineData());
    };
}

// Combine the reducers into a single reducer to put into the store.
const reducers = combineReducers({
    character: characterReducer,
    settings: settingsReducer,
    engine: engineReducer,
    warnings: warningsReducer,
    history: historyReducer,
});

// Build the store
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
