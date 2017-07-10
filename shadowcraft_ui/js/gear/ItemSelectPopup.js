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
    }

    getItemValue(stats) {
        let value = 0;
        //explicit to mind possible mismatched/missing property names
        value += (stats.agility || 0) * this.props.weights.agi;
        value += (stats.crit || 0) * this.props.weights.crit;
        value += (stats.haste || 0) * this.props.weights.haste;
        value += (stats.mastery || 0) * this.props.weights.mastery;
        value += (stats.versatility || 0) * this.props.weights.versatility;

        return value;
    }

    getEnchantValue(item)
    {
        let value = this.getItemValue(item.stats);
        if (item.ep_id) {
            value += this.props.enchant_ep[item.ep_id];
        }
        return value;
    }

    componentDidMount() {
        // This is a bit of a hack and is probably a bit fragile depending on if wowdb ever
        // changes any of this, but it rescans the DOM for elements that should display a
        // tooltip.
        console.log("popup mounted");
        CurseTips['wowdb-tooltip'].watchElligibleElements();
    }

    sortItems(items) {
        if (this.props.isGem) {
            return items.sort((a, b) => {
                return this.getItemValue(b.stats) - this.getItemValue(a.stats);
            });
        }
        else if (this.props.isEnchant) {
            return items.sort((a, b) => {
                return this.getEnchantValue(b) - this.getEnchantValue(a);
            });
        }
        else {
            return items.sort((a, b) => {
                // TODO: temporarily only include the first version for every item. This needs to be expanded
                // so that it includes every base-item-level version for each of them.
                let a_ilvl = Object.keys(a.ilvls)[0];
                let b_ilvl = Object.keys(b.ilvls)[0];
                return this.getItemValue(b.ilvls[b_ilvl].stats) - this.getItemValue(a.ilvls[a_ilvl].stats);
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
        if (this.props.isGem) {
            maxValue = this.getItemValue(sortedItems[0].stats);
        }
        else if (this.props.isEnchant) {
            maxValue = this.getEnchantValue(sortedItems[0]);
        }
        else {
            let firstIlvl = Object.keys(sortedItems[0].ilvls)[0];
            maxValue = this.getItemValue(sortedItems[0].ilvls[firstIlvl].stats);
        }

        return sortedItems.map(function(item, index) {
            let value = 0;
            if (this.props.isGem) {
                value = this.getItemValue(item.stats);
            }
            else if (this.props.isEnchant) {
                value = this.getEnchantValue(item);
            }
            else {
                let firstIlvl = Object.keys(item.ilvls)[0];
                value = this.getItemValue(item.ilvls[firstIlvl].stats);
            }

            return <ItemSelectElement
                       key={index}
                       slot={this.props.slot}
                       item={item}
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
        enchant_ep: store.engine.other_ep
    };
};

export default connect(mapStateToProps)(ItemSelectPopup);
