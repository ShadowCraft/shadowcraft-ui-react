import React from "react"
import StatPanel from './StatPanel'
import EquippedItem from './EquippedItem'

//just a placeholder object. We'll get a list of items passed as a prop later.
//And we then can iterate over the list and spit out each item.
//We may need to iterate over a list of gems later so that is why it is an array.
// const iteminfo = {
//     name: 'Super Awesome Item',
//     image: "http://us.media.blizzard.com/wow/icons/56/inv_helm_leather_legiondungeon_c_01.jpg",
//     id: 137415,
//     bonusids: "3410:1808:1502:3336",
//     gems: [
//         {
//             name: 'Versatile Skystone',
//             id: 130217,
//             image: "http://wow.zamimg.com/images/wow/icons/small/inv_jewelcrafting_70_cutgem02_blue.jpg"
//         }
//     ]
// }

export default class GearPane extends React.Component {
    render() {
        let data = this.props.data
        // console.log(data)
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom" id="gear">
                {/*need stats in character data*/}
                <StatPanel data={data.stats} />
                {/*this layout method could probably be revised*/}
                <div className="panel-content">
                    <div className="slots half" id="slots-left">
                        <EquippedItem item={data.gear[2]} />
                        <EquippedItem item={data.gear[4]} />
                        <EquippedItem item={data.gear[5]} />
                        <EquippedItem item={data.gear[1]} />
                        <EquippedItem item={data.gear[7]} />
                        <EquippedItem item={data.gear[8]} />
                        <EquippedItem item={data.gear[9]} />
                        <EquippedItem item={data.gear[0]} />
                    </div>
                    <div className="slots half" id="slots-right">
                        <EquippedItem item={data.gear[10]} />
                        <EquippedItem item={data.gear[11]} />
                        <EquippedItem item={data.gear[12]} />
                        <EquippedItem item={data.gear[13]} />
                        <EquippedItem item={data.gear[14]} />
                        <EquippedItem item={data.gear[15]} />
                        <EquippedItem item={data.gear[16]} />
                        {/*disabled offhand because of artifact*/}
                        {/*<EquippedItem item={this.props.gear[17]} />*/}
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
