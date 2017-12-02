import { getItems, getVariants, getMissingItems, findMissingItems } from './index';

describe('getItems should', () => {

    it('return an Array', () => {
        expect(getItems('shoulder', 900, 1000)).toBeInstanceOf(Array);
    });

    it('return more than one item', () => {
        expect(getItems('shoulder', 900, 1000).length).toBeGreaterThan(0);
    });

});

describe('getVariants should', () => {

    it('return an Array', () => {
        expect(getVariants('shoulder', 900, 1000)).toBeInstanceOf(Array);
    });

    it('return more than one item', () => {
        expect(getVariants('shoulder', 900, 1000).length).toBeGreaterThan(0);
    });

});

describe('getMissingItems should', () => {

    it('return an array', () => {
        expect(getMissingItems([], [])).toBeInstanceOf(Array);
    });

    it('should only return missing item variants', () => {
        const unfiltered = [
            { id: 0, equip_location: 'head', item_level: 100 },
            { id: 1, equip_location: 'head', item_level: 100 },
        ];
        const variants = [
            { id: 0, equip_location: 'head', item_level: 100 },
        ];
        const expected = [
            { id: 1, equip_location: 'head', item_level: 100 },
        ];
        expect(getMissingItems(unfiltered, variants, 'head', 100, 100)).toEqual(expected);
    });
});

describe('findMissingItems should', () => {

    it('find missing items', () => {
        expect(findMissingItems().length).toEqual(0);
    });
});