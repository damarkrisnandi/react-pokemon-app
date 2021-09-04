import { capitalize, Container } from '@material-ui/core';
import React from 'react';
import AppTable from '../components/AppTable';
import { getData } from '../utils/service';
import PokeBall from '../components/AppPokeBall';

export default class PokemonDetail extends React.Component {
    image = '';
    constructor(props) {
        super(props);
        this.state = {
            pokemonDetail: null
        };
    }

    state = {
        pokemonDetail: null
    }

    async componentDidMount() {
        getData(this.props.pokemon.url).then(pokemonDetail => {
            console.log(pokemonDetail);
            this.image = pokemonDetail.sprites.other['official-artwork'].front_default;
            console.log(this.image);
            this.setState({ pokemonDetail });
        })
    }
    
    render() {
        if (!this.state.pokemonDetail) return null;
        return (
            <div>
                <Container style={{ marginBottom: '100px'}}>
                    
                    <span><h2>{capitalize(this.props.pokemon.name)}</h2></span>
                    <img src={this.image} alt={this.props.pokemon.name} style={{width: '100%',height: 'auto'}}></img>
                    <label><strong>Types: {this.state.pokemonDetail.types.map(data => data.type.name).join(', ')}</strong></label>
                    <br></br>
                    <label><strong>Moves </strong></label>
                    <br></br>
                    <AppTable data={this.state.pokemonDetail.moves.map(data => data.move)}></AppTable>
                    <div style={{position:'absolute', bottom: '50%', right: '10%'}}>
                    <PokeBall />
                    </div>
                    
                    
                </Container>
            </div>
        );
    }

}