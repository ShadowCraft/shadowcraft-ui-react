import { createStore, combineReducers, applyMiddleware } from 'redux';
import { characterReducer, characterActionTypes } from './reducers/characterReducer';
import { settingsReducer } from './reducers/settingsReducer';
import { engineReducer } from './reducers/engineReducer';
import { warningsReducer } from './reducers/warningsReducer';
import { historyReducer } from './reducers/historyReducer';
import { modalReducer, modalTypes } from './reducers/modalReducer';
import { storageAvailable, storageSet } from './common';
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

export function changeSpecialization(oldSpec, newSpec, newTalents) {
    return dispatch => {
        if (oldSpec !== newSpec) {
            switch (newSpec) {
                case 'a': {
                    dispatch({
                        type: characterActionTypes.SWAP_ARTIFACT_WEAPON,
                        data: {
                            id: 128870,
                            slot: 'mainHand',
                            name: 'The Kingslayers',
                            icon: 'inv_knife_1h_artifactgarona_d_01',
                            item_level: 750,
                            gems: [],
                            stats: { crit: 148, mastery: 142, agility: 219, stamina: 328 },
                            bonuses: [0],
                            quality: 6,
                            socket_count: 0,
                            enchant: 0,
                            weaponStats: { min_dmg: 962, max_dmg: 1604, speed: 1.8, dps: 712.86 },
                        }
                    });
                    break;
                }
                case 'Z': {
                    dispatch({
                        type: characterActionTypes.SWAP_ARTIFACT_WEAPON,
                        data: {
                            id: 128872,
                            slot: 'mainHand',
                            name: 'The Dreadblades',
                            icon: 'inv_sword_1h_artifactskywall_d_01',
                            item_level: 750,
                            gems: [],
                            stats: { crit: 148, mastery: 142, agility: 219, stamina: 328 },
                            bonuses: [0],
                            quality: 6,
                            socket_count: 0,
                            enchant: 0,
                            weaponStats: { min_dmg: 962, max_dmg: 1604, speed: 1.8, dps: 712.86 },
                        }
                    });
                    break;
                }
                case 'b': {
                    dispatch({
                        type: characterActionTypes.SWAP_ARTIFACT_WEAPON,
                        data: {
                            id: 128476,
                            slot: 'mainHand',
                            name: 'Fangs of the Devourer',
                            icon: 'inv_knife_1h_artifactfangs_d_01',
                            item_level: 750,
                            gems: [],
                            stats: { crit: 148, mastery: 142, agility: 219, stamina: 328 },
                            bonuses: [0],
                            quality: 6,
                            socket_count: 0,
                            enchant: 0,
                            weaponStats: { min_dmg: 962, max_dmg: 1604, speed: 1.8, dps: 712.86 },
                        }
                    });
                    break;
                }
            }
        }
        dispatch({ type: characterActionTypes.UPDATE_ARTIFACT_TRAITS, data: {} });
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
                character: state.character,
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
    modal: modalReducer,
});

// Build the store
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
