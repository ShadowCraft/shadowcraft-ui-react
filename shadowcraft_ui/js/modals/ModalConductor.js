import React from 'react';
import {connect} from 'react-redux';

import store from '../store';
import SignInModal from './SignInModal.js';
import BonusIDPopup from '../gear/BonusIDPopup';

import { modalTypes } from '../reducers/modalReducer';

class ModalConductor extends React.Component {
    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        store.dispatch({type: "CLOSE_MODAL"});
    }

    render() {
        console.log(this.props.modalProps);
        switch (this.props.current) {

            case modalTypes.ITEM_SELECT:
                return <SignInModal hideModal={this.hideModal} {...this.props}/>;

            case modalTypes.ITEM_BONUSES:
                return <BonusIDPopup hideModal={this.hideModal} {...this.props.modalProps}/>;

            default:
                return null;
        }
    }
}

const mapStateToProps = function (store) {
    return {
        current: store.modal.current,
        modalProps: store.modal.props
    };
};

export default connect(mapStateToProps)(ModalConductor);
