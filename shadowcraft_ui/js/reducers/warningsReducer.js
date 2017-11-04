import Immutable from 'immutable';

export const WarningState = Immutable.Record({ engineWarning: '' });

export const warningsActionTypes = {
    SET_ENGINE_WARNING: 'SET_ENGINE_WARNING',
};

export const warningsReducer = function (state = new WarningState(), action) {

    switch (action.type) {
        case warningsActionTypes.SET_ENGINE_WARNING:
            return state.set('engineWarning', action.data);
    }

    return state;
};
