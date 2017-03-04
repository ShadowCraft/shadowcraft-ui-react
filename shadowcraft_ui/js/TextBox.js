import React from 'react';

export default class TextBox extends React.Component {
    render() {
        return (
            <label className="input">
                <span className="label">{this.props.data.label}</span>
                <input className="optionInput" data-ns="general" id={this.props.section+"."+this.props.data.name} type="text" defaultValue={this.props.data.default}/>
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}
