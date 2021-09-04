import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import PokeBall from './AppPokeBall';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function AppNav(props) {
    const menu = props.menu;
    const classes = useStyles();
    const [value, setValue] = React.useState(menu);

    return (
        <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        className={classes.root}
        >
            <PokeBall/>
        </BottomNavigation>
    );
}
