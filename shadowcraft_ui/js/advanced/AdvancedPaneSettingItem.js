import React from 'react';
import DropDown from '../DropDown';
import TextBox from '../TextBox';
import CheckBox from '../CheckBox';

export default class AdvancedPaneSettingItem extends React.Component {

    getSettingType(settingitem, section, current) {
        switch (settingitem.type) {
            case 'dropdown': return <DropDown data={settingitem} section={section} value={current} />;
            case 'checkbox': return <CheckBox data={settingitem} section={section} value={current} />;
            case 'textbox': return <TextBox data={settingitem} section={section} value={current} />;
        }
    }

    render() {
        var key = this.props.section + "." + this.props.sectionitem.name;
        return this.getSettingType(this.props.sectionitem, this.props.section, this.props.current[key]);
    }
}
