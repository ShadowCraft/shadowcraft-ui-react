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


class SelectItem extends React.Component {
    render() {
        return (
            <div className="alternatives popup ui-dialog visible" id="gearpopup" style={{ top: '217px', left: '617px' }}>
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" />
                </div>
                <div className="body">
                    <div
                        className="slot"
                        data-bonus="3518"
                        data-context=""
                        data-identifier="140889:905"
                        data-name="Bracers of Impossible Choices"
                        data-quality="4"
                        data-search="Bracers%20of%20Impossible%20Choices%20undefined"
                        data-slot=""
                        data-tag=""
                        data-upgrade=""
                        id="140889"
                    >
                        <div className="image">  <img src="http://us.media.blizzard.com/wow/icons/56/inv_leather_raidroguemythic_q_01bracer.jpg" />
                            <span className="ilvl" />
                        </div>
                        <div
                            className="name quality-4 tt"
                            data-tooltip-bonus="3518"
                            data-tooltip-gems=""
                            data-tooltip-id="140889"
                            data-tooltip-spec=""
                            data-tooltip-upgd=""
                        >
                            <em className="ilvl">(905)</em>  Bracers of Impossible Choices  <em className="heroic" />  <a className="wowhead" href="http://legion.wowhead.com/item=140889" target="_blank">Wowhead</a>
                        </div>
                        <div className="gems" />
                        <span className="tags"> Mythic</span>
                        <span className="desc"> 2076.8 base   </span>
                        <span className="pct"><div className="label">2076.8</div><div className="pct-inner" style={{ width: '100%' }} /></span></div>
                </div>
            </div>
        );
    }
}
