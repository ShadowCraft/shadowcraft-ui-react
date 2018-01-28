import { getTWItems } from './Timewalking';


describe('getTWItems should', () => {

    it('should return an array', () => {
        expect(getTWItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getTWItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getTWItems().length).toBeGreaterThan(1);
    });

    it('should return more than 0 items when given string min and max', () => {
        expect(getTWItems('feet', '900', '950').length).toBeGreaterThan(0);
    });

});
