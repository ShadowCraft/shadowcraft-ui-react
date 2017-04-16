import React from 'react';
import EquippedGemList from './EquippedGemsList';
import EquippedEnchant from './EquippedEnchant';
import ItemSelectPopup from './ItemSelectPopup';
import BonusIDPopup from './BonusIDPopup';

export default class EquippedItem extends React.Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            bonusModal: false,
            items: {}
        };

        this.onBonusClick = this.onBonusClick.bind(this);
    }

    IsEnchantable(slot) {
        switch (slot) {
            case 'neck': return true;
            case 'finger1': return true;
            case 'finger2': return true;
            case 'back': return true;
            default: return false;
        }
    }

    onClick() {
        if (!this.state.items[this.props.item.slot]) {
            //TODO: fix filtering here and in character.py
            fetch(`/get_items_by_slot?slot=${this.props.item.slotid}&min_ilvl=${700}&max_ilvl=${700}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    //just setting local state for now, not sure if a larger will be needed.
                    this.setState({ items: { [this.props.item.slot]: json } });
                }.bind(this));
        }

        this.setState({ modal: !this.state.modal });
    }

    onBonusClick() {
        this.setState({ bonusModal: !this.state.bonusModal });
    }

    render() {
        let item = this.props.item;
        //    console.log(item);
        return (
            // do we need all these data targets?
            <div>
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
                        <img src={`http://media.blizzard.com/wow/icons/56/${item.icon}.jpg`} />
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
                        onClick={this.onClick.bind(this)}
                    >
                        {item.name}
                        <em className="heroic">TODO: bonus text</em>
                        <a className="wowhead" href={`http://legion.wowhead.com/item=${item.id}`} target="_blank">Wowhead</a>
                    </div>
                    <div className="bonuses" onClick={this.onBonusClick} >
                        {/*this probably doesn't need a huge full length div, maybe a gear under the item icon instead?'*/}
                        <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                    {/*need to pass whole item because we need to check item quality to filter out relics*/}
                    <EquippedGemList gems={item.gems} />
                    {/*javascript trickery to only show enchants for neck, ring and back*/}
                    {this.IsEnchantable(item.slot) && <EquippedEnchant enchantID={item.enchant} />}
                </div >
                {this.state.modal ? <ItemSelectPopup items={this.state.items[item.slot]} /> : <div />}
                {this.state.bonusModal ? <BonusIDPopup possible={item.bonuses} active={[]} /> : <div />}
            </div>
        );
    }
}
