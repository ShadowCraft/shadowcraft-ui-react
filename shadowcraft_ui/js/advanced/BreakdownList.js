import React from 'react';
import BreakdownItem from './BreakdownItem';

export default class BreakdownList extends React.Component {

    getBreakdownItems(items) {
        // console.log(items)
        let mylist = items.sort((a, b) => b.pct > a.pct);
        return mylist.map((listitem) => <BreakdownItem key={listitem.name} item={listitem} maxpct={mylist[0].pct} />);
    }

    render() {
        return (
            <div className="inner" >
                {this.getBreakdownItems(this.props.list)}
            </div>
        );
    }
}