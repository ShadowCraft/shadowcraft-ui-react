import React from "react"

export default class TalentPane extends React.Component {
    render() {
        return (
            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="talents">
                <div className="panel-tools">
                    <section>
                        <h3>Talent Sets</h3>
                        <div className="inner" id="talentsets">
                            <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec="a" data-talents="1002000" role="button" aria-disabled="false">
                                <span className="ui-button-text">Imported Assassination</span>
                            </button>
                            <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec="Z" data-talents="1002111" role="button" aria-disabled="false">
                                <span className="ui-button-text">Imported Outlaw</span>
                            </button>
                            <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec="b" data-talents="0120221" role="button" aria-disabled="false">
                                <span className="ui-button-text">Imported Subtlety</span>
                            </button>
                            <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec="a" data-talents="2211021" role="button" aria-disabled="false">
                                <span className="ui-button-text">Stock Assassination</span>
                            </button>
                            <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec="Z" data-talents="2211011" role="button" aria-disabled="false">
                                <span className="ui-button-text">Stock Outlaw</span>
                            </button>
                            <button className="talent_set ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" data-spec="b" data-talents="1210011" role="button" aria-disabled="false">
                                <span className="ui-button-text">Stock Subtlety</span>
                            </button>
                        </div>
                    </section>
                    <section id="talentrankings">
                        <h3>Talent Rankings</h3>
                        <div className="inner">
                            <h3>Tier 15</h3>
                            <div className="Tier15">
                                <div className="talent_contribution" data-val="100.01000065734401" id="talent-weight-hemorrhage">
                                    <div className="name">Hemorrhage</div>
                                    <div className="pct">
                                        <div className="label">22367.17</div>
                                        <div className="pct-inner" style={{ width: '100.01%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="87.32520406193045" id="talent-weight-elaborate_planning">
                                    <div className="name">Elaborate Planning</div>
                                    <div className="pct">
                                        <div className="label">19529.94</div>
                                        <div className="pct-inner" style={{ width: '87.3252%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="64.43522721794456" id="talent-weight-master_poisoner">
                                    <div className="name">Master Poisoner</div>
                                    <div className="pct">
                                        <div className="label">14410.1</div>
                                        <div className="pct-inner" style={{ width: '64.4352%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <h3>Tier 30</h3>
                            <div className="Tier30">
                                <div className="talent_contribution" data-val="" id="talent-weight-nightstalker">
                                    <div className="name">Nightstalker</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="" id="talent-weight-subterfuge">
                                    <div className="name">Subterfuge</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="" id="talent-weight-shadow_focus">
                                    <div className="name">Shadow Focus</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <h3>Tier 45</h3>
                            <div className="Tier45">
                                <div className="talent_contribution" data-val="100.00998538243374" id="talent-weight-deeper_strategem">
                                    <div className="name">Deeper Strategem</div>
                                    <div className="pct">
                                        <div className="label">12215.65</div>
                                        <div className="pct-inner" style={{ width: '100.01%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="59.907499768343705" id="talent-weight-vigor">
                                    <div className="name">Vigor</div>
                                    <div className="pct">
                                        <div className="label">7316.87</div>
                                        <div className="pct-inner" style={{ width: '59.9075%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="45.50335637200254" id="talent-weight-anticipation">
                                    <div className="name">Anticipation</div>
                                    <div className="pct">
                                        <div className="label">5557.31</div>
                                        <div className="pct-inner" style={{ width: '45.5034%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <h3>Tier 60</h3>
                            <div className="Tier60">
                                <div className="talent_contribution" data-val="" id="talent-weight-leeching_poison">
                                    <div className="name">Leeching Poison</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="" id="talent-weight-cheat_death">
                                    <div className="name">Cheat Death</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="" id="talent-weight-elusiveness">
                                    <div className="name">Elusiveness</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <h3>Tier 75</h3>
                            <div className="Tier75">
                                <div className="talent_contribution" data-val="" id="talent-weight-prey_on_the_weak">
                                    <div className="name">Prey on the Weak</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="" id="talent-weight-thuggee">
                                    <div className="name">Thuggee</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="" id="talent-weight-internal_bleeding">
                                    <div className="name">Internal Bleeding</div>
                                    <div className="pct">
                                        <div className="label">0</div>
                                        <div className="pct-inner" style={{ width: '%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <h3>Tier 90</h3>
                            <div className="Tier90">
                                <div className="talent_contribution" data-val="100.00999394581173" id="talent-weight-exsanguinate">
                                    <div className="name">Exsanguinate</div>
                                    <div className="pct">
                                        <div className="label">42383.59</div>
                                        <div className="pct-inner" style={{ width: '100.01%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="94.86991527832161" id="talent-weight-alacrity">
                                    <div className="name">Alacrity</div>
                                    <div className="pct">
                                        <div className="label">40205.04</div>
                                        <div className="pct-inner" style={{ width: '94.8699%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="70.38572370384684" id="talent-weight-agonizing_poison">
                                    <div className="name">Agonizing Poison</div>
                                    <div className="pct">
                                        <div className="label">29827.76</div>
                                        <div className="pct-inner" style={{ width: '70.3857%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <h3>Tier 100</h3>
                            <div className="Tier100">
                                <div className="talent_contribution" data-val="100.01003138892773" id="talent-weight-venom_rush">
                                    <div className="name">Venom Rush</div>
                                    <div className="pct">
                                        <div className="label">12107.6</div>
                                        <div className="pct-inner" style={{ width: '100.01%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="80.57479452426904" id="talent-weight-death_from_above">
                                    <div className="name">Death from Above</div>
                                    <div className="pct">
                                        <div className="label">9754.46</div>
                                        <div className="pct-inner" style={{ width: '80.5748%' }}></div>
                                    </div>
                                </div>
                                <div className="talent_contribution" data-val="27.37777759504139" id="talent-weight-marked_for_death">
                                    <div className="name">Marked for Death</div>
                                    <div className="pct">
                                        <div className="label">3313.58</div>
                                        <div className="pct-inner" style={{ width: '27.3778%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <h3>Tier 110</h3>
                            <div className="Tier110"></div>
                        </div>
                    </section>
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
                            <div className="col-0 row-0 talent tt" data-tooltip-id="196864" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_creature_poison_06.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-1 row-0 talent tt active" data-tooltip-id="193640" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/inv_misc_map08.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-2 row-0 talent tt" data-tooltip-id="16511" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/spell_shadow_lifedrain.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-0 row-1 talent tt active" data-tooltip-id="14062" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_stealth.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-1 row-1 talent tt" data-tooltip-id="108208" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/rogue_subterfuge.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-2 row-1 talent tt" data-tooltip-id="108209" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/rogue_shadowfocus.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-0 row-2 talent tt active" data-tooltip-id="193531" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/archaeology_5_0_changkiboard.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-1 row-2 talent tt" data-tooltip-id="114015" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_rogue_slaughterfromtheshadows.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-2 row-2 talent tt" data-tooltip-id="14983" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_rogue_vigor.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-0 row-3 talent tt" data-tooltip-id="108211" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/rogue_leeching_poison.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-1 row-3 talent tt" data-tooltip-id="79008" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_rogue_turnthetables.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-2 row-3 talent tt active" data-tooltip-id="31230" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_rogue_cheatdeath.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-0 row-4 talent tt active" data-tooltip-id="196861" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/inv_misc_bandana_03.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-1 row-4 talent tt" data-tooltip-id="131511" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_rogue_preyontheweak.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-2 row-4 talent tt" data-tooltip-id="154904" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_rogue_bloodsplatter.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-0 row-5 talent tt active" data-tooltip-id="200802" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/inv_poison_mindnumbing.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-1 row-5 talent tt" data-tooltip-id="193539" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_paladin_speedoflight.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-2 row-5 talent tt" data-tooltip-id="200806" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/ability_deathwing_bloodcorruption_earth.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-0 row-6 talent tt active" data-tooltip-id="152152" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/rogue_venomzest.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-1 row-6 talent tt" data-tooltip-id="137619" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/achievement_bg_killingblow_berserker.jpg)' }}>
                                <div className="grey"></div>
                            </div>
                            <div className="col-2 row-6 talent tt" data-tooltip-id="152150" data-tooltip-type="spell" style={{ backgroundImage: 'url(http://wow.zamimg.com/images/wow/icons/large/spell_rogue_deathfromabove.jpg)' }}>
                                <div className="grey"></div>
                            </div>
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
