import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Fab, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  button: {
    width: '200%',
    height: '200%'    
  }
}));

function catchPokemon() {
  // 0 or 1, you get the pokemon if value = 1
  return Math.round(Math.random())
}

export default function PokeBall(props) {
  const classes = useStyles();
  const { click, disabled } = props;

  const handleClick = () => {
    click(catchPokemon())
  }

  return (
    <div>
    <Fab 
      color="primary" 
      aria-label="add"
      onClick={handleClick}
      disabled={disabled}
    >
    <Avatar 
        alt="PokeBall" 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
        className={classes.large} />
    </Fab>
    <br/>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Typography>Catch!</Typography>
    </div>
    {/* <Chip
    label="Catch!"
    color="primary"
    size="medium"
    variant="outlined"
    disabled={disabled}
  /> */}
    </div>
  );
}
