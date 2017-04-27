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
        var description;
        switch (this.props.bonusId.toString()) {
            case "1808":
                description = "1 Socket";
                break;
            case "40":
                description = "+" + this.props.value + " avoidance";
                break;
            case "41":
                description = "+" + this.props.value + " leech";
                break;
            case "42":
                description = "+" + this.props.value + " speed";
                break;
            case "43":
                description = "indestructible";
                break;
        }

        console.log(this.props);
        return (
            <label className="label_check c_on">
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
        var bonusId = parseInt(e.currentTarget.dataset['bonusid']);
        // If the value was true, that means we're turning it off. Check to see if the
        // element is in the active list, and remove it.
        var newActive = this.state.active;
        if (e.currentTarget.value)
        {
            var index = this.state.active.indexOf(bonusId);
            if (index != -1) {
                newActive.splice(index, 1);
            }
        }
        else
        {
            var index = this.state.active.indexOf(bonusId);
            if (index == -1) {
                newActive.push(bonusId);
            }
        }
        this.setState({active: newActive});
    }

    render() {

        /* var tertiaryInputs = [];
         * for (var idx in this.tertiaryIds) {
         *     var bonusId = this.tertiaryIds[idx];
         *     tertiaryInputs.push(<BonusIDCheckBox key={bonusId} bonusId={bonusId} handleCheckbox={this.onChange} checked={this.state.active.indexOf(bonusId) != -1} />);
         * }
         */
        var wfOptions = [];
        var selectedWFBonus = "";
        for (var i = 955; i >= this.props.baseIlvl; i -= 5) {
            if (i == this.props.baseIlvl) {
                wfOptions.push(<option value="">  Item Level {i} / None</option>)
            } else {
                var bonus = i - this.props.baseIlvl + 1472;
                if (this.state.active.indexOf(bonus) != -1) {
                    selectedWFBonus = bonus;
                }

                wfOptions.push(<option value={i - this.props.baseIlvl + 1472}>  Item Level {i} / +{i-this.props.baseIlvl}</option>);
            }
        }

        console.log(this.state.active);
        return(
            <div className="popup ui-dialog visible" id="bonuses" style={{top: "355px", left: "440px"}}>
                <h1>Item Bonuses</h1>
                <form id="bonuses">
                    <fieldset className="bonus_line">
                        <legend>Extra Sockets</legend>
                        <BonusIDCheckBox bonusId="1808" handleCheckbox={this.onChange} checked={this.state.active.indexOf(1808) != -1} />
                    </fieldset>

                    <fieldset className="bonus_line">
                        <legend>Tertiary Stats</legend>
                        {/*tertiaryInputs*/}
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
