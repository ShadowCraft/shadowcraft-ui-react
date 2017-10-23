import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from '../viewModels/Item';
import store from '../store';
import { updateCharacterState } from '../store';


class ItemSelectElement extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    changeItem(slot, item) {
        if (this.props.item.is_gem) {
            store.dispatch(updateCharacterState('CHANGE_GEM', { slot: slot, gemSlot: this.props.gemSlot, gem: item }));
            store.dispatch({ type: "CLOSE_MODAL" });
        }
        else if (this.props.isEnchant) {
            store.dispatch(updateCharacterState('CHANGE_ENCHANT', { slot: slot, enchant: item.id }));
            store.dispatch({ type: "CLOSE_MODAL" });
        }
        else {
            store.dispatch(updateCharacterState('CHANGE_ITEM', { slot: slot, item: new Item(item) }));
            store.dispatch({ type: "CLOSE_MODAL" });
        }
    }

    buildTooltipURL(item) {
        let url = "";
        if (this.props.isEnchant) {
            url = `http://wowdb.com/items/${item.remote_id}`;
        }
        else {
            url = `http://wowdb.com/items/${item.id}`;
            if (item.bonuses && item.bonuses.length > 0) {
                url += `?bonusIDs=${item.bonuses.toString()}`;
            }
        }
        return url;
    }

    render() {
        let active = false;

        if (this.props.item.is_gem) {
            active = this.props.equippedItem.getIn(['gems', this.props.gemSlot, 'id']) == this.props.item.id;
        }
        else if (this.props.isEnchant) {
            active = this.props.equippedItem.get('enchant') == this.props.item.id;
        }
        else {
            active = (this.props.equippedItem.get('id') == this.props.item.id && this.props.equippedItem.get('item_level') == this.props.item.item_level);
        }

        return (
            <div className={`slot ${active ? 'active' : ''}`} onClick={() => this.changeItem(this.props.slot, this.props.item)}>
                <div className="image">
                    <img src={`http://render-us.worldofwarcraft.com/icons/56/${this.props.item.icon}.jpg`} />
                    <span className="ilvl">{this.props.item.item_level}</span>
                </div>
                <div
                    className={`name quality-${this.props.quality} ${active ? 'active' : ''}`}
                    data-tooltip-href={this.props.item.id != 0 && this.buildTooltipURL(this.props.item)}
                >
                    {this.props.item.name}
                    <a className="wowhead" href={`http://legion.wowhead.com/item=${this.props.item.id}`} target="_blank">Wowhead</a>
                </div>
                <span className="desc">{this.props.value.toFixed(0)} EP</span>
                <span className="pct">
                    <div className="label">{this.props.value.toFixed(0)}</div>
                    <div className="pct-inner" style={{ width: `${(this.props.value / this.props.max) * 100}%` }} />
                </span>
            </div>
        );
    }
}

// some fields are not required because there are effectively three different types to handle
ItemSelectElement.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        item_level: PropTypes.number,
        id: PropTypes.number.isRequired,
        is_gem: PropTypes.bool,
        icon: PropTypes.string.isRequired,
        remote_id: PropTypes.number,
        bonuses: PropTypes.array
    }).isRequired,
    equippedItem: PropTypes.instanceOf(Item).isRequired,
    isEnchant: PropTypes.bool,
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    slot: PropTypes.string.isRequired,
    quality: PropTypes.number.isRequired,
    gemSlot: PropTypes.number
};

const mapStateToProps = function (store, ownProps) {
    return {
        equippedItem: store.character.getIn(['gear', ownProps.slot])
    };
};

export default connect(mapStateToProps)(ItemSelectElement);
