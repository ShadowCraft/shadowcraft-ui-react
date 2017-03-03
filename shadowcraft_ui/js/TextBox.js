import React from 'react';

export default class TextBox extends React.Component {
    render() {
        return (
            <label className="input">
                <span className="label">{this.props.data.label}</span>
                <input className="optionInput" data-ns="general" id="opt-general-mfd_resets" name="mfd_resets" type="text" />
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}