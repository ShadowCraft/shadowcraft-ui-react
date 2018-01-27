import Character from '../viewModels/Character';
import Stats from '../viewModels/Stats';
import Talents from '../viewModels/Talents';
import Gear from '../viewModels/Gear';
import Item from '../viewModels/Item';
import { fromJS, Map, List } from 'immutable';
import { ITEM_DATA } from '../item_data';

export const characterActionTypes = {
    RESET_CHARACTER_DATA: 'RESET_CHARACTER_DATA',
    UPDATE_SPEC: 'UPDATE_SPEC',
    UPDATE_TALENTS: 'UPDATE_TALENTS',
    CHANGE_ITEM: 'CHANGE_ITEM',
    CHANGE_BONUSES: 'CHANGE_BONUSES',
    CHANGE_GEM: 'CHANGE_GEM',
    CHANGE_ENCHANT: 'CHANGE_ENCHANT',
    OPTIMIZE_GEMS: 'OPTIMIZE_GEMS',
    OPTIMIZE_ENCHANTS: 'OPTIMIZE_ENCHANTS'
};

function makeGem(actionGem) {

    if (actionGem) {
        let newGem = {
            name: actionGem.name,
            id: actionGem.id,
            icon: actionGem.icon,
            quality: actionGem.quality,
            bonus: ""
        };

        for (let stat in actionGem.stats) {
            let capStat = stat.charAt(0).toUpperCase() + stat.slice(1);
            newGem.bonus = newGem.bonus.concat(`+${actionGem.stats[stat]} ${capStat} / `);
        }

        newGem.bonus = newGem.bonus.slice(0, -3);

        return new Map(newGem);
    }
    else {
        return new Map({
            icon: '',
            id: 0,
            name: 'Empty Gem Socket',
            quality: 0,
            bonus: ''
        });
    }
}

function calculateAverageIlvl(state) {

    let totalIlvl = 0;
    state.get('gear').keySeq().forEach(slot => {
        totalIlvl += state.getIn(['gear', slot, 'item_level']);
    });

    return Math.round(totalIlvl / 16.0 * 100.0) / 100.0;
}

export const characterReducer = function (state = new Character(), action) {

    if (!(state instanceof Character)) state = fromJS(state);

    switch (action.type) {

        case characterActionTypes.RESET_CHARACTER_DATA: {
            return new Character({
                region: action.data.region,
                realm: action.data.realm,
                name: action.data.name,
                level: action.data.level,
                player_class: action.data.player_class,
                race: action.data.race,
                portrait: action.data.portrait,
                stats: new Stats(action.data.stats),
                talents: new Talents(action.data.talents),
                gear: new Gear({
                    head: new Item(action.data.gear.head),
                    neck: new Item(action.data.gear.neck),
                    shoulder: new Item(action.data.gear.shoulder),
                    back: new Item(action.data.gear.back),
                    chest: new Item(action.data.gear.chest),
                    wrist: new Item(action.data.gear.wrist),
                    hands: new Item(action.data.gear.hands),
                    waist: new Item(action.data.gear.waist),
                    legs: new Item(action.data.gear.legs),
                    feet: new Item(action.data.gear.feet),
                    finger1: new Item(action.data.gear.finger1),
                    finger2: new Item(action.data.gear.finger2),
                    trinket1: new Item(action.data.gear.trinket1),
                    trinket2: new Item(action.data.gear.trinket2),
                    mainHand: new Item(action.data.gear.mainHand),
                    offHand: new Item(action.data.gear.offHand),
                }),
                active: action.data.active,
                data_version: action.data.data_version,
                avg_item_level: action.data.avg_item_level,
            });
        }

        case characterActionTypes.UPDATE_SPEC: {
            return state.set('active', action.data);
        }

        case characterActionTypes.UPDATE_TALENTS: {
            return state.setIn(['talents', 'current'], action.data);
        }

        case characterActionTypes.CHANGE_ITEM: {

            let item = action.data.item;
            item = item.set('slot', action.data.slot);
            item = item.set('enchant', state.getIn(['gear', action.data.slot, 'enchant'], 0));

            // Generate a number of gem entries based on the number of sockets on the item
            let gems = new List();
            for (let i = 0; i < item.socket_count; i++) {
                gems = gems.push(makeGem(null));
            }
            item = item.set('gems', gems);

            state = state.setIn(['gear', action.data.slot], item);
            state = state.set('avg_item_level', calculateAverageIlvl(state));

            return state;
        }

        case characterActionTypes.CHANGE_BONUSES: {

            let item = state.getIn(['gear', action.data.slot]);
            item = item.set('bonuses', new List(action.data.bonuses))
                       .set('item_level', action.data.ilvl);

            if (action.data.hasNewStats) {
                item = item.set('stats', new Map(action.data.newStats));
            }

            // If this item can have a bonus socket but doesn't have one assigned, nuke
            // the equipped gems out of it so they don't show back up when if a socket
            // gets added back in.
            if (action.data.canHaveBonusSocket) {
                if (!action.data.hasBonusSocket) {
                    item = item.set('gems', List()).set('socket_count', 0);
                }
                else if (item.get('socket_count') == 0) {
                    item = item.set('gems', List([makeGem(null)])).set('socket_count', 1);
                }
            }

            if (action.data.suffix.length > 0) {
                item = item.set('name', `${action.data.name} ${action.data.suffix}`);
            }
            else {
                item = item.set('name', action.data.name);
            }

            state = state.setIn(['gear', action.data.slot], item);
            state = state.set('avg_item_level', calculateAverageIlvl(state));

            return state;
        }

        case characterActionTypes.CHANGE_GEM: {
            return state.setIn(['gear', action.data.slot, 'gems', action.data.gemSlot],
                makeGem(action.data.gem));
        }

        case characterActionTypes.CHANGE_ENCHANT: {
            return state.setIn(['gear', action.data.slot, 'enchant'], action.data.enchant);
        }

        case characterActionTypes.OPTIMIZE_GEMS: {

            let newNonjcGem = makeGem(action.data.nonjc);

            // Set all of the gems to the new non-jc gem, keeping track of whether or not
            // we found an JC agi gem somewhere in there.
            let foundAgiGem = false;
            let firstGemSlot = null;
            state.get('gear').keySeq().forEach(slot => {
                for (let idx = 0; idx < state.getIn(['gear', slot, 'socket_count']); idx++) {
                    if (firstGemSlot == null) {
                        firstGemSlot = slot;
                    }

                    const currentId = state.getIn(['gear', slot, 'gems', idx, 'id']);

                    if (currentId == action.data.jc.id) {
                        foundAgiGem = true;
                    } else if (currentId != action.data.jc.id && currentId != action.data.nonjc.id) {
                        state = state.setIn(['gear', slot, 'gems', idx], newNonjcGem);
                    }
                }
            });

            // If we didn't find an JC gem, set the first available gem slot to that.
            if (!foundAgiGem && firstGemSlot != null) {
                state = state.setIn(['gear', firstGemSlot, 'gems', 0], makeGem(action.data.jc));
            }

            return state;
        }

        case characterActionTypes.OPTIMIZE_ENCHANTS: {

            return state.setIn(['gear', 'neck', 'enchant'], action.data.neck)
                .setIn(['gear', 'back', 'enchant'], action.data.back)
                .setIn(['gear', 'finger1', 'enchant'], action.data.finger)
                .setIn(['gear', 'finger2', 'enchant'], action.data.finger);
        }
    }

    return state;
};
