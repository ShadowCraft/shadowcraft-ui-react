import React from 'react';

import store from '../store';
import ModalWrapper from '../modals/ModalWrapper';
import { checkFetchStatus, updateCharacterState } from '../store';
import { recalculateStats } from '../common';

class BonusIDCheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.handleCheckbox(e);
    }

    render() {
        let description;
        switch (this.props.bonusId.toString()) {
            case "1808":
                description = "1 Socket";
        }

        let classes = "";
        if (this.props.checked) {
            classes = "label_check c_on";
        } else {
            classes = "label_check";
        }

        return (
            <label className={classes}>
                <input key={this.props.bonusId} id={"bonus-" + this.props.bonusId} data-bonusId={this.props.bonusId} type="checkbox" onChange={this.onChange} checked={this.props.checked} />{description}
            </label>
        );
    }
}

export default class BonusIDPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: props.item.bonuses,
            wfBonus: -1,
            baseItem: {
                chance_bonus_lists: [],
                stats: {},
                item_level: 0
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onWFChange = this.onWFChange.bind(this);
        this.onApply = this.onApply.bind(this);

        for (let idx in props.item.bonuses) {
            if (props.item.bonuses[idx] >= 1472 && props.item.bonuses[idx] <= 1672) {
                this.state.wfBonus = props.item.bonuses[idx];
                break;
            }
        }
    }

    componentWillMount() {
        let url = '/get_item_by_context?id=' + this.props.item.id + '&context=' + this.props.item.context;
        fetch(url)
            .then(checkFetchStatus)
            .then(r => r.json())
            .then(function (json) {
                let itemdata = { chance_bonus_lists: json['chance_bonus_lists'],
                                 stats: null, item_level: 0 };

                // Find the stats for the ilvl at or just below the current item's ilvl.
                let itemlevels = Object.keys(json['item_stats']).sort();
                for (let i = 0; i < itemlevels.length; i++) {
                    if (this.props.item.item_level == itemlevels[i]) {
                        itemdata['item_level'] = itemlevels[i];
                        itemdata['stats'] = json['item_stats'][itemlevels[i]];
                    } else if (this.props.item.item_level < itemlevels[i]) {
                        if (i == 0) {
                            itemdata['item_level'] = itemlevels[0];
                            itemdata['stats'] = json['item_stats'][itemlevels[0]];
                        } else {
                            itemdata['item_level'] = itemlevels[i-1];
                            itemdata['stats'] = json['item_stats'][itemlevels[i-1]];
                        }
                    }
                }

                if (itemdata['stats'] === null) {
                    itemdata['item_level'] = itemlevels[itemlevels[itemlevels.length-1]];
                    itemdata['stats'] = json['item_stats'][itemdata['item_level']];
                }

                itemdata['item_level'] = parseInt(itemdata['item_level']);

                this.setState({ baseItem: itemdata });
            }.bind(this));
    }

    onChange(e) {
        let bonusId = parseInt(e.currentTarget.dataset['bonusid']);

        // If the value was true, that means we're turning it off. Check to see if the
        // element is in the active list, and remove it.
        let newActive = this.state.active;
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
        let newActive = this.state.active;
        if (this.state.wfBonus != -1) {
            let curIndex = newActive.indexOf(this.state.wfBonus);
            newActive.splice(curIndex, 1);
        }

        newActive.push(parseInt(e.currentTarget.value));
        this.setState({ active: newActive, wfBonus: e.currentTarget.value });
    }

    onApply() {

        let eventData = {
            slot: this.props.item.slot,
            bonuses: this.state.active,
            newIlvl: this.state.baseItem.item_level,
            canHaveBonusSocket: this.state.baseItem.chance_bonus_lists.indexOf(1808) != -1,
            hasBonusSocket: this.state.active.indexOf(1808) != -1,
            newStats: this.state.baseItem.stats
        };

        if (this.state.wfBonus != 0) {
            eventData['newIlvl'] += this.state.wfBonus - 1472;
        }

        if (eventData['newIlvl'] != this.state.baseItem.item_level) {
            eventData['newStats'] = recalculateStats(
                this.state.baseItem.stats,
                (eventData['newIlvl'] - this.state.baseItem.item_level).toFixed(2));
        }

        store.dispatch(updateCharacterState('CHANGE_BONUSES', eventData));
        store.dispatch({type: "CLOSE_MODAL"});
    }

    render() {

        let wfOptions = [];
        let selectedWFBonus = 0;
        if (this.state.baseItem.item_level != 0)
        {
            for (let i = 955; i >= this.state.baseItem.item_level + 5; i -= 5) {
                let bonus = i - this.state.baseItem.item_level + 1472;
                if (this.state.active.indexOf(bonus) != -1) {
                    selectedWFBonus = bonus;
                }

                wfOptions.push(<option value={bonus} key={bonus}>Item Level {i} / +{i - this.state.baseItem.item_level}</option>);
            }
        }

        wfOptions.push(<option value="0" key="0">Item Level {this.state.baseItem.item_level} / None</option>);

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
                    <input className="ui-button ui-widget ui-state-default ui-corner-all" role="button" value="Apply" readOnly onClick={this.onApply} />
                </form>
                <a href="#" className="close-popup ui-dialog-titlebar-close ui-corner-all" role="button">
                    <span className="ui-icon ui-icon-closethick" />
                </a>
            </ModalWrapper>
        );
    }
}
