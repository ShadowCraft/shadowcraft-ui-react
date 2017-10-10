import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { changeSetting } from '../store';
import { Map } from 'immutable';

class DropDown extends React.Component {

    onChange(e) {
        store.dispatch(changeSetting({
            setting: e.currentTarget.id,
            value: e.currentTarget.value
        }));
    }

    render() {

        let optionlist = this.props.setting.get('options').valueSeq()
            .map(option => <option key={option} value={option}>{option}</option>);

        return (
            <label className="select">
                <span className="label">{this.props.setting.get('label')}</span>
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
                <span className="desc">{this.props.setting.get('description')}</span>
            </label>
        );
    }
}

DropDown.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    setting: PropTypes.instanceOf(Map).isRequired
};

export default DropDown;
