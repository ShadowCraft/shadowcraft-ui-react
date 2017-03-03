import React from 'react';
import SettingsPaneSectionItem from './SettingsPaneSectionItem';

export default class SettingsPaneSection extends React.Component {

    render() {

        const sectionlist = this.props.section.items.map(
            (sectionitem, index) =>
                <SettingsPaneSectionItem key={index} sectionitem={sectionitem} />
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