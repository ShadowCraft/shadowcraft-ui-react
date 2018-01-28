import { getMiscItems } from './Misc';


describe('getMiscItems should', () => {

    it('should return an array', () => {
        expect(getMiscItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getMiscItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getMiscItems().length).toBeGreaterThan(1);
    });

    it('should return more than 0 items when given string min and max', () => {
        expect(getMiscItems('head', 800, 850).length).toBeGreaterThan(0);
    });

});
