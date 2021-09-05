import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppList from '../components/AppList';
import { getListByPage, getOwnedPokemon } from '../utils/service';
import Pagination from '@material-ui/lab/Pagination';

export default class PokemonList extends React.Component {
    showDetail = false;
    
    constructor(props) {
        super(props);
        this.state = {
            pokemonList: [],
            selectedPokemon: null,
            pagination: {
                currentPage: 1,
                pageSize: 0,
                rowCount: 0
            }
        }
    }

    setPokemonList(res) {
        let pokemonList = [];
            const ownedPokemon = getOwnedPokemon();
            for (let data of res.results) {
                let ownedByName = ownedPokemon.filter(o => o.name === data.name);
                const pokemon = {
                    name: data.name,
                    url: data.url,
                    owned: ownedByName.length
                }
                pokemonList = [...pokemonList, pokemon];
            }
            this.setState({ pokemonList })
    }

    componentDidMount() {
        this.handlePageChange(1);
    }

    selectedPokemon(data) {
        this.setState({ selectedPokemon: data});
        this.showDetail = true;
    }

    handlePageChange(value) {
        getListByPage(value, 20).then((data) => {
            this.setPokemonList(data);
            window.scrollTo(0, 0);
            this.setState({pagination: 
                {
                    currentPage: value,
                    pageSize: 20,
                    rowCount: data.count
                }
            })
        })
    }

    render() {
        return (
            <div style={{marginBottom: '100px'}}>
                <AppList 
                    title='Pokemon'
                    list={this.state.pokemonList}
                    selectData={(data) => 
                        {
                            this.selectedPokemon(data);
                            this.props.selectedPokemon(data);
                        }}
                ></AppList>
                <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                <Pagination 
                    count={Math.floor(this.state.pagination.rowCount/ this.state.pagination.pageSize)} 
                    defaultPage={1} 
                    siblingCount={0} 
                    page={this.state.pagination.currentPage} onChange={(event, value) => this.handlePageChange(value)}
                />
                </div>
                
            </div>
        )
    }
    
}