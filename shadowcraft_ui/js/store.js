import { createStore, combineReducers, applyMiddleware } from 'redux';
import { characterReducer } from './reducers/characterReducer';
import { settingsReducer } from './reducers/settingsReducer';
import { engineReducer } from './reducers/engineReducer';
import { warningsReducer } from './reducers/warningsReducer';
import thunk from 'redux-thunk';
import 'whatwg-fetch';

// Thunk for calling the events in the character reducer. Using this to dispatch events
// into the character reducer will also make a call to the engine to update that data.
export function updateCharacterState(event, data) {
    return function (dispatch) {
        dispatch({ type: event, data: data });
        dispatch(getEngineData());
    };
}

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

export function checkFetchStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.message = response;
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
            .then(checkFetchStatus)
            .then(r => r.json())
            .then(r => dispatch(updateEngineState(r)))
            /* eslint-disable no-console */
            .catch(ex => console.log(ex));
        /* eslint-enable no-console */
    };
}

const initialHistoryState = {
    dps: [],
    data: []
};

const historyReducer = function (state = initialHistoryState, action) {
    switch (action.type) {
        case 'CLEAR_HISTORY': {
            let newState = state;
            newState.dps = [];
            newState.data = [];
            return Object.assign({}, state, newState);
        }

        case 'ADD_HISTORY': {
            let newState = state;
            newState.dps.push(Math.round(action.dps * 10.0) / 10.0);
            newState.data.push({
                character: JSON.parse(JSON.stringify(action.character)),
                settings: Object.create(action.settings)
            });
            return Object.assign({}, state, newState);
        }
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
