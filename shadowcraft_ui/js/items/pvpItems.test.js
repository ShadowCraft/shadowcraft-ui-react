import { getPVPItems } from './pvpItems';


describe('getPVPItems should', () => {

    it('should return an array', () => {
        expect(getPVPItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getPVPItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getPVPItems().length).toBeGreaterThan(1);
    });

    it('should return more than 0 items when given string min and max', ()=>{
        expect(getPVPItems('head', '850', '900').length).toBeGreaterThan(0);
    });

});
