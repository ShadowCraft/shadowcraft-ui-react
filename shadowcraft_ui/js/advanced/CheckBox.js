import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { changeSetting } from '../store';
import { Map } from 'immutable';

class CheckBox extends React.Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.value !== nextProps.value;
    }

    onChange(e) {
        store.dispatch(changeSetting({
            setting: e.currentTarget.id,
            value: (this.props.value) ? false : true
        }));
    }

    render() {     
        return (
            <label className="select">
                <span className="label">{this.props.setting.get('label')}</span>
                <input
                    className="optionCheck"
                    id={this.props.id}
                    type={this.props.setting.get('type')}
                    onChange={this.onChange.bind(this)}
                    checked={this.props.value}
                />
                <span className="desc">{this.props.setting.get('description')}</span>
            </label>
        );
    }
}

CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    setting: PropTypes.instanceOf(Map).isRequired
};

export default CheckBox;
