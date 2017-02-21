import React from 'react'
import EquippedGems from './EquippedGems'

export default class EquippedItem extends React.Component {
    render() {
        let item = this.props.item
        // console.log(item)
        return (
            <div
                className="slot"
                data-bonus={item.bonusids}
                data-context={item.context}
                data-name={item.name}
                data-quality={item.quality}
                data-slot={item.slot}
                data-id={item.id}
            >
                <div className="image">
                    <img src={`http://us.media.blizzard.com/wow/icons/56/${item.icon}.jpg`} />
                    <span className="ilvl">{item.item_level}</span>
                </div>
                <div className="lock lock_off">
                    <img src="/static/images/lock_off.png" />
                </div>
                <div
                    className="name quality-4 tt"
                    data-tooltip-bonus={item.bonuses}
                    data-tooltip-gems={item.gems}
                    data-tooltip-id={item.id}
                >
                    {item.name}
                    <em className="heroic">do we need to keep this, because it is mostly meaningless for optimization?</em>
                    <a className="wowhead" href={`http://legion.wowhead.com/item=${item.id}`} target="_blank">Wowhead</a>
                </div>
                <div className="bonuses">
                    <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                <EquippedGems gems={item.gems} />
                {/*need to handle enchant slot validation*/}
                <div className="enchant">
                    <span className="img">
                        {/*need to map enchant id to icon*/}
                        <img src={item.gems[0].image} />
                    </span>
                    need enchant bonus text and icon
                </div>
            </div >
        )
    }
}