import React from "react"
import RankingSection from './SidebarRanking'
import TalentFrame from './TalentFrame'
import * as layouts from './TalentLayouts'

function TalentSetButton(props) {
    return (
        <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec={props.spec} data-talents={props.talents} role="button" onClick={props.handler}>
            <span className="ui-button-text">{props.name}</span>
        </button>
    )
}

export default class TalentPane extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            spec: this.props.data.active,
            setup: this.props.data.talents[this.props.data.active],
            rankings: {}
        }

        this.state.rankings = {
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

        this.clickButton = this.clickButton.bind(this)
    }

    set_spec(spec) {
        this.setState({spec: "a"})
    }

    clickButton(e) {
        e.preventDefault()
        console.log(e.currentTarget)
    }

    render() {
        var frame = null
        var ranking_layout = null

        if (this.state.spec == "a") {
            frame = <TalentFrame layout={layouts.assassination_layout} setup={this.state.setup} />;
            ranking_layout = layouts.assassination_ranking
        }
        else if (this.state.spec == "Z") {
            frame = <TalentFrame layout={layouts.outlaw_layout} setup={this.state.setup} />
            ranking_layout = layouts.outlaw_ranking
        }
        else if (this.state.spec == "b") {
            frame = <TalentFrame layout={layouts.subtlety_layout} setup={this.state.setup} />
            ranking_layout = layouts.subtlety_ranking
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
                    <RankingSection id="talentrankings" name="Talent Rankings" layout={ranking_layout} values={this.state.rankings}/>
                </div>
                {frame}
            </div>
        )
    }
}
