import React from 'react';
import AdvancedPaneSettingItem from './AdvancedPaneSettingItem';

export default class AdvancedPaneSettings extends React.Component {

    render() {

        var sectionlist = [];
        for (var index in this.props.section.items) {
            sectionlist.push(<AdvancedPaneSettingItem key={index} sectionitem={this.props.section.items[index]} section={this.props.section.name} />);
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
