import React from 'react';
import store from './store';

export default class DropDown extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.selectOption = this.selectOption.bind(this);
    // }

    selectOption(e) {
        // console.log(e.currentTarget.value)
        e.preventDefault();
        store.dispatch({type: 'CHANGE_SETTING',
                        setting: e.currentTarget.id,
                        value: e.currentTarget.value});
    }

    render() {
        // console.log(this.props)
        // var optionlist;
        // if (this.props.data.options instanceof Array) {
        //     optionlist = this.props.data.options
        //                      .map((option, index) =>
        //                          (<option key={index} value={option}>{option}</option>));
        // }
        // else if (this.props.data.options instanceof Object) {
        //     optionlist = [];
        //     for (var key in this.props.data.options) {
        //         optionlist.push(<option key={key} value={key}>{this.props.data.options[key]}</option>);
        //     }
        // }

        let optionlist = Object.keys(this.props.data.options).map(
            (option, index) => (
                <option key={index} value={option}>{this.props.data.options[option]}</option>
            )
        );

        return (
            <label className="select">
                <span className="label">{this.props.data.label}</span>
                <span className="select-container" value={this.props.value}>
                    <select className="optionSelect" id={`${this.props.section}.${this.props.data.name}`} onChange={this.selectOption.bind(this)}>
                        {optionlist}
                    </select>
                </span>
                <span className="desc">{this.props.data.description}</span>
            </label>
        );
    }
}
