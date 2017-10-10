import Immutable from 'immutable';

export const History = Immutable.Record({ dps: Immutable.List(), data: Immutable.List() });

export const historyActionTypes = {
    CLEAR_HISTORY: 'CLEAR_HISTORY',
    ADD_HISTORY: 'ADD_HISTORY'
};

export const historyReducer = function (state = new History(), action) {

    switch (action.type) {

        case historyActionTypes.CLEAR_HISTORY: {
            return state.set('dps', Immutable.List()).set('data', Immutable.List());
        }

        case historyActionTypes.ADD_HISTORY: {

            let dps = state.get('dps');
            dps = dps.concat(Math.round(action.dps * 10.0) / 10.0);

            let data = state.get('data');
            data = data.concat(
                {
                    character: JSON.parse(JSON.stringify(action.character)),
                    settings: Object.assign({}, action.settings)
                }
            );

            return state.set('dps', dps).set('data', data);
        }
    }

    return state;
};
