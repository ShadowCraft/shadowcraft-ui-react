import React from 'react';
import AdvancedPaneSettingItem from './AdvancedPaneSettingItem';

export default class AdvancedPaneSettings extends React.Component {

    render() {

        const sectionlist = this.props.section.items.map(
            (sectionitem, index) =>
                <AdvancedPaneSettingItem key={index} sectionitem={sectionitem} />
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
