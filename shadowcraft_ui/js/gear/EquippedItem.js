import React from 'react';
import { connect } from 'react-redux';
import deepClone from 'deep-clone';

import store from '../store';
import { modalTypes } from '../reducers/modalReducer';
import EquippedGemList from './EquippedGemsList';
import EquippedEnchant from './EquippedEnchant';

class EquippedItem extends React.Component {

    constructor() {
        super();

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

        // Don't pass over any item outside of the item level filtering.
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

        // TODO: would a map() be faster here? Can I do this transformation in a
        // map()?
        let allItems = [];
        let numItems = itemData.length;
        for (let idx = 0; idx < numItems; idx++) {
            let item = itemData[idx];
            let foundMatch = false;
            for (let ilvl in item.ilvls) {

                let ilvlInt = parseInt(ilvl);
                if (ilvlInt < min_ilvl || ilvlInt > max_ilvl) {
                    continue;
                }

                let copy = deepClone(item);
                copy['item_level'] = ilvlInt;
                for (let key in item.ilvls[ilvl]) {
                    copy[key] = item.ilvls[ilvl][key];
                }
                allItems.push(copy);

                if (copy.id == this.props.items[this.props.slot].id &&
                    copy.item_level == this.props.items[this.props.slot].item_level)
                {
                    foundMatch = true;
                }
            }

            if (!foundMatch && item.id == this.props.items[this.props.slot].id) {
                let copy = deepClone(item);
                let equipped = this.props.items[this.props.slot];
                copy['item_level'] = equipped.item_level;
                copy['bonuses'] = equipped.bonuses;
                copy['stats'] = equipped.stats;
                copy['quality'] = equipped.quality;
                allItems.push(copy);
            }
        }

        // Add a "None" item to the end of the array that will always have a zero EP.
        allItems.push({
            id: 0,
            name: "None",
            icon: "inv_misc_questionmark",
            quality: 0,
            item_level: 0,
            stats: {},
            socket_count: 0,
            bonus: []
        });

        store.dispatch({type: "OPEN_MODAL",
                        data: {popupType: modalTypes.ITEM_SELECT,
                               props:{ slot: this.props.slot,
                                       items: allItems, isGem: false }}});
    }

    onBonusClick(e) {
        e.preventDefault();

        let item = this.props.items[this.props.slot];
        store.dispatch({type: "OPEN_MODAL",
                        data: {popupType: modalTypes.ITEM_BONUSES,
                               props:{ item: item}}});
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
                    <div className={`name quality-${item.quality}`} onClick={item.slot !== "mainHand" ? this.onClick.bind(this) : null} >
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
