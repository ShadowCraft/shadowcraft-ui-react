import React from 'react';
import GearPane from './gear/GearPane';
import TalentPane from './TalentPane';
import ArtifactPane from './artifact/ArtifactPane';
import SettingsPane from './SettingsPane';
import AdvancedPane from './AdvancedPane';
import DocsPane from './DocsPane';
import RightPane from './RightPane';

var Tabs = require('react-simpletabs');

export default class CharacterPane extends React.Component {
    // hold on to your butts

    constructor(props) {
        super(props);

        // have bind this because otherwise you get handleArtifactChange's this
        // #javascriptproblems
        this.handleArtifactChange = this.handleArtifactChange.bind(this);
        this.handleTalentChange = this.handleTalentChange.bind(this);

        this.state = this.props.data;
        this.state.current_talents = this.props.data.talents[this.props.data.active];
    }

    handleArtifactChange(traits, relics) {
        var state = this.state;

        if (relics != null) {
            state.artifact.relics = relics;
        }

        if (traits != null) {
            state.artifact.traits = traits;
        }

        this.setState(state);
    }

    handleTalentChange(spec, talents) {
        this.setState({ active: spec, current_talents: talents });
    }

    render() {

        // mocking data
        let spec = 'Assassination'; //not actually being passed right, funnily enough
        let settings = {};
        let abilityRanking = {
            breakdown: [
                {
                    name: 'Serrate',
                    dps: 123124,
                    pct: .15
                },
                {
                    name: 'Stab',
                    dps: 325643,
                    pct: .25
                }, {
                    name: 'Slit',
                    dps: 123124,
                    pct: .5
                },
                {
                    name: 'Shiv',
                    dps: 325643,
                    pct: .30
                },
                {
                    name: 'Slice',
                    dps: 123124,
                    pct: .10
                },
                {
                    name: 'Slash',
                    dps: 325643,
                    pct: .20
                }
            ],
            build: {
                ui: 'thisfake',
                engine: 'commitid'
            }
        };

        // console.log(this.props.data)
        return (
            <div>
                <div style={{ marginBottom: '25px', display: 'flex' }}>
                    <div id="container" style={{ flex: 4 }}>
                        <div id="curtain">
                            <div id='tabs'>
                                <Tabs>
                                    <Tabs.Panel title="Gear">
                                        <GearPane data={this.props.data} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Talents">
                                        <TalentPane data={this.state} onChange={this.handleTalentChange} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Artifact">
                                        <ArtifactPane data={this.state} onChange={this.handleArtifactChange} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Settings">
                                        <SettingsPane spec={spec} settings={settings} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Advanced">
                                        <AdvancedPane data={abilityRanking} />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Documentation">
                                        <DocsPane />
                                    </Tabs.Panel>
                                </Tabs>
                            </div>
                        </div>
                    </div >
                    <RightPane />
                </div>

                <div id="wait" style={{ display: 'none' }}>
                    <div id="waitMsg" />
                </div>
                <div id="modal" style={{ display: 'none' }} />
                <div id="footer">
                    <div className='padding'>
                        Questions to <a href="mailto:shadowcraft@ravenholdt.net">Ravenholdt</a> &bull; UI source at <a href="http://github.com/cheald/shadowcraft-ui">GitHub</a>      &bull; discussion at <a href="https://discord.gg/DdPahJ9">Ravenholdt</a> &bull; DPS/EP engine source at <a href="https://github.com/Fierydemise/ShadowCraft-Engine">GitHub</a>      &bull; Hosting provided by <a href="http://mmo-mumble.com">MMO-Mumble.com</a>
                    </div>
                </div>
            </div >
        );
    }
}
