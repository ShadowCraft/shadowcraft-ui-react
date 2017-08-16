export const initialHistoryState = {
    dps: [],
    data: []
};

export const historyActionTypes = {
    CLEAR_HISTORY: 'CLEAR_HISTORY',
    ADD_HISTORY: 'ADD_HISTORY'
};

export const historyReducer = function (state = initialHistoryState, action) {
    switch (action.type) {

        case historyActionTypes.CLEAR_HISTORY: {
            return Object.assign({}, state, { dps: [], data: [] });
        }

        case historyActionTypes.ADD_HISTORY: {
            let newState = Object.assign({}, state);
            newState.dps.push(Math.round(action.dps * 10.0) / 10.0);
            newState.data.push(
                {
                    character: JSON.parse(JSON.stringify(action.character)),
                    settings: Object.assign({}, action.settings)
                }
            );
            return newState;
        }
    }

    return state;
};