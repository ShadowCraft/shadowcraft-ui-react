import Immutable from 'immutable';

export const History = Immutable.Record({ dps: Immutable.List(), data: Immutable.List() });

export const historyActionTypes = {
    CLEAR_HISTORY: 'CLEAR_HISTORY',
    ADD_HISTORY: 'ADD_HISTORY'
};

export const historyReducer = function (state = new History(), action) {

    switch (action.type) {

        case historyActionTypes.CLEAR_HISTORY: {
            let newState = state.set('data', Immutable.List());
            newState = newState.set('dps', Immutable.List());
            return newState;
        }

        case historyActionTypes.ADD_HISTORY: {

            let data = state.get('data');
            data = data.concat(
                {
                    character: action.character,
                    settings: action.settings,
                    engine: action.engine
                }
            );

            let dps = state.get('dps');
            dps = dps.concat(action.dps);

            let newState = state.set('data', data);
            newState = newState.set('dps', dps);
            return newState;
        }
    }

    return state;
};
