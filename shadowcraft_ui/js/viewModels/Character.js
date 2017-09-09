import Item from './Item';
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
        this.stats = {
            health: 0,
            powerType: "",
            power: 0,
            str: 0,
            agi: 0,
            int: 0,
            sta: 0,
            speedRating: 0,
            speedRatingBonus: 0,
            crit: 0,
            critRating: 0,
            haste: 0,
            hasteRating: 0,
            hasteRatingPercent: 0,
            mastery: 0,
            masteryRating: 0,
            leech: 0,
            leechRating: 0,
            leechRatingBonus: 0,
            versatility: 0,
            versatilityDamageDoneBonus: 0,
            versatilityHealingDoneBonus: 0,
            versatilityDamageTakenBonus: 0,
            avoidanceRating: 0,
            avoidanceRatingBonus: 0,
            spellPen: 0,
            spellCrit: 0,
            spellCritRating: 0,
            mana5: 0,
            mana5Combat: 0,
            armor: 2288,
            dodge: 0,
            dodgeRating: 0,
            parry: 0,
            parryRating: 0,
            block: 0,
            blockRating: 0,
            mainHandDmgMin: 0,
            mainHandDmgMax: 0,
            mainHandSpeed: 0,
            mainHandDps: 0,
            offHandDmgMin: 0,
            offHandDmgMax: 0,
            offHandSpeed: 0,
            offHandDps: 0,
            rangedDmgMin: 0,
            rangedDmgMax: 0,
            rangedSpeed: 0,
            rangedDps: 0
        };
        this.talents = {
            a: "1133121",
            Z: "2113222",
            b: "1231332",
            current: "1133121"
        };
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
        this.artifact = {
            traits: { 0: 0 },
            relics: [{ id: 0, ilvl: 0 }]
        };
        this.active = "a";
        this.data_version = CHARACTER_DATA_VERSION;

    }
}