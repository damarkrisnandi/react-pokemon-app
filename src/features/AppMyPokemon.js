import React from 'react';
import Confirmation from '../components/AppConfirmation';
// import { makeStyles } from '@material-ui/core/styles';
import ListMyPokemon from '../components/AppListMyPokemon';
import { getOwnedPokemon, deleteOwnedPokemon } from '../utils/service';
import { css } from '@emotion/css';

export default class MyPokemonList extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            myPokemonList: [],
            selectedPokemon: null,
            openConfirm: false
        }
    }

    componentDidMount() {
        this.setState({ myPokemonList: getOwnedPokemon()})
    }

    selectedPokemon(data) {
        this.setState({ selectedPokemon: data});
        this.showDetail = true;
    }

    deletePokemon(data) {
        deleteOwnedPokemon(data.nickname);
        this.setState({ myPokemonList: getOwnedPokemon(), openConfirm: false});
    }

    render() {
        
        return (
            <div>
            <ListMyPokemon
                title='My Pokemon'
                list={this.state.myPokemonList}
                deleteData={(data) => {
                    this.selectedPokemon(data);
                    this.setState({ openConfirm: true })
                    // this.deletePokemon(data)
                }}
            ></ListMyPokemon>
            {
            this.state.openConfirm ? 
                        <div 
                        className={css`
                            position: fixed;
                            bottom: 50%;
                            right: 50%;
                            transform: translate(50%, 50%);
                            maxWidth: 500px;
                            width: 100%;
                        `}>
                            <div style={{width: '100%'}}>
                                <Confirmation
                                    message={`Are you sure to delete ${this.state.selectedPokemon.nickname } (${this.state.selectedPokemon.name})?`}
                                    onAccept={() => { this.deletePokemon(this.state.selectedPokemon) }}
                                    onReject={() => { this.setState({ openConfirm: false })}}
                                />
                            </div> 
                        </div> : null
                    }
            </div>
        )
    }
    
}