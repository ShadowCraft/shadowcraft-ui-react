import Immutable from 'immutable';

export const initialHistoryState = {
    dps: [],
    data: []
};

export const historyActionTypes = {
    CLEAR_HISTORY: 'CLEAR_HISTORY',
    ADD_HISTORY: 'ADD_HISTORY'
};

export const historyReducer = function (state = initialHistoryState, action) {

    state = Immutable.fromJS(state);

    switch (action.type) {

        case historyActionTypes.CLEAR_HISTORY: {
            return state.set('dps', []).set('data', []).toJS();
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

            return state.set('dps', dps).set('data', data).toJS();
        }
    }

    return state.toJS();
};
