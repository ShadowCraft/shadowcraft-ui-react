import React from 'react';
import DropDown from './DropDown';
import TextBox from './TextBox';
import CheckBox from './CheckBox';

export default class AdvancedPaneSetting extends React.Component {

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
        else return <div />
    }
}
