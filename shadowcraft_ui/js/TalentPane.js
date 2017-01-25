import React from "react"
import RankingSection from './SidebarRanking'

function Talent(props) {
    return (
        <div className={"col-"+props.col+" row-"+props.row+" talent tt"+(props.active && " active")} data-tooltip-id={props.id} data-tooltip-type="spell" style={{ backgroundImage: "url(http://wow.zamimg.com/images/wow/icons/large/"+props.icon+".jpg)" }}>
            <div className="grey"></div>
        </div>
    )
}

function TalentSetButton(props) {
    return (
        <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec="a" data-talents={props.talents} role="button" aria-disabled="false">
            <span className="ui-button-text">{props.name}</span>
        </button>
    )
}

// TODO: react-devtools is warning me that each element in these arrays needs to have a unique key that
// identifies it, so that it can more easily keep track of what changes.
const rankings = {
    id: 'talentrankings',
    name: 'Talent Rankings',
    sections: [
        {
            name: "Tier 15",
            className: "Tier15",
            items: [
                {
                    dataval: "100.01000065734401",
                    slug: "hemorrhage",
                    name: "Hemorrhage",
                    label: "22367.17",
                    pct: "100.01%"
                },
                {
                    dataval: "87.32520406193045",
                    slug: "elaborate_planning",
                    name: "Elaborate Planning",
                    label: "19529.94",
                    pct: "87.3252%"
                },
                {
                    dataval: "64.43522721794456",
                    slug: "master_poisoner",
                    name: "Master Poisoner",
                    label: "14410.1",
                    pct: "64.4352%"
                }
            ]
        },
        {
            name: "Tier 30",
            className: "Tier30",
            items: [
                {
                    dataval: "",
                    slug: "nightstalker",
                    name: "Nightstalker",
                    label:"0",
                    pct: "%"
                },
                {
                    dataval:"",
                    slug: "subterfuge",
                    name: "Subterfuge",
                    label: "0",
                    pct: "%"
                },
                {
                    dataval:"",
                    slug: "shadow_focus",
                    name: "Shadow Focus",
                    label: "0",
                    pct: "%"
                }
            ]
        },
        {
            name: "Tier 45",
            className: "Tier45",
            items: [
                {
                    dataval:"100.00998538243374",
                    slug: "deeper_strategem",
                    name: "Deeper Strategem",
                    label: "12215.65",
                    pct: "100.01%"
                },
                {
                    dataval:"59.907499768343705",
                    slug: "vigor",
                    name: "Vigor",
                    label: "7316.87",
                    pct: "59.9075%"
                },
                {
                    dataval:"45.50335637200254",
                    slug: "anticipation",
                    name: "Anticipation",
                    label: "5557.31",
                    pct: "45.5034%"
                }
            ]
        },
        {
            name: "Tier 60",
            className: "Tier60",
            items: [
                {
                    dataval:"",
                    slug: "leeching_poison",
                    name: "Leeching Poison",
                    label: "0",
                    pct: "%"
                },
                {
                    dataval:"",
                    slug: "cheat_death",
                    name: "Cheat Death",
                    label: "0",
                    pct: "%"
                },
                {
                    dataval:"",
                    slug: "elusiveness",
                    name: "Elusiveness",
                    label: "0",
                    pct: "%"
                }
            ]
        },
        {
            name: "Tier 75",
            className: "Tier75",
            items: [
                {
                    dataval:"",
                    slug: "prey_on_the_weak",
                    name: "Prey on the Weak",
                    label: "0",
                    pct: "%"
                },
                {
                    dataval:"",
                    slug: "thuggee",
                    name: "Thuggee",
                    label: "0",
                    pct: "%"
                },
                {
                    dataval:"",
                    slug: "internal_bleeding",
                    name: "Internal Bleeding",
                    label: "0",
                    pct: "%"
                }
            ]
        },
        {
            name: "Tier 90",
            className: "Tier90",
            items: [
                {
                    dataval:"100.00999394581173",
                    slug: "exsanguinate",
                    name: "Exsanguinate",
                    label: "42383.59",
                    pct: "100.01%"
                },
                {
                    dataval:"94.86991527832161",
                    slug: "alacrity",
                    name: "Alacrity",
                    label: "40205.04",
                    pct: "94.8699%"
                },
                {
                    dataval:"70.38572370384684",
                    slug: "agonizing_poison",
                    name: "Agonizing Poison",
                    label: "29827.76",
                    pct: "70.3857%"
                }
            ]
        },
        {
            name: "Tier 100",
            className: "Tier100",
            items: [
                {
                    dataval:"100.01003138892773",
                    slug: "venom_rush",
                    name: "Venom Rush",
                    label: "12107.6",
                    pct: "100.01%"
                },
                {
                    dataval:"80.57479452426904",
                    slug: "death_from_above",
                    name: "Death from Above",
                    label: "9754.46",
                    pct: "80.5748%"
                },
                {
                    dataval:"27.37777759504139",
                    slug: "marked_for_death",
                    name: "Marked for Death",
                    label: "3313.58",
                    pct: "27.3778%"
                }
            ]
        }
    ]
}

export default class TalentPane extends React.Component {
    render() {
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="talents">
                <div className="panel-tools">
                    <section>
                        <h3>Talent Sets</h3>
                        <div className="inner" id="talentsets">
                            <TalentSetButton talents="1002000" name="Imported Assassination" />
                            <TalentSetButton talents="1002111" name="Imported Outlaw" />
                            <TalentSetButton talents="0120221" name="Imported Subtlety" />
                            <TalentSetButton talents="2211021" name="Stock Assassination" />
                            <TalentSetButton talents="2211011" name="Stock Outlaw" />
                            <TalentSetButton talents="1210011" name="Stock Subtlety" />
                        </div>
                    </section>
                    <RankingSection data={rankings} />
                </div>
                <div className="panel-content">
                    <div id="specactive"><span className="spec-icon" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/medium/ability_rogue_eviscerate.jpg)' }}></span> <span className="spec-name">Assassination</span> </div>
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
                            <Talent col="0" row="0" id="196864" icon="ability_creature_poison_06" active/>
                            <Talent col="1" row="0" id="193640" icon="inv_misc_map08"/>
                            <Talent col="2" row="0" id="16511" icon="spell_shadow_lifedrain" active/>
                            <Talent col="0" row="1" id="14062" icon="ability_stealth"/>
                            <Talent col="1" row="1" id="108208" icon="rogue_subterfuge"/>
                            <Talent col="2" row="1" id="108209" icon="rogue_shadowfocus"/>
                            <Talent col="0" row="2" id="193531" icon="archaeology_5_0_changkiboard" active/>
                            <Talent col="1" row="2" id="114015" icon="ability_rogue_slaughterfromtheshadows"/>
                            <Talent col="2" row="2" id="14983" icon="ability_rogue_vigor"/>
                            <Talent col="0" row="3" id="108211" icon="rogue_leeching_poison"/>
                            <Talent col="1" row="3" id="79008" icon="ability_rogue_turnthetables"/>
                            <Talent col="2" row="3" id="31230" icon="ability_rogue_cheatdeath" active/>
                            <Talent col="0" row="4" id="196861" icon="inv_misc_bandana_03" active/>
                            <Talent col="1" row="4" id="131511" icon="ability_rogue_preyontheweak"/>
                            <Talent col="2" row="4" id="154904" icon="ability_rogue_bloodsplatter"/>
                            <Talent col="0" row="5" id="200802" icon="inv_poison_mindnumbing"active />
                            <Talent col="1" row="5" id="193539" icon="ability_paladin_speedoflight"/>
                            <Talent col="2" row="5" id="200806" icon="ability_deathwing_bloodcorruption_earth"/>
                            <Talent col="0" row="6" id="152152" icon="rogue_venomzest" active/>
                            <Talent col="1" row="6" id="137619" icon="achievement_bg_killingblow_berserker"/>
                            <Talent col="2" row="6" id="152150" icon="spell_rogue_deathfromabove"/>
                        </div>
                    </div>
                    <div>
                        <button id="reset_talents" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"><span className="ui-button-text">Reset Talents</span></button>
                    </div>
                </div>
            </div>
        )
    }
}
