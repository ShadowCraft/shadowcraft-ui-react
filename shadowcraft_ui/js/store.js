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
            let newState = state;
            newState.artifact.traits = action.data;
            return Object.assign({}, state, newState);
        }

        case 'UPDATE_ARTIFACT_RELICS': {
            let newState = state;
            newState.artifact.relics = action.data;
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
    }

    return state;
};

// Thunk for calling the events in the character reducer. Using this to dispatch events
// into the character reducer will also make a call to the engine to update that data.
export function updateCharacterState(event, data)
{
    return function(dispatch) {
        dispatch({type: event, data: data})
        dispatch(getEngineData());
    }
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
                    var key = section.name + "." + item.name;
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
    }

    return state;
};

export function changeSetting(setting) {
    return function(dispatch) {
        dispatch({type: 'CHANGE_SETTING',
                  setting: setting.setting,
                  value: setting.value})
        dispatch(getEngineData());
    }
}

const initialEngineState = {

    ui_build: "7.1.5-UI-Test",
    build: "7.1.5-Test",

    // TODO: I'm not a huge fan of hard-coding the layout of the data we get back
    // from the engine here like this, but I don't know if requesting it from the
    // backend or engine is any better.
    ep: {
        agi: 0,
        crit: 0,
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
    dps_breakdown: []
    totalDps: 0.0
};

const engineReducer = function (state = initialEngineState, action) {

    switch (action.type) {
        case 'SET_ENGINE_STATE':
            console.log(action.response)
            return Object.assign({}, state, action.response);
    }

    return state;
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function getEngineData() {
    // TODO: this needs error handling
    return function(dispatch, getState) {
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
            .then(r => dispatch({type: 'SET_ENGINE_STATE', response: r}))
            .catch(ex => console.log(ex));
    }
}

const initialWarningsState = {
    warnings: [
        "Band of Crystalline Bone needs an enchantment"
    ]
};

const warningsReducer = function(state = initialWarningsState, action) {
    switch (action.type) {
        case 'CLEAR_WARNINGS':
            return state;

        case 'ADD_WARNING':
            var curState = state;
            curState.warnings.push(action.value);
            return curState;
    }

    return state;
};

// Combine the reducers into a single reducer to put into the store.
const reducers = combineReducers({
    character: characterReducer,
    settings: settingsReducer,
    engine: engineReducer,
    warnings: warningsReducer,
});

// Build the store
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
