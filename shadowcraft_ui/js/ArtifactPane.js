import React from "react"
import RankingSection from './SidebarRanking'

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

function ArtifactTrait(props) {
    return (
        <svg id={props.id} data-tooltip-id={props.tooltip_id} data-tooltip-type="spell" className="trait tt" style={{left: props.left, top: props.top}} data-max-rank={props.max_rank} width="90" height="90">
            <clipPath id="iconclip">
                <circle r="22" cx="45" cy="45"/>
            </clipPath>
            <image className="relic" href={"/static/images/artifacts/relic-blood.png"} width="90" height="90"/>
            <image className="icon" href={"http://wow.zamimg.com/images/wow/icons/large/"+props.icon+".jpg"} clipPath="url(#iconclip)" x="22" y="22" height="46" width="46"/>
            <image href={"/static/images/artifacts/ring-"+props.ring+".png"} x="5" y="5"/>
            <text className="level">{props.cur_rank}/{props.max_rank}</text>
        </svg>
    )
}

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
                    <div id="artifactframe" style={{ backgroundImage: 'url(/static/images/artifacts/kingslayers-bg.jpg)' }}>
                        <ArtifactTrait id="ks_assassinsblades" tooltip_id="214368" left="47.917%" top="34.634%" max_rank="1" icon="ability_rogue_shadowstrikes" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_bagoftricks" tooltip_id="192657" left="8.472%" top="34.146%" max_rank="1" icon="rogue_paralytic_poison" ring="dragon" cur_rank="0" />
                        <ArtifactTrait id="ks_balancedblades" tooltip_id="192326" left="40.556%" top="54.472%" max_rank="3" icon="ability_rogue_restlessblades" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_embrace" tooltip_id="192323" left="16.944%" top="69.106%" max_rank="3" icon="spell_shadow_nethercloak" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_fadeintoshadows" tooltip_id="192923" left="8.472%" top="82.439%" max_rank="1" icon="inv_artifact_bloodoftheassassinated" ring="dragon" cur_rank="0" />
                        <ArtifactTrait id="ks_fromtheshadows" tooltip_id="192428" left="69.861%" top="24.553%" max_rank="1" icon="ability_rogue_deadlybrew" ring="dragon" cur_rank="0" />
                        <ArtifactTrait id="ks_gushingwound" tooltip_id="192329" left="0.694%" top="69.593%" max_rank="3" icon="ability_rogue_bloodsplatter" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_kingsbane" tooltip_id="192759" left="55.139%" top="27.642%" max_rank="1" icon="inv_knife_1h_artifactgarona_d_01" ring="thick" cur_rank="0" />
                        <ArtifactTrait id="ks_masteralchemist" tooltip_id="192318" left="2.917%" top="51.057%" max_rank="3" icon="trade_brewpoison" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_masterassassin" tooltip_id="192349" left="18.889%" top="51.707%" max_rank="3" icon="ability_rogue_deadliness" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_poisonknives" tooltip_id="192376" left="53.750%" top="56.260%" max_rank="3" icon="ability_rogue_dualweild" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_serratededge" tooltip_id="192315" left="70.417%" top="41.951%" max_rank="3" icon="ability_warrior_bloodbath" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_shadowswift" tooltip_id="192422" left="27.639%" top="57.561%" max_rank="1" icon="rogue_burstofspeed" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_shadowwalker" tooltip_id="192345" left="20.833%" top="40.000%" max_rank="3" icon="ability_rogue_sprint" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_slayersprecision" tooltip_id="214928" left="83.056%" top="19.350%" max_rank="20" icon="inv_knife_1h_artifactgarona_d_02dual" ring="dragon" cur_rank="0" />
                        <ArtifactTrait id="ks_surgeoftoxins" tooltip_id="192424" left="60.556%" top="47.805%" max_rank="1" icon="ability_rogue_deviouspoisons" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_toxicblades" tooltip_id="192310" left="39.444%" top="38.374%" max_rank="3" icon="ability_rogue_disembowel" ring="thin" cur_rank="0" />
                        <ArtifactTrait id="ks_urgetokill" tooltip_id="192384" left="30.278%" top="40.976%" max_rank="1" icon="ability_rogue_improvedrecuperate" ring="thin" cur_rank="0" />
                
                        <div className="line" data-spell1="192310" data-spell2="192384" style={{ width: 68, left: '36.389%', top: '46.504%', transform: 'rotate(166.373deg)' }}></div>
                        <div className="line" data-spell1="192310" data-spell2="192326" style={{ width: 99, left: '39.444%', top: '53.171%', transform: 'rotate(85.38deg)' }}></div>
                        <div className="line" data-spell1="192310" data-spell2="214368" style={{ width: 65, left: '45.417%', top: '43.252%', transform: 'rotate(-20.659deg)' }}></div>
                        <div className="line" data-spell1="192315" data-spell2="192428" style={{ width: 107, left: '69.028%', top: '40%    ', transform: 'rotate(-92.141deg)' }}></div>
                        <div className="line" data-spell1="192315" data-spell2="192424" style={{ width: 80, left: '66.111%', top: '51.707%', transform: 'rotate(153.113deg)' }}></div>
                        <div className="line" data-spell1="192318" data-spell2="192657" style={{ width: 111, left: '4.306%', top: '49.431%', transform: 'rotate(-68.962deg)' }}></div>
                        <div className="line" data-spell1="192318" data-spell2="192349" style={{ width: 115, left: '9.167%', top: '58.211%', transform: 'rotate(1.992deg)' }}></div>
                        <div className="line" data-spell1="192318" data-spell2="192329" style={{ width: 115, left: '0.139%', top: '67.154%', transform: 'rotate(97.989deg)' }}></div>
                        <div className="line" data-spell1="192323" data-spell2="192923" style={{ width: 102, left: '11.806%', top: '82.602%', transform: 'rotate(126.646deg)' }}></div>
                        <div className="line inactive" data-spell1="192323" data-spell2="192422" style={{ width: 105, left: '21.25%', top: '70.081%', transform: 'rotate(-42.678deg)' }}></div>
                        <div className="line inactive" data-spell1="192326" data-spell2="192422" style={{ width: 95, left: '33.75%', top: '62.764%', transform: 'rotate(168.453deg) ' }}></div>
                        <div className="line" data-spell1="192326" data-spell2="192376" style={{ width: 96, left: '46.667%', top: '62.114%', transform: 'rotate(6.605deg)' }}></div>
                        <div className="line" data-spell1="192329" data-spell2="192349" style={{ width: 171, left: '4.167%', top: '67.48%', transform: 'rotate(-40.02deg)' }}></div>
                        <div className="line" data-spell1="192329" data-spell2="192923" style={{ width: 97, left: '4.167%', top: '82.764%', transform: 'rotate(54.669deg)' }}></div>
                        <div className="line" data-spell1="192345" data-spell2="192657" style={{ width: 96, left: '14.167%', top: '43.902%', transform: 'rotate(-157.977deg)' }} ></div>
                        <div className="line" data-spell1="192345" data-spell2="192384" style={{ width: 68, left: '27.083%', top: '47.317%', transform: 'rotate(5.042deg)' }}></div>
                        <div className="line" data-spell1="192349" data-spell2="192422" style={{ width: 73, left: '24.444%', top: '61.463%', transform: 'rotate(29.745deg)' }}></div>
                        <div className="line" data-spell1="192349" data-spell2="192384" style={{ width: 105, left: '23.611%', top: '53.171%', transform: 'rotate(-38.83deg)' }}></div>
                        <div className="line" data-spell1="192376" data-spell2="192424" style={{ width: 71, left: '58.472%', top: '58.862%', transform: 'rotate(-46.701deg)' }}></div>
                        <div className="line" data-spell1="192376" data-spell2="214368" style={{ width: 139, left: '47.5%', top: '52.195%', transform: 'rotate(-107.526deg)' }} ></div>
                        <div className="line" data-spell1="192759" data-spell2="214368" style={{ width: 67, left: '53.194%', top: '37.886%', transform: 'rotate(140.412deg)' }}></div>
                    </div>
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
