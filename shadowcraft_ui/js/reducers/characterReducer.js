import { getArtifactIlvlChange, recalculateStats, ItemType } from '../common';
import Character from '../viewModels/Character';
import Relic from '../viewModels/Relic';
import Traits from '../viewModels/Traits';
import Artifact from '../viewModels/Artifact';
import Stats from '../viewModels/Stats';
import Talents from '../viewModels/Talents';
import Gear from '../viewModels/Gear';
import Item from '../viewModels/Item';
import { fromJS, Record, Map, List } from 'immutable';
import { ITEM_DATA } from '../item_data';

export const characterActionTypes = {
    RESET_CHARACTER_DATA: 'RESET_CHARACTER_DATA',
    UPDATE_ARTIFACT_TRAITS: 'UPDATE_ARTIFACT_TRAITS',
    RESET_ARTIFACT: 'RESET_ARTIFACT',
    UPDATE_ARTIFACT_RELIC: 'UPDATE_ARTIFACT_RELIC',
    UPDATE_NETHERLIGHT: 'UPDATE_NETHERLIGHT',
    UPDATE_SPEC: 'UPDATE_SPEC',
    UPDATE_TALENTS: 'UPDATE_TALENTS',
    CHANGE_ITEM: 'CHANGE_ITEM',
    CHANGE_BONUSES: 'CHANGE_BONUSES',
    CHANGE_GEM: 'CHANGE_GEM',
    CHANGE_ENCHANT: 'CHANGE_ENCHANT',
    OPTIMIZE_GEMS: 'OPTIMIZE_GEMS',
    OPTIMIZE_ENCHANTS: 'OPTIMIZE_ENCHANTS',
    SWAP_ARTIFACT_WEAPON: 'SWAP_ARTIFACT_WEAPON',
};

function makeGem(actionGem) {

    if (actionGem) {
        let newGem = {
            icon: actionGem.icon,
            id: actionGem.id,
            name: actionGem.name,
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
                artifact: new Artifact(action.data.artifact),
                active: action.data.active,
                data_version: action.data.data_version,
            });
        }

        case characterActionTypes.UPDATE_ARTIFACT_TRAITS: {
            return state.setIn(['artifact', 'traits'], action.data);
        }

        case characterActionTypes.RESET_ARTIFACT: {
            let newRelics = new List([new Relic(), new Relic(), new Relic()]);
            let newNL = new List([new Map({tier2: 0, tier3: 0}),
                                  new Map({tier2: 0, tier3: 0}),
                                  new Map({tier2: 0, tier3: 0})]);

            let newState = state.setIn(['artifact', 'traits'], Traits(action.data));
            newState = newState.setIn(['artifact', 'relics'], newRelics);
            newState = newState.setIn(['artifact', 'netherlight'], newNL);

            return newState;
        }

        case characterActionTypes.UPDATE_ARTIFACT_RELIC: {

            const currentRelic = state.getIn(['artifact', 'relics', action.data.slot]);
            const currentRelicId = currentRelic.get('id');
            const currentRelicIlvl = currentRelic.get('ilvl');

            let newState = state;

            // If the current relic's ID isn't zero (which means there's one set), subtract
            // one from the value for that trait. If the trait didn't change, it'll get set
            // back later.
            if (currentRelicId !== 0) {
                let value = newState.getIn(['artifact', 'traits', currentRelicId]) - 1;
                newState = newState.setIn(['artifact', 'traits', currentRelicId], value);
            }

            // Determine what the artifact's ilvl should be based on any relic changes
            if (currentRelicIlvl !== action.data.ilvl) {

                let ilvlChange = 0;
                if (currentRelicId != 0) {
                    ilvlChange = getArtifactIlvlChange(currentRelicIlvl, action.data.ilvl);
                }
                else {
                    ilvlChange = getArtifactIlvlChange(0, action.data.ilvl);
                }

                newState = newState.setIn(['artifact', 'relics', action.data.slot, 'ilvl'], action.data.ilvl);

                let mainHand = newState.getIn(['gear', 'mainHand']);
                let newIlvl = mainHand.get('item_level') + ilvlChange;
                let newStats = recalculateStats(mainHand.get('stats'), ilvlChange, 'mainHand');
                let newWeaponStats = recalculateStats(mainHand.get('weaponStats'), ilvlChange,
                    'mainHand');

                mainHand = mainHand.set('item_level', newIlvl)
                    .set('stats', newStats)
                    .set('weaponStats', newWeaponStats);

                let offHand = newState.getIn(['gear', 'offHand']);
                newIlvl = offHand.get('item_level') + ilvlChange;
                newStats = recalculateStats(offHand.get('stats'), ilvlChange, 'offHand');
                newWeaponStats = recalculateStats(offHand.get('weaponStats'), ilvlChange,
                    'offHand');

                offHand = offHand.set('item_level', newIlvl)
                    .set('stats', newStats)
                    .set('weaponStats', newWeaponStats);

                newState = newState.setIn(['gear', 'mainHand'], mainHand)
                    .setIn(['gear', 'offHand'], offHand)
                    .setIn(['artifact', 'relics', action.data.slot, 'ilvl'],
                    action.data.ilvl);
            }

            newState = newState.setIn(['artifact', 'relics', action.data.slot, 'id'], action.data.trait);

            // Update the new trait
            if (action.data.trait !== 0) {
                let value = newState.getIn(['artifact', 'traits', action.data.trait]) + 1;
                newState = newState.setIn(['artifact', 'traits', action.data.trait], value);
            }

            return newState;
        }

        case characterActionTypes.UPDATE_NETHERLIGHT: {
            state = state.setIn(['artifact', 'netherlight', action.data.slot, 'tier2'], action.data.tier2);
            state = state.setIn(['artifact', 'netherlight', action.data.slot, 'tier3'], action.data.tier3);
            return state;
        }

        case characterActionTypes.SWAP_ARTIFACT_WEAPON: {

            let newState = state;
            let itemIDs = [];
            switch (action.data) {
                case 'a': {
                    itemIDs = [128870, 128869];
                    break;
                }
                case 'Z': {
                    itemIDs = [128872, 134552];
                    break;
                }
                case 'b': {
                    itemIDs = [128476, 128479];
                    break;
                }
            }

            if (itemIDs.length > 0) {
                let artifact = ITEM_DATA.filter(function(item) {
                    return itemIDs.indexOf(item.id) != -1;
                }.bind(itemIDs));

                for (let i = 0; i < artifact.length; i++) {
                    let itemData = artifact[i];
                    let stats = itemData['ilvls']['750'];
                    let item = new Item({
                        id: itemData.id,
                        slot: itemData.equip_location,
                        name: itemData.name,
                        icon: itemData.icon,
                        item_level: 750,
                        gems: [],
                        stats: stats.stats,
                        bonuses: stats.bonuses,
                        quality: stats.quality,
                        socket_count: 0,
                        enchant: 0,
                        weaponStats: stats.weaponStats
                    });
                    newState = newState.setIn(['gear', itemData.equip_location], item);
                }
            }

            return newState;
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

            return state.setIn(['gear', action.data.slot], item);
        }

        case characterActionTypes.CHANGE_BONUSES: {

            let item = state.getIn(['gear', action.data.slot]);
            item = item.set('bonuses', new List(action.data.bonuses))
                .set('item_level', action.data.ilvl)
                .set('stats', new Map(action.data.newStats));

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

            return state.setIn(['gear', action.data.slot], item);
        }

        case characterActionTypes.CHANGE_GEM: {
            return state.setIn(['gear', action.data.slot, 'gems', action.data.gemSlot],
                makeGem(action.data.gem));
        }

        case characterActionTypes.CHANGE_ENCHANT: {
            return state.setIn(['gear', action.data.slot, 'enchant'], action.data.enchant);
        }

        case characterActionTypes.OPTIMIZE_GEMS: {

            let newRareGem = makeGem(action.data.rare);

            // Set all of the gems to the new rare gem, keeping track of whether or not
            // we found an epic agi gem somewhere in there.
            let foundAgiGem = false;
            let firstGemSlot = null;
            state.get('gear').keySeq().forEach(slot => {
                for (let idx = 0; idx < state.getIn(['gear', slot, 'socket_count']); idx++) {
                    if (firstGemSlot == null) {
                        firstGemSlot = slot;
                    }

                    const currentId = state.getIn(['gear', slot, 'gems', idx, 'id']);

                    if (currentId == action.data.epic.id) {
                        foundAgiGem = true;
                    } else if (currentId != action.data.epic.id && currentId != action.data.rare.id) {
                        state = state.setIn(['gear', slot, 'gems', idx], newRareGem);
                    }
                }
            });

            // If we didn't find an epic gem, set the first available gem slot to that.
            if (!foundAgiGem && firstGemSlot != null) {
                state = state.setIn(['gear', firstGemSlot, 'gems', 0], makeGem(action.data.epic));
            }

            return state.toJS();
        }

        case characterActionTypes.OPTIMIZE_ENCHANTS: {

            return state.setIn(['gear', 'neck', 'enchant'], action.data.neck)
                .setIn(['gear', 'back', 'enchant'], action.data.back)
                .setIn(['gear', 'finger1', 'enchant'], action.data.finger)
                .setIn(['gear', 'finger2', 'enchant'], action.data.finger)
                .toJS();
        }
    }

    return state;
};
