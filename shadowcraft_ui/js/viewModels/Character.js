import Stats from './Stats';
import Talents from './Talents';
import Gear from './Gear';
import Artifact from './Artifact';
import { CHARACTER_DATA_VERSION } from '../item_data';
import { Record } from 'immutable';

const initialCharacter = {
    region: "",
    realm: "",
    name: "",
    level: 0,
    player_class: "",
    race: "",
    portrait: "http://us.media.blizzard.com/wow/icons/56/inv_misc_questionmark.jpg",
    stats: new Stats(),
    talents: new Talents(),
    gear: new Gear(),
    artifact: new Artifact(),
    active: 'a',
    data_version: CHARACTER_DATA_VERSION,
};

export default class Character extends Record(initialCharacter) {

    constructor(character) {
        let _character = Record(initialCharacter)();

        if (character !== undefined) {

            if (character.region !== undefined) {

                if (typeof character.region === 'string') {
                    _character = _character.set('region', character.region);
                }
                else {
                    throw new Error('Character.region must be a string.');
                }
            }

            if (character.realm !== undefined) {

                if (typeof character.realm === 'string') {
                    _character = _character.set('realm', character.realm);
                }
                else {
                    throw new Error('Character.realm must be a string.');
                }
            }

            if (character.level !== undefined) {

                if (typeof character.level === 'number') {
                    _character = _character.set('level', character.level);
                }
                else {
                    throw new Error('Character.level must be a number.');
                }
            }

            if (character.name !== undefined) {

                if (typeof character.name === 'string') {
                    _character = _character.set('name', character.name);
                }
                else {
                    throw new Error('Character.name must be a string.');
                }

            }

            if (character.player_class !== undefined) {

                if (typeof character.player_class === 'string') {
                    _character = _character.set('player_class', character.player_class);
                }
                else {
                    throw new Error('Character.player_class must be a string.');
                }
            }

            if (character.race !== undefined) {

                if (typeof character.race === 'string') {
                    _character = _character.set('race', character.race);
                }
                else {
                    throw new Error('Character.race must be a string.');
                }
            }

            if (character.portrait !== undefined) {

                if (typeof character.portrait === 'string') {
                    _character = _character.set('portrait', character.portrait);
                }
                else {
                    throw new Error('Character.portrait must be a string.');
                }
            }

            if (character.stats !== undefined) {

                if (character.stats instanceof Stats) {
                    _character = _character.set('stats', character.stats);
                }
                else {
                    throw new Error('Character.stats must be a Stats object.');
                }
            }

            if (character.talents !== undefined) {

                if (character.talents instanceof Talents) {
                    _character = _character.set('talents', character.talents);
                }
                else {
                    throw new Error('Character.talents must be a Talents object.');
                }
            }

            if (character.gear !== undefined) {

                if (character.gear instanceof Gear) {
                    _character = _character.set('gear', character.gear);
                }
                else {
                    throw new Error('Character.gear must be a Gear object.');
                }
            }

            if (character.artifact !== undefined) {

                if (character.artifact instanceof Artifact) {
                    _character = _character.set('artifact', character.artifact);
                }
                else {
                    throw new Error('Character.gear must be a Artifact object.');
                }
            }

            if (character.active !== undefined) {

                if (typeof character.active === 'string') {
                    _character = _character.set('active', character.active);
                }
                else {
                    throw new Error('Character.active must be a string.');
                }
            }

            if (character.data_version !== undefined) {

                // if (typeof character.data_version === 'string') {
                    _character = _character.set('data_version', character.data_version);
                // }
                // else {
                //     throw new Error('Character.data_version must be a number.');
                // }
            }
        }

        super(_character);
    }
}
