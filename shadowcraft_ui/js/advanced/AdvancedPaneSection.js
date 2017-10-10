import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Map} from 'immutable';

import AdvancedPaneSetting from './AdvancedPaneSetting';

class AdvancedPaneSection extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {

        let sectionlist = this.props.section.get('items').map(
            (setting, index) =>
                <AdvancedPaneSetting
                    key={index}
                    setting={setting}
                    section={this.props.section.name}
                    current={this.props.current}
                />
        );

        return (
            <section className="cluster">
                <div className="option-list">
                    <h3>{this.props.section.heading}</h3>
                    {sectionlist}
                </div>
            </section>
        );
    }
}

AdvancedPaneSection.propTypes = {
    section: PropTypes.instanceOf(Map).isRequired,
    current: PropTypes.instanceOf(Map).isRequired
};

AdvancedPaneSection.defaultProps = {
    current: Map()
};

const mapStateToProps = function(store) {
    return {
        current: store.settings.current
    };
};

export default connect(mapStateToProps)(AdvancedPaneSection);
