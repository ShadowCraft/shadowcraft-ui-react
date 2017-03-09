import React from 'react';
import DropDown from '../DropDown';
import TextBox from '../TextBox';
import CheckBox from '../CheckBox';

export default class AdvancedPaneSettingItem extends React.Component {

    getSettingType(setting, id, value) {
        switch (setting.type) {
            case 'dropdown': return <DropDown setting={setting} id={id} value={value} />;
            case 'checkbox': return <CheckBox setting={setting} id={id} value={value} />;
            case 'text': return <TextBox setting={setting} id={id} value={value} />;
        }
    }

    render() {
        var id = `${this.props.section}.${this.props.sectionitem.name}`;
        return this.getSettingType(this.props.sectionitem, id, this.props.current[id]);
    }
}
