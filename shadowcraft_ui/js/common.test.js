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

        // Recalculation of 879 kingslayers to 882 kingslayers
        expect(recalculateStats({agility: 765, stamina: 1147, crit: 332, mastery: 319}, 3, 'mainHand'))
            .toEqual({agility: 787, stamina: 1180, crit: 336, mastery: 323});

        // Recalculation of 836 kingslayers to 882 kingslayers. The values are slightly
        // different than above due to rounding/floating point error.
        expect(recalculateStats({agility: 512, stamina: 768, crit: 283, mastery: 272}, 46, 'mainHand'))
            .toEqual({agility: 786, stamina: 1179, crit: 336, mastery: 323});

        // Recalculation of 879 to 882 weapon stats
        expect(recalculateStats({dps: 2372.51, min_dmg: 3203, max_dmg: 5338}, 3, 'mainHand'))
            .toEqual({dps: 2467, min_dmg: 3331, max_dmg: 5551});
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
