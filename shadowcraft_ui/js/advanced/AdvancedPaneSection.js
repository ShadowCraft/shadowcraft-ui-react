import React from 'react';
import { connect } from 'react-redux';

import AdvancedPaneSetting from './AdvancedPaneSetting';

class AdvancedPaneSection extends React.Component {

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

const mapStateToProps = function(store) {
    return {
        current: store.settings.current,
    };
};

export default connect(mapStateToProps)(AdvancedPaneSection);
