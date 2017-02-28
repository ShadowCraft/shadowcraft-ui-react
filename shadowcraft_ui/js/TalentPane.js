import React from 'react';
import RankingSection from './SidebarRanking';
import TalentFrame from './TalentFrame';
import * as layouts from './TalentLayouts';

function TalentSetButton(props) {
    return (
        <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec={props.spec} data-talents={props.talents} role="button" onClick={props.handler}>
            <span className="ui-button-text">{props.name}</span>
        </button>
    );
}

export default class TalentPane extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            rankings: {
                16511: 22367.17,
                193640: 19529.94,
                196864: 14410.1,
                14062: 0,
                108208: 0,
                108209: 0,
                193531: 12215.65,
                14983: 7316.87,
                114015: 5557.31,
                108211: 0,
                31230: 0,
                79008: 0,
                131511: 0,
                196861: 0,
                154094: 0,
                200806: 42383.59,
                193539: 40205.04,
                200802: 29827.76,
                152152: 12107.6,
                152150: 9754.46,
                137619: 3313.58,
            }
        };

        this.clickButton = this.clickButton.bind(this);
        this.changeTalents = this.changeTalents.bind(this);
    }

    clickButton(e) {
        e.preventDefault();
        this.props.onChange(e.currentTarget.dataset['spec'],
                            e.currentTarget.dataset['talents']);
    }

    changeTalents(talents) {
        this.props.onChange(this.props.data.active, talents);
    }

    render() {
        var frame = null;
        var ranking_frame = null;

        if (this.props.data.active == 'a') {
            frame = <TalentFrame layout={layouts.assassination_layout} setup={this.props.data.current_talents} onChange={this.changeTalents} />;
            ranking_frame = <RankingSection id="talentrankings" name="Talent Rankings" layout={layouts.assassination_ranking} values={this.state.rankings}/>;
        }
        else if (this.props.data.active == 'Z') {
            frame = <TalentFrame layout={layouts.outlaw_layout} setup={this.props.data.current_talents} onChange={this.changeTalents} />;
            ranking_frame = <RankingSection id="talentrankings" name="Talent Rankings" layout={layouts.outlaw_ranking} values={this.state.rankings}/>;
        }
        else if (this.props.data.active == 'b') {
            frame = <TalentFrame layout={layouts.subtlety_layout} setup={this.props.data.current_talents} onChange={this.changeTalents} />;
            ranking_frame = <RankingSection id="talentrankings" name="Talent Rankings" layout={layouts.subtlety_ranking} values={this.state.rankings}/>;
        }

        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="talents">
                <div className="panel-tools">
                    <section>
                        <h3>Talent Sets</h3>
                        <div className="inner" id="talentsets">
                            <TalentSetButton spec="a" talents={this.props.data.talents['a']} name="Imported Assassination" handler={this.clickButton} />
                            <TalentSetButton spec="Z" talents={this.props.data.talents['Z']} name="Imported Outlaw" handler={this.clickButton} />
                            <TalentSetButton spec="b" talents={this.props.data.talents['b']} name="Imported Subtlety" handler={this.clickButton} />
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
