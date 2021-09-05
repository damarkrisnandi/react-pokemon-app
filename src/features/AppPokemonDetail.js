import { capitalize, Container } from '@material-ui/core';
import React from 'react';
import AppTable from '../components/AppTable';
import { getData, savePokemon } from '../utils/service';
import PokeBall from '../components/AppPokeBall';
import Message from '../components/AppMessage';

export default class PokemonDetail extends React.Component {
    image = '';

    constructor(props) {
        super(props);
        this.state = {
            pokemonDetail: null,
            openSuccessDlg: false,
            openFailedDlg: false
        };
    }

    state = {
        pokemonDetail: null,
        openSuccessDlg: false,
        openFailedDlg: false
    }

    async componentDidMount() {
        const ownedPokemon = localStorage.getItem('ownedPokemon');
        console.log('cek', JSON.parse(ownedPokemon))
        getData(this.props.pokemon.url).then(pokemonDetail => {
            this.image = pokemonDetail.sprites.other['official-artwork'].front_default;
            this.setState({ pokemonDetail });
        })
    }

    savePokemon(isGet) {
        if (isGet) {
            console.log(`You got ${this.state.pokemonDetail.name}`);
            this.openSuccessDlg = true;
            this.setState({ openSuccessDlg: true, openFailedDlg: false });
        } else {
            console.log('failed');
            this.setState({ openFailedDlg: true, openSuccessDlg: false });
            // this.openFailedDlg = true;
        }
    }

    onGetPokemon(nickname) {
        const newData = {
            nickname, 
            name: this.state.pokemonDetail.name, 
            img: this.image,
            url: this.props.pokemon.url
        };
        savePokemon(newData);
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
                    <PokeBall click={(data) => {
                        this.savePokemon(data === 1)
                    }}/>

                    {
                        this.state.openSuccessDlg || this.state.openFailedDlg ? 
                        <div style={{position:'fixed', bottom: '50%', left: '0%'}}>
                            <Message 
                                title={this.state.openSuccessDlg && !this.state.openFailedDlg ? 'Success' : 'Failed'}
                                message={this.state.openSuccessDlg && !this.state.openFailedDlg ? 
                                    `You got ${this.state.pokemonDetail.name}` : 'Try Again, buddy!'}
                                onClose={() => {this.setState({ openFailedDlg: false, openSuccessDlg: false })}}
                                isSubmit={this.state.openSuccessDlg && !this.state.openFailedDlg}
                                onSubmit={(nickname) => {this.onGetPokemon(nickname)}}
                            /> 
                        </div> : null
                    }
                    
                    </div>
                    
                    
                </Container>
            </div>
        );
    }

}