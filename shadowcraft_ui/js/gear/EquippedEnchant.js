import EnchantMap from './EnchantMap';
import React from 'react';

export default class EquippedEnchant extends React.Component {

    //EnchantMap is manual right now, may need to be auto generated in the future

    // handle unimplimented enchants. To impliment an enchant, edit EnchantMap.
    getEnchant(id) {
        if (EnchantMap[this.props.enchantID]) {
            return EnchantMap[this.props.enchantID];
        }
        else {
            return {
                stats: {},
                icon: '',
                itemName: `Enchant not implimented. (${id})`,
                EquipmentSlot: 0,
                SpellId: 0
            };
        }
    }

    // handle image links for unimplimented enchants
    getEnchantImg(id) {
        if (this.getEnchant(id).icon) return (<img src={`http://media.blizzard.com/wow/icons/56/${this.getEnchant(id).icon}.jpg`} />);
        else return (<img />);
    }

    render() {
        return (
            <div className="enchant">
                <span className="img">
                    {this.getEnchantImg(this.props.enchantID)}
                </span>
                {this.getEnchant(this.props.enchantID).itemName}
            </div>
        );
    }
}