import React from 'react';

function Tertiary(props)
{
    var description;
    switch (props.bonusId.toString()) {
        case "1808":
            description = "1 Socket";
            break;
        case "40":
            description = "+" + props.value + " avoidance";
            break;
        case "41":
            description = "+" + props.value + " leech";
            break;
        case "42":
            description = "+" + props.value + " speed";
            break;
        case "43":
            description = "indestructible";
            break;
    }

    return (
        <div className="stat">
            <label className="label_check c_on">
                <input key={props.bonusId} id={"bonus-"+props.bonusId} data-bonusId={props.bonusId} type="checkbox" onChange={props.onChange} defaultChecked={props.checked} checked={props.checked} />{description}
            </label>
        </div>
    );
}

export default class BonusIDPopup extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            active: props.active
        };
        this.onChange = this.onChange.bind(this);
        this.tertiaryIds = [40, 41, 42, 43];
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

        var tertiaryInputs = [];
        for (var idx in this.tertiaryIds) {
            var bonusId = this.tertiaryIds[idx];
            tertiaryInputs.push(<Tertiary key={bonusId} bonusId={bonusId} onChange={this.onChange} checked={this.state.active.indexOf(bonusId) != -1} />);
        }

        return(
            <div className="popup ui-dialog visible" id="bonuses" style={{top: "355px", left: "440px"}}>
                <h1>Item Bonuses</h1>
                <form id="bonuses">
                    <fieldset className="bonus_line">
                        <legend>Extra Sockets</legend>
                        <Tertiary bonusId="1808" onChange={this.onChange} checked={this.state.active.indexOf(1808) != -1} />
                    </fieldset>
            
                    <fieldset className="bonus_line">
                        <legend>Tertiary Stats</legend>
                        {tertiaryInputs}
                    </fieldset>
                    
                    <fieldset className="bonus_line">
                        <legend>Titanforged Upgrades</legend>
                        <select className="optionSelect" name="" selected="" readOnly>
                            <option value="1537">  Item Level 955 / +65 Item Levels (Titanforged) /  (1168.06 EP) </option>
                            <option value="1532">  Item Level 950 / +60 Item Levels (Titanforged) /  (1053.69 EP) </option>
                            <option value="1527">  Item Level 945 / +55 Item Levels (Titanforged) /  (943.52 EP) </option>
                            <option value="1522">  Item Level 940 / +50 Item Levels (Titanforged) /  (838.60 EP) </option>
                            <option value="1517">  Item Level 935 / +45 Item Levels (Titanforged) /  (738.46 EP) </option>
                            <option value="1512">  Item Level 930 / +40 Item Levels (Titanforged) /  (641.66 EP) </option>
                            <option value="1507">  Item Level 925 / +35 Item Levels (Titanforged) /  (549.91 EP) </option>
                            <option value="1502">  Item Level 920 / +30 Item Levels (Titanforged) /  (461.31 EP) </option>
                            <option value="1497">  Item Level 915 / +25 Item Levels (Titanforged) /  (376.63 EP) </option>
                            <option value="1492">  Item Level 910 / +20 Item Levels (Titanforged) /  (295.10 EP) </option>
                            <option value="1487">  Item Level 905 / +15 Item Levels (Titanforged) /  (216.72 EP) </option>
                            <option value="1482">  Item Level 900 / +10 Item Levels (Warforged) /  (141.49 EP) </option>
                            <option value="1477">  Item Level 895 / +5 Item Levels (Warforged) /  (69.21 EP) </option>
                            <option value="">  Item Level 890 / None  /  (0.00 EP) </option>
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
