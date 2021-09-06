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
        getData(this.props.pokemon.url).then(pokemonDetail => {
            this.image = pokemonDetail.sprites.other['official-artwork'].front_default;
            this.setState({ pokemonDetail });
        })
    }

    savePokemon(isGet) {
        if (isGet) {
            this.setState({ openSuccessDlg: true, openFailedDlg: false });
        } else {
            this.setState({ openFailedDlg: true, openSuccessDlg: false });
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
                    <div style={{position:'fixed', bottom: '10%', right: '50%', transform: 'translate(50%, 50%)'}}>
                    <PokeBall click={(data) => {
                        this.savePokemon(data === 1)
                    }}/>
                    </div>

                    {
                        this.state.openSuccessDlg || this.state.openFailedDlg ? 
                        <div style={{position:'fixed', bottom: '50%', left: '0%', width: '100%'}}>
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
                    
                </Container>
            </div>
        );
    }

}