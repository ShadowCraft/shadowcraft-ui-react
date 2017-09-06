import React from 'react';
import { connect } from 'react-redux';
import deepClone from 'deep-clone';
import PropTypes from 'prop-types';

import store from '../store';
import { modalTypes } from '../reducers/modalReducer';
import EquippedGemList from './EquippedGemsList';
import EquippedEnchant from './EquippedEnchant';
import { ITEM_DATA } from '../item_data';

class EquippedItem extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.onBonusClick = this.onBonusClick.bind(this);
    }

    componentWillMount() {
        this.checkForWarnings(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.checkForWarnings(nextProps);
    }

    checkForWarnings(props) {
        if (this.IsEnchantable(props.slot)) {
            if (this.props.equippedItem.enchant == 0) {
                let quality = `quality-${this.props.equippedItem.quality}`;
                store.dispatch(
                    {
                        type: 'ADD_WARNING',
                        //TODO: Break this out to a warning component so we can pass plain values, instead of html
                        text: <div><span className={quality}>{this.props.equippedItem.name}</span> is missing an enchant</div>
                    });
            }
        }

        let missingGem = false;
        if (this.props.equippedItem.socket_count > 0) {
            for (let idx in this.props.equippedItem.gems) {
                if (this.props.equippedItem.gems[idx] == 0) {
                    missingGem = true;
                }
            }
        }

        if (missingGem) {
            let quality = `quality-${this.props.equippedItem.quality}`;
            store.dispatch({ type: 'ADD_WARNING', text: <div><span className={quality}>{this.props.equippedItem.name}</span> is missing one or more gems</div> });
        }
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

        let itemData = ITEM_DATA.filter(function (item) {
            return item.equip_location == this.adjustSlotName(this.props.slot);
        }.bind(this));

        // Don't pass over any item outside of the item level filtering.
        let min_ilvl = -1;
        let max_ilvl = -1;
        if (this.props.settings.dynamic_ilvl) {
            min_ilvl = this.props.equippedItem.item_level - 50;
            max_ilvl = this.props.equippedItem.item_level + 50;
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

                if (copy.id == this.props.equippedItem.id &&
                    copy.item_level == this.props.equippedItem.item_level) {
                    foundMatch = true;
                }
            }

            if (!foundMatch && item.id == this.props.equippedItem.id) {
                let copy = deepClone(item);
                let equipped = this.props.equippedItem;
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

        store.dispatch({
            type: "OPEN_MODAL",
            data: {
                popupType: modalTypes.ITEM_SELECT,
                props: {
                    slot: this.props.slot,
                    items: allItems, isGem: false
                }
            }
        });
    }

    onBonusClick(e) {
        e.preventDefault();

        store.dispatch({
            type: "OPEN_MODAL",
            data: {
                popupType: modalTypes.ITEM_BONUSES,
                props: { item: this.props.equippedItem }
            }
        });
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

    buildTooltipURL(item) {
        let url = `http://wowdb.com/items/${item.id}`;
        if (item.bonuses.length > 0) {
            url += `?bonusIDs=${item.bonuses.toString()}`;
        }
        return url;
    }

    render() {
        // console.log(`rendering ${this.props.slot}`);
        // console.log(this.props.equippedItem.gems);
        return (
            <div>
                <div className="slot">
                    <div className="image">
                        <img src={`http://media.blizzard.com/wow/icons/56/${this.props.equippedItem.icon}.jpg`} />
                        <span className="ilvl">{this.props.equippedItem.item_level}</span>
                    </div>
                    <div className={`name quality-${this.props.equippedItem.quality}`} onClick={this.props.equippedItem.slot !== "mainHand" ? this.onClick.bind(this) : null} >
                        <span data-tooltip-href={this.buildTooltipURL(this.props.equippedItem)}>{this.props.equippedItem.name}</span>
                        <a className="wowhead" href={`http://legion.wowhead.com/item=${this.props.equippedItem.id}`} target="_blank">Wowhead</a>
                    </div>
                    {this.props.equippedItem.quality != 6 && <div className="bonuses" onClick={this.onBonusClick} >
                        {/*this probably doesn't need a huge full length div, maybe a gear under the item icon instead?'*/}
                        <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>}
                    {/*need to pass whole item because we need to check item quality to filter out relics*/}
                    {this.props.equippedItem.socket_count > 0 && <EquippedGemList item={this.props.equippedItem} />}
                    {this.IsEnchantable(this.props.equippedItem.slot) && <EquippedEnchant item={this.props.equippedItem} />}
                </div >
            </div>
        );
    }
}

EquippedItem.propTypes = {
    equippedItem: PropTypes.shape({
        bonuses: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        enchant: PropTypes.number.isRequired,
        gems: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
        icon: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        item_level: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quality: PropTypes.number.isRequired,
        slot: PropTypes.string.isRequired,
        socket_count: PropTypes.number.isRequired,
        stats: PropTypes.object.isRequired,
    }).isRequired,
    slot: PropTypes.string.isRequired,
    

    // TODO: modify RESET_SETTINGS in a more appropriate manner and add isRequired back
    settings: PropTypes.shape({
        dynamic_ilvl: PropTypes.bool,
        min_ilvl: PropTypes.string,
        max_ilvl: PropTypes.string
    }),
    // settings: PropTypes.shape({
    //     dynamic_ilvl: PropTypes.bool.isRequired,
    //     min_ilvl: PropTypes.string.isRequired,
    //     max_ilvl: PropTypes.string.isRequired
    // }).isRequired,
};


const mapStateToProps = function (store, ownProps) {
    return {
        equippedItem: store.character.gear[ownProps.slot],
        settings: store.settings.current
    };
};

export default connect(mapStateToProps)(EquippedItem);
