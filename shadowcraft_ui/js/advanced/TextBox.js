import React from 'react';
import store from '../store';

export default class TextBox extends React.Component {

    onKeyDown(e) {
        if (e.keyCode == 13) {
            store.dispatch({
                type: 'CHANGE_SETTING',
                setting: e.currentTarget.id,
                value: e.currentTarget.value
            });
        }
    }

    render() {
        return (
            <label className="input">
                <span className="label">{this.props.setting.label}</span>
                <input
                    className="optionInput"
                    id={this.props.id}
                    type={this.props.setting.type}
                    defaultValue={this.props.value}
                    onKeyDown={this.onKeyDown.bind(this)}
                />
                <span className="desc">{this.props.setting.description}</span>
            </label>
        );
    }
}
