import Item from './Item';
import Stats from './Stats';
import Talents from './Talents';
import Artifact from './Artifact';
import { CHARACTER_DATA_VERSION } from '../item_data';

export default function Character() {
    return {
        region: "",
        realm: "",
        name: "",
        level: 0,
        player_class: "",
        race: "",
        portrait: "http://us.media.blizzard.com/wow/icons/56/inv_misc_questionmark.jpg",
        stats: Stats(),
        talents: Talents(),
        gear: {
            head: Item(),
            neck: Item(),
            shoulder: Item(),
            back: Item(),
            chest: Item(),
            wrist: Item(),
            hands: Item(),
            waist: Item(),
            legs: Item(),
            feet: Item(),
            finger1: Item(),
            finger2: Item(),
            trinket1: Item(),
            trinket2: Item(),
            mainHand: Item(),
            offHand: Item(),
        },
        artifact: Artifact(),
        active: 'a',
        data_version: CHARACTER_DATA_VERSION,
    };
}
