import React from 'react';
import store from '../store';
import ItemSelectElement from './ItemSelectElement';
import ModalWrapper from '../modals/ModalWrapper';
import { connect } from 'react-redux';

class ItemSelectPopup extends React.Component {

    constructor(props) {
        super(props);
        this.onFilterInput = this.onFilterInput.bind(this);

        this.state = { filter: '' };
        this.itemValueCache = {};
    }

    getStatValue(stats) {
        let value = 0;
        //explicit to mind possible mismatched/missing property names
        value += (stats.agility || 0) * this.props.weights.agi;
        value += (stats.crit || 0) * this.props.weights.crit;
        value += (stats.haste || 0) * this.props.weights.haste;
        value += (stats.mastery || 0) * this.props.weights.mastery;
        value += (stats.versatility || 0) * this.props.weights.versatility;

        return value;
    }

    getItemValue(item) {
        if (!(item.id in this.itemValueCache && item.item_level in this.itemValueCache[item.id])) {
            let value = this.getStatValue(item.stats);
            if (item.id in this.props.trinket_map) {
                let idString = this.props.trinket_map[item.id];
                
                if (idString in this.props.other_ep) {
                    value += this.props.other_ep[idString];
                }
                
                if (idString in this.props.proc_ep) {
                    value += this.props.proc_ep[idString][item.item_level.toString()];
                }
            }
            
            if (!(item.id in this.itemValueCache)) {
                this.itemValueCache[item.id] = {}
            }
            
            this.itemValueCache[item.id][item.item_level] = value;
        }

        return this.itemValueCache[item.id][item.item_level];
    }

    getEnchantValue(enchant)
    {
        let value = this.getStatValue(enchant.stats);
        if (enchant.ep_id) {
            value += this.props.other_ep[enchant.ep_id];
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
            filteredItems = items.filter(function(item) {
                return item.name.toLowerCase().includes(this.state.filter);
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

        return sortedItems.map(function(item, index) {
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
        this.setState({filter: e.target.value.toLowerCase()});
    }

    render() {
        // console.log(this.props.items);
        //TODO: fix the popup dialog placement
        return (
            <ModalWrapper style={{ top: '100px', left: '100px' }} modalId="alternatives">
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" onInput={this.onFilterInput}/>
                </div>
                <div className="body" >
                    {this.props.items ? this.getItemSelectElements(this.props.items) : <div />}
                </div>
                <a className="close-popup ui-dialog-titlebar-close ui-corner-all" role="button" onClick={() => {store.dispatch({type: "CLOSE_MODAL"})}}>
                    <span className="ui-icon ui-icon-closethick" />
                </a>
            </ModalWrapper>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        weights: store.engine.ep,
        other_ep: store.engine.other_ep,
        proc_ep: store.engine.proc_ep,
        trinket_map: store.engine.trinket_map
    };
};

export default connect(mapStateToProps)(ItemSelectPopup);
