import { getENItems } from './EmeraldNightmareItems';


describe('getENItems should', () => {

    it('should return an array', () => {
        expect(getENItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getENItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getENItems().length).toBeGreaterThan(1);
    });

    it('should return more than 0 items when given string min and max', ()=>{
        expect(getENItems('head', '850', '900').length).toBeGreaterThan(0);
    });

});
