import React from 'react';
import PokemonList from './AppPokemonList';
import AppNav from '../components/AppNav';
import PokemonDetail from './AppPokemonDetail';
import MyPokemonList from './AppMyPokemon';
import SideNav from '../components/AppSideNav';
import ListIcon from '@material-ui/icons/List';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Hidden from '@material-ui/core/Hidden';
import { css } from '@emotion/css'

let selectedPokemon = null;
export function selectedPokemonFunc(prop, data) {
    selectedPokemon = data;
    prop.showDetail(true)
}

export function Features(prop) {
    if (prop.menu === 0) {
        return (<PokemonList default={true} selectedPokemon={ (data) => selectedPokemonFunc(prop, data)}></PokemonList>)
    } else if (prop.menu === 1) {
        return (
            <MyPokemonList />
        )
    } else if (prop.menu === 2) {
        return (
            <PokemonDetail 
            pokemon={selectedPokemon}
            ></PokemonDetail>
        )
    }
}
export default function MainPage(props) {
    const [menu, setMenu] = React.useState(0);

    const handleChangeMenu = (index) => setMenu(index);

    const listMenu = [
        {name: 'Pokemon List', icon: <ListIcon />, onClick: function () { handleChangeMenu(0) }},
        {name: 'My Pokemon List', icon: <AssignmentTurnedInIcon />, onClick: function () { handleChangeMenu(1) }}
    ]
    return (
        <div>
            <div>
                <Hidden only={['md', 'sm', 'xs']}>
                    <SideNav list={listMenu} menu={menu}/>
                </Hidden>
                <div
                className={css`
                    max-width: 700px; 
                    display: 'block'; 
                    margin: auto; 
                    padding-bottom: 50px;
                `} 
                style={{}}>
                    <Features menu={menu} showDetail={() => handleChangeMenu(2)} />
                </div>
            </div>
            <Hidden only={['lg', 'xl']}>
                <AppNav list={listMenu} menu={menu}/>
            </Hidden>
            
        </div>
      );
}