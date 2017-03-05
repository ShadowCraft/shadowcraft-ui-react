import React from 'react';
import store from './store';

export default class TextBox extends React.Component {

    constructor(props) {
        super(props);
        this.changeText = this.changeText.bind(this);
    }

    changeText(e) {
        if (e.keyCode == 13) {
            store.dispatch({type: 'CHANGE_SETTING',
                            setting: e.currentTarget.id,
                            value: e.currentTarget.value});
        }
    }

    render() {
        return (
            <label className="input">
                <span className="label">{this.props.data.label}</span>
                <input className="optionInput" data-ns="general" id={this.props.section+"."+this.props.data.name} type="text" defaultValue={this.props.value} onKeyDown={this.changeText} />
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}
