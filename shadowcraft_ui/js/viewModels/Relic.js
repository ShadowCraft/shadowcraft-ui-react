import { Record } from 'immutable';

//TODO: need to address this, ilvl needs to be 835 or above for some reason or the engine poops
let initRelic = { id: 0, ilvl: 835 };

export default class Relic extends Record(initRelic) {
    constructor(relic){
        let _relic = Record(initRelic)();

        if (relic) {
            _relic = _relic.set('id', relic.id || initRelic.id);
            _relic = _relic.set('ilvl', relic.ilvl || initRelic.ilvl);
        }

        super(_relic);
    }
}
