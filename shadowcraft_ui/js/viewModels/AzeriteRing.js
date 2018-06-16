import { Record, List, Map } from 'immutable';
import AzeriteItem from './AzeriteItem';

const initData = {
    selected: 0,
    items: List()
};

export default class AzeriteRing extends Record(initData) {
    constructor(data) {
        let _data = new Record(initData)();
        if (data !== undefined) {

            let items = new List();
            data.items.forEach(function(item) { items = items.push(new AzeriteItem(item)) }.bind(items));

            _data = _data.set('items', items);
            _data = _data.set('selected', data.selected);
        }

        super(_data);
    }
}
