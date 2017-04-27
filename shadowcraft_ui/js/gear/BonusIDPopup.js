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
            active: props.item.bonuses
        };
        this.tertiaryIds = [40, 41, 42, 43];
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
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

    render() {

        let wfOptions = [];
        let selectedWFBonus = "";
        for (let i = 955; i >= this.props.baseIlvl; i -= 5) {
            if (i == this.props.baseIlvl) {
                wfOptions.push(<option value="">  Item Level {i} / None</option>)
            } else {
                let bonus = i - this.props.baseIlvl + 1472;
                if (this.state.active.indexOf(bonus) != -1) {
                    selectedWFBonus = bonus;
                }

                wfOptions.push(<option value={i - this.props.baseIlvl + 1472}>  Item Level {i} / +{i-this.props.baseIlvl}</option>);
            }
        }

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
                        <select className="optionSelect" name="" selected={selectedWFBonus} readOnly>
                            {wfOptions}
                        </select>
                    </fieldset>
                    <input className="ui-button ui-widget ui-state-default ui-corner-all applyBonuses" role="button" value="Apply" readOnly/>
                </form>
                <a href="#" className="close-popup ui-dialog-titlebar-close ui-corner-all" role="button">
                    <span className="ui-icon ui-icon-closethick"></span>
                </a>
            </div>
        );
    }
}
