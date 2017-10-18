import { Record, Map, List } from 'immutable';
import Relic from './Relic';

const initArtifact = {
    traits: Map({ 0: 0 }),
    relics: List([new Relic()]),
    netherlight: [
        { tier2: 0, tier3: 0 },
        { tier2: 0, tier3: 0 },
        { tier2: 0, tier3: 0 }
    ],
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

            // TODO: netherlight
        }

        super(_artifact);
    }
}
