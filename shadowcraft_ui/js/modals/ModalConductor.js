import React from 'react';
import {connect} from 'react-redux';

import store from '../store';
import SignInModal from './SignInModal.js';

class ModalConductor extends React.Component {
    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        store.dispatch({type: "CLOSE_MODAL"});
    }

    render() {
        switch (this.props.current) {

            case 'SOCIAL_SIGN_IN':
                return <SignInModal hideModal={this.hideModal} {...this.props}/>;

            default:
                return null;
        }
    }
}

const mapStateToProps = function (store) {
    return {
        current: store.modal.current
    };
};

export default connect(mapStateToProps)(ModalConductor);
