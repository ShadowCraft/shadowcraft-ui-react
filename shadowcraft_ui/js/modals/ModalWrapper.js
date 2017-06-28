import React from 'react';
const {PropTypes} = React;

const ModalWrapper = props => {
    return (
        <div className="modal ui-dialog">
            {props.children}
        </div>
    );
};

ModalWrapper.propTypes = {
    // props
    width: PropTypes.number,
    style: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,

    // methods
    hideModal: PropTypes.func,
    onOk: PropTypes.func,
};

ModalWrapper.defaultProps = {
    width: 400,
    onOk: () => {}
};

export default ModalWrapper;
