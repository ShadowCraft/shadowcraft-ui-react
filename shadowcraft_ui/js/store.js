import { createStore, combineReducers, applyMiddleware } from 'redux';
import 'whatwg-fetch';

// This middleware will just add the property "async dispatch"
// to actions with the "async" propperty set to true
const asyncDispatchMiddleware = store => next => action => {
    let syncActivityFinished = false;
    let actionQueue = [];

    function flushQueue() {
        actionQueue.forEach(a => store.dispatch(a)); // flush queue
        actionQueue = [];
    }

    function asyncDispatch(asyncAction) {
        actionQueue = actionQueue.concat([asyncAction]);

        if (syncActivityFinished) {
            flushQueue();
        }
    }

    const actionWithAsyncDispatch =
        Object.assign({}, action, { asyncDispatch });

    next(actionWithAsyncDispatch);
    syncActivityFinished = true;
    flushQueue();
};

const characterReducer = function (state = {}, action) {

    switch (action.type) {

        // Full reset of the character data. This is used on page load and
        // whenever the user presses the refresh button.
        case 'RESET_CHARACTER_DATA': {
            action.asyncDispatch({ type: 'GET_ENGINE_DATA' });
            return Object.assign({}, state, action.data);
        }

        case 'UPDATE_ARTIFACT_TRAITS': {
            let newState = state;
            newState.artifact.traits = action.traits;
            action.asyncDispatch({ type: 'GET_ENGINE_DATA' });
            return Object.assign({}, state, newState);
        }

        case 'UPDATE_ARTIFACT_RELICS': {
            let newState = state;
            newState.artifact.relics = action.relics;
            action.asyncDispatch({ type: 'GET_ENGINE_DATA' });
            return Object.assign({}, state, newState);
        }

        case 'UPDATE_SPEC': {
            action.asyncDispatch({ type: 'GET_ENGINE_DATA' });
            return Object.assign({}, state, {
                active: action.spec
            });
        }

        case 'UPDATE_TALENTS': {
            let newState = state;
            newState.talents.current = action.talents;
            action.asyncDispatch({ type: 'GET_ENGINE_DATA' });
            return Object.assign({}, state, newState);
        }
    }

    return state;
};

const settingsReducer = function (state = {}, action) {

    switch (action.type) {
        //TODO: figure out how to properly merge a nested property, this is nasty
        case 'CHANGE_SETTING': {
            let newcurrent = Object.assign({}, state.current);
            newcurrent[action.setting] = action.value;
            let newstate = Object.assign({}, state);
            newstate.current = newcurrent;
            action.asyncDispatch({ type: 'GET_ENGINE_DATA' });
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
    traitRanking: {
        192657: 21135.69,
        192923: 19508.73,
        192428: 10685.3,
        214368: 6580.27,
        192759: 4743.23,
        192384: 3245.69,
        192329: 2748.73,
        192315: 2064.07,
        192349: 1742.83,
        214928: 1358.92,
        192326: 1329.21,
        192424: 764.37,
        192376: 749.16,
        192310: 725.06,
        192318: 374.58,
        192323: 0,
        192345: 0,
        192422: 0,
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

const engineReducer = function (state = initialEngineState, action) {

    switch (action.type) {
        case 'GET_ENGINE_DATA':
            fetch('/engine')
                .then(r => r.json())
                .then(r => action.asyncDispatch({
                    type: 'SET_ENGINE_STATE', response: r
                }));
            return Object.assign({}, state, action.response);

        case 'SET_ENGINE_STATE':
            return Object.assign({}, state, action.response);
    }

    return state;
};

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
const store = createStore(reducers, applyMiddleware(asyncDispatchMiddleware));
export default store;
