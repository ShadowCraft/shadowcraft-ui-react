import React from "react"
import RankingSection from '../SidebarRanking'
import * as layouts from './ArtifactLayouts'
import ArtifactFrame from './ArtifactFrame'

export default class ArtifactPane extends React.Component {

    constructor(props)
    {
        super(props)
        console.log(this.props.data)

        this.state = {
            rankings: {}
        }

        this.state.rankings = {
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

    handleChange(artifact){
        // handleChange means nothing special, this is just calling the onChange we were handed
        // not strictly neccesary, you could just modify the artifact data,
        // and then just call onChange with the data directly when you want to update
        console.log('ArtifactPane.handleChange called')
        this.props.onChange(artifact);
    }

    render() {
        var ranking_layout = null
        var frame = null;

        if (this.props.data.spec == 'a') {
            frame = <ArtifactFrame layout={layouts.kingslayers_layout} data={this.props.data.artifact}/>;
            ranking_layout = layouts.kingslayers_ranking
        }
        else if (this.props.data.spec == 'Z') {
            frame = <ArtifactFrame layout={layouts.dreadblades_layout} data={this.props.data.artifact} />
            ranking_layout = layouts.dreadblades_ranking
        }
        else if (this.props.data.spec == 'b') {
            frame = <ArtifactFrame layout={layouts.fangs_layout} data={this.props.data.artifact} />
            ranking_layout = layouts.fangs_ranking
        }

        // actually call handleChange to set state in CharacterPane
        this.handleChange();

        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="artifact">
                <div className="panel-tools">
                    <div id="artifact_button_div">
                        <button id="reset_artifact" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"><span className="ui-button-text">Reset Traits</span></button>
                    </div>
                    <RankingSection id="traitrankings" name="Trait Rankings" layout={ranking_layout} values={this.state.rankings}/>
                </div>

                {frame}
            </div>
        )
    }
}
