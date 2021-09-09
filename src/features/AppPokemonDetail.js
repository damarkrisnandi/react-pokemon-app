import { capitalize, Chip, Container, Grid, Typography, Avatar } from '@material-ui/core';
import React from 'react';
import AppTable from '../components/AppTable';
import { getData, getOwnedPokemon, savePokemon } from '../utils/service';
import PokeBall from '../components/AppPokeBall';
import Message from '../components/AppMessage';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import Stats from '../components/AppStats';
import { css } from '@emotion/css';
import no_image from '../assets/no_image.png'

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
            errorSubmitMessage: '',
            loading: false
        };
    }

    async componentDidMount() {
        getData(this.props.pokemon.url).then(pokemonDetail => {
            this.image = pokemonDetail.sprites.other['official-artwork'].front_default || no_image;
            this.ownedPokemons = getOwnedPokemon();
            this.setState({ pokemonDetail });
        });
        
    }

    isSavePokemon(isGet) {
        this.setState({ loading: true })
        setTimeout(() => {
            if (isGet) {
                this.setState({ openSuccessDlg: true, openFailedDlg: false, loading: false });
            } else {
                this.setState({ openFailedDlg: true, openSuccessDlg: false, loading: false });
            }
        }, 2000)
        
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

    centerStyle() {
        return `position: fixed;
        bottom: 50%;
        right: 50%;
        transform: translate(50%, 50%);`
    }

    catchButtonStyle() {
        return `position: fixed;
        bottom: 10%;
        right: 50%;
        transform: translate(50%, 50%);`
    }
    
    valid(nickname) {
        if (this.ownedPokemons.find((data) => data.nickname.toLowerCase() === (nickname).toLowerCase())) {
            this.setState({errorSubmitMessage: `Nickname ${nickname} is already in use!`});
            return false;
        }
        this.setState({errorSubmitMessage: ''});
        return true;
    }
    
    render() {
        if (!this.state.pokemonDetail) return null;
        return (
            <div>
                <Container className={css`
                    padding-bottom: 100px;
                    background-color: #f7faff;
                `}>
                    <div>
                        <div className={css`
                            padding-top: 15px
                        `}>
                            <Typography variant="h5" component="h3">
                                {capitalize(this.props.pokemon.name)} 
                            </Typography>
                        </div>
                        {
                            this.state.pokemonDetail.types.map(data => (
                                <Chip
                                    label={data.type.name}
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                    style={{marginRight: '5px'}}
                                />
                            ))
                        }
                        <img src={this.image} alt={this.props.pokemon.name} 
                        className={css`
                            width: 100%;
                            height: auto;
                            margin-top: 10px;
                        `}></img>
                        <br/>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Stats
                                    stat='HP'
                                    icon={ <FavoriteIcon />}
                                    value={this.state.pokemonDetail.stats[0].base_stat}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Stats 
                                    stat='ATK'
                                    icon={<MyLocationIcon />}
                                    value={this.state.pokemonDetail.stats[1].base_stat}
                                />
                            </Grid>
                        </Grid>
                        <br/>
                        <AppTable 
                            head="Moves"
                            rows={this.state.pokemonDetail.moves.map(data => data.move)} />
                        <div 
                        className={css`
                            ${this.catchButtonStyle()}
                            z-index: 100
                        `}>
                            <PokeBall 
                                click={(data) => { this.isSavePokemon(data === 1) }} 
                                disabled={this.state.openSuccessDlg || this.state.openFailedDlg || this.state.loading}
                            />
                        </div>
                    </div>
                    {this.state.loading ? (
                        <div className={css`
                            ${this.centerStyle()}
                            maxWidth: 500px
                        `}>
                            <Avatar 
                            alt="PokeBall" 
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                            />
                            <div className={css`
                                ${this.centerStyle()}
                                bottom: -20%;
                            `}>
                                <Typography>Catching...</Typography>
                            </div>
                        </div>
                    ) : null}
                    
                    {
                        this.state.openSuccessDlg || this.state.openFailedDlg ? 
                        <div className={css`
                        ${this.centerStyle()}
                        max-width: 500px;
                        width: 100%;
                    `}>
                            
                            <div className={css`
                                width: 100%;
                            `}>
                                <Message 
                                    title={this.state.openSuccessDlg && !this.state.openFailedDlg ? 'Success' : 'Failed'}
                                    message={this.state.openSuccessDlg && !this.state.openFailedDlg ? 
                                        `You've got ${this.state.pokemonDetail.name}, 
                                        give him a nickname!` : 'Try Again, buddy!'}
                                    onClose={() => {this.setState({ openFailedDlg: false, openSuccessDlg: false })}}
                                    isSubmit={this.state.openSuccessDlg && !this.state.openFailedDlg}
                                    onSubmit={(nickname) => {this.onGetPokemon(nickname)}}
                                    errorSubmit={this.state.errorSubmitMessage}
                                    name={this.state.pokemonDetail.name}
                                />
                            </div> 
                        </div> : null
                    } 
                </Container>
            </div>
        );
    }

}