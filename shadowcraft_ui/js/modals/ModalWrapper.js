import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../store';
import { modalTypes } from '../reducers/modalReducer';

class ModalWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal(e) {
        if (this.props.currentModal != modalTypes.RELOAD_SWIRL && e.target.className == "modaloverlay") {
            store.dispatch({type: 'CLOSE_MODAL'});
        }
    }

    render() {
        return (
            <div className="modaloverlay" onClick={this.hideModal}>
                <div className="modal ui-dialog" id={this.props.modalId} style={this.props.style}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

ModalWrapper.propTypes = {
    // props
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    currentModal: PropTypes.string,
    modalId: PropTypes.string,

    // methods
    hideModal: PropTypes.func,
};

ModalWrapper.defaultProps = {
    style: {},
    currentModal: ""
};

const mapStateToProps = function (store) {
    return {
        currentModal: store.modal.current
    };
};

export default connect(mapStateToProps)(ModalWrapper);
