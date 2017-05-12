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
            let newState = state;
            newState.dps = [];
            newState.data = [];
            return Object.assign({}, state, newState);
        }

        case historyActionTypes.ADD_HISTORY: {
            let newState = state;
            newState.dps.push(Math.round(action.dps * 10.0) / 10.0);
            newState.data.push({
                character: JSON.parse(JSON.stringify(action.character)),
                settings: Object.create(action.settings)
            });
            return Object.assign({}, state, newState);
        }
    }

    return state;
};