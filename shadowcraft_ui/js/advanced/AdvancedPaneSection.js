import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AdvancedPaneSetting from './AdvancedPaneSetting';

class AdvancedPaneSection extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {

        let sectionlist = this.props.section.items.map(
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
    section: PropTypes.shape({
        name: PropTypes.string.isRequired,
        heading: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
    }).isRequired,
    current: PropTypes.objectOf(
        PropTypes.any.isRequired
    ).isRequired
};

const mapStateToProps = function(store) {
    return {
        current: store.settings.current,
    };
};

export default connect(mapStateToProps)(AdvancedPaneSection);
