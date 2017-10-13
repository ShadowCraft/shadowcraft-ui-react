import { Record } from 'immutable';
import Item from './Item';

const initialGear = {
    head: new Item(),
    neck: new Item(),
    shoulder: new Item(),
    back: new Item(),
    chest: new Item(),
    wrist: new Item(),
    hands: new Item(),
    waist: new Item(),
    legs: new Item(),
    feet: new Item(),
    finger1: new Item(),
    finger2: new Item(),
    trinket1: new Item(),
    trinket2: new Item(),
    mainHand: new Item(),
    offHand: new Item(),
};

class Gear extends Record(initialGear) {
    constructor(gear) {
        let _gear = new Record(initialGear)();

        if (gear !== undefined) {

            if (gear.head !== undefined) {

                if (gear.head instanceof Item) {
                    _gear = _gear.set('head', gear.head);
                }
                else {
                    throw new Error('Gear.head must be of the type: Item.');
                }
            }
            if (gear.neck !== undefined) {

                if (gear.neck instanceof Item) {
                    _gear = _gear.set('neck', gear.neck);
                }
                else {
                    throw new Error('Gear.neck must be of the type: Item.');
                }
            }
            if (gear.shoulder !== undefined) {

                if (gear.shoulder instanceof Item) {
                    _gear = _gear.set('shoulder', gear.shoulder);
                }
                else {
                    throw new Error('Gear.shoulder must be of the type: Item.');
                }
            }
            if (gear.back !== undefined) {

                if (gear.back instanceof Item) {
                    _gear = _gear.set('back', gear.back);
                }
                else {
                    throw new Error('Gear.back must be of the type: Item.');
                }
            }
            if (gear.chest !== undefined) {

                if (gear.chest instanceof Item) {
                    _gear = _gear.set('chest', gear.chest);
                }
                else {
                    throw new Error('Gear.chest must be of the type: Item.');
                }
            }
            if (gear.wrist !== undefined) {

                if (gear.wrist instanceof Item) {
                    _gear = _gear.set('wrist', gear.wrist);
                }
                else {
                    throw new Error('Gear.wrist must be of the type: Item.');
                }
            }
            if (gear.hands !== undefined) {

                if (gear.hands instanceof Item) {
                    _gear = _gear.set('hands', gear.hands);
                }
                else {
                    throw new Error('Gear.hands must be of the type: Item.');
                }
            }
            if (gear.waist !== undefined) {

                if (gear.waist instanceof Item) {
                    _gear = _gear.set('waist', gear.waist);
                }
                else {
                    throw new Error('Gear.waist must be of the type: Item.');
                }
            }
            if (gear.legs !== undefined) {

                if (gear.legs instanceof Item) {
                    _gear = _gear.set('legs', gear.legs);
                }
                else {
                    throw new Error('Gear.legs must be of the type: Item.');
                }
            }
            if (gear.feet !== undefined) {

                if (gear.feet instanceof Item) {
                    _gear = _gear.set('feet', gear.feet);
                }
                else {
                    throw new Error('Gear.feet must be of the type: Item.');
                }
            }
            if (gear.finger1 !== undefined) {

                if (gear.finger1 instanceof Item) {
                    _gear = _gear.set('finger1', gear.finger1);
                }
                else {
                    throw new Error('Gear.finger1 must be of the type: Item.');
                }
            }
            if (gear.finger2 !== undefined) {

                if (gear.finger2 instanceof Item) {
                    _gear = _gear.set('finger2', gear.finger2);
                }
                else {
                    throw new Error('Gear.finger2 must be of the type: Item.');
                }
            }
            if (gear.trinket1 !== undefined) {

                if (gear.trinket1 instanceof Item) {
                    _gear = _gear.set('trinket1', gear.trinket1);
                }
                else {
                    throw new Error('Gear.trinket1 must be of the type: Item.');
                }
            }
            if (gear.trinket2 !== undefined) {

                if (gear.trinket2 instanceof Item) {
                    _gear = _gear.set('trinket2', gear.trinket2);
                }
                else {
                    throw new Error('Gear.trinket2 must be of the type: Item.');
                }
            }
            if (gear.mainHand !== undefined) {

                if (gear.mainHand instanceof Item) {
                    _gear = _gear.set('mainHand', gear.mainHand);
                }
                else {
                    throw new Error('Gear.mainHand must be of the type: Item.');
                }
            }
            if (gear.offHand !== undefined) {

                if (gear.offHand instanceof Item) {
                    _gear = _gear.set('offHand', gear.offHand);
                }
                else {
                    throw new Error('Gear.offHand must be of the type: Item.');
                }
            }
        }
        super(_gear);
    }
}

export default Gear;