import Immutable from 'immutable';

export const History = Immutable.Record({ dps: Immutable.List(), data: Immutable.List() });

export const historyActionTypes = {
    CLEAR_HISTORY: 'CLEAR_HISTORY',
    ADD_HISTORY: 'ADD_HISTORY'
};

export const historyReducer = function (state = new History(), action) {

    switch (action.type) {

        case historyActionTypes.CLEAR_HISTORY: {
            return state.set('data', Immutable.List());
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

            return state.set('data', data);
        }
    }

    return state;
};
