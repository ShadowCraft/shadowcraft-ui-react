import React from 'react';
import EquippedGemList from './EquippedGemsList';
import EquippedEnchant from './EquippedEnchant';

export default class EquippedItem extends React.Component {

    constructor() {
        super();
        this.state = {
            modal: false
        };
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

    onClick() {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        let item = this.props.item;
        // console.log(item)
        return (
            // do we need all these data targets?
            <div>
                <div
                    className="slot"
                    data-bonus={item.bonusids}
                    data-context={item.context}
                    data-name={item.name}
                    data-quality={item.quality}
                    data-slot={item.slot}
                    data-id={item.id}
                >
                    <div className="image">
                        <img src={`http://media.blizzard.com/wow/icons/56/${item.icon}.jpg`} />
                        <span className="ilvl">{item.item_level}</span>
                    </div>
                    <div className="lock lock_off">
                        <img src="/static/images/lock_off.png" />
                    </div>
                    <div
                        className="name quality-4 tt"
                        data-tooltip-bonus={item.bonuses}
                        data-tooltip-gems={item.gems}
                        data-tooltip-id={item.id}
                        onClick={this.onClick.bind(this)}
                    >
                        {item.name}
                        <em className="heroic">TODO: bonus text</em>
                        <a className="wowhead" href={`http://legion.wowhead.com/item=${item.id}`} target="_blank">Wowhead</a>
                    </div>
                    <div className="bonuses">
                        {/*this probably doesn't need a huge full length div, maybe a gear under the item icon instead?'*/}
                        <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                    {/*need to pass whole item because we need to check item quality to filter out relics*/}
                    <EquippedGemList gems={item.gems} />
                    {/*javascript trickery to only show enchants for neck, ring and back*/}
                    {this.IsEnchantable(item.slot) && <EquippedEnchant enchantID={item.enchant} />}
                </div >
                {this.state.modal ? <SelectItem /> : <div />}
            </div>
        );
    }
}

class SelectItem extends React.Component {
    render() {
        return (
            <div className="alternatives popup ui-dialog visible" id="gearpopup" style={{ top: '217px', left: '617px' }}>
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" />
                </div>
                <div className="body">
                    <div
                        className="slot"
                        data-bonus="3518"
                        data-context=""
                        data-identifier="140889:905"
                        data-name="Bracers of Impossible Choices"
                        data-quality="4"
                        data-search="Bracers%20of%20Impossible%20Choices%20undefined"
                        data-slot=""
                        data-tag=""
                        data-upgrade=""
                        id="140889"
                    >
                        <div className="image">  <img src="http://us.media.blizzard.com/wow/icons/56/inv_leather_raidroguemythic_q_01bracer.jpg" />
                            <span className="ilvl" />
                        </div>
                        <div
                            className="name quality-4 tt"
                            data-tooltip-bonus="3518"
                            data-tooltip-gems=""
                            data-tooltip-id="140889"
                            data-tooltip-spec=""
                            data-tooltip-upgd=""
                        >
                            <em className="ilvl">(905)</em>  Bracers of Impossible Choices  <em className="heroic" />  <a className="wowhead" href="http://legion.wowhead.com/item=140889" target="_blank">Wowhead</a>
                        </div>
                        <div className="gems" />
                        <span className="tags"> Mythic</span>
                        <span className="desc"> 2076.8 base   </span>
                        <span className="pct"><div className="label">2076.8</div><div className="pct-inner" style={{ width: '100%' }} /></span></div>
                </div>
            </div>
        );
    }
}