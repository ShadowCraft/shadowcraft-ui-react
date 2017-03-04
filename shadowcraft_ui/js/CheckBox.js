import React from 'react';

export default class CheckBox extends React.Component {
    render() {
        return (
            <label className="select" htmlFor="opt-buffs-flask_legion_agi">
                <span className="label">{this.props.data.label}</span>
                <input className="optionCheck" data-ns="buffs" id={this.props.section+"."+this.props.data.name} type="checkbox" defaultChecked="checked" value={this.props.data.default} />
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}
