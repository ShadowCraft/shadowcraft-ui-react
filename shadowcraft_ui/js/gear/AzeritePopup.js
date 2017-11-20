import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../store';
import ModalWrapper from '../modals/ModalWrapper';
import Item from '../viewModels/Item';

class AzeritePopup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ModalWrapper style={{top: "355px", left: "440px" }} modalId="azerite">
                <div style={{backgroundImage: "url(/static/images/azerite/azeritebackground-locked.png)", height: "469px", width: "476px", display: "block" }}>
                </div>
            </ModalWrapper>
        );
    }
}

AzeritePopup.propTypes = {
    item: PropTypes.instanceOf(Item).isRequired,
};

const mapStateToProps = function(store) {
    return {
    };
};

export default connect(mapStateToProps)(AzeritePopup);
