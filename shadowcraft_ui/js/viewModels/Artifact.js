import { Record, Map, List } from 'immutable';
import Relic from './Relic';

const initArtifact = {
    traits: Map({ 0: 0 }),
    relics: List([new Relic(), new Relic(), new Relic()]),
    netherlight: List([new Map({tier2: 0, tier3: 0}),
                       new Map({tier2: 0, tier3: 0}),
                       new Map({tier2: 0, tier3: 0})]),
    spec: 'a'
};

export default class Artifact extends Record(initArtifact) {
    constructor(artifact){
        let _artifact = Record(initArtifact)();

        if (artifact !== undefined) {
            _artifact = _artifact.set('spec', artifact.spec);
            _artifact = _artifact.set('traits', new Map());

            for (let trait in artifact.traits) {
                _artifact = _artifact.setIn(['traits', parseInt(trait)], artifact.traits[trait]);
            }

            for (let index in artifact.relics) {
                _artifact = _artifact.setIn(['relics', index], new Relic(artifact.relics[index]));
            }

            // TODO: netherlight, if we ever get data from blizzard on it
            for (let index in artifact.netherlight) {
                _artifact = _artifact.setIn(['netherlight', index, 'tier2'], artifact.netherlight[index].tier2)
                _artifact = _artifact.setIn(['netherlight', index, 'tier3'], artifact.netherlight[index].tier3)
            }
        }
        
        super(_artifact);
    }
}
