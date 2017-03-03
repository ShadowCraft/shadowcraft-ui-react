import React from 'react';

export default class BreakdownItem extends React.Component {
    render() {
        // console.log(this.props.item)
        return (
            <div title={`${this.props.item.dps} dps`} className="talent_contribution">
                <div className="name" >{this.props.item.name}</div>
                <div className="pct">
                    <div className="label">{this.props.item.pct * 100}%</div>
                    <div className="pct-inner" style={{ width: `${this.props.item.pct / this.props.maxpct * 100}%` }} />
                </div>
            </div>
        );
    }

}