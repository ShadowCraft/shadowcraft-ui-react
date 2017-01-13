import React from "react"

export default class CharacterPane extends React.Component {
    // hold on to your butts
    render() {
        return (
            <div>
                <div className="characters-show" id="container">
                    <div id="curtain">
                        <ul className="dropdownMenu" id="settingsDropdownMenu" style={{ display: 'none' }}>
                            <li>
                                <a href="/us/hyjal/aeriwen/refresh" className="showWait" data-method="put" rel="nofollow">Refresh from armory</a>
                            </li>
                            <li>
                                <a href="/us/hyjal/aeriwen#reload" className="showWait" data-method="get">Reset to last Armory import</a>
                            </li>
                            <li>
                                <a href="#" data-method="get" id="reloadAllData">Clear all saved data</a>
                            </li>
                            <li>
                                <a href="#" data-method="get" id="menuSaveSnapshot">Save snapshot</a>
                            </li>
                            <li>
                                <a href="#" data-method="get" id="menuLoadSnapshot">Load snapshot</a>
                            </li>
                            <li>
                                <a href="#" data-method="get" id="menuGetDebugURL">Get Debug URL</a>
                            </li>
                        </ul>
                        <div id="tabs" className="ui-tabs ui-widget ui-widget-content ui-corner-all">
                            <div id="top-pane">
                                <a href="/" id="logo"></a>
                                <ul className="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                                    <li className="ui-state-default ui-corner-top ui-tabs-selected ui-state-active">
                                        <a href="#gear">Gear</a>
                                    </li>
                                    <li className="ui-state-default ui-corner-top">
                                        <a href="#talents">Talents</a>
                                    </li>
                                    <li className="ui-state-default ui-corner-top">
                                        <a href="#artifact">Artifact</a>
                                    </li>
                                    <li className="ui-state-default ui-corner-top">
                                        <a href="#settings">Settings</a>
                                    </li>
                                    <li className="ui-state-default ui-corner-top">
                                        <a href="#advanced">Advanced</a>
                                    </li>
                                    <li className="ui-state-default ui-corner-top">
                                        <a href="#docs">Documentation</a>
                                    </li>
                                </ul>
                                <a className="dropdown" data-menu="settingsDropdownMenu" href="#" id="settingsDropdown"><img alt="Cog" src="/static/images/cog.png" /></a>
                            </div>
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
                                            <div className="name quality-4 tt" data-tooltip-bonus="3432:1527:3337" data-tooltip-gems="" data-tooltip-id="134286" data-tooltip-spec="" data-tooltip-upgd=""> Swordsinger's Shoulders <em className="heroic">Titanforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=134286" target="_blank">Wowhead</a> </div>
                                            <div className="bonuses"><img alt="Reforge" src="/static/images/reforge.png" />Modify Bonuses</div>
                                            <div className="gems"> </div>
                                        </div>
                                        <div className="slot" data-bonus="3466:1477:3336" data-context="" data-identifier="141538:860" data-name="Giant" data-quality="4" data-search="" data-slot="14" data-tag="Warforged" data-upgrade="" id="141538">
                                            <div className="image"> <img src="http://us.media.blizzard.com/wow/icons/56/inv_cape_raidpreist_q_01.jpg" /> <span className="ilvl">865</span></div>
                                            <div className="lock lock_off"><img src="/static/images/lock_off.png" /></div>
                                            <div className="name quality-4 tt" data-tooltip-bonus="3466:1477:3336" data-tooltip-gems="" data-tooltip-id="141538" data-tooltip-spec="" data-tooltip-upgd=""> Giant's Handkerchief <em className="heroic">Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=141538" target="_blank">Wowhead</a> </div>
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
                                            <div className="name quality-4 tt" data-tooltip-bonus="3467:1487:3336" data-tooltip-gems="" data-tooltip-id="142419" data-tooltip-spec="" data-tooltip-upgd=""> Sky-Valiant's Wristguards <em className="heroic">Warforged</em> <a className="wowhead" href="http://legion.wowhead.com/item=142419" target="_blank">Wowhead</a> </div>
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
                            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="artifact">
                                <div className="panel-tools">
                                    <div id="artifact_button_div">
                                        <button id="reset_artifact" className="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false"><span className="ui-button-text">Reset Traits</span></button>
                                    </div>
                                    <section>
                                        <h3>Trait Rankings</h3>
                                        <div className="inner" id="traitrankings">
                                            <div className="talent_contribution" data-val="100.00999224379201" id="talent-weight-192657">
                                                <div className="name">Bag of Tricks</div>
                                                <div className="pct">
                                                    <div className="label">21135.69</div>
                                                    <div className="pct-inner" style={{ width: '100.01%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="92.31230234670517" id="talent-weight-192923">
                                                <div className="name">Blood of the Assassinated</div>
                                                <div className="pct">
                                                    <div className="label">19508.73</div>
                                                    <div className="pct-inner" style={{ width: '92.3123%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="50.565714865357634" id="talent-weight-192428">
                                                <div className="name">From the Shadows</div>
                                                <div className="pct">
                                                    <div className="label">10685.3</div>
                                                    <div className="pct-inner" style={{ width: '50.5657%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="31.143450053537755" id="talent-weight-214368">
                                                <div className="name">Assassin's Blades</div>
                                                <div className="pct">
                                                    <div className="label">6580.27</div>
                                                    <div className="pct-inner" style={{ width: '31.1435%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="22.451801673402745" id="talent-weight-192759">
                                                <div className="name">Kingsbane</div>
                                                <div className="pct">
                                                    <div className="label">4743.23</div>
                                                    <div className="pct-inner" style={{ width: '22.4518%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="15.366440921765665" id="talent-weight-192384">
                                                <div className="name">Urge to Kill</div>
                                                <div className="pct">
                                                    <div className="label">3245.69</div>
                                                    <div className="pct-inner" style={{ width: '15.3664%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="13.015157564303719" id="talent-weight-192329">
                                                <div className="name">Gushing Wound</div>
                                                <div className="pct">
                                                    <div className="label">2748.73</div>
                                                    <div className="pct-inner" style={{ width: '13.0152%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="9.775802961277527" id="talent-weight-192315">
                                                <div className="name">Serrated Edge</div>
                                                <div className="pct">
                                                    <div className="label">2064.07</div>
                                                    <div className="pct-inner" style={{ width: '9.7758%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="8.25590947739336" id="talent-weight-192349">
                                                <div className="name">Master Assassin</div>
                                                <div className="pct">
                                                    <div className="label">1742.83</div>
                                                    <div className="pct-inner" style={{ width: '8.25591%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="6.439503340554951" id="talent-weight-214928">
                                                <div className="name">Slayer's Precision</div>
                                                <div className="pct">
                                                    <div className="label">1358.92</div>
                                                    <div className="pct-inner" style={{ width: '6.4395%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="6.298935430561803" id="talent-weight-192326">
                                                <div className="name">Balanced Blades</div>
                                                <div className="pct">
                                                    <div className="label">1329.21</div>
                                                    <div className="pct-inner" style={{ width: '6.29894%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="3.6264891740646887" id="talent-weight-192424">
                                                <div className="name">Surge of Toxins</div>
                                                <div className="pct">
                                                    <div className="label">764.37</div>
                                                    <div className="pct-inner" style={{ width: '3.62649%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="3.554525595774693" id="talent-weight-192376">
                                                <div className="name">Poison Knives</div>
                                                <div className="pct">
                                                    <div className="label">749.16</div>
                                                    <div className="pct-inner" style={{ width: '3.55453%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="3.4405004651508344" id="talent-weight-192310">
                                                <div className="name">Toxic Blades</div>
                                                <div className="pct">
                                                    <div className="label">725.06</div>
                                                    <div className="pct-inner" style={{ width: '3.4405%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="1.7822627978873467" id="talent-weight-192318">
                                                <div className="name">Master Alchemist</div>
                                                <div className="pct">
                                                    <div className="label">374.58</div>
                                                    <div className="pct-inner" style={{ width: '1.78226%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="0.01" id="talent-weight-192323">
                                                <div className="name">Fade into Shadows</div>
                                                <div className="pct">
                                                    <div className="label">0</div>
                                                    <div className="pct-inner" style={{ width: '0.01%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="0.01" id="talent-weight-192345">
                                                <div className="name">Shadow Walker</div>
                                                <div className="pct">
                                                    <div className="label">0</div>
                                                    <div className="pct-inner" style={{ width: '0.01%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="0.01" id="talent-weight-192422">
                                                <div className="name">Shadow Swiftness</div>
                                                <div className="pct">
                                                    <div className="label">0</div>
                                                    <div className="pct-inner" style={{ width: '0.01%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
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
                            <div id="settings" className="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide">
                                <section className="cluster combat" style={{ display: 'none' }}>
                                    <div className="option-list">
                                        <h3>Combat Rotation Settings</h3>
                                        <div className="settings">
                                            <label className="select" htmlFor="opt-rotation-blade_flurry">
                                                <span className="label">Blade Flurry</span>
                                                <input className="optionCheck" data-ns="rotation" id="opt-rotation-blade_flurry" name="blade_flurry" type="checkbox" value="false" />
                                                <span className="desc">Use Blade Flurry</span>
                                            </label>

                                            <label className="select">
                                                <span className="label">BtE Policy</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="between_the_eyes_policy" id="opt-rotation-between_the_eyes_policy" data-ns="rotation">
                                                        <option value="shark">Only use with Shark</option>
                                                        <option value="always">Use BtE on cooldown</option>
                                                        <option value="never">Never use BtE</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">RtB Reroll Policy</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="reroll_policy" id="opt-rotation-reroll_policy" data-ns="rotation">
                                                        <option value="1">Reroll single buffs</option>
                                                        <option value="2">Reroll two or fewer buffs</option>
                                                        <option value="3">Reroll three or fewer buffs</option>
                                                        <option value="custom">Custom setup per buff (see below)</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Jolly Roger</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="jolly_roger_reroll" id="opt-rotation-jolly_roger_reroll" data-ns="rotation">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </span>
                                                <span className="desc">0 means never reroll combos with this buff. 1 means reroll singles of this buff. 2 means reroll double-buff rolls containing this buff. 3 means reroll triple-buff rolls containing this buff.</span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Grand Melee</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="grand_melee_reroll" id="opt-rotation-grand_melee_reroll" data-ns="rotation">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Shark-Infested Waters</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="shark_reroll" id="opt-rotation-shark_reroll" data-ns="rotation">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">True Bearing</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="true_bearing_reroll" id="opt-rotation-true_bearing_reroll" data-ns="rotation">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Buried Treasure</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="buried_treasure_reroll" id="opt-rotation-buried_treasure_reroll" data-ns="rotation">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Broadsides</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="broadsides_reroll" id="opt-rotation-broadsides_reroll" data-ns="rotation">
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                        </div>
                                    </div>
                                </section>
                                <section className="cluster mutilate" style={{ display: 'block' }}>
                                    <div className="option-list">
                                        <h3>Assassination Rotation Settings</h3>
                                        <div className="settings">
                                            <label className="select">
                                                <span className="label">Kingsbane w/ Vendetta</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="kingsbane" id="opt-rotation-kingsbane" data-ns="rotation">
                                                        <option value="just">Use cooldown if it aligns, but don't delay usage</option>
                                                        <option value="only">Only use cooldown with Vendetta</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Exsang w/ Vendetta</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="exsang" id="opt-rotation-exsang" data-ns="rotation">
                                                        <option value="just">Use cooldown if it aligns, but don't delay usage</option>
                                                        <option value="only">Only use cooldown with Vendetta</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label> <label className="select">
                                                <span className="label">CP Builder</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="assn_cp_builder" id="opt-rotation-assn_cp_builder" data-ns="rotation">
                                                        <option value="mutilate">Mutilate</option>
                                                        <option value="fan_of_knives">Fan of Knives</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Lethal Poison</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="lethal_poison" id="opt-rotation-lethal_poison" data-ns="rotation">
                                                        <option value="dp">Deadly Poison</option>
                                                        <option value="wp">Wound Poison</option>
                                                        <option value="ap">Agonizing Poison</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                        </div>
                                    </div>
                                </section>
                                <section className="cluster subtlety" style={{ display: 'none' }}>
                                    <div className="option-list">
                                        <h3>Subtlety Rotation Settings</h3>
                                        <div className="settings">
                                            <label className="select">
                                                <span className="label">CP Builder</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="sub_cp_builder" id="opt-rotation-sub_cp_builder" data-ns="rotation">
                                                        <option value="backstab">Backstab</option>
                                                        <option value="shuriken_storm">Shuriken Storm</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label> <label className="select">
                                                <span className="label">SoD Policy</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="symbols_policy" id="opt-rotation-symbols_policy" data-ns="rotation">
                                                        <option value="always">Use on cooldown</option>
                                                        <option value="just">Only use SoD when needed to refresh</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select" htmlFor="opt-rotation-dance_finishers_allowed">
                                                <span className="label">Use Finishers during Dance</span>
                                                <input className="optionCheck" data-ns="rotation" id="opt-rotation-dance_finishers_allowed" name="dance_finishers_allowed" type="checkbox" checked="checked" value="true" />
                                                <span className="desc"></span>
                                            </label>
                                            <label className="input">
                                                <span className="label">Backstab uptime</span>
                                                <input className="optionInput" data-ns="rotation" id="opt-rotation-positional_uptime" name="positional_uptime" type="text" />
                                                <span className="desc">Percentage of the fight you are behind the target (0-100). This has no effect if Gloomblade is selected as a talent.</span>
                                            </label> <label className="select" htmlFor="opt-rotation-compute_cp_waste">
                                                <span className="label">Compute CP Waste</span>
                                                <input className="optionCheck" data-ns="rotation" id="opt-rotation-compute_cp_waste" name="compute_cp_waste" type="checkbox" checked="checked" value="true" />
                                                <span className="desc">EXPERIMENTAL FEATURE: Compute combo point waste</span>
                                            </label>
                                        </div>
                                    </div>
                                </section>
                                <section className="cluster">
                                    <div className="option-list">
                                        <h3>Raid Buffs</h3>
                                        <div id="playerBuffs"><label className="select">
                                            <span className="label">Food Buff</span> <span className="select-container">
                                                <select className="optionSelect" name="food_buff" id="opt-buffs-food_buff" data-ns="buffs">
                                                    <option value="food_legion_375_crit">The Hungry Magister (375 Crit)</option>
                                                    <option value="food_legion_375_haste">Azshari Salad (375 Haste)</option>
                                                    <option value="food_legion_375_mastery">Nightborne Delicacy Platter (375 Mastery)</option>
                                                    <option value="food_legion_375_versatility">Seed-Battered Fish Plate (375 Versatility)</option>
                                                    <option value="food_legion_feast_200">Lavish Suramar Feast (200 Agility)</option>
                                                    <option value="food_legion_damage_3">Fishbrul Special (High Fire Proc)</option>
                                                </select>
                                            </span>
                                            <span className="desc"></span>
                                        </label>
                                            <label className="select" htmlFor="opt-buffs-flask_legion_agi">
                                                <span className="label">Legion Agility Flask</span>
                                                <input className="optionCheck" data-ns="buffs" id="opt-buffs-flask_legion_agi" name="flask_legion_agi" type="checkbox" value="false" />
                                                <span className="desc">Flask of the Seventh Demon (1300 Agility)</span>
                                            </label> <label className="select" htmlFor="opt-buffs-short_term_haste_buff">
                                                <span className="label">+30% Haste/40 sec</span>
                                                <input className="optionCheck" data-ns="buffs" id="opt-buffs-short_term_haste_buff" name="short_term_haste_buff" type="checkbox" checked="checked" value="true" />
                                                <span className="desc">Heroism/Bloodlust/Time Warp</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="option-list">
                                        <h3>Other</h3>
                                        <div id="raidOther">
                                            <label className="select">
                                                <span className="label">Pre-pot</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="prepot" id="opt-general-prepot" data-ns="general">
                                                        <option value="potion_old_war">Potion of the Old War</option>
                                                        <option value="potion_deadly_grace">Potion of Deadly Grace</option>
                                                        <option value="potion_none">None</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Combat Potion</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="potion" id="opt-general-potion" data-ns="general">
                                                        <option value="potion_old_war">Potion of the Old War</option>
                                                        <option value="potion_deadly_grace">Potion of Deadly Grace</option>
                                                        <option value="potion_none">None</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                        </div>
                                    </div>
                                </section>
                                <section className="cluster">
                                    <div className="option-list">
                                        <h3>General Settings</h3>
                                        <div id="general">
                                            <label className="select">
                                                <span className="label">Patch/Engine</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="patch" id="opt-general-patch" data-ns="general">
                                                        <option value="70">7.0</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="input">
                                                <span className="label">Level</span>
                                                <input className="optionInput" data-ns="general" id="opt-general-level" name="level" type="text" />
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Race</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="race" id="opt-general-race" data-ns="general">
                                                        <option value="Human">Human</option>
                                                        <option value="Dwarf">Dwarf</option>
                                                        <option value="Orc">Orc</option>
                                                        <option value="Blood Elf">Blood Elf</option>
                                                        <option value="Gnome">Gnome</option>
                                                        <option value="Worgen">Worgen</option>
                                                        <option value="Troll">Troll</option>
                                                        <option value="Night Elf">Night Elf</option>
                                                        <option value="Undead">Undead</option>
                                                        <option value="Goblin">Goblin</option>
                                                        <option value="Pandaren">Pandaren</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Racial (Night Elf)</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="night_elf_racial" id="opt-general-night_elf_racial" data-ns="general">
                                                        <option value="0">Night (1% Haste)</option>
                                                        <option value="1">Day (1% Crit)</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                            <label className="input">
                                                <span className="label">Fight Duration</span>
                                                <input className="optionInput" data-ns="general" id="opt-general-duration" name="duration" type="text" />
                                                <span className="desc"></span>
                                            </label>
                                            <label className="input">
                                                <span className="label">Response Time</span>
                                                <input className="optionInput" data-ns="general" id="opt-general-response_time" name="response_time" type="text" />
                                                <span className="desc"></span>
                                            </label>
                                            <label className="input">
                                                <span className="label">Number of Boss Adds</span>
                                                <input className="optionInput" data-ns="general" id="opt-general-num_boss_adds" name="num_boss_adds" type="text" />
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select" htmlFor="opt-general-demon_enemy">
                                                <span className="label">Enemy is Demon</span>
                                                <input className="optionCheck" data-ns="general" id="opt-general-demon_enemy" name="demon_enemy" type="checkbox" checked="checked" value="0" />
                                                <span className="desc">Enables damage buff from heirloom trinket against demons</span>
                                            </label>
                                            <label className="input">
                                                <span className="label">MfD Resets Per Minute</span>
                                                <input className="optionInput" data-ns="general" id="opt-general-mfd_resets" name="mfd_resets" type="text" />
                                                <span className="desc"></span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Finisher Threshold</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="finisher_threshold" id="opt-general-finisher_threshold" data-ns="general">
                                                        <option value="6">6</option>
                                                        <option value="5">5</option>
                                                        <option value="4">4</option>
                                                    </select>
                                                </span>
                                                <span className="desc">Minimum CPs to use finisher</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="option-list">
                                        <h3>Item Filter</h3>
                                        <div id="generalFilter">
                                            <label className="select" htmlFor="opt-general-dynamic_ilvl">
                                                <span className="label">Dynamic ILevel filtering</span>
                                                <input className="optionCheck" data-ns="general" id="opt-general-dynamic_ilvl" name="dynamic_ilvl" type="checkbox" checked="checked" value="true" />
                                                <span className="desc">Dynamically filters items in gear lists to +/- 50 Ilevels of the item equipped in that slot. Disable this option to use the manual filtering options below.</span>
                                            </label>
                                            <label className="input">
                                                <span className="label">Max ILevel</span>
                                                <input className="optionInput" data-ns="general" id="opt-general-max_ilvl" name="max_ilvl" type="text" />
                                                <span className="desc">Don't show items over this item level in gear lists</span>
                                            </label>
                                            <label className="input">
                                                <span className="label">Min ILevel</span>
                                                <input className="optionInput" data-ns="general" id="opt-general-min_ilvl" name="min_ilvl" type="text" />
                                                <span className="desc">Don't show items under this item level in gear lists</span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Show Upgrades</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="show_upgrades" id="opt-general-show_upgrades" data-ns="general">
                                                        <option value="0">No</option>
                                                        <option value="1">Yes</option>
                                                    </select>
                                                </span>
                                                <span className="desc">Show all upgraded items in gear lists</span>
                                            </label>
                                            <label className="select">
                                                <span className="label">Recommend Epic Gems</span>
                                                <span className="select-container">
                                                    <select className="optionSelect" name="epic_gems" id="opt-general-epic_gems" data-ns="general">
                                                        <option value="0">No</option>
                                                        <option value="1">Yes</option>
                                                    </select>
                                                </span>
                                                <span className="desc"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="option-list">
                                        <h3>Advanced Settings</h3>
                                        <div id="advancedSettings">
                                            <label className="input">
                                                <span className="label">Latency</span>
                                                <input className="optionInput" data-ns="advanced" id="opt-advanced-latency" name="latency" type="text" />
                                                <span className="desc"></span>
                                            </label>
                                            <label className="input">
                                                <span className="label">Advanced Parameters</span>
                                                <input className="optionInput" data-ns="advanced" id="opt-advanced-adv_params" name="adv_params" type="text" />
                                                <span className="desc"></span>
                                            </label>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="with-tools ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide" id="advanced">
                                <div className="panel-tools">
                                    <section id="dpsbreakdown">
                                        <h3>DPS Breakdown</h3>
                                        <div className="inner">
                                            <div className="talent_contribution" data-val="100.01" id="talent-weight-rupture_ticks">
                                                <div className="name">Rupture Ticks (93539.4 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">37.23%</div>
                                                    <div className="pct-inner" style={{ width: '100.01%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="53.943153004008984" id="talent-weight-mutilate">
                                                <div className="name">Mutilate (50448.8 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">20.08%</div>
                                                    <div className="pct-inner" style={{ width: '53.9432%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="25.61297164054714" id="talent-weight-envenom">
                                                <div className="name">Envenom (23948.9 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">9.53%</div>
                                                    <div className="pct-inner" style={{ width: '25.613%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="23.175935480603673" id="talent-weight-autoattack">
                                                <div className="name">Autoattack (21669.3 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">8.63%</div>
                                                    <div className="pct-inner" style={{ width: '23.1759%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="22.60549010386171" id="talent-weight-poison_bomb">
                                                <div className="name">Poison Bomb (21135.7 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">8.41%</div>
                                                    <div className="pct-inner" style={{ width: '22.6055%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="22.040670417936077" id="talent-weight-garrote_ticks">
                                                <div className="name">Garrote Ticks (20607.4 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">8.20%</div>
                                                    <div className="pct-inner" style={{ width: '22.0407%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="11.433310587077962" id="talent-weight-from_the_shadows">
                                                <div className="name">From The Shadows (10685.3 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">4.25%</div>
                                                    <div className="pct-inner" style={{ width: '11.4333%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="5.208262656040939" id="talent-weight-kingsbane_ticks">
                                                <div className="name">Kingsbane Ticks (4862.4 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">1.94%</div>
                                                    <div className="pct-inner" style={{ width: '5.20826%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="3.907400181058212" id="talent-weight-kingsbane">
                                                <div className="name">Kingsbane (3645.6 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">1.45%</div>
                                                    <div className="pct-inner" style={{ width: '3.9074%' }}></div>
                                                </div>
                                            </div>
                                            <div className="talent_contribution" data-val="0.7412844561853807" id="talent-weight-Infested_Ground">
                                                <div className="name">Infested Ground (684.0 DPS)</div>
                                                <div className="pct">
                                                    <div className="label">0.27%</div>
                                                    <div className="pct-inner" style={{ width: '0.741284%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section id="engineinfo">
                                        <h3>Engine Info</h3>
                                        <div className="inner">
                                            <div className="stat"> <span className="key">Shadowcraft Build</span> <span className="val">0.02</span> </div>
                                            <div className="stat"> <span className="key">Wow Build Target</span> <span className="val">7.0.0</span> </div>
                                        </div>
                                    </section>
                                </div>
                                <div className="panel-content"></div>
                            </div>
                            <div id="docs" className="ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide">
                                <h3>7.0 Release 2</h3>
                                Engine Status:
                    <ul>
                                    <li>General:</li>
                                    <li>Trinkets are lightly tested, may have implementation errors.</li>
                                    <li>No legendaries implemented, if you get one use it, its good, if you get two, go buy lotto tickets</li>
                                    <li>Set bonuses unimplemented</li>
                                    <li>The outlaw model can be very slow at times, be patient if it takes a few seconds to recalculate after you make a change.</li>
                                    <br />
                                </ul>
                                <ul>
                                    <li>Assassination:</li>
                                    <li>Assassination model seems to use too much energy, shouldn't have a large impact on stat weights.</li>
                                    <li>T30 Talents are not implemented</li>
                                    <li>Fan of Knives rotations are not implemented</li>
                                    <li>Poison Knives (non-agonizing effect) is not implemented</li>
                                    <br />
                                </ul>
                                <ul>
                                    <li>Outlaw:</li>
                                    <li>Model just doesn't work, don't use it.</li>
                                    <br />
                                </ul>
                                <ul>
                                    <li>Subtlety:</li>
                                    <li>No combo point loss is computed, this leads to somewhat higher results than are achievable in game and decreases the value of haste.</li>
                                    <li>Use finishers during dance setting doesn't behave correctly with subterfuge, leave this option enabled with subterfuge rotations.</li>
                                    <li>Weaponmaster does not give bonus cps, may be somewhat undervalued</li>
                                    <li>Flickering Shadows (sprint trait) not implemented</li>
                                    <br />
                                </ul>
                                UI Status:
                    <ul>
                                    <li>Artifact data from the API is now implemented. It only supports the currently-equipped artifact, because that's all the data that Blizzard gives us. If you switch specs, your other artifact will be blank.</li>
                                    <li>Most items should now be properly supported (except Mythic+ items, see below)</li>
                                    <li>Selection of WF/TF item levels is now implemented for gear. Relic support is on deck.</li>
                                    <li>Fixed lots and lots of bugs with relics and artifact loading in general. It should be much more robust now.</li>
                                    <li>Timewalking items are not supported until Blizzard fixes the API data for them.</li>
                                    <li>Trial of Valor items are not supported until they're available from the API.</li>
                                </ul>
                            </div>
                            <div id="console-footer" className="awin-medium">
                                <a className="human" href="http://us.battle.net/wow/en/character/hyjal/aeriwen/advanced" id="card" target="_blank">
                                    <div className="img">
                                        <img src="http://us.battle.net/static-render/us/hyjal/156/113885852-avatar.jpg" />
                                    </div>
                                    <span className="info">
                                        <span className="name">                                            Aeriwen</span>
                                        <span className="realm">                                            Hyjal-US</span>
                                    </span>
                                </a>
                                <div id="dps">
                                    <div className="inner">251226.8 DPS</div>
                                </div>
                                <div id="dpsgraph" style={{ position: 'relative' }}>
                                    <canvas width="352" height="120"></canvas>
                                    <canvas width="352" height="120" style={{ position: 'absolute', left: 0, top: 0 }}></canvas>
                                    <div className="tickLabels" style={{ fontSize: 'smaller' }}>
                                        <div className="xAxis x1Axis" style={{ color: '#545454' }}>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'center', left: 30, top: 108, width: 70 }}>-1.0</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'center', left: 100, top: 108, width: 70 }}>-0.5</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'center', left: 170, top: 108, width: 70 }}>0.0</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'center', left: 239, top: 108, width: 70 }}>0.5</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'center', left: 309, top: 108, width: 70 }}>1.0</div>
                                        </div>
                                        <div className="yAxis y1Axis" style={{ color: '#545454' }}>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'right', top: 76, right: 294, width: 58 }}>251226.790</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'right', top: 58, right: 294, width: 58 }}>251226.795</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'right', top: 39, right: 294, width: 58 }}>251226.800</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'right', top: 21, right: 294, width: 58 }}>251226.805</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'right', top: 2, right: 294, width: 58, }}>251226.810</div>
                                            <div className="tickLabel" style={{ position: 'absolute', textAlign: 'right', top: 95, right: 294, width: 58 }}>251226.785</div>
                                        </div>
                                    </div>
                                </div>
                                <div id="logs">
                                    <section>
                                        <div className="window" id="console" style={{ display: 'block' }}>
                                            <h3>Notices</h3>
                                            <div className="inner">
                                                <div className="log items warning" id="warn"> <span className="quality-4"> Stormcharged Choker </span> needs an enchantment </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div className="window" id="log">
                                            <h3>Log</h3>
                                            <div className="inner"></div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div id="dialogs">
                            <div id="saveSnapshot" title="Save Snapshot">
                                <label>                                    Enter a name for this snapshot:</label>
                                <input id="snapshotName" type="text" />
                            </div>
                            <div id="loadSnapshot" title="Load Snapshot"></div>
                            <div id="generalDialog"></div>
                        </div>
                    </div>

                </div >
                <div id="wait" style={{ display: 'none' }}>
                    <div id="waitMsg"></div>
                </div>
                <div id="modal" style={{ display: 'none' }}></div>
            </div >
        )
    }
}