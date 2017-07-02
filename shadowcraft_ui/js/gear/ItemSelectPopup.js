import React from 'react';
import ItemSelectElement from './ItemSelectElement';
import ModalWrapper from '../modals/ModalWrapper';
import { connect } from 'react-redux';

class ItemSelectPopup extends React.Component {

    getItemValue(stats, weights) {
        let value = 0;
        //explicit to mind possible mismatched/missing property names
        value += (stats.agility || 0) * weights.agi;
        value += (stats.crit || 0) * weights.crit;
        value += (stats.haste || 0) * weights.haste;
        value += (stats.mastery || 0) * weights.mastery;
        value += (stats.versatility || 0) * weights.versatility;

        return value;
    }

    componentDidMount() {
        // This is a bit of a hack and is probably a bit fragile depending on if wowdb ever
        // changes any of this, but it rescans the DOM for elements that should display a
        // tooltip.
        console.log("popup mounted");
        CurseTips['wowdb-tooltip'].watchElligibleElements();
    }

    sortItems(items, weights) {
        return items.sort((a, b) => {
            // TODO: temporarily only include the first version for every item. This needs to be expanded
            // so that it includes every base-item-level version for each of them.
            let a_ilvl = Object.keys(a.item_stats)[0];
            let b_ilvl = Object.keys(b.item_stats)[0];
            return this.getItemValue(b.item_stats[b_ilvl], weights) - this.getItemValue(a.item_stats[a_ilvl], weights);
        });
    }

    getItemSelectElements(items, weights) {
        //presort needed to use first element later for max value prop, don't want to sort twice per render.
        let sortedItems = this.sortItems(items, weights);
        return sortedItems.map((item, index) => (
            <ItemSelectElement
                key={index}
                slot={this.props.slot}
                item={item}
                value={this.getItemValue(item.item_stats[Object.keys(item.item_stats)[0]], weights)}
                max={this.getItemValue(sortedItems[0].item_stats[Object.keys(sortedItems[0].item_stats)[0]], weights)}
                onClick={this.props.onClick}
            />
        ));
    }

    render() {
        // console.log(this.props.items);
        //TODO: fix the popup dialog placement
        return (
            <ModalWrapper style={{ top: '100px', left: '100px' }} modalId="alternatives">
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" />
                </div>
                <div className="body" >
                    {this.props.items ? this.getItemSelectElements(this.props.items, this.props.weights) : <div />}
                </div>
            </ModalWrapper>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        weights: store.engine.ep
    };
};

export default connect(mapStateToProps)(ItemSelectPopup);
