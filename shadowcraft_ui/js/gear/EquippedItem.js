import React from 'react';
import { connect } from 'react-redux';

import store from '../store';
import { modalTypes } from '../reducers/modalReducer';
import EquippedGemList from './EquippedGemsList';
import EquippedEnchant from './EquippedEnchant';
import ItemSelectPopup from './ItemSelectPopup';
import BonusIDPopup from './BonusIDPopup';

class EquippedItem extends React.Component {

    constructor() {
        super();
        this.state = {
            itemModal: false,
            bonusModal: false,
            items: {}
        };

        this.onBonusClick = this.onBonusClick.bind(this);
        this.onBonusApply = this.onBonusApply.bind(this);
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

    onClick(e) {
        // console.log(this.props.items[this.props.slot]);
        if (!this.state.items[this.props.slot]) {
            let min_ilvl = -1;
            let max_ilvl = -1;
            if (this.props.settings.dynamic_ilvl) {
                min_ilvl = this.state.items[this.props.slot].item_level - 50;
                max_ilvl = this.state.items[this.props.slot].item_level + 50;
            }
            else {
                min_ilvl = this.props.settings.min_ilvl;
                max_ilvl = this.props.settings.max_ilvl;
            }

            //TODO: what happens here if the user changes the filtering between requests?
            fetch(`/get_items_by_slot?slot=${this.slotIDtoEquipIDMap(this.props.items[this.props.slot].slotid)}&min_ilvl=${min_ilvl}&max_ilvl=${max_ilvl}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    //just setting local state for now, not sure if a larger will be needed.
                    this.setState({ items: { [this.props.slot]: json } });
                }.bind(this));
        }

        this.setState({ itemModal: !this.state.itemModal });
    }

    onBonusClick(e) {
        e.preventDefault();

        let item = this.props.items[this.props.slot];
        store.dispatch({type: "OPEN_MODAL",
                        data: {popupType: modalTypes.ITEM_BONUSES,
                               props:{ item: item, onApply: this.onBonusApply}}});
    }

    onBonusApply() {
        this.setState({ bonusModal: false });
    }

    slotIDtoEquipIDMap(slotid) {
        switch (slotid) {
            case 12: return 11;
            case 13: return 12;
            case 14: return 12;
            case 15: return 16;
            default: return slotid;
        }
    }

    buildTooltipURL(item)
    {
        let url = `http://wowdb.com/items/${item.id}`;
        if (item.bonuses.length > 0) {
            url += `?bonusIDs=${item.bonuses.toString()}`;
        }
        return url;
    }

    render() {
        let item = this.props.items[this.props.slot];
        //console.log(item);
        return (
            <div>
                <div className="slot">
                    <div className="image">
                        <img src={`http://media.blizzard.com/wow/icons/56/${item.icon}.jpg`} />
                        <span className="ilvl">{item.item_level}</span>
                    </div>
                    <div className="lock lock_off">
                        <img src="/static/images/lock_off.png" />
                    </div>
                    <div
                        className={`name quality-${item.quality}`}
                        onClick={item.slotid !== 16 ? this.onClick.bind(this) : ''}
                    >
                        <span data-tooltip-href={this.buildTooltipURL(item)}>{item.name}</span>
                        <a className="wowhead" href={`http://legion.wowhead.com/item=${item.id}`} target="_blank">Wowhead</a>
                    </div>
                    <div className="bonuses" onClick={this.onBonusClick} >
                        {/*this probably doesn't need a huge full length div, maybe a gear under the item icon instead?'*/}
                        <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                    {/*need to pass whole item because we need to check item quality to filter out relics*/}
                    {item.socket_count > 0 && <EquippedGemList gems={item.gems} />}
                    {/*javascript trickery to only show enchants for neck, ring and back*/}
                    {this.IsEnchantable(item.slot) && <EquippedEnchant enchantID={item.enchant} />}
                </div >
                {/*probably want to do a full screen modal with fade and click away later
                would work better on mobile and is snazzier
                plus we still have plans to do the stacked bars rankings layout
                no need to put the cart before the horse, so this will do for now until we get to the layout refactor*/}
                {this.state.itemModal ? <ItemSelectPopup slot={item.slot} items={this.state.items[item.slot]} onClick={this.onClick.bind(this)} /> : <div />}
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        items: store.character.gear,
        settings: store.settings.current
    };
};

export default connect(mapStateToProps)(EquippedItem);
