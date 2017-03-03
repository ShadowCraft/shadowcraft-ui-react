import React from 'react';
import { connect } from 'react-redux';
import store from './store';

function Talent(props) {
    return (
        <div className={'col-'+props.col+' row-'+props.row+' talent tt'+(props.active && ' active')} data-tooltip-id={props.id} data-tooltip-type="spell" data-row={props.row} data-col={props.col} style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/'+props.icon+'.jpg)' }} onClick={props.handleClick} >
            <div className="grey"></div>
        </div>
    );
}

class TalentFrame extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e)
    {
        var row = parseInt(e.currentTarget.dataset['row']);
        var col = parseInt(e.currentTarget.dataset['col']);
        var current = this.props.setup;
        var newSetup = current.substr(0, row) + col + current.substr(row+1);
        console.log(newSetup);
        
        store.dispatch({
            type: 'UPDATE_TALENTS',
            talents: newSetup
        })
    }

    render()
    {
        console.log(this.props.setup);
        var talents = [];
        for (var index in this.props.layout.talents) {
            var talent = this.props.layout.talents[index];
            var active = false;
            if (this.props.setup[talent.row] == talent.col) {
                active = true;
            }

            talents.push(<Talent key={talent.id} col={talent.col} row={talent.row} id={talent.id} icon={talent.icon} active={active} handleClick={this.handleClick}/>);
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
        );
    }
}

const mapStateToProps = function(store) {
    return {
        setup: store.characterState.talents.current
    };
};

export default connect(mapStateToProps)(TalentFrame);
