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

        let itemData = ITEM_DATA.filter(function(item) {
            return item.equip_location == this.adjustSlotName(this.props.slot);
        }.bind(this));

        store.dispatch({type: "OPEN_MODAL",
                        data: {popupType: modalTypes.ITEM_SELECT,
                               props:{ slot: this.props.slot,
                                       items: itemData, isGem: false }}});
    }

    onBonusClick(e) {
        e.preventDefault();

        let item = this.props.items[this.props.slot];
        store.dispatch({type: "OPEN_MODAL",
                        data: {popupType: modalTypes.ITEM_BONUSES,
                               props:{ item: item}}});
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

    adjustSlotName(slot) {
        switch (slot) {
            case 'trinket1':
            case 'trinket2':
                return 'trinket';
            case 'finger1':
            case 'finger2':
                return 'finger';
            default:
                return slot;
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
                    <div className={`name quality-${item.quality}`} onClick={item.slotid !== 16 ? this.onClick.bind(this) : null} >
                        <span data-tooltip-href={this.buildTooltipURL(item)}>{item.name}</span>
                        <a className="wowhead" href={`http://legion.wowhead.com/item=${item.id}`} target="_blank">Wowhead</a>
                    </div>
                    {item.quality != 6 && <div className="bonuses" onClick={this.onBonusClick} >
                        {/*this probably doesn't need a huge full length div, maybe a gear under the item icon instead?'*/}
                        <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>}
                    {/*need to pass whole item because we need to check item quality to filter out relics*/}
                    { item.socket_count > 0 && <EquippedGemList item={item} /> }
                    { this.IsEnchantable(item.slot) && <EquippedEnchant item={item} /> }
                </div >
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
