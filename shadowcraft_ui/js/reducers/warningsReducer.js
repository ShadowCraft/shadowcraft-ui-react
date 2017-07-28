import deepClone from 'deep-clone';
import dotProp from 'dot-prop-immutable';

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

        case warningsActionTypes.ADD_WARNING:
            return dotProp.merge(state, 'warnings', [action.text]);
    }

    return state;
};
