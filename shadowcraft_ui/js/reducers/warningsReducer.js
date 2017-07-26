import deepClone from 'deep-clone';

export const initialWarningsState = {
    warnings: [
        "Band of Crystalline Bone needs an enchantment"
    ]
};

export const warningsActionTypes = {
    CLEAR_WARNINGS: 'CLEAR_WARNINGS',
    ADD_WARNING: 'ADD_WARNING'
};

export const warningsReducer = function (state = initialWarningsState, action) {
    switch (action.type) {
        case warningsActionTypes.CLEAR_WARNINGS:
            var newState = state;
            newState.warnings = [];
            return Object.assign({}, state, newState);

        case warningsActionTypes.ADD_WARNING:
            var newState = deepClone(state);
            newState.warnings.push(action.text);
            return Object.assign({}, state, newState);
    }

    return state;
};
