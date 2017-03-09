import React from 'react';
import store from '../store';

export default class CheckBox extends React.Component {

    onChange(e) {
        store.dispatch({
            type: 'CHANGE_SETTING',
            setting: e.currentTarget.id,
            value: (this.props.value) ? false : true
        });
    }

    render() {
        return (
            <label className="select">
                <span className="label">{this.props.setting.label}</span>
                <input
                    className="optionCheck"
                    id={this.props.id}
                    type={this.props.setting.type}
                    onChange={this.onChange.bind(this)}
                    checked={this.props.value}
                />
                <span className="desc">{this.props.setting.description}</span>
            </label>
        );
    }
}
