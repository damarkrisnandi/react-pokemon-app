import React from 'react';
import AppList from '../components/AppList';
import { getAll } from '../utils/service';
import PokemonDetail from './AppPokemonDetail';

export default class PokemonList extends React.Component {
    state = {
        pokemonList: [],
        selectedPokemon: null
    }

    showDetail = false;
    
    constructor(props) {
        super(props);
        this.state = {
            pokemonList: [],
            selectedPokemon: null
        }
    }

    componentDidMount() {
        getAll().then((res) => {
            console.log(res);
            this.setState({ pokemonList: res.results })
        })
    }

    selectedPokemon(data) {
        this.setState({ selectedPokemon: data});
        console.log(this.state.selectedPokemon);
        this.showDetail = true;
    }

    render() {
        
        return (
            this.showDetail ? 
            <PokemonDetail pokemon={this.state.selectedPokemon}></PokemonDetail> :
            <AppList 
                list={this.state.pokemonList}
                selectData={(data) => 
                    {
                        this.selectedPokemon(data);
                    }}
            ></AppList>
        )
    }
    
}