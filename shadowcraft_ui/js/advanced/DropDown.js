import React from 'react';
import store from '../store';

export default class DropDown extends React.Component {

    onChange(e) {
        store.dispatch({
            type: 'CHANGE_SETTING',
            setting: e.currentTarget.id,
            value: e.currentTarget.value
        });
    }

    render() {

        let optionlist = Object.keys(this.props.setting.options).map(
            (option, index) => (
                <option key={index} value={option}>{this.props.setting.options[option]}</option>
            )
        );

        return (
            <label className="select">
                <span className="label">{this.props.setting.label}</span>
                <span className="select-container" value={this.props.value}>
                    <select
                        className="optionSelect"
                        id={this.props.id}
                        onChange={this.onChange.bind(this)}
                    >
                        {optionlist}
                    </select>
                </span>
                <span className="desc">{this.props.setting.description}</span>
            </label>
        );
    }
}
