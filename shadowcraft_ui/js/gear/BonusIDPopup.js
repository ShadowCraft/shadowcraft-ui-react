import React from 'react';
import PropTypes from 'prop-types';
import Item from '../viewModels/Item';

import { connect } from 'react-redux';
import store from '../store';
import ModalWrapper from '../modals/ModalWrapper';
import { updateCharacterState } from '../store';
import { recalculateStats, getStatValue } from '../common';
import { JEWELRY_COMBAT_RATINGS_MULT_BY_ILVL, TRINKET_COMBAT_RATINGS_MULT_BY_ILVL, WEAPON_COMBAT_RATINGS_MULT_BY_ILVL, ARMOR_COMBAT_RATINGS_MULT_BY_ILVL } from '../multipliers';
import BonusIDCheckBox from './BonusIDCheckBox';
import { ITEM_DATA, RANDOM_SUFFIX_MAP, RAND_PROP_POINTS } from '../item_data';
import { getItems } from '../items';

class BonusIDPopup extends React.Component {

    constructor(props) {
        super(props);
        let _state = {
            active: props.item.bonuses,
            wfBonus: -1,
            suffixBonus: -1,
            baseIlvlBonus: -1,
            baseItem: {
                chance_bonus_lists: [],
                stats: {},
                item_level: 0,
            }
        };

        this.state = _state;

        this.onChange = this.onChange.bind(this);
        this.onWFChange = this.onWFChange.bind(this);
        this.onSuffixChange = this.onSuffixChange.bind(this);
        this.onApply = this.onApply.bind(this);
    }

    componentWillMount() {

        // Get the items for this slot and find the set of items with the same ID.
        let staticItems = getItems(this.props.item.get('slot')).filter(function (item) {
            return item.id == this.props.item.get('id');
        }.bind(this));

        if (staticItems.length == 0) {
            //eslint-disable-next-line no-console
            console.log(`Couldn't find item ${this.props.item.get('id')} in the static data`);
            this.setState({ baseItem: null });
        }
        else {
            let itemdata = {
                chance_bonus_lists: staticItems[0]['chance_bonus_lists'],
                stats: null, item_level: 0, name: staticItems[0]['name'],
                is_crafted: false
            };

            if ('is_crafted' in staticItems[0]) {
                itemdata['is_crafted'] = staticItems[0]['is_crafted'];
            }

            // Look to see if there's an item in the static data that matches the item level and
            // ilvl bonus exactly. If there isn't, find one that most closely matches the item
            // level.
            let baseItem = null;
            let itemlevels = [];

            staticItems.forEach(function(item) {
                itemlevels.push(this.props.item.get('item_level'));

                if (item.item_level == this.props.item.item_level) {
                    for (let idx in item['bonuses']) {
                        let bonus = item['bonuses'][idx];
                        if ((bonus >= 1472 && bonus <= 1672) || (bonus >= 669 && bonus <= 679)) {
                            baseItem = item;
                        }
                    }
                }
            }.bind(this));

            // TODO: should this look at something other than just ilvl? Otherwise you run the
            // risk of a base item at a higher level than expected. For example, a 915 item that's
            // titanforged up to 940 would return a 930 item here.
            if (baseItem == null)
            {
                if (staticItems.length == 1) {
                    baseItem = staticItems[0];
                }
                else {
                    for (let i = 0; i < itemlevels.length; i++) {
                        if (this.props.item.item_level < itemlevels[i]) {
                            if (i == 0) {
                                baseItem = staticItems[i];
                            } else {
                                baseItem = staticItems[i-1];
                            }
                        }
                    }
                }
            }

            // Find the base item level bonus on the item so that we can show the right one
            // as the lowest level.
            let wfBonus = -1;
            let suffixBonus = -1;
            this.props.item.get('bonuses').valueSeq().forEach(function(bonus) {
                if ((bonus >= 1472 && bonus <= 1672) || (bonus >= 669 && bonus <= 679)) {
                    wfBonus = bonus;
                }

                if (bonus in RANDOM_SUFFIX_MAP) {
                    suffixBonus = bonus;
                }
            });

            let baseIlvlBonus = 1472;
            for (let idx in baseItem['bonuses']) {
                let bonus = baseItem['bonuses'][idx];
                if ((bonus >= 1472 && bonus <= 1672) || (bonus >= 669 && bonus <= 679)) {
                    baseIlvlBonus = bonus;
                }
            }

            itemdata['item_level'] = parseInt(baseItem['item_level']);
            itemdata['stats'] = baseItem['stats'];

            console.log(baseIlvlBonus);
            console.log(wfBonus);

            this.setState({ baseItem: itemdata, wfBonus: wfBonus, suffixBonus: suffixBonus, baseIlvlBonus: baseIlvlBonus });
        }
    }

    onChange(e) {
        let bonusId = parseInt(e.currentTarget.dataset['bonusid']);

        // If the value was true, that means we're turning it off. Check to see if the
        // element is in the active list, and remove it.
        let newActive = [... this.state.active];
        let index = this.state.active.indexOf(bonusId);

        if (index != -1) {
            newActive.splice(index, 1);
        }
        else {
            newActive.push(bonusId);
        }

        this.setState({ active: newActive });
    }

    onWFChange(e) {
        let newActive = this.state.active.slice();
        if (this.state.wfBonus != -1) {
            let curIndex = newActive.indexOf(this.state.wfBonus);
            newActive.splice(curIndex, 1);
        }

        newActive.push(parseInt(e.currentTarget.value));
        this.setState({ active: newActive, wfBonus: e.currentTarget.value });
    }

    onSuffixChange(e) {
        let newActive = this.state.active.slice();
        if (this.state.suffixBonus != -1) {
            let curIndex = newActive.indexOf(this.state.suffixBonus);
            newActive.splice(curIndex, 1);
        }

        newActive.push(parseInt(e.currentTarget.value));
        this.setState({ active: newActive, suffixBonus: e.currentTarget.value });
    }

    onApply() {

        let eventData = {
            slot: this.props.item.slot,
            bonuses: this.state.active,
            ilvl: this.state.baseItem.item_level,
            canHaveBonusSocket: this.state.baseItem.chance_bonus_lists.indexOf(1808) != -1,
            hasBonusSocket: this.state.active.indexOf(1808) != -1,
            newStats: this.state.baseItem.stats,
            name: this.state.baseItem.name,
            suffix: ''
        };

        if (this.state.wfBonus > 0) {
            if (this.state.baseItem.is_crafted) {
                eventData['ilvl'] += (this.state.wfBonus - this.state.baseIlvlBonus) * 5;
            }
            else {
                eventData['ilvl'] += this.state.wfBonus - this.state.baseIlvlBonus;
            }
        }

        if (this.state.suffixBonus > 0) {
            let propMultiplier = this.getRandPropMultiplier(this.props.item);
            for (let stat in RANDOM_SUFFIX_MAP[this.state.suffixBonus].stats) {
                eventData['newStats'][stat] = RANDOM_SUFFIX_MAP[this.state.suffixBonus].stats[stat] * propMultiplier;
            }

            eventData['suffix'] = RANDOM_SUFFIX_MAP[this.state.suffixBonus].name;
        }

        if (eventData['ilvl'] != this.state.baseItem.item_level) {
            eventData['newStats'] = recalculateStats(
                Object.assign({}, eventData['newStats']),
                (eventData['ilvl'] - this.state.baseItem.item_level).toFixed(2));
        }

        store.dispatch(updateCharacterState('CHANGE_BONUSES', eventData));
        store.dispatch({ type: "CLOSE_MODAL" });
    }

    getRandPropMultiplier(item) {
        let entry = 3;
        switch (item.slot) {
            case 'head':
            case 'chest':
            case 'legs':
                entry = 1;
                break;
            case 'shoulder':
            case 'waist':
            case 'feet':
            case 'hands':
            case 'trinket1':
            case 'trinket2':
                entry = 2;
                break;
            case 'neck':
            case 'wrist':
            case 'finger1':
            case 'finger2':
            case 'back':
                entry = 3;
                break;
            case 'mainHand':
            case 'offHand':
                entry = 4;
                break;
            default:
                entry = 2;
                break;
        }

        if (item.quality == 3)
            entry += 6;
        else if (item.quality == 2)
            entry += 12;

        let combatMultiplier = 0.0;
        switch (item.slot) {
            case 'neck':
            case 'finger1':
            case 'finger2':
                combatMultiplier = JEWELRY_COMBAT_RATINGS_MULT_BY_ILVL[item.item_level - 1];
                break;
            case 'mainHand':
            case 'offHand':
                combatMultiplier = WEAPON_COMBAT_RATINGS_MULT_BY_ILVL[item.item_level - 1];
                break;
            case 'trinket1':
            case 'trinket2':
                combatMultiplier = TRINKET_COMBAT_RATINGS_MULT_BY_ILVL[item.item_level - 1];
                break;
            default:
                combatMultiplier = ARMOR_COMBAT_RATINGS_MULT_BY_ILVL[item.item_level - 1];
                break;
        }

        return RAND_PROP_POINTS[item.item_level][entry] * combatMultiplier;
    }

    render() {

        if (this.state.baseItem) {
            let wfOptions = [];
            let selectedWFBonus = 0;
            if (this.state.baseItem.item_level != 0) {
                if (this.props.item.quality == 5) {
                    wfOptions.push(<option value="3570" key="3570">Item Level 970 / +60</option>);
                    wfOptions.push(<option value="3530" key="3530">Item Level 940 / +30</option>);
                    if (this.state.active.indexOf(3570) != -11) {
                        selectedWFBonus = 3570;
                    }
                    else if (this.state.active.indexOf(3530) != -1) {
                        selectedWFBonus = 3530;
                    }
                }
                else if (!this.state.baseItem.is_crafted) {
                    for (let i = 955; i >= this.state.baseItem.item_level + 5; i -= 5) {
                        let bonus = i - this.state.baseItem.item_level + this.state.baseIlvlBonus;
                        if (this.state.active.indexOf(bonus) != -1) {
                            selectedWFBonus = bonus;
                        }

                        wfOptions.push(<option value={bonus} key={bonus}>Item Level {i} / +{i - this.state.baseItem.item_level}</option>);
                    }
                }
                else {
                    // Obliterum items range from 0/10 to 10/10, with bonus IDs 669 and 679 respectively.
                    for (let bonus = 679; bonus >= 669; bonus -= 1) {

                        let itemLevelDiff = (bonus - 669) * 5;
                        if (this.state.active.indexOf(bonus) != -1) {
                            selectedWFBonus = bonus;
                        }

                        wfOptions.push(<option value={bonus} key={bonus}>Obliterum {bonus - 669}/10 - Item Level {850 + itemLevelDiff} / +{itemLevelDiff}</option>);
                    }
                }
            }

            if (!this.state.baseItem.is_crafted) {
                wfOptions.push(<option value="0" key="0">Item Level {this.state.baseItem.item_level} / None</option>);
            }

            let suffixOptions = [];
            let selectedSuffix = 0;
            if (this.state.baseItem.item_level != 0) {
                let propMult = this.getRandPropMultiplier(this.props.item);
                let bonusOptions = [];

                for (let idx in this.state.baseItem.chance_bonus_lists) {
                    let bonus = this.state.baseItem.chance_bonus_lists[idx];
                    if (bonus in RANDOM_SUFFIX_MAP) {

                        if (this.state.active.indexOf(bonus) != -1) {
                            selectedSuffix = bonus;
                        }

                        let stats = Object.assign({}, RANDOM_SUFFIX_MAP[bonus].stats);
                        let statString = '';
                        for (let stat in stats) {
                            stats[stat] = Math.round(stats[stat] * propMult);
                            statString += `+${stats[stat]} ${stat} / `;
                        }

                        bonusOptions.push({
                            bonus: bonus, name: RANDOM_SUFFIX_MAP[bonus].name,
                            stats: stats, string: statString.slice(0, -3),
                            value: getStatValue(stats, this.props.weights)
                        });
                    }
                }

                bonusOptions.sort(function (a, b) { return b.value - a.value; });
                for (let idx in bonusOptions) {
                    suffixOptions.push(<option value={bonusOptions[idx].bonus} key={bonusOptions[idx].bonus}>{bonusOptions[idx].string} / {bonusOptions[idx].name} ({Math.round(bonusOptions[idx].value)} EP)</option>);
                }

                suffixOptions.push(<option value="0" key="0">None / None (0.0EP)</option>);
            }

            return (
                <ModalWrapper style={{ top: "355px", left: "440px" }} modalId="bonuses">
                    <h1>Item Bonuses</h1>
                    <form id="bonuses">
                        {this.state.baseItem.chance_bonus_lists.indexOf(1808) != -1 &&
                            <fieldset>
                                <legend>Extra Sockets</legend>
                                <BonusIDCheckBox bonusId="1808" handleCheckbox={this.onChange} checked={this.state.active.indexOf(1808) != -1} />
                            </fieldset>
                        }

                        <fieldset>
                            <legend>Titanforged Upgrades</legend>
                            <select className="optionSelect" value={selectedWFBonus} readOnly onChange={this.onWFChange}>
                                {wfOptions}
                            </select>
                        </fieldset>

                        {suffixOptions.length > 0 &&
                            <fieldset>
                                <legend>Random Suffixes</legend>
                                <select className="optionSelect" value={selectedSuffix} readOnly onChange={this.onSuffixChange}>
                                    {suffixOptions}
                                </select>
                            </fieldset>
                        }
                        <input className="ui-button ui-widget ui-state-default ui-corner-all" role="button" value="Apply" readOnly onClick={this.onApply} />
                    </form>
                    <a className="close-popup ui-dialog-titlebar-close ui-corner-all" role="button" onClick={() => { store.dispatch({ type: "CLOSE_MODAL" }); }}>
                        <span className="ui-icon ui-icon-closethick" />
                    </a>
                </ModalWrapper>
            );
        }
        else {
            return null;
        }
    }
}

BonusIDPopup.propTypes = {
    item: PropTypes.instanceOf(Item).isRequired,
    weights: PropTypes.objectOf(PropTypes.number.isRequired).isRequired
};

const mapStateToProps = function (store) {
    return {
        weights: store.engine.ep
    };
};

export default connect(mapStateToProps)(BonusIDPopup);
