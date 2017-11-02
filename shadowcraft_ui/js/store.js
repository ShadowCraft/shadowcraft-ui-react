import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { characterReducer, characterActionTypes } from './reducers/characterReducer';
import { settingsReducer } from './reducers/settingsReducer';
import { engineReducer } from './reducers/engineReducer';
import { warningsReducer } from './reducers/warningsReducer';
import { historyReducer } from './reducers/historyReducer';
import { modalReducer, modalTypes } from './reducers/modalReducer';
import { storageAvailable, storageSet } from './common';
import thunk from 'redux-thunk';
import 'whatwg-fetch';
import Immutable from 'immutable';

// Thunk for calling the events in the character reducer. Using this to dispatch events
// into the character reducer will also make a call to the engine to update that data.
export function updateCharacterState(event, data) {
    return function (dispatch) {
        dispatch({ type: event, data: data });
        dispatch(getEngineData());
    };
}

export function changeSpecialization(oldSpec, newSpec, newTalents) {
    return dispatch => {

        // TODO: why is this check only done for one of the events? shouldn't it apply to
        // all of them?
        if (oldSpec !== newSpec) {
            dispatch({ type: characterActionTypes.SWAP_ARTIFACT_WEAPON, data: newSpec });
            dispatch({ type: 'CLEAR_HISTORY' });
        }
        dispatch({ type: characterActionTypes.RESET_ARTIFACT, data: newSpec });
        dispatch({ type: characterActionTypes.UPDATE_TALENTS, data: newTalents });
        dispatch({ type: characterActionTypes.UPDATE_SPEC, data: newSpec });
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

export function changeRelic(relicSlot, traitId, relicIlvl) {
    return function (dispatch) {
        dispatch({
            type: characterActionTypes.UPDATE_ARTIFACT_RELIC,
            data: {
                slot: relicSlot,
                trait: traitId,
                ilvl: relicIlvl
            }
        });
        dispatch(getEngineData());
    };

}


// Thunk for handling incoming engine state. It updates the engine state, plus passes
// the current character and settings state to the history reducer.
export function updateEngineState(data) {
    return function (dispatch, getState) {
        dispatch({ type: 'SET_ENGINE_STATE', response: data });
        // the order matters here, getState must come after the engine dispatch
        // otherwise the engine state that will be saved will be the last state, instead of the current       
        const state = getState();
        dispatch({
            type: 'ADD_HISTORY',
            character: state.character,
            settings: state.settings.current,
            engine: state.engine
        });

        if (storageAvailable()) {
            let key = `${state.character.region}-${state.character.realm}-${state.character.name}`;
            storageSet(key, { 'settings': state.settings.current, 'character': state.character });
        }
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
        dispatch({ type: "OPEN_MODAL", data: { popupType: modalTypes.RELOAD_SWIRL } });
        fetch('/engine', {
            method: 'POST',
            body: JSON.stringify({
                character: state.character.toJS(),
                settings: state.settings.current
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(checkFetchStatus)
            .then(r => r.json())
            .then(r => {
                store.dispatch({ type: "CLOSE_MODAL" });
                if ('error' in r) {
                    dispatch({ type: 'ADD_WARNING', text: r['error'] });
                }
                else {
                    dispatch(updateEngineState(r));
                }
            })
            /* eslint-disable no-console */
            .catch(ex => console.log(ex));
        /* eslint-enable no-console */
    };
}

export function historyTimeMachine(character, settings, engine) {
    return function (dispatch, getState) {
        dispatch({ type: 'RESET_CHARACTER_DATA', data: character });
        dispatch({ type: 'RESET_SETTINGS', data: settings });
        dispatch({ type: 'SET_ENGINE_STATE', data: engine });
        dispatch({
            type: 'ADD_HISTORY',
            character: character,
            settings: settings,
            engine: engine
        });

        const state = getState();
        if (storageAvailable()) {
            let key = `${state.character.region}-${state.character.realm}-${state.character.name}`;
            storageSet(key, { 'settings': state.settings.current, 'character': state.character });
        }
    };
}

// Combine the reducers into a single reducer to put into the store.
const reducers = combineReducers({
    character: characterReducer,
    settings: settingsReducer,
    engine: engineReducer,
    warnings: warningsReducer,
    history: historyReducer,
    modal: modalReducer,
});

// This makes the immutable objects get tagged with the right class names
// in Redux DevTools.
const composer = composeWithDevTools({
    serialize: {
        immutable: Immutable
    }
});

// Build the store
const store = createStore(reducers, composer(
    applyMiddleware(thunk)
));
export default store;
