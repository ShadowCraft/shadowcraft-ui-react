import { getOrderHallSet } from './OrderHallSet';

describe('getOrderHallSet should', () => {
    
    it('return an Array', () => {
        expect(getOrderHallSet('chest', 800, 1000)).toBeInstanceOf(Array);
    });

    it('return > 0 items', () => {
        expect(getOrderHallSet('chest', 800, 1000).length).toBeGreaterThan(0);
    });
    
    it('return the appropriate items for the given slot', () => {
        expect(getOrderHallSet('chest', 800, 1000)[0].equip_location).toEqual('chest');
    });
    
});