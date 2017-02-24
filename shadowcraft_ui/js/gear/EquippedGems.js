import React from 'react'

export default class EquippedGems extends React.Component {

    //empty gem sockets have an id of 0.
    //if there is no id present in the gems array, there is no socket
    //there appears to be between 0 to 3 sockets on an item.

    //there are only a small number of gems that we will support at one time
    //so manually mapping the ids to display strings should work ok

    //each gem id requires a mapping for both icon and name to display properly

    // TODO: Make this mapping a big more robust, and reduce to one switch.

    getGemName(id) {
        switch (id) {
            case 0: return 'Missing Gem';
            case 130217: return 'Versatile Skystone';
            default: return 'Gem not defined in EquippedGems.gemIDToNameMap'
        }
    }

    getGemImg(id) {
        let icon = '';
        // WARNING! FALLTHROUGH TO DEFAULT IS INTENTIONAL! WARNING!
        switch (id) {
            case 130217: icon = 'inv_jewelcrafting_70_cutgem02_blue';
            default: {
                if (icon !== '') {
                    return (<img src={`http://media.blizzard.com/wow/icons/56/${icon}.jpg`} />);
                }
                else {
                    console.log(`Missing an gem definition for id#: ${id} in EquippedGems`)
                    return (<img />)
                }
            }
        }
    }

    render() {

        // Don't show relics
        if (this.props.item.quality === 6) return (<div className="gems"></div>)

        let gemItems = this.props.item.gems.map(
            (gem, index) => {
                if (gem !== 0) {
                    return (
                        <div className="gem tt " data-tooltip-id={gem.id} key={index}>
                            <span className="socket">
                                {/*TODO: properly handle colored sockets*/}
                                <img src="/static/images/icons/Socket_Prismatic.png" /> </span>
                            <span className="img">
                                {this.getGemImg(gem)}
                            </span>
                            < span className="gem_name" > {this.getGemName(gem)}</span >
                        </div >
                    )
                }
            })

        return (
            <div className="gems">
                {gemItems}
            </div>
        )
    }
}