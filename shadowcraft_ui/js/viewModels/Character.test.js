import { Record, Map } from 'immutable';
import Character from './Character';
import Stats from './Stats';
import Artifact from './Artifact';
import Talents from './Talents';
import Gear from './Gear';
import { CHARACTER_DATA_VERSION } from '../item_data';


describe('Character', () => {

    const character = new Character();

    it('should return type Record', () => {
        expect(character).toBeInstanceOf(Record);
    });

    it('should return type Character', () => {
        expect(character).toBeInstanceOf(Character);
    });

    describe('region', () => {

        it('should be a string', () => {
            expect(typeof character.region).toEqual('string');
        });

        it('should be "" by default', () => {
            expect(character.region).toEqual('');
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ region: 'eu' }).region).toEqual('eu');
        });

        it('should throw error when not given a string', () => {
            expect(() => new Character({ region: 0 })).toThrowError('Character.region must be a string.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('region', 'us').region).toEqual('us');
        });

    });

    describe('realm', () => {

        it('should be a string', () => {
            expect(typeof character.realm).toEqual('string');
        });

        it('should be "" by default', () => {
            expect(character.realm).toEqual('');
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ realm: 'bloodfist' }).realm).toEqual('bloodfist');
        });

        it('should throw error when not given a string', () => {
            expect(() => new Character({ realm: 0 })).toThrowError('Character.realm must be a string.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('realm', 'hyjal').realm).toEqual('hyjal');
        });

    });

    describe('name', () => {

        it('should be a string', () => {
            expect(typeof character.name).toEqual('string');
        });

        it('should be "" by default', () => {
            expect(character.name).toEqual('');
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ name: 'mary' }).name).toEqual('mary');
        });

        it('should error when not given a string', () => {
            expect(() => new Character({ name: 0 })).toThrowError('Character.name must be a string.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('name', 'billy').name).toEqual('billy');
        });

    });

    describe('level', () => {

        it('should be a number', () => {
            expect(typeof character.level).toEqual('number');
        });

        it('should be "" by default', () => {
            expect(character.level).toEqual(0);
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ level: 132 }).level).toEqual(132);
        });

        it('should error when not given a string', () => {
            expect(() => new Character({ level: '0' })).toThrowError('Character.level must be a number.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('level', 'billy').level).toEqual('billy');
        });

    });

    describe('player_class', () => {

        it('should be a string', () => {
            expect(typeof character.player_class).toEqual('string');
        });

        it('should be "" by default', () => {
            expect(character.player_class).toEqual('');
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ player_class: 'mage' }).player_class).toEqual('mage');
        });

        it('should error when not given a string', () => {
            expect(() => new Character({ player_class: 0 }))
                .toThrowError('Character.player_class must be a string.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('player_class', 'druid').player_class).toEqual('druid');
        });

    });

    describe('race', () => {

        it('should be a string', () => {
            expect(typeof character.race).toEqual('string');
        });

        it('should be "" by default', () => {
            expect(character.race).toEqual('');
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ race: 'human' }).race).toEqual('human');
        });

        it('should error when not given a string', () => {
            expect(() => new Character({ race: 0 }))
                .toThrowError('Character.race must be a string.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('race', 'troll').race).toEqual('troll');
        });

    });

    describe('portrait', () => {

        it('should be a string', () => {
            expect(typeof character.portrait).toEqual('string');
        });

        it('should be "" by default', () => {
            expect(character.portrait).toEqual('http://us.media.blizzard.com/wow/icons/56/inv_misc_questionmark.jpg');
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ portrait: 'link' }).portrait).toEqual('link');
        });

        it('should error when not given a string', () => {
            expect(() => new Character({ portrait: 0 }))
                .toThrowError('Character.portrait must be a string.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('portrait', 'url').portrait).toEqual('url');
        });

    });

    describe('stats', () => {

        it('should be a string', () => {
            expect(character.stats).toBeInstanceOf(Stats);
        });

        it('should be a new Stats by default', () => {
            expect(character.stats).toEqual(new Stats());
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ stats: new Stats() }).stats).toEqual(new Stats());
        });

        it('should error when not given a Stats-like object', () => {
            expect(() => new Character({ stats: 0 }))
                .toThrowError('Character.stats must be a Stats object.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('stats', new Stats()).stats).toEqual(new Stats());
        });

    });

    describe('talents', () => {

        it('should be a string', () => {
            expect(character.talents).toBeInstanceOf(Talents);
        });

        it('should be a new Talents by default', () => {
            expect(character.talents).toEqual(new Talents());
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ talents: new Talents() }).talents).toEqual(new Talents());
        });

        it('should error when not given a string', () => {
            expect(() => new Character({ talents: new Stats() }))
                .toThrowError('Character.talents must be a Talents object.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('talents', new Talents()).talents).toEqual(new Talents());
        });

    });

    describe('gear', () => {

        it('should be a Gear', () => {
            expect(character.gear).toBeInstanceOf(Record);
        });

        it('should be a new Gear by default', () => {
            expect(character.gear).toEqual(new Gear());
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ gear: new Gear() }).gear).toEqual(new Gear());
        });

        it('should error when not given a Gear', () => {
            expect(() => new Character({ gear: new Talents() }))
                .toThrowError('Character.gear must be a Gear object.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('gear', new Gear()).gear).toEqual(new Gear());
        });

    });

    describe('artifact', () => {

        it('should be a string', () => {
            expect(character.artifact).toBeInstanceOf(Artifact);
        });

        it('should be a new Artifact by default', () => {
            expect(character.artifact).toEqual(new Artifact());
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ artifact: new Artifact() }).artifact).toEqual(new Artifact());
        });

        it('should error when not given a Artifact', () => {
            expect(() => new Character({ artifact: new Gear() }))
                .toThrowError('Character.gear must be a Artifact object.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('artifact', new Artifact()).artifact).toEqual(new Artifact());
        });

    });

    describe('active', () => {

        it('should be a string', () => {
            expect(typeof character.active).toEqual('string');
        });

        it('should be "a" by default', () => {
            expect(character.active).toEqual('a');
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ active: 'newactive' }).active).toEqual('newactive');
        });

        it('should error when not given a string', () => {
            expect(() => new Character({ active: 0 })).toThrowError('Character.active must be a string.');
        });

        it('should return the proper value when set', () => {
            expect(character.set('active', new Artifact()).active).toEqual(new Artifact());
        });

    });

    describe('data_version', () => {

        it('should be a string', () => {
            expect(typeof character.data_version).toEqual('number');
        });

        it('should be "" by default', () => {
            expect(character.data_version).toEqual(CHARACTER_DATA_VERSION);
        });

        it('should return the proper value upon construction', () => {
            expect(new Character({ data_version: 'blahversion' }).data_version).toEqual('blahversion');
        });

        // it('should error when not given a number', () => {
        //     expect(() => new Character({ data_version: 0 }))
        //         .toThrowError('Character.data_version must be a number.');
        // });

        it('should return the proper value when set', () => {
            expect(character.set('data_version', CHARACTER_DATA_VERSION).data_version).toEqual(CHARACTER_DATA_VERSION);
        });

    });

    it('should return not mutate the properties with set', () => {
        character.set('active', 'b');
        expect(character.active).toEqual('a');
        expect(character.active).not.toEqual('b');
    });

    it('should throw when set with propery access', () => {
        expect(() => character.race = 'volgon')
            .toThrowError('Cannot set on an immutable record.');
    });

    it('should return a new object with new properties', () => {
        const USchar = character.set('region', 'us');
        expect(USchar.region).toEqual('us');
        expect(USchar.region).not.toEqual('');
    });

    it('should set non-default properies when constructed with property arguement', () => {
        const joe = new Character({ name: 'joe' });
        expect(joe.name).toEqual('joe');
    });

    it('should return default property when property is deleted', () => {
        const bob = new Character({ name: 'bob' });
        const noname = bob.delete('name');
        expect(noname.name).toEqual('');
    });
});