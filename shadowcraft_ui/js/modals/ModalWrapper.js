import React from 'react';
const {PropTypes} = React;

const ModalWrapper = props => {
    return (
        <div className="modal ui-dialog" id={props.modalId} style={props.style}>
            {props.children}
        </div>
    );
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
