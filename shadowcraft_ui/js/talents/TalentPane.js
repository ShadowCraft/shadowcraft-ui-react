import React from 'react';
import { connect } from 'react-redux';

import RankingSection from '../SidebarRanking';
import TalentFrame from './TalentFrame';
import * as layouts from './TalentLayouts';
import store from '../store';
import { updateCharacterState } from '../store';

function TalentSetButton(props) {
    return (
        <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec={props.spec} data-talents={props.talents} role="button" onClick={props.handler}>
            <span className="ui-button-text">{props.name}</span>
        </button>
    );
}

class TalentPane extends React.Component {
    
    constructor(props) {
        super(props);
        this.clickButton = this.clickButton.bind(this);
    }

    clickButton(e) {
        e.preventDefault();
        store.dispatch(updateCharacterState('UPDATE_TALENTS', e.currentTarget.dataset['talents']));
        store.dispatch(updateCharacterState('UPDATE_SPEC', e.currentTarget.dataset['spec']));
    }

    render() {
        var frame = null;
        var ranking_frame = null;

        if (this.props.active == 'a') {
            frame = <TalentFrame layout={layouts.assassination_layout} />;
            ranking_frame = <RankingSection id="talentrankings" name="Talent Rankings" layout={layouts.assassination_ranking} values={this.props.rankings}/>;
        }
        else if (this.props.active == 'Z') {
            frame = <TalentFrame layout={layouts.outlaw_layout} />;
            ranking_frame = <RankingSection id="talentrankings" name="Talent Rankings" layout={layouts.outlaw_ranking} values={this.props.rankings}/>;
        }
        else if (this.props.active == 'b') {
            frame = <TalentFrame layout={layouts.subtlety_layout} />;
            ranking_frame = <RankingSection id="talentrankings" name="Talent Rankings" layout={layouts.subtlety_ranking} values={this.props.rankings}/>;
        }

        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="talents">
                <div className="panel-tools">
                    <section>
                        <h3>Talent Sets</h3>
                        <div className="inner" id="talentsets">
                            <TalentSetButton spec="a" talents={this.props.talents['a']} name="Imported Assassination" handler={this.clickButton} />
                            <TalentSetButton spec="Z" talents={this.props.talents['Z']} name="Imported Outlaw" handler={this.clickButton} />
                            <TalentSetButton spec="b" talents={this.props.talents['b']} name="Imported Subtlety" handler={this.clickButton} />
                            <TalentSetButton spec="a" talents="2211021" name="Stock Assassination" handler={this.clickButton} />
                            <TalentSetButton spec="Z" talents="2211011" name="Stock Outlaw" handler={this.clickButton} />
                            <TalentSetButton spec="b" talents="1210011" name="Stock Subtlety" handler={this.clickButton} />
                        </div>
                    </section>
                    {ranking_frame}
                </div>
                {frame}
            </div>
        );
    }
}

const mapStateToProps = function(store) {
    return {
        rankings: store.engine.talentRanking,
        active: store.character.active,
        talents: store.character.talents,
    };
};

export default connect(mapStateToProps)(TalentPane);
