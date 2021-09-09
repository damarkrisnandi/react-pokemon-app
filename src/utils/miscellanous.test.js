import { capitalize } from "./miscellanous.js"

describe('miscellanous.js test', () => {
    it('should return capitalized string', () => {
        expect(capitalize('bulbasaur')).toBe('Bulbasaur');
        expect(capitalize('chArizard')).toBe('Charizard');
        expect(capitalize('METAPOD')).toBe('Metapod');
    })
})