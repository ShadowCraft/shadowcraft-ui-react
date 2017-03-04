import React from 'react';

export default class DropDown extends React.Component {

    render() {
        if (this.props.data.options instanceof Array) {
            var optionlist = this.props.data.options
                                 .map((option, index) =>
                                     (<option key={index} value={option}>{option}</option>));
        }
        else if (this.props.data.options instanceof Object) {
            var optionlist = [];
            for (var key in this.props.data.options) {
                optionlist.push(<option key={key} value={key}>{this.props.data.options[key]}</option>);
            }
        }

        return (
            <label className="select">
                <span className="label">{this.props.data.label}</span>
                <span className="select-container" value={this.props.data.default}>
                    <select className="optionSelect" id={this.props.section+"."+this.props.data.name}>
                        {optionlist}
                    </select>
                </span>
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}
