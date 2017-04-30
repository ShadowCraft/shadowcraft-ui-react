import React from 'react';
import StatPanel from './StatPanel';
import EquippedItem from './EquippedItem';

export default class GearPane extends React.Component {
    render() {
        //  console.log(data.gear)
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom" id="gear">
                <StatPanel />
                {/*this layout method could probably be revised*/}
                <div className="panel-content">
                    <div className="slots half" id="slots-left">
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
                    <div className="slots half" id="slots-right">
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
