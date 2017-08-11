import React from 'react';
import { connect } from 'react-redux';

import store from './store';
import { checkFetchStatus, updateCharacterState, getEngineData } from './store';
import { storageAvailable, storageGet, storageClear } from './common';

import GearPane from './gear/GearPane';
import TalentPane from './talents/TalentPane';
import ArtifactPane from './artifact/ArtifactPane';
import AdvancedPane from './advanced/AdvancedPane';
import DocsPane from './DocsPane';
import RightPane from './RightPane';

import ModalConductor from './modals/ModalConductor';
import { modalTypes } from './reducers/modalReducer';

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
                if (settings == null) {
                    dispatch({ type: 'CHANGE_SETTING', setting: 'race',
                               value: chardata['race'].toLowerCase()});
                }
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
        this.onOuterDivClick = this.onOuterDivClick.bind(this);
    }

    componentWillMount() {
        // Check to see if there's data in local storage before loading it from the database
        let characterData = null;
        let settingsData = null;

        if (this.props.pathinfo.sha == undefined && storageAvailable()) {
            let key = `${this.props.pathinfo.region}-${this.props.pathinfo.realm}-${this.props.pathinfo.name}`;
            let data = storageGet(key);
            if (data != null) {
                characterData = data['character'];
                settingsData = data['settings'];
            }
        }

        if (characterData != null && settingsData != null) {
            store.dispatch(setInitialCharacterData(characterData, settingsData));
        }
        else {
            let url=`/get_character_data?region=${this.props.pathinfo.region}&realm=${this.props.pathinfo.realm}&name=${this.props.pathinfo.name}`;
            if (this.props.pathinfo.sha != undefined) {
                url += `&sha=${this.props.pathinfo.sha}`;
            }

            fetch(url)
                .then(checkFetchStatus)
                .then(r => r.json())
                .then(function (json) {
                    if (this.props.pathinfo.sha == undefined) {
                        store.dispatch(setInitialCharacterData(json));
                    } else {
                        store.dispatch(setInitialCharacterData(json['character'], json['settings']));
                    }
                }.bind(this));
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

    onOuterDivClick(e) {
        // TODO: this is stupid, but it works. there has to be a better way.
        // At least it's only enabled if the modal is open.

        // Search upwards through the tree of DOM elements to see if the base
        // modal element is somewhere in tree, which means they clicked the
        // modal and not the background. if they clicked the background, hide
        // the modal.
        let found = false;
        let target = e.target;

        while (!found && target) {
            if (target.className === "modal ui-dialog") {
                found = true;
            } else {
                target = target.parentElement;
            }
        }

        if (!found) {
            store.dispatch({type: "CLOSE_MODAL"});
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
                store.dispatch({type: 'CLEAR_WARNINGS'});
                store.dispatch(updateCharacterState('RESET_CHARACTER_DATA', json));
                store.dispatch({type: 'CLEAR_HISTORY'});
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
        fetch("/get_sha", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                character: this.props.character,
                settings: this.props.settings.current
            })})
            .then(checkFetchStatus)
            .then(r => r.json())
            .then(function(json) {
                store.dispatch({type: "OPEN_MODAL",
                                data: {popupType: modalTypes.DEBUG_URL,
                                       props:{ sha: json['sha'],
                                               region: this.props.character.region,
                                               realm: this.props.character.realm,
                                               name: this.props.character.name }}});
            }.bind(this));
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
                <div onClick={this.props.modal.open ? this.onOuterDivClick : null}>

                    <ModalConductor />

                    <div style={{ display: 'flex', filter: this.props.modal.open ? 'grayscale(50%) blur(2px)' : null, WebkitFilter: this.props.modal.open ? 'grayscale(50%) blur(2px)' : null }}>
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
                        <RightPane />
                    </div>
                    <div id="footer">
                        Questions to <a href="mailto:shadowcraft@ravenholdt.net">Ravenholdt</a> &bull; UI source at <a href="http://github.com/cheald/shadowcraft-ui">GitHub</a>      &bull; discussion at <a href="https://discord.gg/DdPahJ9">Ravenholdt</a> &bull; DPS/EP engine source at <a href="https://github.com/Fierydemise/ShadowCraft-Engine">GitHub</a>      &bull; Hosting provided by <a href="http://mmo-mumble.com">MMO-Mumble.com</a>
                    </div>

                    {this.state.waitDisplayed && <div id="wait">
                        <div id="waitMsg" />
                    </div>}

                </div >
            );
        }
    }
}

const mapStateToProps = function (store) {
    return {
        character: store.character,
        settings: store.settings,
        modal: store.modal
    };
};

export default connect(mapStateToProps)(CharacterPane);
