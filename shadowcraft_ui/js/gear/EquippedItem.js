import React from 'react';
import { connect } from 'react-redux';
import deepClone from 'deep-clone';
import PropTypes from 'prop-types';
import bs from 'binary-search';
import Item from '../viewModels/Item';

import store from '../store';
import { modalTypes } from '../reducers/modalReducer';
import EquippedGemList from './EquippedGemList';
import EquippedEnchant from './EquippedEnchant';
import { ITEM_DATA } from '../item_data';
import { ITEM_VARIANTS } from '../item_variants';
import { getItems } from '../items/ItemPermutations';

class EquippedItem extends React.Component {

    constructor(props) {
        super(props);
        this.onBonusClick = this.onBonusClick.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.equippedItem.equals(nextProps.equippedItem);
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

    generateItemVariants(baseItem) {
        let items = [baseItem];
        let variant = null;

        for (let idx = 0; idx < ITEM_VARIANTS.length; idx++) {
            if (bs(ITEM_VARIANTS[idx][0], baseItem['id'], function (a, b) { return a - b; }) > 0) {
                variant = ITEM_VARIANTS[idx];
                break;
            }
        }

        if (variant) {
            variant[1].forEach(function (v) {
                var item = deepClone(baseItem);
                item.item_level = v;
                // TODO: modify stats
                // TODO: modify bonus ID
                items.push(item);
            });
        }

        return items;
    }

    onClick() {

        let itemData = ITEM_DATA.filter(function (item) {
            return item.equip_location == this.adjustSlotName(this.props.slot);
        }.bind(this));

        // Don't pass over any item outside of the item level filtering.
        let min_ilvl = -1;
        let max_ilvl = -1;
        if (this.props.dynamic_ilvl) {
            min_ilvl = this.props.equippedItem.item_level - 50;
            max_ilvl = this.props.equippedItem.item_level + 50;
        }
        else {
            min_ilvl = this.props.min_ilvl;
            max_ilvl = this.props.max_ilvl;
        }

        // TODO: would a map() be faster here? Can I do this transformation in a
        // map()?
        let allItems = [];
        let numItems = itemData.length;
        for (let idx = 0; idx < numItems; idx++) {
            let item = itemData[idx];
            let variants = this.generateItemVariants(item);

            let foundMatch = false;
            variants.forEach(function (item) {
                if (item.id == this.props.equippedItem.id &&
                    item.ilevel == this.props.equippedItem.item_level) {
                    foundMatch = true;
                }
            }.bind(this));

            allItems = allItems.concat(variants);

            if (!foundMatch && item.id == this.props.equippedItem.id) {
                let copy = deepClone(item);
                let equipped = this.props.equippedItem;
                copy['item_level'] = equipped.item_level;
                copy['bonuses'] = equipped.bonuses.toJS();
                copy['stats'] = Object.assign({}, equipped.stats.toJS());
                copy['quality'] = equipped.quality;
                allItems.push(copy);
            }
        }

        // TODO: remove this before release
        // WARNING! THIS IS OVERWRITTING EVERYTHING BEFORE
        // THIS IS A TEMPORARY TEST
        allItems = getItems(this.adjustSlotName(this.props.slot), min_ilvl, max_ilvl, this.props.equippedItem.item_level);
        // console.log(allItems.length);
        // WARNING! THIS IS OVERWRITTING EVERYTHING BEFORE
        // THIS IS A TEMPORARY TEST
        
        // Add a "None" item to the end of the array that will always have a zero EP.
        allItems.push({
            id: 0,
            name: "None",
            icon: "inv_misc_questionmark",
            quality: 0,
            item_level: 0,
            stats: {},
            socket_count: 0,
            bonuses: [],
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
        if (item.bonuses.size > 0) {
            url += `?bonusIDs=${item.bonuses.toJS().toString()}`;
        }
        return url;
    }

    render() {
        return (
            <div>
                <div className="slot">
                    <div className="image">
                        <img src={`http://render-us.worldofwarcraft.com/icons/56/${this.props.equippedItem.icon}.jpg`} />
                        <span className="ilvl">{this.props.equippedItem.item_level}</span>
                    </div>
                    <div className={`name quality-${this.props.equippedItem.quality}`} onClick={this.props.equippedItem.slot !== "mainHand" ? this.onClick.bind(this) : null} >
                        <span data-tooltip-href={this.buildTooltipURL(this.props.equippedItem)}>{this.props.equippedItem.name}</span>
                        <a className="wowhead" href={`http://legion.wowhead.com/item=${this.props.equippedItem.id}`} target="_blank">Wowhead</a>
                    </div>
                    {this.props.equippedItem.quality != 6 && <div className="bonuses" onClick={this.onBonusClick} >
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
    equippedItem: PropTypes.instanceOf(Item).isRequired,
    slot: PropTypes.string.isRequired,
    // TODO: modify RESET_SETTINGS in a more appropriate manner and add isRequired back
    dynamic_ilvl: PropTypes.bool,
    min_ilvl: PropTypes.string,
    max_ilvl: PropTypes.string,
};

const mapStateToProps = function (store, ownProps) {
    return {
        equippedItem: store.character.getIn(['gear', ownProps.slot]),
        dynamic_ilvl: store.settings.current.get('dynamic_ilvl'),
        min_ilvl: store.settings.current.get('min_ilvl'),
        max_ilvl: store.settings.current.get('max_ilvl'),
    };
};

export default connect(mapStateToProps)(EquippedItem);
