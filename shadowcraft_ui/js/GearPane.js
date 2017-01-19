import React from "react"
import StatPanel from './StatPanel'
import EquippedItem from './EquippedItem'

//just a placeholder object. We'll get a list of items passed as a prop later.
//And we then can iterate over the list and spit out each item.
//We may need to iterate over a list of gems later so that is why it is an array.
const iteminfo = {
    name: 'Super Awesome Item',
    image: "http://us.media.blizzard.com/wow/icons/56/inv_helm_leather_legiondungeon_c_01.jpg",
    id: 137415,
    bonusids: "3410:1808:1502:3336",
    gems: [
        {
            name: 'Versatile Skystone',
            id: 130217,
            image: "http://wow.zamimg.com/images/wow/icons/small/inv_jewelcrafting_70_cutgem02_blue.jpg"
        }
    ]
}

export default class GearPane extends React.Component {
    render() {
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom" id="gear">
                <StatPanel />
                <div className="panel-content">
                    <div className="slots half" id="slots-left">
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                    </div>
                    <div className="slots half" id="slots-right">
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
                        <EquippedItem item={iteminfo} />
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
