export const initialModalState = {
    current: null,
    open: false
};

export const modalActionTypes = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

export const modalTypes = {
    ITEM_SELECT: 'ITEM_SELECT',
    ITEM_BONUSES: 'ITEM_BONUSES',
    DEBUG_URL: 'DEBUG_URL',
};

export const modalReducer = function (state = initialModalState, action) {
    switch (action.type) {
        case modalActionTypes.OPEN_MODAL:
            var newState = state;
            newState.current = action.data.popupType;
            newState.open = true;
            newState.props = action.data.props;
            return Object.assign({}, state, newState);

        case modalActionTypes.CLOSE_MODAL:
            var newState = state;
            newState.current = null;
            newState.open = false;
            newState.props = null;
            return Object.assign({}, state, newState);
    }

    return state;
};
