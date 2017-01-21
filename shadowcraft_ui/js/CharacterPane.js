import React from "react"
import GearPane from './GearPane';
import TalentPane from './TalentPane';
import ArtifactPane from './ArtifactPane';
import SettingsPane from './SettingsPane';
import AdvancedPane from './AdvancedPane';
import DocsPane from './DocsPane';
import RightPane from './RightPane';

var Tabs = require('react-simpletabs');

export default class CharacterPane extends React.Component {
    // hold on to your butts
    render() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div id="container" style={{ flex: 4 }}>
                        <div id="curtain">
                            <Tabs>
                                <Tabs.Panel title="Gear">
                                    <GearPane />
                                </Tabs.Panel>
                                <Tabs.Panel title="Talents">
                                    <TalentPane />
                                </Tabs.Panel>
                                <Tabs.Panel title="Artifact">
                                    <ArtifactPane />
                                </Tabs.Panel>
                                <Tabs.Panel title="Settings">
                                    <SettingsPane />
                                </Tabs.Panel>
                                <Tabs.Panel title="Advanced">
                                    <AdvancedPane />
                                </Tabs.Panel>
                                <Tabs.Panel title="Documentation">
                                    <DocsPane />
                                </Tabs.Panel>
                            </Tabs>
                        </div>
                    </div >
                    <RightPane />
                </div>

                <div id="wait" style={{ display: 'none' }}>
                    <div id="waitMsg"></div>
                </div>
                <div id="modal" style={{ display: 'none' }}></div>
            </div >
        )
    }
}
