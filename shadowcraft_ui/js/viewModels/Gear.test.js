import { Record } from 'immutable';
import Gear from './Gear';
import Item from './Item';

describe('Gear', () => {

    const gear = new Gear();

    it('should return a Record', () => {
        expect(gear).toBeInstanceOf(Record);
    });

    it('should return a Gear', () => {
        expect(gear).toBeInstanceOf(Gear);
    });

    describe('head', () => {
        it('should be of the type Item', () => {
            expect(gear.head).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.head).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ head: new Item({ name: 'cat herder' }) }).head.name)
                .toEqual('cat herder');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('head', new Item({ name: 'roofio' }));
            expect(newgear.head.name).toEqual('roofio');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ head: 0 })).toThrowError('Gear.head must be of the type: Item.');
        });
    });

    describe('neck', () => {
        it('should be of the type Item', () => {
            expect(gear.neck).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.neck).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ neck: new Item({ name: 'dog whisperer' }) }).neck.name)
                .toEqual('dog whisperer');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('neck', new Item({ name: 'bangarang' }));
            expect(newgear.neck.name).toEqual('bangarang');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ neck: '0' })).toThrowError('Gear.neck must be of the type: Item.');
        });
    });

    describe('shoulder', () => {
        it('should be of the type Item', () => {
            expect(gear.shoulder).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.shoulder).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ shoulder: new Item({ name: 'waffle' }) }).shoulder.name)
                .toEqual('waffle');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('shoulder', new Item({ name: 'hook' }));
            expect(newgear.shoulder.name).toEqual('hook');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ shoulder: '0232157' })).toThrowError('Gear.shoulder must be of the type: Item.');
        });
    });

    describe('back', () => {
        it('should be of the type Item', () => {
            expect(gear.back).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.back).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ back: new Item({ name: 'i feel pretty' }) }).back.name)
                .toEqual('i feel pretty');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('back', new Item({ name: 'pan' }));
            expect(newgear.back.name).toEqual('pan');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ back: '58996' })).toThrowError('Gear.back must be of the type: Item.');
        });
    });

    describe('chest', () => {
        it('should be of the type Item', () => {
            expect(gear.chest).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.chest).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ chest: new Item({ name: 'oh so pretty' }) }).chest.name)
                .toEqual('oh so pretty');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('chest', new Item({ name: 'tinkerbell' }));
            expect(newgear.chest.name).toEqual('tinkerbell');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ chest: '5sdf8996' })).toThrowError('Gear.chest must be of the type: Item.');
        });
    });

    describe('wrist', () => {
        it('should be of the type Item', () => {
            expect(gear.wrist).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.wrist).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ wrist: new Item({ name: 'and witty and gay' }) }).wrist.name)
                .toEqual('and witty and gay');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('wrist', new Item({ name: 'yabbadabbado' }));
            expect(newgear.wrist.name).toEqual('yabbadabbado');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ wrist: '5sdf6' })).toThrowError('Gear.wrist must be of the type: Item.');
        });
    });

    describe('hands', () => {
        it('should be of the type Item', () => {
            expect(gear.hands).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.hands).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ hands: new Item({ name: 'kunamatata' }) }).hands.name)
                .toEqual('kunamatata');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('hands', new Item({ name: 'im hunting for wabbits' }));
            expect(newgear.hands.name).toEqual('im hunting for wabbits');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ hands: '5sdf6' })).toThrowError('Gear.hands must be of the type: Item.');
        });
    });

    describe('hands', () => {
        it('should be of the type Item', () => {
            expect(gear.waist).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.waist).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ waist: new Item({ name: 'it means no worries' }) }).waist.name)
                .toEqual('it means no worries');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('waist', new Item({ name: 'boy i say boy' }));
            expect(newgear.waist.name).toEqual('boy i say boy');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ waist: '5sdfggh6' })).toThrowError('Gear.waist must be of the type: Item.');
        });
    });

    describe('legs', () => {
        it('should be of the type Item', () => {
            expect(gear.legs).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.legs).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ legs: new Item({ name: 'for the rest of your days' }) }).legs.name)
                .toEqual('for the rest of your days');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('legs', new Item({ name: 'whats up doc' }));
            expect(newgear.legs.name).toEqual('whats up doc');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ legs: '5sdfggh6' })).toThrowError('Gear.legs must be of the type: Item.');
        });
    });

    describe('feet', () => {
        it('should be of the type Item', () => {
            expect(gear.feet).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.feet).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ feet: new Item({ name: 'trogdor' }) }).feet.name)
                .toEqual('trogdor');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('feet', new Item({ name: 'wascally wabbit' }));
            expect(newgear.feet.name).toEqual('wascally wabbit');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ feet: '5sdfggh6' })).toThrowError('Gear.feet must be of the type: Item.');
        });
    });

    describe('finger2', () => {
        it('should be of the type Item', () => {
            expect(gear.finger1).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.finger1).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ finger1: new Item({ name: 'the burninator' }) }).finger1.name)
                .toEqual('the burninator');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('finger1', new Item({ name: 'meep beep' }));
            expect(newgear.finger1.name).toEqual('meep beep');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ finger1: '5ggh6' })).toThrowError('Gear.finger1 must be of the type: Item.');
        });
    });

    describe('finger2', () => {
        it('should be of the type Item', () => {
            expect(gear.finger1).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.finger1).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ finger2: new Item({ name: 'burninating the country side' }) }).finger2.name)
                .toEqual('burninating the country side');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('finger2', new Item({ name: 'lets get dangerous' }));
            expect(newgear.finger2.name).toEqual('lets get dangerous');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ finger2: '5ggh6' })).toThrowError('Gear.finger2 must be of the type: Item.');
        });
    });

    describe('trinket1', () => {
        it('should be of the type Item', () => {
            expect(gear.trinket1).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.trinket1).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ trinket1: new Item({ name: 'he was trogdor!' }) }).trinket1.name)
                .toEqual('he was trogdor!');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('trinket1', new Item({ name: 'rescue rangers' }));
            expect(newgear.trinket1.name).toEqual('rescue rangers');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ trinket1: '5gsghd6' })).toThrowError('Gear.trinket1 must be of the type: Item.');
        });
    });

    describe('trinket2', () => {
        it('should be of the type Item', () => {
            expect(gear.trinket2).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.trinket2).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ trinket2: new Item({ name: 'burninating the thatched roof cottages' }) }).trinket2.name)
                .toEqual('burninating the thatched roof cottages');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('trinket2', new Item({ name: 'darkwing duck' }));
            expect(newgear.trinket2.name).toEqual('darkwing duck');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ trinket2: '5gsgghd6' })).toThrowError('Gear.trinket2 must be of the type: Item.');
        });
    });

    describe('mainHand', () => {
        it('should be of the type Item', () => {
            expect(gear.mainHand).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.mainHand).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ mainHand: new Item({ name: 'there was a man, but not just any man' }) }).mainHand.name)
                .toEqual('there was a man, but not just any man');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('mainHand', new Item({ name: 'gummy bears' }));
            expect(newgear.mainHand.name).toEqual('gummy bears');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ mainHand: '5gsgghgd6' })).toThrowError('Gear.mainHand must be of the type: Item.');
        });
    });

    describe('offHand', () => {
        it('should be of the type Item', () => {
            expect(gear.offHand).toBeInstanceOf(Item);
        });
        it('should be a new Item by default', () => {
            expect(gear.offHand).toEqual(new Item());
        });
        it('should return properly when constructed', () => {
            expect(new Gear({ offHand: new Item({ name: 'he was Trogdor!' }) }).offHand.name)
                .toEqual('he was Trogdor!');
        });
        it('should return properly when set', () => {
            const mygear = new Gear();
            const newgear = mygear.set('offHand', new Item({ name: 'bouncing here and there and everywhere' }));
            expect(newgear.offHand.name).toEqual('bouncing here and there and everywhere');
        });
        it('should throw an error given the wrong type', () => {
            expect(() => new Gear({ offHand: '5gsgd6' })).toThrowError('Gear.offHand must be of the type: Item.');
        });
    });
});
