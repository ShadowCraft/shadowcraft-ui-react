import React from 'react';
import PropTypes from 'prop-types';
import DropDown from './DropDown';
import TextBox from './TextBox';
import CheckBox from './CheckBox';

class AdvancedPaneSetting extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    getSettingType(setting, id, value) {
        switch (setting.type) {
            case 'dropdown': return <DropDown setting={setting} id={id} value={value} />;
            case 'checkbox': return <CheckBox setting={setting} id={id} value={value} />;
            case 'text': return <TextBox setting={setting} id={id} value={value} />;
        }
    }

    render() {
        if (this.props.current) {
            return this.getSettingType(
                this.props.setting,
                this.props.setting.name,
                this.props.current[this.props.setting.name]
            );
        }
        else return <div />;
    }
}

AdvancedPaneSetting.propTypes = {
    current: PropTypes.objectOf(
        PropTypes.any.isRequired
    ).isRequired,
    setting: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired
};

export default AdvancedPaneSetting;
