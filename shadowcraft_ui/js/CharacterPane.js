import React from 'react';
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

function setInitialCharacterData(chardata) {
    return function (dispatch) {
        dispatch({ type: 'RESET_CHARACTER_DATA', data: chardata });

        fetch('/settings')
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                dispatch({ type: 'SETTINGS_LAYOUT', data: json });
                dispatch(getEngineData());
            });
    };
}

class CharacterPane extends React.Component {

    constructor() {
        super();
        this.state = {
            currentTab: 'gear'
        };
    }

    componentWillMount() {
        store.dispatch(setInitialCharacterData(this.props.data));
    }

    renderTab(tab) {
        switch (tab) {
            case 'gear': return <GearPane />;
            case 'talents': return <TalentPane />;
            case 'artifact': return <ArtifactPane />;
            case 'advanced': return <AdvancedPane />;
            case 'documentation': return <DocsPane />;
            default: return (<div>unreconized string passed to CharacterPane.renderTab</div>);
        }
    }

    render() {
        return (
            <div>
                <div style={{ marginBottom: '25px', display: 'flex' }}>
                    <div id="container" style={{ flex: 4 }}>
                        <div id="curtain">
                            <div id='tabs'>
                                <div className="tabs">
                                    <nav className="tabs-navigation">
                                        <ul className="tabs-menu">
                                            <li className={`tabs-menu-item ${this.state.currentTab === 'gear' ? 'is-active' : ''}`}
                                                onClick={() => this.setState({ currentTab: 'gear' })}
                                            ><a>Gear</a></li>
                                            <li className={`tabs-menu-item ${this.state.currentTab === 'talents' ? 'is-active' : ''}`}
                                                onClick={() => this.setState({ currentTab: 'talents' })}
                                            ><a>Talents</a></li>
                                            <li className={`tabs-menu-item ${this.state.currentTab === 'artifact' ? 'is-active' : ''}`}
                                                onClick={() => this.setState({ currentTab: 'artifact' })}
                                            ><a>Artifact</a></li>
                                            <li className={`tabs-menu-item ${this.state.currentTab === 'advanced' ? 'is-active' : ''}`}
                                                onClick={() => this.setState({ currentTab: 'advanced' })}
                                            ><a>Advanced</a></li>
                                            <li className={`tabs-menu-item ${this.state.currentTab === 'documenation' ? 'is-active' : ''}`}
                                                onClick={() => this.setState({ currentTab: 'documentation' })}
                                            ><a>Documentation</a></li>
                                        </ul>
                                    </nav>
                                    <article className="tab-panel">
                                        {this.renderTab(this.state.currentTab)}
                                    </article>
                                </div>
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

const mapStateToProps = function (store) {
    return {
        store_data: store.character
    };
};

export default connect(mapStateToProps)(CharacterPane);
