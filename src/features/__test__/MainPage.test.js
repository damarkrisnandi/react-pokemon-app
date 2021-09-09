import { render } from '@testing-library/react'
import MainPage, { Features, selectedPokemonFunc } from '../MainPage';
import React from 'react';

describe('Component render test', () => {
    const menuList = [0,1,2]
    const index = {
        setMenu: jest.fn(() => 'selectedPokemon')
    }

    it(`should render Features component`, () => {
        menuList.map((id) => {
            const features = render(<Features menu={id} showDetail={(data) => {id = 2}}/>);
            
            expect(features).toBeTruthy();
        })
    })

    it('should render MainPage component', () => {
        const main = render(<MainPage />);
        expect(main).toBeTruthy();
    });

    it('selectedPokemonFunc should works properly', () => {
        const prop = {default: true, showDetail: (data) => {}}
        const data = {"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"};
        const selectedPokemon = jest.fn((prop, data) => selectedPokemonFunc(prop, data));
        selectedPokemon(prop, data);
        expect(selectedPokemon).toHaveBeenCalledTimes(1);
    })

})



