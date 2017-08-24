import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { changeSetting } from '../store';

class DropDown extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    onChange(e) {
        store.dispatch(changeSetting({
            setting: e.currentTarget.id,
            value: e.currentTarget.value
        }));
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
                <span className="select-container">
                    <select
                        value={this.props.value}
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

DropDown.propTypes = {
    id: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
    setting: PropTypes.shape({
        label: PropTypes.string.isRequired,
        options: PropTypes.object.isRequired,
        description: PropTypes.string.isRequired,
    })
};

export default DropDown;
