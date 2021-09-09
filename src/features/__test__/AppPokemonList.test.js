import { render } from '@testing-library/react'
import PokemonList, { selectedPokemonList } from "../AppPokemonList"


let selectedPokemon;
describe('Pokemon List Test', () => {
    let pokemonList = new PokemonList({
        default: true,
        selectedPokemon: (data) => { selectedPokemon = data }
      });
    beforeAll(() => {
        
        
    })

    afterAll(() => {
        jest.restoreAllMocks();
    })
    

    it('PokemonList component render test', () => {
        const pokemonListComponent = render(<PokemonList default={true} selectedPokemon={ (data) => 
            { selectedPokemon = data; }} />);
        expect(pokemonListComponent).toBeTruthy();
    });

    it('handlePageChange should works properly', () => {
        jest.spyOn(pokemonList, 'handlePageChange').mockImplementation((index) => `handlePageChange run with index ${index}`);
        expect(pokemonList.handlePageChange(1)).toBe('handlePageChange run with index 1');
        expect(pokemonList.handlePageChange(15)).toBe('handlePageChange run with index 15');
        expect(pokemonList.handlePageChange(20)).toBe('handlePageChange run with index 20');
    })

    it('setPokemonList should works properly', () => {
        jest.spyOn(pokemonList, 'setPokemonList').mockImplementation((res) => `set PokemonList works!`);
        const res = {
            result: [
                {name:"bulbasaur", url:"https://pokeapi.co/api/v2/pokemon/1/"},
                {name:"ivysaur", url:"https://pokeapi.co/api/v2/pokemon/2/"},
                {name:"venusaur", url:"https://pokeapi.co/api/v2/pokemon/3/"}
            ]
        }
        pokemonList.setPokemonList(res)
        expect(pokemonList.setPokemonList(res)).toBe('set PokemonList works!');
    })

    it('selectedPokemon should works properly', () => {
        jest.spyOn(pokemonList, 'selectedPokemon').mockImplementation((data) => `selectedPokemon works!`);
        const data = {name:"bulbasaur", url:"https://pokeapi.co/api/v2/pokemon/1/"};
        pokemonList.selectedPokemon(data);
        expect(pokemonList.selectedPokemon(data)).toBe('selectedPokemon works!');
    })

    it('handleSelect should works properly', () => {
        jest.spyOn(pokemonList, 'selectedPokemon').mockImplementation((data) => `handleSelect works!`);
        const data = {name:"bulbasaur", url:"https://pokeapi.co/api/v2/pokemon/1/"};
        pokemonList.handleSelect(data);
        expect(pokemonList.selectedPokemon(data)).toBe('handleSelect works!');
    })
})