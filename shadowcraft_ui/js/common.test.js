import { getArtifactIlvlChange, recalculateStats, getStatValue } from './common';

describe('getArtifactIlvlChange', () => {
    it('should return the right value', () => {
        expect(getArtifactIlvlChange('900', '900')).toEqual(0);
        expect(getArtifactIlvlChange('900', '905')).toEqual(1);
    });
});

describe('recalculateStats', () => {
    it('should return the right value', () => {
        expect(recalculateStats({agility: 1}, 0)).toEqual({agility: 1});
        expect(recalculateStats({agility: 1}, 100)).toEqual({agility: 3});
        expect(recalculateStats({agility: 10}, 100)).toEqual({agility: 25});
        expect(recalculateStats({speed: 1}, 1)).toEqual({speed: 1});
        expect(recalculateStats({notagilityorstamina: 1}, 1)).toEqual({notagilityorstamina: 1});
    });
});

describe('getStatValue', () => {
    it('should return the right value', () => {
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
