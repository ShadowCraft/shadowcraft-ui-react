import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { changeSetting } from '../store';
import { Map } from 'immutable';

class TextBox extends React.Component {

    onKeyDown(e) {
        if (e.keyCode == 13) {
            store.dispatch(changeSetting({
                setting: e.currentTarget.id,
                value: e.currentTarget.value
            }));
        }
    }

    render() {
        return (
            <label className="input">
                <span className="label">{this.props.setting.get('label')}</span>
                <input
                    className="optionInput"
                    id={this.props.id}
                    type={this.props.setting.get('type')}
                    defaultValue={this.props.value}
                    onKeyDown={this.onKeyDown.bind(this)}
                />
                <span className="desc">{this.props.setting.get('description')}</span>
            </label>
        );
    }
}

TextBox.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setting: PropTypes.instanceOf(Map).isRequired
};

export default TextBox;
