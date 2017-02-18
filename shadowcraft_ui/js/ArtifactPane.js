import React from "react"
import RankingSection from './SidebarRanking'
import * as layouts from './ArtifactLayouts'
import ArtifactFrame from './ArtifactFrame'

const rankings = {
    id: 'traitrankings',
    name: 'Trait Rankings',
    sections: [
        {
            index: 0,
            items: [
                {
                    slug: "192657",
                    name: "Bag of Tricks",
                    label: "21135.69",
                    pct: "100.01%"
                },
                {
                    slug: "192923",
                    name: "Blood of the Assassinated",
                    label: "19508.73",
                    pct: "92.3123%"
                },
                {
                    slug: "192428",
                    name: "From the Shadows",
                    label: "10685.3",
                    pct: "50.5657%"
                },
                {
                    slug: "214368",
                    name: "Assassin's Blades",
                    label: "6580.27",
                    pct: "31.1435%"
                },
                {
                    slug: "192759",
                    name: "Kingsbane",
                    label: "4743.23",
                    pct: "22.4518%"
                },
                {
                    slug: "192384",
                    name: "Urge to Kill",
                    label: "3245.69",
                    pct: "15.3664%"
                },
                {
                    slug: "192329",
                    name: "Gushing Wound",
                    label: "2748.73",
                    pct: '13.0152%'
                },
                {
                    slug: "192315",
                    name: "Serrated Edge",
                    label: "2064.07",
                    pct: '9.7758%'
                },
                {
                    slug: "192349",
                    name: "Master Assassin",
                    label: "1742.83",
                    pct: '8.25591%'
                },
                {
                    slug: "214928",
                    name: "Slayer's Precision",
                    label: "1358.92",
                    pct: '6.4395%'
                },
                {
                    slug: "192326",
                    name: "Balanced Blades",
                    label: "1329.21",
                    pct: '6.29894%'
                },
                {
                    slug: "192424",
                    name: "Surge of Toxins",
                    label: "764.37",
                    pct: '3.62649%'
                },
                {
                    slug: "192376",
                    name: "Poison Knives",
                    label: "749.16",
                    pct: '3.55453%'
                },
                {
                    slug: "192310",
                    name: "Toxic Blades",
                    label: "725.06",
                    pct: '3.4405%'
                },
                {
                    slug: "192318",
                    name: "Master Alchemist",
                    label: "374.58",
                    pct: '1.78226%'
                },
                {
                    slug: "192323",
                    name: "Fade into Shadows",
                    label: "0",
                    pct: '0.01%'
                },
                {
                    slug: "192345",
                    name: "Shadow Walker",
                    label: "0",
                    pct: '0.01%'
                },
                {
                    slug: "192422",
                    name: "Shadow Swiftness",
                    label: "0",
                    pct: '0.01%'
                }
            ]
        }
    ]
}

export default class ArtifactPane extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.state = {}
        this.state.spec = 'a'
        this.frame = null
    }

    set_spec(spec){
        this.setState({spec: spec})
    }
    
    render() {
        if (this.state.spec == 'a') {
            this.frame = <ArtifactFrame layout={layouts.kingslayer_layout} />;
        }
        else if (this.state.spec == 'Z') {
            this.frame = <ArtifactFrame layout={layouts.outlaw_layout} />
        }
        else if (this.state.spec == 'b') {
            this.frame = <ArtifactFrame layout={layouts.outlaw_layout} />
        }
        
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="artifact">
                <div className="panel-tools">
                    <div id="artifact_button_div">
                        <button id="reset_artifact" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"><span className="ui-button-text">Reset Traits</span></button>
                    </div>
                    <RankingSection data={rankings} />
                </div>

                {this.frame}
            </div>
        )
    }
}
