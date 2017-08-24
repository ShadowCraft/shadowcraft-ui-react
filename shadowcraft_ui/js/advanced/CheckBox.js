import React from 'react';
import PropTypes from 'prop-types';
import store from '../store';
import { changeSetting } from '../store';

class CheckBox extends React.Component {

    constructor(props){
        super();
        this.props = props;
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
                <span className="label">{this.props.setting.label}</span>
                <input
                    className="optionCheck"
                    id={this.props.id}
                    type={this.props.setting.type}
                    onChange={this.onChange.bind(this)}
                    checked={this.props.value}
                />
                <span className="desc">{this.props.setting.description}</span>
            </label>
        );
    }
}

CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    setting: PropTypes.shape({
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    })
};

CheckBox.defaultProps = {
    value: false
};

export default CheckBox;
