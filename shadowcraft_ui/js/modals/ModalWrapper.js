import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';

class ModalWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        store.dispatch({type: 'CLOSE_MODAL'});
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
};

ModalWrapper.propTypes = {
    // props
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,

    // methods
    hideModal: PropTypes.func,
};

ModalWrapper.defaultProps = {
    style: {},
};

export default ModalWrapper;
