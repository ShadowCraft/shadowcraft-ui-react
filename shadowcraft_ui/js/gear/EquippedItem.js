import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Item from '../viewModels/Item';

import store from '../store';
import { modalTypes } from '../reducers/modalReducer';
import EquippedGemList from './EquippedGemList';
import EquippedEnchant from './EquippedEnchant';
import { getItems } from '../items';

class EquippedItem extends React.Component {

    constructor(props) {
        super(props);
        this.onBonusClick = this.onBonusClick.bind(this);
        this.onAzeriteClick = this.onAzeriteClick.bind(this);
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

    IsAzeriteSlot(slot) {
        switch (slot) {
            case 'head': return true;
            case 'shoulder': return true;
            case 'chest': return true;
            default: return false;
        }
    }

    onClick(e) {

        // Let this fall through to the wowhead onClick method.
        if (e.target.className == "wowhead") {
            return;
        }

        let ilvl = this.props.equippedItem.item_level;
        let min_ilvl = this.props.dynamic_ilvl ? ilvl - 50 : this.props.min_ilvl;
        let max_ilvl = this.props.dynamic_ilvl ? ilvl + 50 : this.props.max_ilvl;

        let allItems = getItems(this.adjustSlotName(this.props.slot), min_ilvl, max_ilvl, ilvl, true, this.props.show_legendaries);

        // Check to see if the item we have equipped is in the list. If not, add it in.
        const filtered = allItems.filter(function(item) {
            return item.id == this.props.equippedItem.id && item.item_level == this.props.equippedItem.item_level;
        }.bind(this));
        if (filtered.length == 0) {
            allItems.push(this.props.equippedItem.toJS());
        }

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

    onAzeriteClick(e) {
        e.preventDefault();

        store.dispatch({
            type: "OPEN_MODAL",
            data: {
                popupType: modalTypes.AZERITE,
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

    openWowhead() {
        let url = `http://wowhead.com/item=${this.props.equippedItem.get('id')}`;
        if (this.props.equippedItem.bonuses.size > 0) {
            url += `&bonus=${this.props.equippedItem.get('bonuses').toJS().join(':')}`;
        }
        window.open(url, '_blank');
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
                        <a className="wowhead" onClick={this.openWowhead.bind(this)}>Wowhead</a>
                    </div>
                    {this.props.equippedItem.quality != 6 && <div className="bonuses" onClick={this.onBonusClick} >
                        <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses
                    </div>}
                    {/*need to pass whole item because we need to check item quality to filter out relics*/}
                    {this.props.equippedItem.socket_count > 0 && <EquippedGemList item={this.props.equippedItem} />}
                    {this.IsEnchantable(this.props.equippedItem.slot) && <EquippedEnchant item={this.props.equippedItem} />}
                    {this.IsAzeriteSlot(this.props.equippedItem.slot) && <div className="bonuses" onClick={this.onAzeriteClick} >
                        <img alt="Azerite" src="/static/images/reforge.png" />Azerite Picker
                    </div>}
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
        show_legendaries: store.settings.current.get('show_legendaries')
    };
};

export default connect(mapStateToProps)(EquippedItem);
