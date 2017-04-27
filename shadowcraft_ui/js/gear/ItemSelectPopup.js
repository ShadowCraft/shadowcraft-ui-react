import React from 'react';
import ItemSelectElement from './ItemSelectElement';
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

    sortItems(items, weights) {
        return items.sort((a, b) => this.getItemValue(b.properties.stats, weights) - this.getItemValue(a.properties.stats, weights));
    }

    getItemSelectElements(items, weights) {
        //presort needed to use first element later for max value prop, don't want to sort twice per render.
        let sortedItems = this.sortItems(items, weights);
        return sortedItems.map((item, index) => (
            <ItemSelectElement
                key={index}
                slot={this.props.slot}
                item={item}
                value={this.getItemValue(item.properties.stats, weights)}
                max={this.getItemValue(sortedItems[0].properties.stats, weights)}
            />
        ));
    }

    render() {
        // console.log(this.props.items);
        //TODO: fix the popup dialog placement
        return (
            <div className="alternatives popup ui-dialog visible" id="gearpopup" style={{ top: '0px', left: '0px' }}>
                <div id="filter">
                    <input className="search" placeholder="Filter..." type="search" />
                </div>
                <div className="body" >
                    {this.props.items ? this.getItemSelectElements(this.props.items, this.props.weights) : <div />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return {
        weights: store.engine.ep
    };
};

export default connect(mapStateToProps)(ItemSelectPopup);