import { Record, List, Map } from 'immutable';

const initData = {
    icon: '',
    spell: 0,
    pos: 0,
};

export default class AzeriteItem extends Record(initData) {
    constructor(data) {

        let _data = new Record(initData)();

        if (data !== undefined) {
            _data = _data.set('icon', data.icon);
            _data = _data.set('spell', data.spell);
            _data = _data.set('pos', data.pos);
        }

        super(_data);
    }
}
