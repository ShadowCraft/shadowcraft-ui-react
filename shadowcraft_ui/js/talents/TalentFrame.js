import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../store';
import { updateCharacterState } from '../store';

function Talent(props) {
    return (
        <div className={`col-${props.col} row-${props.row} talent ${props.active ? 'active' : ''}`} data-row={props.row} data-col={props.col} style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/'+props.icon+'.jpg)' }} onClick={props.handleClick} data-tooltip-href={`http://wowdb.com/spells/${props.id}`} >
            <div className="grey" />
        </div>
    );
}

Talent.propTypes = {
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
};

class TalentFrame extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.resetTalents = this.resetTalents.bind(this);
    }

    handleClick(e)
    {
        var row = parseInt(e.currentTarget.dataset['row']);
        var col = parseInt(e.currentTarget.dataset['col'])+1;
        var current = this.props.currentTalents;
        var newSetup = current.substr(0, row) + col + current.substr(row+1);
        
        store.dispatch(updateCharacterState('UPDATE_TALENTS', newSetup));
    }

    resetTalents()
    {
        store.dispatch(updateCharacterState('UPDATE_TALENTS', '0000000'));
    }

    render()
    {
        var talents = [];
        for (var index in this.props.layout.talents) {
            var talent = this.props.layout.talents[index];
            var active = false;
            if (this.props.currentTalents[talent.row] == talent.col || this.props.currentTalents[talent.row] == 0) {
                active = true;
            }

            talents.push(<Talent key={talent.id} col={talent.col-1} row={talent.row} id={talent.id} icon={talent.icon} active={active} handleClick={this.handleClick}/>);
        }
        
        return(
            <div className="panel-content">
                <div id="specactive">
                    <span className="spec-icon" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/medium/'+this.props.layout.icon+'.jpg)' }} /><span className="spec-name">{this.props.layout.name}</span>
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
                    <button id="reset_talents" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" onClick={this.resetTalents}><span className="ui-button-text">Reset Talents</span></button>
                </div>
            </div>
        );
    }
}

TalentFrame.propTypes = {
    currentTalents: PropTypes.string.isRequired,
    layout: PropTypes.shape({
        icon: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        talents: PropTypes.arrayOf(PropTypes.shape({
            col: PropTypes.number.isRequired,
            row: PropTypes.number.isRequired,
            icon: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
};

const mapStateToProps = function(store) {
    return {
        currentTalents: store.character.getIn(['talents','current'])
    };
};

export default connect(mapStateToProps)(TalentFrame);
