import { createStore, combineReducers } from 'redux';

// Create an initial state and a reducer for each of the state objects that
// go in the global store.
const initialCharacterState = {
};

const characterReducer = function(state = initialCharacterState, action) {

    switch(action.type) {

        // Full reset of the character data. This is used on page load and
        // whenever the user presses the refresh button.
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
            var newState = state;
            newState.talents.current = action.talents;
            return Object.assign({}, state, newState);
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
        case 'SETTINGS_LAYOUT':
            // TODO: go through the defaults for the settings and add them to the
            // value state if it's not set yet.
            console.log(action.data);
            return Object.assign({}, state, {
                layout: action.data});
    }
    
    return state;
};

const initialEngineState = {

    ui_build: "7.1.5-UI-Test",
    build: "7.1.5-Test",

    // This is just temporary, but sidebar ranking does actually work
    // without the data there (it just displays all zero).
    talentRanking: {
        16511: 22367.17,
        193640: 19529.94,
        196864: 14410.1,
        14062: 0,
        108208: 0,
        108209: 0,
        193531: 12215.65,
        14983: 7316.87,
        114015: 5557.31,
        108211: 0,
        31230: 0,
        79008: 0,
        131511: 0,
        196861: 0,
        154094: 0,
        200806: 42383.59,
        193539: 40205.04,
        200802: 29827.76,
        152152: 12107.6,
        152150: 9754.46,
        137619: 3313.58,
    },

    dps_breakdown: [
        {
            name: 'Serrate',
            dps: 123124,
            pct: .15
        },
        {
            name: 'Stab',
            dps: 325643,
            pct: .25
        }, {
            name: 'Slit',
            dps: 123124,
            pct: .5
        },
        {
            name: 'Shiv',
            dps: 325643,
            pct: .30
        },
        {
            name: 'Slice',
            dps: 123124,
            pct: .10
        },
        {
            name: 'Slash',
            dps: 325643,
            pct: .20
        }
    ],
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
