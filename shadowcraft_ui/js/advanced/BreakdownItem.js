import React from 'react';
import PropTypes from 'prop-types';

function round2(val) {
    return Math.round(val * 100.0) / 100.0;
}

class BreakdownItem extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        return (
            <div title={`${round2(this.props.item.dps)} dps`} className="talent_contribution">
                <div className="name" >{this.props.item.name}</div>
                <div className="pct">
                    <div className="label">{round2(this.props.item.pct * 100)}%</div>
                    <div className="pct-inner" style={{ width: `${this.props.item.pct / this.props.maxpct * 100}%` }} />
                </div>
            </div>
        );
    }
}

BreakdownItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        dps: PropTypes.number.isRequired,
        pct: PropTypes.number.isRequired
    }).isRequired,
    maxpct: PropTypes.number.isRequired
};

export default BreakdownItem;
