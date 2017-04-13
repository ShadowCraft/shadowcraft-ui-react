import React from 'react';
import BreakdownItem from './BreakdownItem';

export default class BreakdownList extends React.Component {

    getBreakdownItems(items, max) {

        var newItems = [];

        // calculate the percentages and find the max percentage
        for (var item in items) {
            newItems.push( {name: item,
                            dps: items[item],
                            pct: items[item] / max} );
        }

        let mylist = newItems.sort((a, b) => b.pct - a.pct);
        return mylist.map((listitem) => <BreakdownItem key={listitem.name} item={listitem} maxpct={mylist[0].pct} />);
    }

    render() {
        return (
            <div className="inner" >
                {this.getBreakdownItems(this.props.list, this.props.max)}
            </div>
        );
    }
}
