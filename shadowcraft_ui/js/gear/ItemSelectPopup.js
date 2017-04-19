import React from 'react';
import ItemSelectElement from './ItemSelectElement';
import { connect } from 'react-redux';

class ItemSelectPopup extends React.Component {

    getItemValue(item, weights) {
        let value = 0;
        if (item.properties.stats.agility) value += item.properties.stats.agility * weights.agi;
        if (item.properties.stats.crit) value += item.properties.stats.crit * weights.crit;
        if (item.properties.stats.haste) value += item.properties.stats.haste * weights.haste;
        if (item.properties.stats.mastery) value += item.properties.stats.mastery * weights.mastery;
        if (item.properties.stats.versatility) value += item.properties.stats.versatility * weights.versatility;
        return value;
    }

    sortItems(items, weights) {
        return items.sort((a, b) => this.getItemValue(b, weights) - this.getItemValue(a, weights));
    }

    getItemSelectElements(items, weights) {
        //presort needed to use first element later for max value prop, don't want to sort twice per render.
        let sortedItems = this.sortItems(items, weights);
        return sortedItems.map((item, index) => (
            <ItemSelectElement
                key={index}
                item={item}
                value={this.getItemValue(item, weights)}
                max={this.getItemValue(sortedItems[0], weights)}
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