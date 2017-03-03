import React from 'react';

export default class DropDown extends React.Component {

    render() {

        const optionlist = this.props.data.options
            .map((option, index) => (<option key={index}>{option}</option>));

        return (
            <label className="select">
                <span className="label">{this.props.data.label}</span>
                <span className="select-container">
                    <select className="optionSelect">
                        {optionlist}
                    </select>
                </span>
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}