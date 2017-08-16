import React from 'react';
import store from '../store';
import ItemSelectElement from './ItemSelectElement';
import ModalWrapper from '../modals/ModalWrapper';
import { connect } from 'react-redux';
import { getStatValue, MULTI_ITEM_SETS } from '../common';

class ItemSelectPopup extends React.Component {

    constructor(props) {
        super(props);
        this.onFilterInput = this.onFilterInput.bind(this);

        this.state = { filter: '', setBonusEP: {} };
        this.itemValueCache = {};

        // TODO: this requires iterating over all of the equipped items twice
        // for each set. And then we loop over each set again for each item in
        // in the list of items on the popup. There's likely a better way to
        // do this to reduce that iteration. Maybe a map that goes from item ID
        // to the sets that it's part of?
        for (let setName in MULTI_ITEM_SETS) {
            let setCount = this.getEquippedSetCount(MULTI_ITEM_SETS[setName].ids, this.props.slot);
            if (!(setName in this.state.setBonusEP)) {
                this.state.setBonusEP[setName] = 0;
            }
            this.state.setBonusEP[setName] += this.getSetBonusEP(MULTI_ITEM_SETS[setName], setCount);
        }
    }

    getEquippedSetCount(setIds, ignoreSlot) {
        let count = 0;
        for (let slot in this.props.allItems) {
            if (slot != ignoreSlot && setIds.indexOf(this.props.allItems[slot].id) != -1) {
                count += 1;
            }
        }
        return count;
    }

    getSetBonusEP(itemSet, equippedCount) {
        let total = 0;
        for (let num in itemSet.bonuses) {
            if (equippedCount == num -1) {
                total += this.props.otherEP[itemSet.bonuses[num]];
            }
        }
        return total;
    }

    getItemValue(item) {
        if (!(item.id in this.itemValueCache && item.item_level in this.itemValueCache[item.id])) {
            let value = getStatValue(item.stats, this.props.weights);
            if (item.id in this.props.trinketMap) {
                let idString = this.props.trinketMap[item.id];

                if (idString in this.props.otherEP) {
                    //check for a missing spell effect values from the engine
                    if (this.props.otherEP[idString] === 'not allowed') {
                        store.dispatch({ type: 'ADD_WARNING', text: <div>{idString}'s spell effect is not yet implemented</div> });
                    }
                    else {
                        value += this.props.otherEP[idString];
                    }
                }

                if (idString in this.props.procEP) {
                    value += this.props.procEP[idString][item.item_level.toString()];
                }
            }

            for (let setName in MULTI_ITEM_SETS) {
                if (MULTI_ITEM_SETS[setName].ids.indexOf(item.id) != -1) {
                    value += this.state.setBonusEP[setName];
                }
            }

            if (!(item.id in this.itemValueCache)) {
                this.itemValueCache[item.id] = {}
            }

            this.itemValueCache[item.id][item.item_level] = value;
        }

        return this.itemValueCache[item.id][item.item_level];
    }

    getEnchantValue(enchant) {
        let value = getStatValue(enchant.stats, this.props.weights);
        if (enchant.ep_id) {
            value += this.props.otherEP[enchant.ep_id];
        }
        return value;
    }

    componentDidMount() {
        // This is a bit of a hack and is probably a bit fragile depending on if wowdb ever
        // changes any of this, but it rescans the DOM for elements that should display a
        // tooltip.
        CurseTips['wowdb-tooltip'].watchElligibleElements();
    }

    sortItems(items) {
        if (this.props.isEnchant) {
            return items.sort((a, b) => {
                return this.getEnchantValue(b) - this.getEnchantValue(a);
            });
        }
        else {
            return items.sort((a, b) => {
                return this.getItemValue(b) - this.getItemValue(a);
            });
        }
    }

    getItemSelectElements(items) {
        // short-circuit if there's no filter yet
        let filteredItems;
        if (this.state.filter.length == 0) {
            filteredItems = items;
        }
        else {
            filteredItems = items.filter(function (item) {
                if (item.name.toLowerCase().includes(this.state.filter)) {
                    return true;
                }
                else if (this.props.isEnchant) {
                    return item.id == this.props.equippedItem.enchant;
                }
                else if (this.props.isGem) {
                    return item.id == this.props.equippedItem.gems[this.props.gemSlot].id;
                }
                else {
                    return item.id == this.props.equippedItem.id && item.item_level == this.props.equippedItem.item_level;
                }
            }.bind(this));
        }

        // presort needed to use first element later for max value prop, don't want to sort twice per render.
        let sortedItems = this.sortItems(filteredItems);
        let maxValue = 0;
        if (this.props.isEnchant) {
            maxValue = this.getEnchantValue(sortedItems[0]);
        }
        else {
            maxValue = this.getItemValue(sortedItems[0]);
        }

        return sortedItems.map(function (item, index) {
            let value = 0;
            let quality = 0;

            if (this.props.isEnchant) {
                value = this.getEnchantValue(item);
            }
            else {
                value = this.getItemValue(item);
                quality = item.quality;
            }

            return <ItemSelectElement
                key={index}
                slot={this.props.slot}
                item={item}
                quality={quality}
                value={value}
                max={maxValue}
                onClick={this.props.onClick}
                gemSlot={this.props.isGem ? this.props.gemSlot : null}
                isEnchant={this.props.isEnchant}
            />;
        }.bind(this));
    }

    onFilterInput(e) {
        this.setState({ filter: e.target.value.toLowerCase() });
    }

    render() {
        //TODO: fix the popup dialog placement
        return (
            <ModalWrapper style={{ top: '100px', left: '100px' }} modalId="alternatives">
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" onInput={this.onFilterInput} />
                </div>
                <div className="body" >
                    {this.props.items ? this.getItemSelectElements(this.props.items) : <div />}
                </div>
                <a className="close-popup ui-dialog-titlebar-close ui-corner-all" role="button" onClick={() => { store.dispatch({ type: "CLOSE_MODAL" }) }}>
                    <span className="ui-icon ui-icon-closethick" />
                </a>
            </ModalWrapper>
        );
    }
}

const mapStateToProps = function (store, ownProps) {
    return {
        weights: store.engine.ep,
        otherEP: store.engine.other_ep,
        procEP: store.engine.proc_ep,
        trinketMap: store.engine.trinket_map,
        equippedItems: store.character.gear[ownProps.slot],
        allItems: store.character.gear
    };
};

export default connect(mapStateToProps)(ItemSelectPopup);
