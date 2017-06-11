import React from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';

import store from './store';
import { checkFetchStatus, updateCharacterState, getEngineData } from './store';
import { storageAvailable, storageGet, storageClear } from './common';

import GearPane from './gear/GearPane';
import TalentPane from './talents/TalentPane';
import ArtifactPane from './artifact/ArtifactPane';
import AdvancedPane from './advanced/AdvancedPane';
import DocsPane from './DocsPane';
import RightPane from './RightPane';

function setInitialCharacterData(chardata, settings = null) {
    return function (dispatch) {
        dispatch({ type: 'RESET_CHARACTER_DATA', data: chardata });

        if (settings != null) {
            dispatch({ type: 'RESET_SETTINGS', data: settings });
        }

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

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'gear',
            dropdown: false,
            waitDisplayed: false
        };

        this.onDropdownClick = this.onDropdownClick.bind(this);
        this.refreshCharacter = this.refreshCharacter.bind(this);
        this.clearSavedData = this.clearSavedData.bind(this);
        this.getDebugURL = this.getDebugURL.bind(this);
    }

    componentWillMount() {
        // Check to see if there's data in local storage before loading it from the database
        let characterData = null;
        let settingsData = null;

        if (storageAvailable()) {
            characterData = storageGet('character');
            settingsData = storageGet('settings');
        }

        if (characterData != null && settingsData != null) {
            store.dispatch(setInitialCharacterData(characterData, settingsData));
        }
        else {
            let url=`/get_character_data?region=${this.props.pathinfo.region}&realm=${this.props.pathinfo.realm}&name=${this.props.pathinfo.name}`;
            fetch(url)
                .then(checkFetchStatus)
                .then(r => r.json())
                .then(function (json) {
                    store.dispatch(setInitialCharacterData(json));
                });
        }
    }

    renderTab(tab) {
        switch (tab) {
            case 'gear': return <GearPane />;
            case 'talents': return <TalentPane />;
            case 'artifact': return <ArtifactPane />;
            case 'advanced': return <AdvancedPane />;
            case 'documentation': return <DocsPane />;
            default: return (<div>unrecognized string passed to CharacterPane.renderTab</div>);
        }
    }

    onDropdownClick() {
        this.setState({dropdown: !this.state.dropdown});
    }

    refreshCharacter() {
        this.setState({waitDisplayed: true});

        let url=`/get_character_data?region=${this.props.character.region}&realm=${this.props.character.realm}&name=${this.props.character.name}`;
        fetch(url)
            .then(checkFetchStatus)
            .then(r => r.json())
            .then(function (json) {
                store.dispatch(updateCharacterState('RESET_CHARACTER_DATA', json));
                this.setState({waitDisplayed: false});
            }.bind(this));
    }

    clearSavedData() {
        if (storageAvailable()) {
            storageClear();
        }

        this.refreshCharacter();
    }

    getDebugURL() {
        console.log("get debug url");
    }

    render() {
        if (Object.keys(this.props.character).length === 0) {
            return (
                <div id="wait">
                    <div id="waitMsg" />
                </div>
            );
        } else {
        return (
            <div>
                <div style={{ marginBottom: '25px', display: 'flex' }}>
                    <div id="container" style={{ flex: 4 }}>
                        <div id="curtain">
                            <div className="tabs" id="tabs">
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
                                        <li className="tabs-menu-item" onClick={this.onDropdownClick}>
                                            <a className="dropdown">
                                                <img src='/static/images/cog.png'/>
                                                {this.state.dropdown && <ul className="dropdownMenu">
                                                    <li onClick={this.refreshCharacter}>Refresh from armory</li>
                                                    <li onClick={this.clearSavedData}>Clear all saved data</li>
                                                    <li onClick={this.getDebugURL}>Get Debug URL</li>
                                                </ul>}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                <article className="tab-panel">
                                    {this.renderTab(this.state.currentTab)}
                                </article>
                            </div>
                        </div>
                    </div >
                    <RightPane />
                </div>

                {this.state.waitDisplayed && <div id="wait">
                    <div id="waitMsg" />
                </div>}

                <div id="footer">
                    <div className='padding'>
                        Questions to <a href="mailto:shadowcraft@ravenholdt.net">Ravenholdt</a> &bull; UI source at <a href="http://github.com/cheald/shadowcraft-ui">GitHub</a>      &bull; discussion at <a href="https://discord.gg/DdPahJ9">Ravenholdt</a> &bull; DPS/EP engine source at <a href="https://github.com/Fierydemise/ShadowCraft-Engine">GitHub</a>      &bull; Hosting provided by <a href="http://mmo-mumble.com">MMO-Mumble.com</a>
                    </div>
                </div>
            </div >
        );
        }
    }
}

const mapStateToProps = function (store) {
    return {
        character: store.character
    };
};

export default connect(mapStateToProps)(CharacterPane);
