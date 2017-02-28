import React from 'react';
import EquippedGemItem from './EquippedGemItem';

export default class EquippedGemList extends React.Component {

    //empty gem sockets are 0
    //if there is no id present in the gems array, then there is no socket on the item
    //there appears to be between 0 to 3 sockets on an item.

    getGemList(gems) {
        return gems.map(gem => {
            // don't show relics (assuming all relics use this bonus text)
            if (gem.bonus !== 'Relic Enhancement')
                return (<EquippedGemItem gem={gem} key={gem.gemslot} />);
        });
    }

    render() {
        // console.log(this.props.gems)
        return (
            <div className="gems">
                {this.getGemList(this.props.gems)}
            </div>
        );
    }
}