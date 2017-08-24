import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { changeSetting } from '../store';

class TextBox extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

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

TextBox.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    setting: PropTypes.shape({
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })
};

TextBox.defaultProps = {
    value: ''
};

export default TextBox;
