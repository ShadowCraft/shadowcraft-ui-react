import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { modalTypes } from '../reducers/modalReducer';
import { ITEM_DATA } from '../item_data';
import Item from '../viewModels/Item';

class EquippedGemItem extends React.Component {

    onClick() {

        let itemData = ITEM_DATA.filter(function (item) {
            return item.is_gem;
        });

        itemData = [...itemData, {
            gem_slot: "Prismatic",
            icon: '',
            id: 0,
            is_gem: true,
            name: "Empty Gem Socket",
            quality: 0,
            stats: {}
        }];

        store.dispatch({
            type: "OPEN_MODAL",
            data: {
                popupType: modalTypes.ITEM_SELECT,
                props: {
                    slot: this.props.item.get('slot'),
                    items: itemData,
                    isGem: true,
                    gemSlot: this.props.gemSlot
                }
            }
        });
    }

    render() {
        let gemItem = this.props.item.getIn(['gems', this.props.gemSlot]);
        // empty icon string means empty socket, and we don't want to request images or create a tooltip
        if (gemItem.get('icon') !== '') {
            return (
                <div className="gem" onClick={this.onClick.bind(this)}>
                    <span className="img">
                        <img src={`http://render-us.worldofwarcraft.com/icons/56/${gemItem.get('icon')}.jpg`} />
                    </span>
                    <span data-tooltip-href={`http://wowdb.com/items/${gemItem.get('id')}`}>{gemItem.get('name')}</span>
                </div >
            );
        }
        else {
            return (
                <div className="socket" onClick={this.onClick.bind(this)}>
                    <span className="img">
                        <img />
                    </span>
                    <span>{gemItem.get('name')}</span>
                </div >
            );
        }

    }
}


EquippedGemItem.propTypes = {
    item: PropTypes.instanceOf(Item).isRequired,
    gemSlot: PropTypes.number.isRequired
};

export default EquippedGemItem;
