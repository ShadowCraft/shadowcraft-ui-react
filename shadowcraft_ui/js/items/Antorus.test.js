import { getAntorusItems } from './Antorus';


describe('getAntorusItems should', () => {

    it('should return an array', () => {
        expect(getAntorusItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getAntorusItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getAntorusItems().length).toBeGreaterThan(1);
    });

    it('should return more than 0 items when given string min and max', ()=>{
        expect(getAntorusItems('head', '900', '950').length).toBeGreaterThan(0);
    });

});
