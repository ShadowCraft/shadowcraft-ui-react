import React from "react"
import RankingSection from './SidebarRanking'
import ArtifactFrame from './ArtifactFrame'

const rankings = {
    id: 'traitrankings',
    name: 'Trait Rankings',
    sections: [
        {
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

const kingslayer_layout = {
    artifact: 'kingslayers',
    traits: {
        "ks_assassinsblades": {
            id: 214368,
            x: 375,
            y: 243,
            icon: "ability_rogue_shadowstrikes",
            ring: "thin",
            max_rank: 1
        },
        "ks_bagoftricks": {
            id: 192657,
            x: 106,
            y: 255,
            icon: "rogue_paralytic_poison",
            ring: "dragon",
            max_rank: 1
        },
        "ks_balancedblades": {
            id: 192326,
            x: 322,
            y: 365,
            icon: "ability_rogue_restlessblades",
            ring: "thin",
            max_rank: 3
        },
        "ks_embrace": {
            id: 192323,
            x: 152,
            y: 455,
            icon: "spell_shadow_nethercloak",
            ring: "thin",
            max_rank: 3
        },
        "ks_fadeintoshadows": {
            id: 192923,
            x: 106,
            y: 552,
            icon: "inv_artifact_bloodoftheassassinated",
            ring: "dragon",
            max_rank: 1
        },
        "ks_fromtheshadows": {
            id: 192428,
            x: 548,
            y: 196,
            icon: "ability_rogue_deadlybrew",
            ring: "dragon",
            max_rank: 1
        },
        "ks_gushingwound": {
            id: 192329,
            x: 35,
            y: 458,
            icon: "ability_rogue_bloodsplatter",
            ring: "thin",
            max_rank: 3
        },
        "ks_kingsbane": {
            id: 192759,
            x: 442,
            y: 215,
            icon: "inv_knife_1h_artifactgarona_d_01",
            ring: "thick",
            max_rank: 1
        },
        "ks_masteralchemist": {
            id: 192318,
            x: 51,
            y: 344,
            icon: "trade_brewpoison",
            ring: "thin",
            max_rank: 3
        },
        "ks_masterassassin": {
            id: 192349,
            x: 166,
            y: 348,
            icon: "ability_rogue_deadliness",
            ring: "thin",
            max_rank: 3
        },
        "ks_poisonknives": {
            id: 192376,
            x: 417,
            y: 376,
            icon: "ability_rogue_dualweild",
            ring: "thin",
            max_rank: 3
        },
        "ks_serratededge": {
            id: 192315,
            x: 537,
            y: 288,
            icon: "ability_warrior_bloodbath",
            ring: "thin",
            max_rank: 3
        },
        "ks_shadowswift": {
            id: 192422,
            x: 229,
            y: 384,
            icon: "rogue_burstofspeed",
            ring: "thin",
            max_rank: 1
        },
        "ks_shadowwalker": {
            id: 192345,
            x: 180,
            y: 276,
            icon: "ability_rogue_sprint",
            ring: "thin",
            max_rank: 3
        },
        "ks_slayersprecision": {
            id: 214928,
            x: 643,
            y: 164,
            icon: "inv_knife_1h_artifactgarona_d_02dual",
            ring: "dragon",
            max_rank: 20
        },
        "ks_surgeoftoxins": {
            id: 192424,
            x: 466,
            y: 324,
            icon: "ability_rogue_deviouspoisons",
            ring: "thin",
            max_rank: 1
        },
        "ks_toxicblades": {
            id: 192310,
            x: 314,
            y: 266,
            icon: "ability_rogue_disembowel",
            ring: "thin",
            max_rank: 3
        },
        "ks_urgetokill": {
            id: 192384,
            x: 248,
            y: 282,
            icon: "ability_rogue_improvedrecuperate",
            ring: "thin",
            max_rank: 1
        },
    },
    lines: [
        {
            trait1: "ks_toxicblades",
            trait2: "ks_urgetokill"
        },
        {
            trait1: "ks_toxicblades",
            trait2: "ks_balancedblades"
        },
        {
            trait1: "ks_toxicblades",
            trait2: "ks_assassinsblades"
        },
        {
            trait1: "ks_serratededge",
            trait2: "ks_fromtheshadows"
        },
        {
            trait1: "ks_serratededge",
            trait2: "ks_surgeoftoxins"
        },
        {
            trait1: "ks_masteralchemist",
            trait2: "ks_bagoftricks"
        },
        {
            trait1: "ks_masteralchemist",
            trait2: "ks_masterassassin"
        },
        {
            trait1: "ks_masteralchemist",
            trait2: "ks_gushingwound"
        },
        {
            trait1: "ks_embrace",
            trait2: "ks_fadeintoshadows"
        },
        {
            trait1: "ks_embrace",
            trait2: "ks_shadowswift"
        },
        {
            trait1: "ks_balancedblades",
            trait2: "ks_shadowswift"
        },
        {
            trait1: "ks_balancedblades",
            trait2: "ks_poisonknives"
        },
        {
            trait1: "ks_gushingwound",
            trait2: "ks_masterassassin"
        },
        {
            trait1: "ks_gushingwound",
            trait2: "ks_fadeintoshadows"
        },
        {
            trait1: "ks_shadowwalker",
            trait2: "ks_bagoftricks"
        },
        {
            trait1: "ks_shadowwalker",
            trait2: "ks_urgetokill"
        },
        {
            trait1: "ks_masterassassin",
            trait2: "ks_shadowswift"
        },
        {
            trait1: "ks_masterassassin",
            trait2: "ks_urgetokill"
        },
        {
            trait1: "ks_poisonknives",
            trait2: "ks_surgeoftoxins"
        },
        {
            trait1: "ks_poisonknives",
            trait2: "ks_assassinsblades"
        },
        {
            trait1: "ks_kingsbane",
            trait2: "ks_assassinsblades"
        },
    ]
}

var kingslayer_frame = <ArtifactFrame layout={kingslayer_layout}/>

export default class ArtifactPane extends React.Component {
    render() {
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="artifact">
                <div className="panel-tools">
                    <div id="artifact_button_div">
                        <button id="reset_artifact" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"><span className="ui-button-text">Reset Traits</span></button>
                    </div>
                    <RankingSection data={rankings} />
                </div>
                <div className="panel-content">
                    <div id="artifactactive">
                        <span className="spec-icon" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/medium/inv_knife_1h_artifactgarona_d_01.jpg)' }}></span>
                        <span className="spec-name">The Kingslayers</span>
                        <span className="power-spent" style={{ float: 'right' }}>Trait Points Spent: 27</span>
                    </div>
                    <div className="inner"></div>
                    {kingslayer_frame}
                    <div className="alternatives popup ui-dialog" id="artifactpopup">
                        <div id="filter">
                            <input className="search" placeholder="Filter..." type="search" />
                        </div>
                        <div className="body"></div>
                    </div>
                </div>
            </div>
        )
    }
}
