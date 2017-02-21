import React from "react"
import StatPanel from './StatPanel'
import EquippedItem from './EquippedItem'

export default class GearPane extends React.Component {
    render() {
        let data = this.props.data
        // console.log(data.gear.shoulder.gems)
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom" id="gear">
                {/*need stats in character data*/}
                <StatPanel data={data} />
                {/*this layout method could probably be revised*/}
                <div className="panel-content">
                    <div className="slots half" id="slots-left">
                        <EquippedItem item={data.gear.head} />
                        <EquippedItem item={data.gear.neck} />
                        <EquippedItem item={data.gear.shoulder} />
                        <EquippedItem item={data.gear.back} />
                        <EquippedItem item={data.gear.chest} />
                        <EquippedItem item={data.gear.wrist} />
                        <EquippedItem item={data.gear.mainHand} />
                        {/*need to handle missing gear more gracefully*/}
                        {/*<EquippedItem item={data.gear.offhand} />*/}
                    </div>
                    <div className="slots half" id="slots-right">
                        <EquippedItem item={data.gear.hands} />
                        <EquippedItem item={data.gear.waist} />
                        <EquippedItem item={data.gear.legs} />
                        <EquippedItem item={data.gear.feet} />
                        <EquippedItem item={data.gear.finger1} />
                        <EquippedItem item={data.gear.finger2} />
                        <EquippedItem item={data.gear.trinket1} />
                        <EquippedItem item={data.gear.trinket2} />
                    </div>
                    <div className="popup ui-dialog" id="bonuses">Add item bonus</div>
                    <div className="alternatives popup ui-dialog" id="gearpopup">
                        <div id="filter">
                            <input className="search" placeholder="Filter..." type="search" />
                        </div>
                        <div className="body"></div>
                    </div>
                </div>
            </div>
        )
    }
}
