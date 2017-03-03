import React from 'react';
import EquippedGemItem from './EquippedGemItem';

export default class EquippedGemList extends React.Component {

    //empty gem sockets are 0
    //if there is no id present in the gems array, then there is no socket on the item
    //there appears to be between 0 to 3 sockets on an item.

    render() {

        let gemlist = this.props.gems
            .filter((g => g.bonus !== 'Relic Enhancement')) // hide relics
            .map((g, i) => <EquippedGemItem gem={g} key={i} />);

        // console.log(this.props.gems)
        return (
            <div className="gems">
                {gemlist}
            </div>
        );
    }
}