import React from 'react'

export default class EquippedItem extends React.Component {
    render() {
        return (
            <div className="slot" data-bonus={this.props.item.bonusids} data-context="" data-identifier={this.props.item.id} data-name={this.props.item.name} data-quality="4" data-search="" data-slot="0" data-tag="Mythic 2 Warforged" data-upgrade="" id="137415">
                <div className="image">
                    <img src={this.props.item.image} />
                    <span className="ilvl">850</span>
                </div>
                <div className="lock lock_off">
                    <img src="/static/images/lock_off.png" />
                </div>
                <div className="name quality-4 tt" data-tooltip-bonus={this.props.item.bonusids} data-tooltip-gems="130217:0:0" data-tooltip-id="137415" data-tooltip-spec="" data-tooltip-upgd="">
                    {this.props.item.name} <em className="heroic">Mythic 2 Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=137415" target="_blank">Wowhead</a>
                </div>
                <div className="bonuses">
                    <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                <div className="gems">
                    <div className="gem tt " data-tooltip-id={this.props.item.gems[0].id}>
                        <span className="socket">
                            <img src="/static/images/icons/Socket_Prismatic.png" /> </span>
                        <span className="img">
                            <img src={this.props.item.gems[0].image} />
                        </span>
                        <span className="gem_name">{this.props.item.gems[0].name}</span>
                    </div>
                </div>
            </div>
        )
    }
}