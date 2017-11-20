import { getLegionCraftedItems } from './legionCraftedItems';

describe('getLegionCraftedItems should', () => {
    
    it('return an Array', () => {
        expect(getLegionCraftedItems('shoulder', 900)).toBeInstanceOf(Array);
    });

    it('return > 0 items', () => {
        expect(getLegionCraftedItems('shoulder', 900).length).toBeGreaterThan(0);
    });
    
    it('return the appropriate items for the given slot', () => {
        expect(getLegionCraftedItems('shoulder', 900)[0].equip_location).toEqual('shoulder');
    });
    
});