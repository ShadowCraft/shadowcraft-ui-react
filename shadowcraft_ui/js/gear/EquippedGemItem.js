import React from 'react';
import store from '../store';
import { modalTypes } from '../reducers/modalReducer';

export default class EquippedGemItem extends React.Component {

    onClick() {

        let itemData = ITEM_DATA.filter(function(item) {
            return item.is_gem;
        });

        store.dispatch({type: "OPEN_MODAL",
                        data: {popupType: modalTypes.ITEM_SELECT,
                               props:{ slot: this.props.item.slot,
                                       items: itemData,
                                       isGem: true,
                                       gemSlot: this.props.gemSlot}}});
    }

    // comments here indicate what classes were inlined while testing inline css
    render() {
        let gemItem = this.props.item.gems[this.props.gemSlot];
        return (
            <div className="gem" onClick={this.onClick.bind(this)}>
                <span className="socket">
                    <img src="/static/images/Socket_Prismatic.png" />
                </span>
                <span className="img">
                    <img src={`http://media.blizzard.com/wow/icons/56/${gemItem.icon}.jpg`} />
                </span>
                <span data-tooltip-href={`http://wowdb.com/items/${gemItem.id}`}>{gemItem.name}</span>
            </div >
        );
    }
}
