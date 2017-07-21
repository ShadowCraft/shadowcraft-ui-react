import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { updateCharacterState } from '../store';


class ItemSelectElement extends React.Component {

    changeItem(slot, item) {
        if (this.props.item.is_gem) {
            store.dispatch(updateCharacterState('CHANGE_GEM', {slot: slot, gemSlot: this.props.gemSlot, gem: item}));
            store.dispatch({type: "CLOSE_MODAL"});
        }
        else if (this.props.isEnchant) {
            store.dispatch(updateCharacterState('CHANGE_ENCHANT', {slot: slot, enchant: item.id}));
            store.dispatch({type: "CLOSE_MODAL"});
        }
        else {
            store.dispatch(updateCharacterState('CHANGE_ITEM', {slot: slot, item: item}));
            store.dispatch({type: "CLOSE_MODAL"});
        }
    }

    buildTooltipURL(item)
    {
        let url = `http://wowdb.com/items/${item.id}`;
        if (item.bonuses && item.bonuses.length > 0) {
            url += `?bonusIDs=${item.bonuses.toString()}`;
        }
        return url;
    }

    render() {
        let active = false;

        if (this.props.item.is_gem) {
            let activeGear = this.props.gear[this.props.slot];
            active = activeGear.gems[this.props.gemSlot].id == this.props.item.id;
        }
        else {
            let activeGear = this.props.gear[this.props.slot];
            active = (activeGear.id == this.props.item.id && activeGear.item_level == this.props.item.item_level);
        }

        return (
            <div className={`slot ${active ? 'active' : ''}`} onClick={() => this.changeItem(this.props.slot, this.props.item)}>
                <div className="image">
                    <img src={`http://us.media.blizzard.com/wow/icons/56/${this.props.item.icon}.jpg`} />
                    <span className="ilvl">{this.props.item.item_level}</span>
                </div>
                <div className={`name quality-${this.props.quality} ${active ? 'active' : ''}`} data-tooltip-href={this.props.item.id != 0 && this.buildTooltipURL(this.props.item)}>
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

const mapStateToProps = function (store) {
    return {
        gear: store.character.gear
    };
};

export default connect(mapStateToProps)(ItemSelectElement);
