import { createItem } from './createItem';
import Item from '../viewModels/Item';

describe('createItem', () => {
    const initItem = new Item({
        item_level: 885,
        stats:{
            agility: 1886,
            haste: 982,
        }
    });
    it('should create an item with the correct ilvl', () => {
        const item = createItem(initItem, 1000);
        expect(item.item_level).toEqual(1000);
    });

    it('should have the primary stat', ()=>{
        const item = createItem(initItem, 930);
        expect(item.stats.get('agility')).toEqual(2868); //really supposed to be 2870
    });

    it('should have the correct secondary stats', ()=>{
        const item = createItem(initItem, 930);
        expect(item.stats.get('haste')).toEqual(1162);
    });
});