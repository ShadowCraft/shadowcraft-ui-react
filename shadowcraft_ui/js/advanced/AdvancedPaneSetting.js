import React from 'react';
import PropTypes from 'prop-types';
import DropDown from './DropDown';
import TextBox from './TextBox';
import CheckBox from './CheckBox';
import {Map} from 'immutable';

class AdvancedPaneSetting extends React.Component {

    getSettingType(setting, id, value) {
        switch (setting.get('type')) {
            case 'dropdown': return <DropDown setting={setting} id={id} value={value} />;
            case 'checkbox': return <CheckBox setting={setting} id={id} value={value} />;
            case 'text': return <TextBox setting={setting} id={id} value={value} />;
        }
    }

    render() {
        if (this.props.current) {
            return this.getSettingType(
                this.props.setting,
                this.props.setting.get('name'),
                this.props.current.get(this.props.setting.get('name'))
            );
        }
        else return <div />;
    }
}

AdvancedPaneSetting.propTypes = {
    current: PropTypes.instanceOf(Map).isRequired,
    setting: PropTypes.instanceOf(Map).isRequired
};

AdvancedPaneSetting.defaultProps = {
    current: {}
};

export default AdvancedPaneSetting;
