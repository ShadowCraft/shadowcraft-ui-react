import Item from './Item';
import Stats from './Stats';
import Talents from './Talents';
import Artifact from './Artifact';
import { CHARACTER_DATA_VERSION } from '../item_data';

export default class Character {
    constructor() {
        this.region = "";
        this.realm = "";
        this.name = "";
        this.level = 0;
        this.player_class = "";
        this.race = "";
        this.portrait = "http://us.media.blizzard.com/wow/icons/56/inv_misc_questionmark.jpg";
        this.stats = new Stats();
        this.talents = new Talents();
        this.gear = {
            head: new Item(),
            neck: new Item(),
            shoulder: new Item(),
            back: new Item(),
            chest: new Item(),
            wrist: new Item(),
            hands: new Item(),
            waist: new Item(),
            legs: new Item(),
            feet: new Item(),
            finger1: new Item(),
            finger2: new Item(),
            trinket1: new Item(),
            trinket2: new Item(),
            mainHand: new Item(),
            offHand: new Item(),
        };
        this.artifact = new Artifact();
        this.active = "a";
        this.data_version = CHARACTER_DATA_VERSION;
    }
}