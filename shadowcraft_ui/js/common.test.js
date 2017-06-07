import { getArtifactIlvlChange, recalculateStats } from './common';

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
