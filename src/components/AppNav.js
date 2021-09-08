import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
});

export default function AppNav(props) {
    const {list, menu} = props;
    const classes = useStyles();
    const [value, setValue] = React.useState(menu);

    console.log(list)
    return (
        <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        showLabels
        className={classes.root}
        >
          {
            list.map((menu, index) => (
              <BottomNavigationAction key={menu.name} label={menu.name} icon={menu.icon} onClick={(index) => {menu.onClick(index)}}/>
            )
            )
          }
        </BottomNavigation>
    );
}
