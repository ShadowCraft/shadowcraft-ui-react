import React from 'react';
import { connect } from 'react-redux';
import store from '../store';


class ItemSelectElement extends React.Component {

    changeItem(slot, item) {
        store.dispatch({
            type: 'CHANGE_ITEM',
            data: {
                slot: slot,
                item: item
            }
        });
    }

    render() {
        //TODO: cleanup data targets
        return (
            <div className="slot" onClick={() => this.changeItem(this.props.slot, this.props.item)}>
                <div className="image">
                    <img src={`http://us.media.blizzard.com/wow/icons/56/${this.props.item.properties.icon}.jpg`} />
                    <span className="ilvl" />
                </div>
                <div className="name quality-4 tt">
                    <em className="ilvl">{this.props.item.item_level} </em>
                    {this.props.item.properties.name}
                    <em className="heroic" />
                    <a className="wowhead" href={`http://legion.wowhead.com/item=${this.props.item.remote_id}`} target="_blank">Wowhead</a>
                </div>
                <div className="gems" />
                {/*<span className="tags"> Mythic</span>*/}
                <span className="desc"> {this.props.value.toFixed(0)}   </span>
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