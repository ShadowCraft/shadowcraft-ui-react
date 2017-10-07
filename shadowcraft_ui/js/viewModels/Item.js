export default function Item() {
    return {
        id: 0,
        slot: '',
        name: 'Default Item',
        icon: 'inv_misc_questionmark',
        item_level: 0,
        gems: [],
        stats: { crit: 0, mastery: 0, agility: 0, stamina: 0 },
        bonuses: [0],
        quality: 0,
        socket_count: 0,
        enchant: 0,
        weaponStats: { min_dmg: 0, max_dmg: 0, speed: 0, dps: 0 },
    };
}