import React from 'react';
import { connect } from 'react-redux';
import store from '../store';

import AdvancedPaneSettingItem from './AdvancedPaneSettingItem';

class AdvancedPaneSettings extends React.Component {

    render() {

        var sectionlist = [];
        for (var index in this.props.section.items) {
            sectionlist.push(<AdvancedPaneSettingItem key={index} sectionitem={this.props.section.items[index]} section={this.props.section.name} current={this.props.current} />);
        }

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

export default connect(mapStateToProps)(AdvancedPaneSettings);
