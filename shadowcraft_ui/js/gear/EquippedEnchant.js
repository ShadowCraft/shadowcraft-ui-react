import EnchantMap from './EnchantMap';
import React from 'react';
import store from '../store';
import { modalTypes } from '../reducers/modalReducer';

export default class EquippedEnchant extends React.Component {

    onClick(e) {

        let enchants = EnchantMap.filter(function(enchant) {
            return this.props.item.slot.includes(enchant.slot);
        }.bind(this));

        store.dispatch({type: "OPEN_MODAL",
                        data: {popupType: modalTypes.ITEM_SELECT,
                               props:{ slot: this.props.item.slot,
                                       items: enchants,
                                       isEnchant: true}}});
    }

    // EnchantMap is manual right now, may need to be auto generated in the future
    // handle unimplemented enchants. To implement an enchant, edit EnchantMap.
    getEnchant(id) {
        let enchant = EnchantMap.filter(function(e) {
            return e.id == this.props.item.enchant;
        }.bind(this));

        if (enchant.length != 0) {
            return enchant[0];
        }
        else {
            return {
                stats: {},
                icon: '',
                name: `Enchant not implemented. (${id})`,
                slot: '',
                spell_id: 0
            };
        }
    }

    // handle image links for unimplemented enchants
    getEnchantImg(id) {
        if (this.getEnchant(id).icon) return (<img src={`http://media.blizzard.com/wow/icons/56/${this.getEnchant(id).icon}.jpg`} />);
        else return (<img />);
    }

    render() {
        return (
            <div className="enchant" onClick={this.onClick.bind(this)}>
                <span className="img">
                    {this.getEnchantImg(this.props.item.enchant)}
                </span>
                {this.getEnchant(this.props.item.enchant).name}
            </div>
        );
    }
}
