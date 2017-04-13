import React from 'react';
import Tabs from 'react-simpletabs-alt';
import { connect } from 'react-redux';
import 'whatwg-fetch';

import store from './store';
import { getEngineData } from './store';

import GearPane from './gear/GearPane';
import TalentPane from './talents/TalentPane';
import ArtifactPane from './artifact/ArtifactPane';
import AdvancedPane from './advanced/AdvancedPane';
import DocsPane from './DocsPane';
import RightPane from './RightPane';

function setInitialCharacterData(chardata)
{
    return function(dispatch) {
        dispatch({type: 'RESET_CHARACTER_DATA', data: chardata});

        fetch('/settings')
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                dispatch({type: 'SETTINGS_LAYOUT', data: json});
                dispatch(getEngineData());
            });
    };
}

class CharacterPane extends React.Component {
    // hold on to your butts

    componentWillMount() {
        store.dispatch(setInitialCharacterData(this.props.data));
    }

    render() {

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
                                        <TalentPane />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Artifact">
                                        <ArtifactPane />
                                    </Tabs.Panel>
                                    <Tabs.Panel title="Advanced">
                                        <AdvancedPane />
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

const mapStateToProps = function(store) {
    return {
        store_data: store.character
    };
};

export default connect(mapStateToProps)(CharacterPane);
