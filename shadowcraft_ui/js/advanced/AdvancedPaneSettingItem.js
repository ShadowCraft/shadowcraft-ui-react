import React from 'react';
import DropDown from '../DropDown';
import TextBox from '../TextBox';
import CheckBox from '../CheckBox';

export default class AdvancedPaneSettingItem extends React.Component {

    getSettingType(settingitem, section) {
        switch (settingitem.type) {
            case 'dropdown': return <DropDown data={settingitem} section={section} />;
            case 'checkbox': return <CheckBox data={settingitem} section={section} />;
            case 'textbox': return <TextBox data={settingitem} section={section} />;
        }
    }

    render() {
        return this.getSettingType(this.props.sectionitem, this.props.section);
    }
}
