import { getTOSItems } from './TOSItems';

describe('getTOSItems should', () => {

    it('should return an array', () => {
        expect(getTOSItems()).toBeInstanceOf(Array);
    });

    it('should return an array of item (data)', () => {
        expect(getTOSItems()[0]).toBeInstanceOf(Object);
    });

    it('should return more than 1 item', () => {
        expect(getTOSItems().length).toBeGreaterThan(1);
    });

});