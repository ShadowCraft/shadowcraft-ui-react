import dotProp from 'dot-prop-immutable';
import deepEqual from 'deep-equal';

export const initialWarningsState = {
    warnings: []
};

export const warningsActionTypes = {
    CLEAR_WARNINGS: 'CLEAR_WARNINGS',
    ADD_WARNING: 'ADD_WARNING'
};

export const warningsReducer = function (state = initialWarningsState, action) {
    switch (action.type) {
        case warningsActionTypes.CLEAR_WARNINGS:
            return dotProp.set(state, 'warnings', []);

        case warningsActionTypes.ADD_WARNING: {
            //check if the warning has already been issued 
            if (state.warnings.find(value => deepEqual(value, action.text)) === undefined){
                return dotProp.merge(state, 'warnings', [action.text]);
            }            
        }
    }

    return state;
};
