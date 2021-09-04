import React from 'react';
import PokemonList from './AppPokemonList';
import AppNav from '../components/AppNav';
export default class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: 0
        }
    }

    state = {
        menu: 0,
    }

    back() {
        this.setState({ menu: 0 })
    }

    render() {
        return (
            <div>
              {this.state.menu === 0 ? <PokemonList default={true}></PokemonList> : <div></div>}
              <AppNav 
                menu={this.state.menu}
                selectMenu={(data) => {
                  this.setState({ menu: data })
                }}
              ></AppNav>
            </div>
          );
    }
}