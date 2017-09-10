import Relic from './Relic';

export default class Artifact {
    constructor(traits = { 0: 0 }, relics = [new Relic()]) {
        this.traits = traits;
        this.relics = relics;
    }
}