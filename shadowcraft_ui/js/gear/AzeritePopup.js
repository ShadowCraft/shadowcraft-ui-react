import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../store';
import ModalWrapper from '../modals/ModalWrapper';
import Azerite from '../viewModels/Azerite';

class AzeritePopup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let backgroundImage = 'locked';
        if (this.props.data.active == 1) {
            const filtered = this.props.data.tier1.filter(item => item.get('pos') == 0);
            if (filtered.size == 0) {
                backgroundImage = 'firstunlocked';
            }
            else {
                backgroundImage = 'firstchosen';
            }
        }
        else if (this.props.data.active == 2) {
            const filtered = this.props.data.tier2.filter(item => item.get('pos') == 0);
            if (filtered.size == 0) {
                backgroundImage = 'secondunlocked';
            }
            else {
                backgroundImage = 'secondchosen';
            }
        }
        else if (this.props.data.active == 3) {
            const filtered = this.props.data.tier3.filter(item => item.get('pos') == 0);
            if (filtered.size == 0) {
                backgroundImage = 'thirdunlocked';
            }
            else {
                backgroundImage = 'thirdchosen';
            }
        }

        return (
            <ModalWrapper style={{top: "355px", left: "440px" }} modalId="azerite">
                <div style={{backgroundImage: `url(/static/images/azerite/azeritebackground-${backgroundImage}.png)`, height: "469px", width: "476px", display: "block" }}>
                </div>
            </ModalWrapper>
        );
    }
}

AzeritePopup.propTypes = {
    data: PropTypes.instanceOf(Azerite).isRequired,
};

const mapStateToProps = function(store) {
    return {
    };
};

export default connect(mapStateToProps)(AzeritePopup);
