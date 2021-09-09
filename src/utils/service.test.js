import { deleteOwnedPokemon, getAll, getData, getListByPage, getOwnedPokemon, savePokemon } from './service';
describe('service.js test', () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });
    
    it('getAll method should not return null', () => {
        expect(getAll()).toBeTruthy();
    });

    it('getData method should not return null', () => {
        const pokemon1 = 'https://pokeapi.co/api/v2/pokemon/1/';
        expect(getData(pokemon1)).toBeTruthy();
        // eslint-disable-next-line jest/valid-expect
        expect(getData('https://pokeapi.co/api/v2/pokemonx')).resolves.toBe(null);
    });

    it('getListByPage method should not return null and its pagination works', async () => {
        expect(getListByPage(1, 20)).toBeTruthy()
        
        const lastPageSize = 18;
        const lastPage = await getListByPage(56, 20);
        expect(lastPage.results.length).toEqual(lastPageSize);
    })

    it('getOwnedPokemon should not return null', () => {
        expect(getOwnedPokemon()).toBeTruthy();
    });

    it('savePokemon and deleteOwnedPokemon works', () => {
        const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png';
        const dataUrl = 'https://pokeapi.co/api/v2/pokemon/1/';
        const data1 = {
            nickname: 'Bulba', 
            name: 'bulbasaur', 
            img: imageUrl,
            url: dataUrl
        };
        savePokemon(data1);
        expect(getOwnedPokemon()).toBeTruthy();
        expect(getOwnedPokemon()[0]).toEqual(data1);

        const data2 = {
            nickname: 'Ollie', 
            name: 'bulbasaur', 
            img: imageUrl,
            url: dataUrl
        };
        savePokemon(data2);
        expect(getOwnedPokemon()).toBeTruthy();
        expect(getOwnedPokemon()[1]).toEqual(data2);

        deleteOwnedPokemon(data1.nickname);
        expect(getOwnedPokemon()[0]).toEqual(data2);
        deleteOwnedPokemon(data2.nickname);
        expect(getOwnedPokemon()).toEqual([]);
    })
})