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
    RELOAD_SWIRL: 'RELOAD_SWIRL'
};

export const modalReducer = function (state = initialModalState, action) {
    switch (action.type) {
        case modalActionTypes.OPEN_MODAL:
            return {current: action.data.popupType,
                    open: true,
                    props: action.data.props};

        case modalActionTypes.CLOSE_MODAL:
            return {current: null,
                    open: false,
                    props: null};
    }

    return state;
};
