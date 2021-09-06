import { capitalize, Container } from '@material-ui/core';
import React from 'react';
import AppTable from '../components/AppTable';
import { getData, getOwnedPokemon, savePokemon } from '../utils/service';
import PokeBall from '../components/AppPokeBall';
import Message from '../components/AppMessage';

export default class PokemonDetail extends React.Component {
    image = '';
    ownedPokemons = '';
    ;

    constructor(props) {
        super(props);
        this.state = {
            pokemonDetail: null,
            openSuccessDlg: false,
            openFailedDlg: false,
            errorSubmitMessage: ''
        };
    }

    async componentDidMount() {
        getData(this.props.pokemon.url).then(pokemonDetail => {
            this.image = pokemonDetail.sprites.other['official-artwork'].front_default;
            this.ownedPokemons = getOwnedPokemon();
            this.setState({ pokemonDetail });
        });
        
    }

    isSavePokemon(isGet) {
        if (isGet) {
            this.setState({ openSuccessDlg: true, openFailedDlg: false });
        } else {
            this.setState({ openFailedDlg: true, openSuccessDlg: false });
        }
    }

    onGetPokemon(nickname) {
        if (!nickname || nickname === '') {
            nickname = this.state.pokemonDetail.name;
        }
        if (!this.valid(nickname)) {
            
            return;
        }
        const newData = {
            nickname, 
            name: this.state.pokemonDetail.name, 
            img: this.image,
            url: this.props.pokemon.url
        };
        savePokemon(newData);
        this.setState({ openSuccessDlg: false, openFailedDlg: false });
    }
    
    valid(nickname) {
        if (this.ownedPokemons.find((data) => data.nickname.toLowerCase() === (nickname).toLowerCase())) {
            this.setState({errorSubmitMessage: 'Nickname is already in use!'});
            return false;
        }
        this.setState({errorSubmitMessage: ''});
        return true;
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
                    <div style={{position:'fixed', bottom: '10%', right: '50%', transform: 'translate(50%, 50%)', zIndex: '999'}}>
                    <PokeBall click={(data) => {
                        this.isSavePokemon(data === 1)
                    }}/>
                    </div>

                    {
                        this.state.openSuccessDlg || this.state.openFailedDlg ? 
                        <div style={{position:'fixed', bottom: '50%', right: '50%', transform: 'translate(50%, 50%)', maxWidth: '500px', width: '100%'}}>
                            <div style={{width: '100%'}}>
                                <Message 
                                    title={this.state.openSuccessDlg && !this.state.openFailedDlg ? 'Success' : 'Failed'}
                                    message={this.state.openSuccessDlg && !this.state.openFailedDlg ? 
                                        `You've got ${this.state.pokemonDetail.name}, 
                                        give him a nickname!` : 'Try Again, buddy!'}
                                    onClose={() => {this.setState({ openFailedDlg: false, openSuccessDlg: false })}}
                                    isSubmit={this.state.openSuccessDlg && !this.state.openFailedDlg}
                                    onSubmit={(nickname) => {this.onGetPokemon(nickname)}}
                                    errorSubmit={this.state.errorSubmitMessage}
                                />
                            </div> 
                        </div> : null
                    }                    
                    
                </Container>
            </div>
        );
    }

}