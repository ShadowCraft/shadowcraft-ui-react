import { getArtifactIlvlChange } from '../common';
import deepClone from 'deep-clone';

export const characterActionTypes = {
    RESET_CHARACTER_DATA: 'RESET_CHARACTER_DATA',
    UPDATE_ARTIFACT_TRAITS: 'UPDATE_ARTIFACT_TRAITS',
    UPDATE_ARTIFACT_RELIC: 'UPDATE_ARTIFACT_RELIC',
    UPDATE_SPEC: 'UPDATE_SPEC',
    UPDATE_TALENTS: 'UPDATE_TALENTS',
    CHANGE_ITEM: 'CHANGE_ITEM',
    CHANGE_BONUSES: 'CHANGE_BONUSES',
    CHANGE_GEM: 'CHANGE_GEM',
    CHANGE_ENCHANT: 'CHANGE_ENCHANT'
};

export const characterReducer = function (state = {}, action) {

    switch (action.type) {

        case characterActionTypes.RESET_CHARACTER_DATA: {
            return Object.assign({}, state, action.data);
        }

        case characterActionTypes.UPDATE_ARTIFACT_TRAITS: {
            let newState = deepClone(state);
            newState.artifact.traits = action.data;
            return Object.assign({}, state, newState);
        }

        case characterActionTypes.UPDATE_ARTIFACT_RELIC: {
            let newState = Object.assign({}, state);
            if (newState.artifact.relics[action.data.slot].id != 0) {
                newState.artifact.traits[newState.artifact.relics[action.data.slot].id] -= 1;
            }

            // Determine what the artifact's ilvl should be based on any relic changes
            if (newState.artifact.relics[action.data.slot].ilvl != action.data.ilvl) {

                let change = getArtifactIlvlChange(newState.artifact.relics[action.data.slot].ilvl, action.data.ilvl);

                newState.artifact.relics[action.data.slot].ilvl = action.data.ilvl;

                newState.gear['mainHand'].item_level += change;
                newState.gear['mainHand'].stats = action.data.stats;
                newState.gear['mainHand'].weaponStats = action.data.weaponStats;

                newState.gear['offHand'].item_level += change;
                newState.gear['offHand'].stats = action.data.stats;
                newState.gear['offHand'].weaponStats = action.data.weaponStats;
            }

            newState.artifact.relics[action.data.slot].id = action.data.trait;

            // Update the new trait
            newState.artifact.traits[action.data.trait] += 1;

            return Object.assign({}, state, newState);
        }

        case characterActionTypes.UPDATE_SPEC: {
            return Object.assign({}, state, {
                active: action.data
            });
        }

        case characterActionTypes.UPDATE_TALENTS: {
            let newState = deepClone(state);
            newState.talents.current = action.data;
            return Object.assign({}, state, newState);
        }

        case characterActionTypes.CHANGE_ITEM: {

            // look away now, lest ye dispair

            //TODO: clean up the data models so this mapping isn't required.
            //not clearing bonuses and gems because idk the right mapping right now
            //not change base ilvl, since I do not know how that works and it is not in item db entry
            //context may not be mapped correctly, I'm just pulling the first entry and calling it good for now

            let item = Object.assign({}, state.gear[action.data.slot]);
            item.context = action.data.item.contexts[0];
            item.bonuses = [];
            item.icon = action.data.item.properties.icon;
            item.id = action.data.item.remote_id;
            item.item_level = action.data.item.item_level;
            item.name = action.data.item.properties.name;
            item.quality = action.data.item.properties.quality;
            item.stats = action.data.item.properties.stats;
            item.socket_count = action.data.item.properties.socket_count;

            // Generate a number of gem entries based on the number of sockets on the item
            item.gems = new Array(item.socket_count);
            item.gems.fill(0);

            let gear = Object.assign({}, state.gear, { [action.data.slot]: item });
            return Object.assign({}, state, { gear: gear });
        }

        case characterActionTypes.CHANGE_BONUSES: {
            let newGear = Object.assign({}, state.gear);
            newGear[action.data.slot].bonuses = action.data.bonuses;
            newGear[action.data.slot].itemLevel = action.data.ilvl;
            newGear[action.data.slot].stats = action.data.newStats;

            // If this item can have a bonus socket but doesn't have one assigned, nuke
            // the equipped gems out of it so they don't show back up when if a socket
            // gets added back in.
            if (action.data.canHaveBonusSocket) {
                if (!action.data.hasBonusSocket) {
                    newGear[action.data.slot].gems = [0];
                    newGear[action.data.slot].socket_count = 0;
                }
                else if (newGear[action.data.slot].socket_count == 0) {
                    newGear[action.data.slot].gems = [0];
                    newGear[action.data.slot].socket_count = 1;
                }
            }

            return Object.assign({}, state, { gear: newGear });
        }

        case characterActionTypes.CHANGE_GEM: {
            // TODO: it seems like I should be able to set just part of the state
            // here instead of copying/setting the entire gear object.
            let newGear = Object.assign({}, state.gear);

            // TODO: clean up the data models so we don't have to do this conversion
            // TODO: why is gemslot and id the same thing?
            let newGem = {
                gemslot: action.data.gem.remote_id,
                icon: action.data.gem.icon,
                id: action.data.gem.remote_id,
                name: action.data.gem.name,
                quality: action.data.gem.quality,
                bonus: ""
            }

            for (let stat in action.data.gem.stats) {
                let capStat = stat.charAt(0).toUpperCase() + stat.slice(1);
                newGem.bonus.concat(`+${action.data.gem.stats[stat]}+${capStat} / `);
            }
            newGem.bonus.slice(0, -3);
            newGear[action.data.slot].gems[action.data.gemSlot] = newGem;

            return Object.assign({}, state, { gear: newGear });
        }

        case characterActionTypes.CHANGE_ENCHANT: {
            let newGear = Object.assign({}, state.gear);
            newGear[action.data.slot].enchant = action.data.enchant;
            return Object.assign({}, state, { gear: newGear });
        }
    }

    return state;
};
