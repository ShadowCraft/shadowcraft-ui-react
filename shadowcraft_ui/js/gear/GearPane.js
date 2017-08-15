import React from 'react';
import StatPanel from './StatPanel';
import EquippedItem from './EquippedItem';

export default class GearPane extends React.Component {
    componentDidMount() {
        // This is a bit of a hack and is probably a bit fragile depending on if wowdb ever
        // changes any of this, but it rescans the DOM for elements that should display a
        // tooltip.

        // For this one we have to check if CurseTips exists because this might get called
        // before it gets loaded when the page first loads.
        if (CurseTips != undefined) {
            CurseTips['wowdb-tooltip'].watchElligibleElements();
        }
    }

    render() {
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom" id="gear">
                <StatPanel />
                <div className="panel-content">
                    <div className="slots">
                        <EquippedItem slot="head" />
                        <EquippedItem slot="neck" />
                        <EquippedItem slot="shoulder" />
                        <EquippedItem slot="back" />
                        <EquippedItem slot="chest" />
                        <EquippedItem slot="wrist" />
                        <EquippedItem slot="mainHand" />
                        {/*need to handle missing gear more gracefully*/}
                        {/*<EquippedItem slot="offhand" />*/}
                    </div>
                    <div className="slots">
                        <EquippedItem slot="hands" />
                        <EquippedItem slot="waist" />
                        <EquippedItem slot="legs" />
                        <EquippedItem slot="feet" />
                        <EquippedItem slot="finger1" />
                        <EquippedItem slot="finger2" />
                        <EquippedItem slot="trinket1" />
                        <EquippedItem slot="trinket2" />
                    </div>
                </div >
            </div>
        );
    }
}
