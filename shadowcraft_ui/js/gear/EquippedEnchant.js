import EnchantMap from './EnchantMap';
import React from 'react';

export default class EquippedEnchant extends React.Component {

    // TODO: Need to map name as well

    getEnchantImg(id) {
        let icon = '';
        // WARNING! FALLTHROUGH TO DEFAULT IS INTENTIONAL! WARNING!
        switch (id) {
            case 5437: icon = 'inv_enchant_formulasuperior_01';//just an example
            default: {
                if (icon !== '') {
                    return (<img src={`http://media.blizzard.com/wow/icons/56/${icon}.jpg`} />);
                }
                else {
                    console.error(`Missing an enchant definition for id#: ${id} in EquippedEnchant`);
                    return (<img />);
                }
            }
        }
    }

    render() {
        return (
            <div className="enchant">
                <span className="img">
                    {this.getEnchantImg(this.props.enchant)}
                </span>
                {EnchantMap[5243]}
            </div>
        );
    }
}