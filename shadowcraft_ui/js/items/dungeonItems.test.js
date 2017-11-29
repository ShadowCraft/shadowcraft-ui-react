import { getDungeonItems } from './dungeonItems';


describe('getDungeonItems should', () => {

    it('should return an array', () => {
        expect(getDungeonItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getDungeonItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getDungeonItems().length).toBeGreaterThan(1);
    });

    it('should return more than 0 items when given string min and max', ()=>{
        expect(getDungeonItems('head', '850', '900').length).toBeGreaterThan(0);
    });

});
