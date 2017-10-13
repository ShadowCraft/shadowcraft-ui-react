import { Record, Map, List } from 'immutable';
import Relic from './Relic';

const artifact = {
    traits: Map({ 0: 0 }),
    relics: List([new Relic()]),
    netherlight: [
        { tier2: 0, tier3: 0 },
        { tier2: 0, tier3: 0 },
        { tier2: 0, tier3: 0 }
    ],
    spec: 'a'
};

export default class Artifact extends Record(artifact) { }
