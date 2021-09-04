import React from 'react';
import PokemonList from './AppPokemonList';
import AppNav from '../components/AppNav';
import PokemonDetail from './AppPokemonDetail';

let selectedPokemon = null;
export function Features(prop) {
    if (prop.menu === 0) {
        return (<PokemonList default={true} selectedPokemon={ (data) => 
            {
                selectedPokemon = data;
                prop.showDetail(true)
            }
        }></PokemonList>)
    } else if (prop.menu === 1) {
        return (<div><h2>Hello</h2></div>)
    } else if (prop.menu === 2) {
        return (
            <PokemonDetail 
            pokemon={selectedPokemon}
            ></PokemonDetail>
        )
    }
}
export default function MainPage(props) {
    const [menu, setMenu] = React.useState(0);
    return (
        <div>
            <Features 
            menu={menu}
            showDetail={() => {setMenu(2)}}
            />
            <AppNav 
                menu={menu}
                selectMenu={(data) => {
                    setMenu(data)
                }}
            ></AppNav>
        </div>
      );
}