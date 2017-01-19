import React from "react"
import GearPane from './GearPane';

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
                            <GearPane/>
                            <TalentPane/>
                            <ArtifactPane/>
                            <SettingsPane/>
                            <AdvancedPane/>
                            <DocsPane/>
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
