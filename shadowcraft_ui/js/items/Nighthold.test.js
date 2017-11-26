import { getNHItems } from './Nighthold';


describe('getNHItems should', () => {

    it('should return an array', () => {
        expect(getNHItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getNHItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getNHItems().length).toBeGreaterThan(1);
    });

    it('should return more than 0 items when given string min and max', ()=>{
        expect(getNHItems('head', '900', '1000').length).toBeGreaterThan(0);
    });

});