import React from 'react';
import store from './store';

export default class CheckBox extends React.Component {

    constructor(props) {
        super(props);
        this.selectOption = this.selectOption.bind(this);
    }

    selectOption(e) {
        e.preventDefault();
        store.dispatch({type: 'CHANGE_SETTING',
                        setting: e.currentTarget.id,
                        value: e.currentTarget.value});
    }

    render() {
        return (
            <label className="select" htmlFor="opt-buffs-flask_legion_agi">
                <span className="label">{this.props.data.label}</span>
                <input className="optionCheck" data-ns="buffs" id={this.props.section+"."+this.props.data.name} type="checkbox" defaultChecked="checked" value={this.props.value} onChange={this.selectOption} />
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}
