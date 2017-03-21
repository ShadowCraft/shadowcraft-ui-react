import React from 'react';

function round2(val) {
    return Math.round(val * 100.0) / 100.0;
}

export default class BreakdownItem extends React.Component {
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
