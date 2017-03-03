import { createStore, combineReducers } from 'redux';

// Create an initial state and a reducer for each of the state objects that
// go in the global store.
const initialCharacterState = {
};

const characterReducer = function(state = initialCharacterState, action) {

    switch(action.type) {

        case 'RESET_CHARACTER_DATA':
            return Object.assign({}, state, action.data);

        case 'UPDATE_ARTIFACT_TRAITS':
            return state;
            
        case 'UPDATE_ARTIFACT_RELICS':
            return state;

        case 'UPDATE_SPEC':
            return Object.assign({}, state, {
                active: action.spec});

        case 'UPDATE_TALENTS':
            return Object.assign({}, state, {
                current_talents: action.talents});
    }

    return state;
};

const initialSettingsState = {
};

const settingsReducer = function(state = initialSettingsState, action) {

    switch (action.type) {
        case 'CHANGE_SETTING':
            var key = action.setting;
            return Object.assign({}, state, {
                key: action.value});
    }
    
    return state;
};

const initialEngineState = {
};

const engineReducer = function(state = initialEngineState, action) {

    switch (action.type) {
    }
    
    return state;
};

// Combine the reducers into a single reducer to put into the store.
const reducers = combineReducers({
    characterState: characterReducer,
    settingsState: settingsReducer,
    engineState: engineReducer,
});

// Build the store
const store = createStore(reducers);
export default store;
