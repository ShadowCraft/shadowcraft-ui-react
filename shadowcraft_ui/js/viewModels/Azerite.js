import { Record, List, Map } from 'immutable';
import AzeriteRing from './AzeriteRing';

const initData = {
    rings: List()
};
    
export default class Azerite extends Record(initData) {
    constructor(data) {

        let _data = new Record(initData)();

        if (data !== undefined) {

            // TODO: state needs:
            // - array of rings starting from the center element
            // - each element in the array is an object containing:
            // --- a value for the currently selected spell
            // --- an array of spells that could be selected. these at least need to
            //     contain a spell ID, an icon, and a name. For future use, they should
            //     also include the cardinal position in the ring so that they can be
            //     laid out correctly if we implement a more graphical display.

            let rings = new List();
            data.azerite.forEach(function(ring) { rings = rings.push(new AzeriteRing(ring)) }.bind(rings));
            _data = _data.set('rings', rings);
        }

        super(_data);
    }
}
