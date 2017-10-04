import dotProp from 'dot-prop-immutable';
import deepEqual from 'deep-equal';

export const initialWarningsState = {
    warnings: []
};

export const warningsActionTypes = {
    CLEAR_WARNINGS: 'CLEAR_WARNINGS',
    ADD_WARNING: 'ADD_WARNING',
    ADD_MULTIPLE_WARNINGS: 'ADD_MULTIPLE_WARNINGS'
};

export const warningsReducer = function (state = initialWarningsState, action) {
    switch (action.type) {
        case warningsActionTypes.CLEAR_WARNINGS:
            return dotProp.set(state, 'warnings', []);

        case warningsActionTypes.ADD_WARNING: {

            let newState = dotProp.get(state, 'warnings') || [];

            newState = newState.filter(function(obj) {
                return obj.component != action.component;
            });

            newState.push({component: action.component, text: action.text});
            return dotProp.set(state, 'warnings', newState);
        }

        case warningsActionTypes.ADD_MULTIPLE_WARNINGS: {

            let newState = dotProp.get(state, 'warnings') || [];

            newState = newState.filter(function(obj) {
                return obj.component != action.component;
            });

            for (let idx in action.warnings) {
                newState.push({component: action.component,
                               text: action.warnings[idx]});
            }

            return dotProp.set(state, 'warnings', newState);
        }
    }

    return state;
};
