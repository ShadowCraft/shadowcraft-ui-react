import Relic from './Relic';

export default function Artifact(traits = { 0: 0 }, relics = [new Relic()]) {
    return {
        traits: traits,
        relics: relics,
    };
}
