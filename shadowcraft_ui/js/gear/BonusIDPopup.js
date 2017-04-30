import React from 'react';

class BonusIDCheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.handleCheckbox(e);
    }

    render() {
        let description;
        switch (this.props.bonusId.toString()) {
            case "1808":
                description = "1 Socket";
        }

        let classes = "";
        if (this.props.checked) {
            classes = "label_check c_on";
        } else {
            classes = "label_check";
        }

        return (
            <label className={classes}>
                <input key={this.props.bonusId} id={"bonus-"+this.props.bonusId} data-bonusId={this.props.bonusId} type="checkbox" onChange={this.onChange} checked={this.props.checked} />{description}
            </label>
        );
    }
}

export default class BonusIDPopup extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            active: props.item.bonuses,
            wfBonus: -1
        };

        this.onChange = this.onChange.bind(this);
        this.onWFChange = this.onWFChange.bind(this);
        this.onApply = this.onApply.bind(this);

        for (let idx in props.item.bonuses) {
            if (props.item.bonuses[idx] >= 1472 && props.item.bonuses[idx] <= 1672) {
                this.state.wfBonus = props.item.bonuses[idx];
                break;
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        fetch('/get_item_by_context?id={nextProps.item.id}&context={nextProps.item.context}')
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                this.setState({ base_item: json });
            }.bind(this));

        this.setState({active: nextProps.item.bonuses});
    }

    onChange(e) {
        let bonusId = parseInt(e.currentTarget.dataset['bonusid']);

        // If the value was true, that means we're turning it off. Check to see if the
        // element is in the active list, and remove it.
        let newActive = this.state.active;
        let index = this.state.active.indexOf(bonusId);

        if (index != -1) {
            newActive.splice(index, 1);
        }
        else {
            newActive.push(bonusId);
        }

        this.setState({active: newActive});
    }

    onWFChange(e) {
        let newActive = this.state.active;
        if (this.state.wfBonus != -1) {
            let curIndex = newActive.indexOf(this.state.wfBonus);
            newActive.splice(curIndex, 1);
        }

        newActive.push(parseInt(e.currentTarget.value));
        this.setState({active: newActive, wfBonus: e.currentTarget.value});
    }

    onApply(e) {
        this.props.onApply(this.state.active);
    }

    render() {

        let wfOptions = [];
        let selectedWFBonus = 0;
        for (let i = 955; i >= this.props.item.base_item_level+5; i -= 5) {
            let bonus = i - this.props.item.base_item_level + 1472;
            if (this.state.active.indexOf(bonus) != -1) {
                selectedWFBonus = bonus;
            }

            wfOptions.push(<option value={bonus} key={bonus}>Item Level {i} / +{i-this.props.item.base_item_level}</option>);
        }

        wfOptions.push(<option value="0" key="0">Item Level {this.props.item.base_item_level} / None</option>);

        return(
            <div className="popup ui-dialog visible" id="bonuses" style={{top: "355px", left: "440px"}}>
                <h1>Item Bonuses</h1>
                <form id="bonuses">
                    <fieldset className="bonus_line">
                        <legend>Extra Sockets</legend>
                        <BonusIDCheckBox bonusId="1808" handleCheckbox={this.onChange} checked={this.state.active.indexOf(1808) != -1} />
                    </fieldset>

                    <fieldset className="bonus_line">
                        <legend>Titanforged Upgrades</legend>
                        <select className="optionSelect" value={selectedWFBonus} readOnly onChange={this.onWFChange}>
                            {wfOptions}
                        </select>
                    </fieldset>
                    <input className="ui-button ui-widget ui-state-default ui-corner-all applyBonuses" role="button" value="Apply" readOnly onClick={this.onApply}/>
                </form>
                <a href="#" className="close-popup ui-dialog-titlebar-close ui-corner-all" role="button">
                    <span className="ui-icon ui-icon-closethick"></span>
                </a>
            </div>
        );
    }
}
