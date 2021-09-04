import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Chip } from '@material-ui/core';

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

export default function PokeBall() {
  const classes = useStyles();

  return (
    <Chip
    avatar={
        <Avatar 
        alt="PokeBall" 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
        className={classes.large} />
    }
    label="Catch!"
    clickable
    color="primary"
  />
    
  );
}
