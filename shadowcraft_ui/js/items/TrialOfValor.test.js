import { getTOVItems } from './TrialOfValor';


describe('getTOVItems should', () => {

    it('should return an array', () => {
        expect(getTOVItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getTOVItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getTOVItems().length).toBeGreaterThan(1);
    });

    it('should return more than 0 items when given string min and max', () => {
        expect(getTOVItems('back', '850', '900').length).toBeGreaterThan(0);
    });

});
