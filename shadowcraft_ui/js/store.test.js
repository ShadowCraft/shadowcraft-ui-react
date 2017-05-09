import { characterReducer } from './store';

describe('character reducer', () => {
    it('should return initial state', () => {
        expect(
            characterReducer(undefined, {})
        ).toEqual({});
    });

    it('should handle RESET_CHARACTER_DATA', () => {
        expect(
            characterReducer(
                { test: 'test' },
                {
                    type: 'RESET_CHARACTER_DATA',
                    data: { test: 'test' }
                })
        ).toEqual({ test: 'test' });
    });

    it('should handle UPDATE_ARTIFACT_TRAITS', () => {
        expect(
            characterReducer(
                { artifact: { traits: {} } },
                {
                    type: 'UPDATE_ARTIFACT_TRAITS',
                    data: 'test'
                })
        ).toEqual(
            {
                artifact: {
                    traits: 'test'
                }
            }
            );
    });

}

);