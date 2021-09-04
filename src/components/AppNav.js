import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

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
        <BottomNavigationAction label="Pokemon List" icon={<ListIcon />} onClick={() => {props.selectMenu(0)}}/>
        <BottomNavigationAction label="My Pokemon List" icon={<AssignmentTurnedInIcon />} onClick={() => {props.selectMenu(1)}}/>
        </BottomNavigation>
    );
}
