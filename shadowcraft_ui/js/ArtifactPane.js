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
                        <div className="relicframe tt" id="relic1" style={{ left: 'calc(50% - 130px)', backgroundImage: 'url(/static/images/artifacts/relic-shadow.png)' }} relic-type="Shadow">
                            <img className="relicicon inactive" /> </div> <select className="relicilvl" id="relic1_ilvls" style={{ left: 'calc(50% - 120px)' }}></select>
                        <div className="relicframe tt" id="relic2" style={{ left: 'calc(50% - 40px)', backgroundImage: 'url(/static/images/artifacts/relic-iron.png)' }} relic-type="Iron">
                            <img className="relicicon inactive" /> </div> <select className="relicilvl" id="relic2_ilvls" style={{ left: 'calc(50% - 30px)' }}></select>
                        <div className="relicframe tt" id="relic3" style={{ left: 'calc(50% + 50px)', backgroundImage: 'url(/static/images/artifacts/relic-blood.png)' }} relic-type="Blood">
                            <img className="relicicon inactive" /> </div> <select className="relicilvl" id="relic3_ilvls" style={{ left: 'calc(50% + 60px)' }}></select>
                        <div className="trait tt" data-tooltip-id="214368" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_assassinsblades" max_level="1" style={{ left: '47.917%', top: '34.634%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_shadowstrikes" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_shadowstrikes.jpg" /> <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">1/1</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192657" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_bagoftricks" max_level="1" style={{ left: '8.472%', top: '34.146%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="rogue_paralytic_poison" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/rogue_paralytic_poison.jpg" />
                            <img alt="Ring-dragon" className="ring" src="/static/images/artifacts/ring-dragon.png" />
                            <div className="level">1/1</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192326" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_balancedblades" max_level="3" style={{ left: '40.556%', top: '54.472%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_restlessblades" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_restlessblades.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">2/3</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192323" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_embrace" max_level="3" style={{ left: '16.944%', top: '69.106%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="spell_shadow_nethercloak" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/spell_shadow_nethercloak.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">0/3</div>

                        </div>
                        <div className="trait tt" data-tooltip-id="192923" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_fadeintoshadows" max_level="1" style={{ left: '8.472%', top: '82.439%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="inv_artifact_bloodoftheassassinated" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/inv_artifact_bloodoftheassassinated.jpg" />
                            <img alt="Ring-dragon" className="ring" src="/static/images/artifacts/ring-dragon.png" />
                            <div className="level">1/1</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192428" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_fromtheshadows" max_level="1" style={{ left: '69.861%', top: '24.553%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_deadlybrew" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_deadlybrew.jpg" />
                            <img alt="Ring-dragon" className="ring" src="/static/images/artifacts/ring-dragon.png" />
                            <div className="level">1/1</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192329" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_gushingwound" max_level="3" style={{ left: '0.694%', top: '69.593%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_bloodsplatter" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_bloodsplatter.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">4/4</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192759" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_kingsbane" max_level="1" style={{ left: '55.139%', top: '27.642%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="inv_knife_1h_artifactgarona_d_01" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/inv_knife_1h_artifactgarona_d_01.jpg" />
                            <img alt="Ring-thick" className="ring" src="/static/images/artifacts/ring-thick.png" />
                            <div className="level">1/1</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192318" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_masteralchemist" max_level="3" style={{ left: '2.917%', top: '51.057%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="trade_brewpoison" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/trade_brewpoison.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">3/3</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192349" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_masterassassin" max_level="3" style={{ left: '18.889%', top: '51.707%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_deadliness" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_deadliness.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">3/3</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192376" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_poisonknives" max_level="3" style={{ left: '53.75%', top: '56.26%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_dualweild" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_dualweild.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">3/3</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192315" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_serratededge" max_level="3" style={{ left: '70.417%', top: '41.951%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_warrior_bloodbath" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_warrior_bloodbath.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">5/5</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192422" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_shadowswift" max_level="1" style={{ left: '27.639%', top: '57.561%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="rogue_burstofspeed" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/rogue_burstofspeed.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">0/1</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192345" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_shadowwalker" max_level="3" style={{ left: '20.833%', top: '40%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_sprint" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_sprint.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">0/3</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="214928" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_slayersprecision" max_level="20" style={{ left: '83.056%', top: '19.35%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="inv_knife_1h_artifactgarona_d_02dual" className="icon inactive" src="http://wow.zamimg.com/images/wow/icons/large/inv_knife_1h_artifactgarona_d_02dual.jpg" />
                            <img alt="Ring-dragon" className="ring" src="/static/images/artifacts/ring-dragon.png" />
                            <div className="level inactive">0/20</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192424" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_surgeoftoxins" max_level="1" style={{ left: '60.556%', top: '47.805%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_deviouspoisons" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_deviouspoisons.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">1/1</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192310" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_toxicblades" max_level="3" style={{ left: '39.444%', top: '38.374%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_disembowel" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_disembowel.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">3/3</div>
                        </div>
                        <div className="trait tt" data-tooltip-id="192384" data-tooltip-rank="0" data-tooltip-type="spell" id="ks_urgetokill" max_level="1" style={{ left: '30.278%', top: '40.976%' }}>
                            <img alt="Relic-blood" className="relic inactive" src="/static/images/artifacts/relic-blood.png" />
                            <img alt="ability_rogue_improvedrecuperate" className="icon" src="http://wow.zamimg.com/images/wow/icons/large/ability_rogue_improvedrecuperate.jpg" />
                            <img alt="Ring-thin" className="ring ring-thin" src="/static/images/artifacts/ring-thin.png" />
                            <div className="level">1/1</div>
                        </div>
                        <div className="line" spell1="192310" spell2="192384" style={{ width: 68, left: '36.389%', top: '46.504%', transform: 'rotate(166.373deg)' }}></div>
                        <div className="line" spell1="192310" spell2="192326" style={{ width: 99, left: '39.444%', top: '53.171%', transform: 'rotate(85.38deg)' }}></div>
                        <div className="line" spell1="192310" spell2="214368" style={{ width: 65, left: '45.417%', top: '43.252%', transform: 'rotate(-20.659deg)' }}></div>
                        <div className="line" spell1="192315" spell2="192428" style={{ width: 107, left: '69.028%', top: '40%    ', transform: 'rotate(-92.141deg)' }}></div>
                        <div className="line" spell1="192315" spell2="192424" style={{ width: 80, left: '66.111%', top: '51.707%', transform: 'rotate(153.113deg)' }}></div>
                        <div className="line" spell1="192318" spell2="192657" style={{ width: 111, left: '4.306%', top: '49.431%', transform: 'rotate(-68.962deg)' }}></div>
                        <div className="line" spell1="192318" spell2="192349" style={{ width: 115, left: '9.167%', top: '58.211%', transform: 'rotate(1.992deg)' }}></div>
                        <div className="line" spell1="192318" spell2="192329" style={{ width: 115, left: '0.139%', top: '67.154%', transform: 'rotate(97.989deg)' }}></div>
                        <div className="line" spell1="192323" spell2="192923" style={{ width: 102, left: '11.806%', top: '82.602%', transform: 'rotate(126.646deg)' }}></div>
                        <div className="line inactive" spell1="192323" spell2="192422" style={{ width: 105, left: '21.25%', top: '70.081%', transform: 'rotate(-42.678deg)' }}></div>
                        <div className="line inactive" spell1="192326" spell2="192422" style={{ width: 95, left: '33.75%', top: '62.764%', transform: 'rotate(168.453deg) ' }}></div>
                        <div className="line" spell1="192326" spell2="192376" style={{ width: 96, left: '46.667%', top: '62.114%', transform: 'rotate(6.605deg)' }}></div>
                        <div className="line" spell1="192329" spell2="192349" style={{ width: 171, left: '4.167%', top: '67.48%', transform: 'rotate(-40.02deg)' }}></div>
                        <div className="line" spell1="192329" spell2="192923" style={{ width: 97, left: '4.167%', top: '82.764%', transform: 'rotate(54.669deg)' }}></div>
                        <div className="line" spell1="192345" spell2="192657" style={{ width: 96, left: '14.167%', top: '43.902%', transform: 'rotate(-157.977deg)' }} ></div>
                        <div className="line" spell1="192345" spell2="192384" style={{ width: 68, left: '27.083%', top: '47.317%', transform: 'rotate(5.042deg)' }}></div>
                        <div className="line" spell1="192349" spell2="192422" style={{ width: 73, left: '24.444%', top: '61.463%', transform: 'rotate(29.745deg)' }}></div>
                        <div className="line" spell1="192349" spell2="192384" style={{ width: 105, left: '23.611%', top: '53.171%', transform: 'rotate(-38.83deg)' }}></div>
                        <div className="line" spell1="192376" spell2="192424" style={{ width: 71, left: '58.472%', top: '58.862%', transform: 'rotate(-46.701deg)' }}></div>
                        <div className="line" spell1="192376" spell2="214368" style={{ width: 139, left: '47.5%', top: '52.195%', transform: 'rotate(-107.526deg)' }} ></div>
                        <div className="line" spell1="192759" spell2="214368" style={{ width: 67, left: '53.194%', top: '37.886%', transform: 'rotate(140.412deg)' }}></div>
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
