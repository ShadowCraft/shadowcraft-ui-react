import React from "react"

export default class GearPane extends React.Component {
    render() {
        return (
          <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom" id="gear">
            <div className="panel-tools">
                <section id="summary">
                    <h3>Summary</h3>
                    <div className="inner">
                        <div className="stat"> <span className="key">Engine</span> <span className="val">7.0</span> </div>
                        <div className="stat"> <span className="key">Spec</span> <span className="val">Assassination</span> </div>
                        <div className="stat"> <span className="key">Boss Adds</span> <span className="val">0</span> </div>
                    </div>
                </section>
                <section className="clearfix" id="stats">
                    <h3>Gear Stats</h3>
                    <div className="inner">
                        <div className="stat"> <span className="key">Agility</span> <span className="val">23774</span> </div>
                        <div className="stat"> <span className="key">Crit</span> <span className="val">6275</span> </div>
                        <div className="stat"> <span className="key">Haste</span> <span className="val">1814</span> </div>
                        <div className="stat"> <span className="key">Indestructible</span> <span className="val">861</span> </div>
                        <div className="stat"> <span className="key">Mastery</span> <span className="val">6169</span> </div>
                        <div className="stat"> <span className="key">Stamina</span> <span className="val">19057</span> </div>
                        <div className="stat"> <span className="key">Versatility</span> <span className="val">3617</span> </div>
                    </div>
                </section>
                <section id="weights">
                    <h3>Stat Weights</h3>
                    <div className="inner">
                        <div className="stat" id="weight_agility"><span className="key">Agility</span><span className="val">1.000</span></div>
                        <div className="stat" id="weight_attack_power"><span className="key">Attack Power</span><span className="val">1.000</span></div>
                        <div className="stat" id="weight_versatility"><span className="key">Versatility</span><span className="val">0.849</span></div>
                        <div className="stat" id="weight_crit"><span className="key">Crit</span><span className="val">0.822</span></div>
                        <div className="stat" id="weight_mastery"><span className="key">Mastery</span><span className="val">0.454</span></div>
                        <div className="stat" id="weight_haste"><span className="key">Haste</span><span className="val">0.373</span></div>
                        <div className="stat" id="weight_mainhand_dps"><span className="key">Mainhand Dps</span><span className="val">0.697</span></div>
                        <div className="stat" id="weight_offhand_dps"><span className="key">Offhand Dps</span><span className="val">0.348</span></div>
                    </div>
                </section>
                <section>
                    <h3>Toolbox</h3>
                    <div className="inner">
                        <button id="optimizeGems" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                            <span className="ui-button-text">Optimize Gems</span>
                        </button>
                        <button id="optimizeEnchants" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                            <span className="ui-button-text">Optimize Enchants</span>
                        </button>
                        <button id="lockAll" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                            <span className="ui-button-text">Lock All</span>
                        </button>
                        <button id="unlockAll" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false">
                            <span className="ui-button-text">Unlock All</span>
                        </button>
                    </div>
                </section>
            </div>
            <div className="panel-content">
                <div className="slots half" id="slots-left">
                    <div className="slot" data-bonus="3410:1808:1502:3336" data-context="" data-identifier="137415:840" data-name="Gaze of Fleeting Hours" data-quality="4" data-search="" data-slot="0" data-tag="Mythic 2 Warforged" data-upgrade="" id="137415">
                        <div className="image">
                            <img src="http://us.media.blizzard.com/wow/icons/56/inv_helm_leather_legiondungeon_c_01.jpg" />
                            <span className="ilvl">850</span>
                        </div>
                        <div className="lock lock_off">
                            <img src="/static/images/lock_off.png" />
                        </div>
                        <div className="name quality-4 tt" data-tooltip-bonus="3410:1808:1502:3336" data-tooltip-gems="130217:0:0" data-tooltip-id="137415" data-tooltip-spec="" data-tooltip-upgd="">
                            Gaze of Fleeting Hours <em className="heroic">Mythic 2 Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=137415" target="_blank">Wowhead</a>
                        </div>
                        <div className="bonuses">
                            <img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems">
                            <div className="gem tt " data-tooltip-id="130217">
                                <span className="socket">
                                    <img src="/static/images/icons/Socket_Prismatic.png" /> </span>
                                <span className="img">
                                    <img src="http://wow.zamimg.com/images/wow/icons/small/inv_jewelcrafting_70_cutgem02_blue.jpg" />
                                </span>
                                <span className="gem_name">Versatile Skystone</span>
                            </div>
                        </div>
                    </div>
                    <div className="slot" data-bonus="1726:1497:3337" data-context="" data-identifier="134497:825" data-name="Stormcharged Choker" data-quality="4" data-search="" data-slot="1" data-tag="Heroic Titanforged" data-upgrade="" id="134497">
                        <div className="image"><img src="http://us.media.blizzard.com/wow/icons/56/inv_7_0raid_necklace_01d.jpg" /><span className="ilvl">845</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" />
                        </div>
                        <div className="name quality-4 tt" data-tooltip-bonus="1726:1497:3337" data-tooltip-gems="" data-tooltip-id="134497" data-tooltip-spec="" data-tooltip-upgd=""> Stormcharged Choker <em className="heroic">Heroic Titanforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=134497" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="enchant"> </div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="3432:1527:3337" data-context="" data-identifier="134286:835" data-name="Swordsinger" data-quality="4" data-search="" data-slot="2" data-tag="Titanforged" data-upgrade="" id="134286">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_shoulder_leather_legionendgame_c_01.jpg" /> <span className="ilvl">865</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="3432:1527:3337" data-tooltip-gems="" data-tooltip-id="134286" data-tooltip-spec="" data-tooltip-upgd=""> Swordsinger\'s Shoulders <em className="heroic">Titanforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=134286" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="3466:1477:3336" data-context="" data-identifier="141538:860" data-name="Giant" data-quality="4" data-search="" data-slot="14" data-tag="Warforged" data-upgrade="" id="141538">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_cape_raidpreist_q_01.jpg" /> <span className="ilvl">865</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="3466:1477:3336" data-tooltip-gems="" data-tooltip-id="141538" data-tooltip-spec="" data-tooltip-upgd=""> Giant\'s Handkerchief <em className="heroic">Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=141538" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="enchant"> <span className="img"><img src="http://wow.zamimg.com/images/wow/icons/medium/inv_enchant_formulagood_01.jpg" /></span> +150 Agility </div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="3411:1808:43:1517:3336" data-context="" data-identifier="134373:840" data-name="Felbat Leather Vest" data-quality="4" data-search="" data-slot="4" data-tag="Mythic 3 Warforged" data-upgrade="" id="134373">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_chest_leather_legionendgame_c_01.jpg" /> <span className="ilvl">855</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="3411:1808:43:1517:3336" data-tooltip-gems="130217:0:0" data-tooltip-id="134373" data-tooltip-spec="" data-tooltip-upgd=""> Felbat Leather Vest <em className="heroic">Mythic 3 Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=134373" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems">
                            <div className="gem tt " data-tooltip-id="130217"> <span className="socket"> <img src="/static/images/icons/Socket_Prismatic.png" /> </span> <span className="img"><img src="http://wow.zamimg.com/images/wow/icons/small/inv_jewelcrafting_70_cutgem02_blue.jpg" /></span> <span className="gem_name">Versatile Skystone</span> </div>
                        </div>
                    </div>
                    <div className="slot" data-bonus="3467:1487:3336" data-context="" data-identifier="142419:855" data-name="Sky-Valiant" data-quality="4" data-search="" data-slot="8" data-tag="Warforged" data-upgrade="" id="142419">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_leather_legionraid_d_01_bracer.jpg" /> <span className="ilvl">865</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="3467:1487:3336" data-tooltip-gems="" data-tooltip-id="142419" data-tooltip-spec="" data-tooltip-upgd=""> Sky-Valiant\'s Wristguards <em className="heroic">Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=142419" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="743" data-context="" data-identifier="128870:750" data-name="The Kingslayers" data-quality="6" data-search="" data-slot="15" data-tag="" data-upgrade="" id="128870">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_knife_1h_artifactgarona_d_01.jpg" /> <span className="ilvl">878</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-6 tt" data-tooltip-bonus="743" data-tooltip-gems="139268:139255:133687" data-tooltip-id="128870" data-tooltip-spec="" data-tooltip-upgd=""> The Kingslayers <em className="heroic"></em> <a className="wowhead" href="http://legion.wowhead.com/item=128870" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="741:1517:1515:1512" data-context="" data-identifier="128869:750" data-name="The Kingslayers" data-quality="6" data-search="" data-slot="16" data-tag="" data-upgrade="" id="128869">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_knife_1h_artifactgarona_d_01.jpg" /> <span className="ilvl">878</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-6 tt" data-tooltip-bonus="741:1517:1515:1512" data-tooltip-gems="" data-tooltip-id="128869" data-tooltip-spec="" data-tooltip-upgd=""> The Kingslayers <em className="heroic"></em> <a className="wowhead" href="http://legion.wowhead.com/item=128869" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                </div>
                <div className="slots half" id="slots-right">
                    <div className="slot" data-bonus="1811:3458" data-context="" data-identifier="141321:895" data-name="Shivarran Symmetry" data-quality="5" data-search="" data-slot="9" data-tag="" data-upgrade="" id="141321">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_gauntlets_83.jpg" /> <span className="ilvl">895</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-5 tt" data-tooltip-bonus="1811:3458" data-tooltip-gems="" data-tooltip-id="141321" data-tooltip-spec="" data-tooltip-upgd=""> Shivarran Symmetry <em className="heroic"></em> <a className="wowhead" href="http://legion.wowhead.com/item=141321" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="1805:1492:3336" data-context="" data-identifier="139197:865" data-name="Lifeless Buckled Girdle" data-quality="4" data-search="" data-slot="5" data-tag="Heroic Warforged" data-upgrade="" id="139197">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_belt_leather_raidmonk_q_01.jpg" /> <span className="ilvl">870</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="1805:1492:3336" data-tooltip-gems="" data-tooltip-id="139197" data-tooltip-spec="" data-tooltip-upgd=""> Lifeless Buckled Girdle <em className="heroic">Heroic Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=139197" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="1807:1477:3336" data-context="" data-identifier="139201:850" data-name="Splotched Bloodfur Leggings" data-quality="4" data-search="" data-slot="6" data-tag="Warforged" data-upgrade="" id="139201">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_leather_raidrogue_q_01pants.jpg" /> <span className="ilvl">855</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="1807:1477:3336" data-tooltip-gems="" data-tooltip-id="139201" data-tooltip-spec="" data-tooltip-upgd=""> Splotched Bloodfur Leggings <em className="heroic">Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=139201" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="3432:1522:3337" data-context="" data-identifier="134237:835" data-name="Brinewashed Leather Boots" data-quality="4" data-search="" data-slot="7" data-tag="Titanforged" data-upgrade="" id="134237">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_boot_leather_legionendgame_c_01.jpg" /> <span className="ilvl">860</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="3432:1522:3337" data-tooltip-gems="" data-tooltip-id="134237" data-tooltip-spec="" data-tooltip-upgd=""> Brinewashed Leather Boots <em className="heroic">Titanforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=134237" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="1805:1487" data-context="" data-identifier="139236:865" data-name="Grubby Silver Ring" data-quality="4" data-search="" data-slot="10" data-tag="Heroic" data-upgrade="" id="139236">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_70_raid_ring1b.jpg" /> <span className="ilvl">865</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="1805:1487" data-tooltip-gems="" data-tooltip-id="139236" data-tooltip-spec="" data-tooltip-upgd=""> Grubby Silver Ring <em className="heroic">Heroic</em> <a className="wowhead" href="http://legion.wowhead.com/item=139236" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="enchant"> <span className="img"><img src="http://wow.zamimg.com/images/wow/icons/medium/inv_enchant_formulagood_01.jpg" /></span> +150 Versatility </div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="1726:1808:1502:3337" data-context="" data-identifier="137533:825" data-name="Ring of Minute Mirrors" data-quality="4" data-search="" data-slot="11" data-tag="Heroic Titanforged" data-upgrade="" id="137533">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_jewelry_ring_155.jpg" /> <span className="ilvl">850</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="1726:1808:1502:3337" data-tooltip-gems="130217:0:0" data-tooltip-id="137533" data-tooltip-spec="" data-tooltip-upgd=""> Ring of Minute Mirrors <em className="heroic">Heroic Titanforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=137533" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="enchant"> <span className="img"><img src="http://wow.zamimg.com/images/wow/icons/medium/inv_enchant_formulagood_01.jpg" /></span> +150 Versatility </div>
                        <div className="gems">
                            <div className="gem tt " data-tooltip-id="130217"> <span className="socket"> <img src="/static/images/icons/Socket_Prismatic.png" /> </span> <span className="img"><img src="http://wow.zamimg.com/images/wow/icons/small/inv_jewelcrafting_70_cutgem02_blue.jpg" /></span> <span className="gem_name">Versatile Skystone</span> </div>
                        </div>
                    </div>
                    <div className="slot" data-bonus="1805:1487" data-context="" data-identifier="139320:865" data-name="Ravaged Seed Pod" data-quality="4" data-search="" data-slot="12" data-tag="Heroic" data-upgrade="" id="139320">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_farm_kypariteseed.jpg" /> <span className="ilvl">865</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="1805:1487" data-tooltip-gems="" data-tooltip-id="139320" data-tooltip-spec="" data-tooltip-upgd=""> Ravaged Seed Pod <em className="heroic">Heroic</em> <a className="wowhead" href="http://legion.wowhead.com/item=139320" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                    <div className="slot" data-bonus="1805:1492:3336" data-context="" data-identifier="139329:865" data-name="Bloodthirsty Instinct" data-quality="4" data-search="" data-slot="13" data-tag="Heroic Warforged" data-upgrade="" id="139329">
                        <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/ability_druid_primaltenacity.jpg" /> <span className="ilvl">870</span></div>
                        <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                        <div className="name quality-4 tt" data-tooltip-bonus="1805:1492:3336" data-tooltip-gems="" data-tooltip-id="139329" data-tooltip-spec="" data-tooltip-upgd=""> Bloodthirsty Instinct <em className="heroic">Heroic Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=139329" target="_blank">Wowhead</a> </div>
                        <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                        <div className="gems"> </div>
                    </div>
                </div>
                <div className="popup ui-dialog" id="bonuses">Add item bonus</div>
                <div className="alternatives popup ui-dialog" id="gearpopup">
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
