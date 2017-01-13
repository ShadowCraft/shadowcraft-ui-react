import React from "react"

export default class CharacterPane extends React.Component {
    // hold on to your butts
    render() {
        return (
            <div className='characters-show' id='container'>
                <div id='curtain' style={{ display: 'none' }}>
                    <ul className='dropdownMenu' id='settingsDropdownMenu'>
                        <li><a href="/us/hyjal/aeriwen/refresh" className="showWait" data-method="put" rel="nofollow">Refresh from armory</a></li>
                        <li><a href="/us/hyjal/aeriwen#reload" className="showWait" data-method="get">Reset to last Armory import</a></li>
                        <li><a href="#" data-method="get" id="reloadAllData">Clear all saved data</a></li>
                        <li><a href="#" data-method="get" id="menuSaveSnapshot">Save snapshot</a></li>
                        <li><a href="#" data-method="get" id="menuLoadSnapshot">Load snapshot</a></li>
                        <li><a href="#" data-method="get" id="menuGetDebugURL">Get Debug URL</a></li>
                    </ul>
                    <div id='tabs'>
                        <div id='top-pane'>
                            <a href='/' id='logo'></a>
                            <ul>
                                <li><a href='#gear'>Gear</a></li>
                                <li><a href='#talents'>Talents</a></li>
                                <li><a href='#artifact'>Artifact</a></li>
                                <li><a href='#settings'>Settings</a></li>
                                <li><a href='#advanced'>Advanced</a></li>
                                <li><a href='#docs'>Documentation</a></li>
                            </ul>
                            <a className='dropdown' data-menu='settingsDropdownMenu' href='#' id='settingsDropdown'><img alt="Cog" src="./static/images/cog.png" /></a>
                        </div>
                        <div className='with-tools' id='gear'>
                            <div className='panel-tools'>
                                <section id='summary'>
                                    <h3>Summary</h3>
                                    <div className='inner'></div>
                                </section>
                                <section className='clearfix' id='stats'>
                                    <h3>Gear Stats</h3>
                                    <div className='inner'></div>
                                </section>
                                <section id='weights'>
                                    <h3>Stat Weights</h3>
                                    <div className='inner'></div>
                                </section>
                                <section>
                                    <h3>Toolbox</h3>
                                    <div className='inner'>
                                        <button id='optimizeGems'>Optimize Gems</button>
                                        <button id='optimizeEnchants'>Optimize Enchants</button>
                                        <button id='lockAll'>Lock All</button>
                                        <button id='unlockAll'>Unlock All</button>
                                    </div>
                                </section>
                            </div>
                            <div className='panel-content'><div className='slots half' id='slots-left'></div><div className='slots half' id='slots-right'></div><div className='popup ui-dialog' id='bonuses'>
                                Add item bonus
                                </div>
                                <div className='alternatives popup ui-dialog' id='gearpopup'>
                                    <div id='filter'>
                                        <input className='search' placeholder='Filter...' type='search' />
                                    </div>
                                    <div className='body'></div>
                                </div>
                            </div>
                        </div>
                        <div className='with-tools' id='talents'>
                            <div className='panel-tools'>
                                <section>
                                    <h3>Talent Sets</h3>
                                    <div className='inner' id='talentsets'></div>
                                </section>
                                <section id='talentrankings'>
                                    <h3>Talent Rankings</h3>
                                    <div className='inner'>
                                        <h3>Tier 15</h3>
                                        <div className='Tier15'></div>
                                        <h3>Tier 30</h3>
                                        <div className='Tier30'></div>
                                        <h3>Tier 45</h3>
                                        <div className='Tier45'></div>
                                        <h3>Tier 60</h3>
                                        <div className='Tier60'></div>
                                        <h3>Tier 75</h3>
                                        <div className='Tier75'></div>
                                        <h3>Tier 90</h3>
                                        <div className='Tier90'></div>
                                        <h3>Tier 100</h3>
                                        <div className='Tier100'></div>
                                        <h3>Tier 110</h3>
                                        <div className='Tier110'></div>
                                    </div>
                                </section>
                            </div>
                            <div className='panel-content'>
                                <div id='specactive'></div>
                                <div id='talentframe'></div>
                                <div>
                                    <button id='reset_talents'>Reset Talents</button>
                                </div>
                            </div>
                        </div>
                        <div className='with-tools' id='artifact'>
                            <div className='panel-tools'>
                                <div id='artifact_button_div'>
                                    <button id='reset_artifact'>Reset Traits</button>
                                </div>
                                <section>
                                    <h3>Trait Rankings</h3>
                                    <div className='inner' id='traitrankings'></div>
                                </section>
                            </div>
                            <div className='panel-content'>
                                <div id='artifactactive'></div>
                                <div className='inner'></div>
                                <div id='artifactframe'></div>
                                <div className='alternatives popup ui-dialog' id='artifactpopup'><div id='filter'>
                                    <input className='search' placeholder='Filter...' type='search' />
                                </div>
                                    <div className='body'></div></div>
                            </div>
                        </div>
                        <div id='settings'>
                            <section className='cluster combat'>
                                <div className='option-list'>
                                    <h3>Combat Rotation Settings</h3>
                                    <div className='settings'></div>
                                </div>
                            </section>
                            <section className='cluster mutilate'>
                                <div className='option-list'>
                                    <h3>Assassination Rotation Settings</h3>
                                    <div className='settings'></div>
                                </div>
                            </section>
                            <section className='cluster subtlety'>
                                <div className='option-list'>
                                    <h3>Subtlety Rotation Settings</h3>
                                    <div className='settings'></div>
                                </div>
                            </section>
                            <section className='cluster'>
                                <div className='option-list'>
                                    <h3>Raid Buffs</h3>
                                    <div id='playerBuffs'></div>
                                </div>
                                <div className='option-list'>
                                    <h3>Other</h3>
                                    <div id='raidOther'></div>
                                </div>
                            </section>
                            <section className='cluster'>
                                <div className='option-list'>
                                    <h3>General Settings</h3>
                                    <div id='general'></div>
                                </div>
                                <div className='option-list'>
                                    <h3>Item Filter</h3>
                                    <div id='generalFilter'></div>
                                </div>
                                <div className='option-list'>
                                    <h3>Advanced Settings</h3>
                                    <div id='advancedSettings'></div>
                                </div>
                            </section>
                        </div>
                        <div className='with-tools' id='advanced'>
                            <div className='panel-tools'>
                                <section id='dpsbreakdown'>
                                    <h3>DPS Breakdown</h3>
                                    <div className='inner'></div>
                                </section>
                                <section id='engineinfo'>
                                    <h3>Engine Info</h3>
                                    <div className='inner'></div>
                                </section>
                            </div>
                            <div className='panel-content'></div>
                        </div>
                        <div id='docs'>
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
                        <div id='console-footer'>
                            <a className='human' href='http://us.battle.net/wow/en/character/hyjal/aeriwen/advanced' id='card' target='_blank'>
                                <div className='img'>
                                    <img src='http://us.battle.net/static-render/us/hyjal/156/113885852-avatar.jpg' />
                                </div>
                                <span className='info'>
                                    <span className='name'>Aeriwen</span>
                                    <span className='realm'>Hyjal-US</span>
                                </span>
                            </a>
                            <div id='dps'>
                                <div className='inner'></div>
                            </div>
                            <div id='dpsgraph'></div>
                            <div className='ad'>
                            </div>
                            <div id='logs'>
                                <section>
                                    <div className='window' id='console'>
                                        <h3>Notices</h3>
                                        <div className='inner'></div>
                                    </div>
                                </section>
                                <section>
                                    <div className='window' id='log'>
                                        <h3>Log</h3>
                                        <div className='inner'></div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div id='dialogs'>
                        <div id='saveSnapshot' title='Save Snapshot'>
                            <label>                                Enter a name for this snapshot:</label>
                            <input id='snapshotName' type='text' />
                        </div>
                        <div id='loadSnapshot' title='Load Snapshot'></div>
                        <div id='generalDialog'></div>
                    </div>
                </div>
            </div>
        )
    }
}