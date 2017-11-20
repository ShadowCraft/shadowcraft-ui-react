import { getItems } from './index';

describe('getItems should', () => {
    
    it('return an Array', () => {
        expect(getItems('shoulder', 900, 1000)).toBeInstanceOf(Array);
    });

    it('return more than one item', () => {
        expect(getItems('shoulder', 900, 1000).length).toBeGreaterThan(0);
    });
    
});