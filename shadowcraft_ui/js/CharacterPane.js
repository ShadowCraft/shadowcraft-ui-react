import React from "react"
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
        this.handleArtifactChange = this.handleArtifactChange.bind(this)
        this.state = this.props.data;
    }

    handleArtifactChange(artifact){
        // we will hand this to the Artifact component so that it can change the state here in CharacterPane
        console.log('CharacterPane.handleArtifactChange called');
        // call setState with changed artifact here
        // something like
        // this.state.artifact.setState(artifact)
        // or something...
        console.log(this.state.artifact)
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <div id="container" style={{ flex: 4 }}>
                        <div id="curtain">
                            <Tabs>
                                <Tabs.Panel title="Gear">
                                    <GearPane data={this.props.data} />
                                </Tabs.Panel>
                                <Tabs.Panel title="Talents">
                                    <TalentPane data={this.props.data} />
                                </Tabs.Panel>
                                <Tabs.Panel title="Artifact">
                                    {/*pass the this.state dependant data to the compent, and give it a function to call when it changes*/}
                                    {/*onChange is a convention, you can use any name, it is just a prop that gives us a function to update state*/}
                                    <ArtifactPane data={this.state.artifact} onChange={this.handleArtifactChange} />
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
