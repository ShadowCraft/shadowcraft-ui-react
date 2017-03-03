import React from 'react';

export default class CheckBox extends React.Component {
    render() {
        return (
            <label className="select" htmlFor="opt-buffs-flask_legion_agi">
                <span className="label">{this.props.data.label}</span>
                <input className="optionCheck" data-ns="buffs" id="opt-buffs-flask_legion_agi" name="flask_legion_agi" type="checkbox" defaultChecked="checked" value={this.props.data.checked} />
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}