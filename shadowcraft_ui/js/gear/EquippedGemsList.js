import React from 'react';
import PropTypes from 'prop-types';
import EquippedGemItem from './EquippedGemItem';

class EquippedGemList extends React.Component {

    //empty gem sockets are 0
    //if there is no id present in the gems array, then there is no socket on the item
    //there appears to be between 0 to 3, inclusive, sockets on an item.

    constructor(props) {
        super();
        this.props = props;
    }

    render() {

        let gemlist = this.props.item.gems
            .filter((g => g.bonus !== 'Relic Enhancement')) // hide relics
            .map((g, i) => <EquippedGemItem item={this.props.item} gemSlot={i} key={i} />);

        return (
            <div className="gems">
                {gemlist}
            </div>
        );
    }
}

EquippedGemList.propTypes = {
    item: PropTypes.shape({ gems: PropTypes.array.isRequired }).isRequired
};

export default EquippedGemList;