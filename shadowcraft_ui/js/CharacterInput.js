import React from 'react';

export default class CharacterInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            region: 'US',
            realm: '',
            characterName: ''
        };
        this.handleRegionOnChange = this.handleRegionOnChange.bind(this);
        this.handleRealmOnChange = this.handleRealmOnChange.bind(this);
        this.handleCharacterNameOnChange = this.handleCharacterNameOnChange.bind(this);
    }

    handleRegionOnChange(event) {
        this.setState({ region: event.target.value });
    }

    handleRealmOnChange(event) {
        this.setState({ realm: event.target.value });
    }

    handleCharacterNameOnChange(event) {
        this.setState({ characterName: event.target.value });
    }

    button() {
        if (this.state.realm && this.state.characterName) return (<button type='submit'>Begin</button>);
        else return (<button type='submit' disabled>Begin</button>);
    }

    render() {
        return (
            <div className='characters-new'>
                <div id='create_character'>
                    <div className='form'>
                        <form action={`/${this.state.region.toLowerCase()}/${this.state.realm.toLowerCase().replace("'", "-").replace(" ", "-")}/${this.state.characterName.toLocaleLowerCase()}`} className="new_character" id="new_character" method="GET">
                            <span>
                                <label htmlFor='character_name'>Character Name</label>
                                <input id="character_name" value={this.state.characterName} onChange={this.handleCharacterNameOnChange} size="30" type="text" />
                            </span>
                            <span>
                                <label htmlFor='character_realm'>Realm</label>
                                <input id="character_realm" value={this.state.realm} onChange={this.handleRealmOnChange} size="30" type="text" />
                            </span>
                            <span>
                                <label htmlFor='character_region'>Region</label>
                                <div className='regions'>
                                    <label><input type="radio" value="US" checked={this.state.region === 'US'} onChange={this.handleRegionOnChange} />  US</label>
                                    <label><input type="radio" value="EU" checked={this.state.region === 'EU'} onChange={this.handleRegionOnChange} /> EU</label>
                                    <label><input type="radio" value="KR" checked={this.state.region === 'KR'} onChange={this.handleRegionOnChange} /> KR</label>
                                    <label><input type="radio" value="TW" checked={this.state.region === 'TW'} onChange={this.handleRegionOnChange} /> TW</label>
                                </div>
                            </span>
                            <div className='submit'>
                                {this.button()}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
