import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListMyPokemon from '../components/AppListMyPokemon';
import { getOwnedPokemon, deleteOwnedPokemon } from '../utils/service';

export default class MyPokemonList extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            myPokemonList: [],
            selectedPokemon: null
        }
    }

    componentDidMount() {
        this.setState({ myPokemonList: getOwnedPokemon()})
    }

    selectedPokemon(data) {
        this.setState({ selectedPokemon: data});
        console.log(this.state.selectedPokemon);
        this.showDetail = true;
    }

    deletePokemon(data) {
        deleteOwnedPokemon(data.nickname);
        this.setState({ myPokemonList: getOwnedPokemon()});
    }

    render() {
        
        return (
            <ListMyPokemon
                title='My Pokemon'
                list={this.state.myPokemonList}
                selectData={(data) => {
                    this.selectedPokemon(data);
                    this.props.selectedPokemon(data);
                }}
                deleteData={(data) => {
                    this.deletePokemon(data)
                }}
            ></ListMyPokemon>
        )
    }
    
}