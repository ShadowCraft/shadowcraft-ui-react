import React from 'react'

function Talent(props) {
    return (
        <div className={"col-"+props.col+" row-"+props.row+" talent tt"+(props.active && " active")} data-tooltip-id={props.id} data-tooltip-type="spell" style={{ backgroundImage: "url(http://wow.zamimg.com/images/wow/icons/large/"+props.icon+".jpg)" }}>
            <div className="grey"></div>
        </div>
    )
}

export default class TalentFrame extends React.Component {
    constructor(props)
    {
        super(props)

        this.state = {}
        this.state.setup = this.props.setup
    }

    handleClick(e)
    {
        
    }

    render()
    {
        var talents = []
        for (var index in this.props.layout.talents) {
            var talent = this.props.layout.talents[index]
            var active = false
            if (this.state.setup[talent.row] == talent.col) {
                active = true
            }

            talents.push(<Talent key={talent.id} col={talent.col} row={talent.row} id={talent.id} icon={talent.icon} active={active}/>)
        }
        
        return(
            <div className="panel-content">
                <div id="specactive">
                    <span className="spec-icon" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/medium/'+this.props.layout.icon+'.jpg)' }}></span><span className="spec-name">{this.props.layout.name}</span>
                </div>
                <div id="talentframe">
                    <div className="tiers">
                        <div className="level row-level-0">15</div>
                        <div className="level row-level-1">30</div>
                        <div className="level row-level-2">45</div>
                        <div className="level row-level-3">60</div>
                        <div className="level row-level-4">75</div>
                        <div className="level row-level-5">90</div>
                        <div className="level row-level-6">100</div>
                    </div>
                    <div className="tree">
                        {talents}
                    </div>
                </div>
                <div>
                    <button id="reset_talents" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"><span className="ui-button-text">Reset Talents</span></button>
                </div>
            </div>
        )
    }
}
