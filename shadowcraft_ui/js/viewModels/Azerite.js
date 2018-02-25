import { Record, List, Map } from 'immutable';
import AzeriteItem from './AzeriteItem';

const initData = {
    tier1: List(),
    tier2: List(),
    tier3: List(),
    active: 0
};
    
export default class Azerite extends Record(initData) {
    constructor(data) {

        let _data = new Record(initData)();

        if (data !== undefined) {
            let tier1 = new List();
            let tier2 = new List();
            let tier3 = new List();

            data.tier1.forEach(function(item) { tier1 = tier1.push(new AzeriteItem(item)) }.bind(tier1));
            data.tier2.forEach(function(item) { tier2 = tier2.push(new AzeriteItem(item)) }.bind(tier2));
            data.tier3.forEach(function(item) { tier3 = tier3.push(new AzeriteItem(item)) }.bind(tier3));

            _data = _data.set('tier1', tier1);
            _data = _data.set('tier2', tier2);
            _data = _data.set('tier3', tier3);
            _data = _data.set('active', data.active);
        }

        super(_data);
    }
}
