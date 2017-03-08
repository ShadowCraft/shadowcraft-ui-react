import React from 'react';
import store from './store';

export default class CheckBox extends React.Component {
    onChange(e) {
        e.preventDefault();
        store.dispatch({
            type: 'CHANGE_SETTING',
            setting: e.currentTarget.id,
            value: (this.props.value) ? false : true
        });
    }

    render() {
        return (
            <label className="select" htmlFor="opt-buffs-flask_legion_agi">
                <span className="label">{this.props.data.label}</span>
                <input className="optionCheck" id={`${this.props.section}.${this.props.data.name}`} type="checkbox" onChange={this.onChange.bind(this)} {... (this.props.value && {checked: 'checked'})} />
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}
