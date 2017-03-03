import React from 'react';
import DropDown from './DropDown';
import TextBox from './TextBox';
import CheckBox from './CheckBox';

export default class SettingsPaneSectionItem extends React.Component {

    getSettingType(settingitem) {
        switch (settingitem.type) {
            case 'dropdown': return <DropDown data={settingitem} />;
            case 'checkbox': return <CheckBox data={settingitem} />;
            case 'textbox': return <TextBox data={settingitem} />;
        }
    }

    render() {
        return this.getSettingType(this.props.sectionitem);
    }
}