import { getArtifactIlvlChange, recalculateStats, getStatValue } from './common';

describe('getArtifactIlvlChange', () => {
    it('should return the right value', () => {
        expect(getArtifactIlvlChange('900', '900')).toEqual(0);
        expect(getArtifactIlvlChange('900', '905')).toEqual(1);
    });
});

describe('recalculateStats', () => {
    it('should return the right value', () => {
        // Heroic Fanged Slayer's Helm
//        expect(recalculateStats(147172, 915, 'head', 4)).toEqual({agility: 2496, stamina: 3744, haste: 1099, versatility: 649});
        // 910 Mantle
        expect(recalculateStats(144236, 910, 'shoulder', 5)).toEqual({agility: 1786, stamina: 2680, haste: 367, mastery: 919});
        // 1000 Mantle
//        expect(recalculateStats(144236, 1000, 'shoulder', 5)).toEqual({agility: 4133, stamina: 6199, haste: 514, mastery: 1287});
    });
});

describe('getStatValue', () => {
    it('should return the right value', () => {
        expect(getStatValue({},
                            {agi: 2, crit: 3, haste: 4, mastery: 5, versatility: 6})).toEqual(0);
        expect(getStatValue({agility: 1},
                            {agi: 2, crit: 3, haste: 4, mastery: 5, versatility: 6})).toEqual(2);
        expect(getStatValue({agility: 1, crit: 1},
                            {agi: 2, crit: 3, haste: 4, mastery: 5, versatility: 6})).toEqual(5);
        expect(getStatValue({agility: 1, crit: 1, haste: 2},
                            {agi: 2, crit: 3, haste: 4, mastery: 5, versatility: 6})).toEqual(13);
        expect(getStatValue({agility: 1, crit: 1, haste: 2, mastery: 3},
                            {agi: 2, crit: 3, haste: 4, mastery: 5, versatility: 6})).toEqual(28);
        expect(getStatValue({agility: 1, crit: 1, haste: 2, mastery: 3, versatility: 0.5},
                            {agi: 2, crit: 3, haste: 4, mastery: 5, versatility: 6})).toEqual(31);
    });
});
