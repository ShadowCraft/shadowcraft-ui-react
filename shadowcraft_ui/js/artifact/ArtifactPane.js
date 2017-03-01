import React from "react"
import RankingSection from '../SidebarRanking'
import * as layouts from './ArtifactLayouts'
import ArtifactFrame from './ArtifactFrame'

export default class ArtifactPane extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {
            rankings: {
                192657: 21135.69,
                192923: 19508.73,
                192428: 10685.3,
                214368: 6580.27,
                192759: 4743.23,
                192384: 3245.69,
                192329: 2748.73,
                192315: 2064.07,
                192349: 1742.83,
                214928: 1358.92,
                192326: 1329.21,
                192424: 764.37,
                192376: 749.16,
                192310: 725.06,
                192318: 374.58,
                192323: 0,
                192345: 0,
                192422: 0,
            }
        }

        this.clickResetButton = this.clickResetButton.bind(this)
    }

    clickResetButton(e) {
        // Reset all traits and relics to zero and push it upwards to the character pane to reset
        // the state there.
        var traits = {}
        var relics = []

        for (var i = 0; i < 3; i++) {
            relics.push({id:0, ilvl:0})
        }

        for (var trait in this.props.data.artifact.traits) {
            console.log(trait)
            traits[trait] = 0
        }

        this.props.onChange(traits, relics)
    }

    render() {
        var frame = null;
        var ranking_frame = null;
        console.log(this.props)

        if (this.props.data.active == 'a') {
            frame = <ArtifactFrame layout={layouts.kingslayers_layout} data={this.props.data} onChange={this.props.onChange}/>;
            ranking_frame = <RankingSection id="traitrankings" name="Trait Rankings" layout={layouts.kingslayers_ranking} values={this.state.rankings}/>
        }
        else if (this.props.data.active == 'Z') {
            frame = <ArtifactFrame layout={layouts.dreadblades_layout} data={this.props.data} onChange={this.props.onChange} />
            ranking_frame = <RankingSection id="traitrankings" name="Trait Rankings" layout={layouts.dreadblades_ranking} values={this.state.rankings}/>
        }
        else if (this.props.data.active == 'b') {
            frame = <ArtifactFrame layout={layouts.fangs_layout} data={this.props.data} onChange={this.props.onChange} />
            ranking_frame = <RankingSection id="traitrankings" name="Trait Rankings" layout={layouts.fangs_ranking} values={this.state.rankings}/>
        }

        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="artifact">
                <div className="panel-tools">
                    <div id="artifact_button_div">
                        <button id="reset_artifact" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" onClick={this.clickResetButton}><span className="ui-button-text">Reset Traits</span></button>
                    </div>
                    {ranking_frame}
                </div>

                {frame}
            </div>
        )
    }
}
