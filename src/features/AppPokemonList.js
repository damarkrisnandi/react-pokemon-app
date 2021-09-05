import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppList from '../components/AppList';
import { getAll, getOwnedPokemon } from '../utils/service';

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
            let pokemonList = [];
            const ownedPokemon = getOwnedPokemon();
            for (let data of res.results) {
                let ownedByName = ownedPokemon ? ownedPokemon.filter(o => o.name === data.name) : [];
                const pokemon = {
                    name: data.name,
                    url: data.url,
                    owned: ownedByName.length
                }
                pokemonList = [...pokemonList, pokemon];
            }
            this.setState({ pokemonList })
        })
    }

    selectedPokemon(data) {
        this.setState({ selectedPokemon: data});
        this.showDetail = true;
    }

    render() {
        
        return (
            <AppList 
                title='Pokemon'
                list={this.state.pokemonList}
                selectData={(data) => 
                    {
                        this.selectedPokemon(data);
                        this.props.selectedPokemon(data);
                    }}
            ></AppList>
        )
    }
    
}