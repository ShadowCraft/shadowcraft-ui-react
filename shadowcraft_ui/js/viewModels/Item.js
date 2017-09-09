export default class Item {
    constructor() {
        this.id = 0;
        this.slot = '';
        this.name = 'Default Item';
        this.icon = 'inv_misc_questionmark';
        this.item_level = 0;
        this.gems = [];
        this.stats = { crit: 0, mastery: 0, agility: 0, stamina: 0 };
        this.bonuses = [0];
        this.quality = 0;
        this.socket_count = 0;
        this.enchant = 0;
        this.weaponStats = { min_dmg: 0, max_dmg: 0, speed: 0, dps: 0 };
    }
}