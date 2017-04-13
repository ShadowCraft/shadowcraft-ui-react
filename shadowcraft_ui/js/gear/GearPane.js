import React from 'react';
import StatPanel from './StatPanel';
import EquippedItem from './EquippedItem';

export default class GearPane extends React.Component {
    render() {
        //  console.log(data.gear)
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom" id="gear">
                <StatPanel stats={this.props.data.stats} weights={this.props.data.weights} />
                {/*this layout method could probably be revised*/}
                <div className="panel-content">
                    <div className="slots half" id="slots-left">
                        <EquippedItem item={this.props.data.gear.head} />
                        <EquippedItem item={this.props.data.gear.neck} />
                        <EquippedItem item={this.props.data.gear.shoulder} />
                        <EquippedItem item={this.props.data.gear.back} />
                        <EquippedItem item={this.props.data.gear.chest} />
                        <EquippedItem item={this.props.data.gear.wrist} />
                        <EquippedItem item={this.props.data.gear.mainHand} />
                        {/*need to handle missing gear more gracefully*/}
                        {/*<EquippedItem item={data.gear.offhand} />*/}
                    </div>
                    <div className="slots half" id="slots-right">
                        <EquippedItem item={this.props.data.gear.hands} />
                        <EquippedItem item={this.props.data.gear.waist} />
                        <EquippedItem item={this.props.data.gear.legs} />
                        <EquippedItem item={this.props.data.gear.feet} />
                        <EquippedItem item={this.props.data.gear.finger1} />
                        <EquippedItem item={this.props.data.gear.finger2} />
                        <EquippedItem item={this.props.data.gear.trinket1} />
                        <EquippedItem item={this.props.data.gear.trinket2} />
                    </div>
                </div >
            </div>
        );
    }
}