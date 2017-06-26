export const initialModalState = {
    current: null,
    open: false
};

export const modalActionTypes = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

export const modalTypes = {
    SOCIAL_SIGN_IN: 'SOCIAL_SIGN_IN',
};

export const modalReducer = function (state = initialModalState, action) {
    switch (action.type) {
        case modalActionTypes.OPEN_MODAL:
            var newState = state;
            newState.current = modalTypes.SOCIAL_SIGN_IN;
            newState.open = true;
            return Object.assign({}, state, newState);

        case modalActionTypes.CLOSE_MODAL:
            var newState = state;
            newState.current = null;
            newState.open = false;
            return Object.assign({}, state, newState);
    }

    return state;
};
