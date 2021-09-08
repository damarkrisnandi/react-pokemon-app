import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function SideNav(props) {
    const {list, menu} = props
    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(menu);

    const handleListItemClick = (event, index) => {
        list[index].onClick(index);
        setSelectedIndex(index);
    };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
          {list.map((data, index) => (
            <ListItem button key={data.name} onClick={(event) => handleListItemClick(event, index)} selected={selectedIndex === index}>
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText primary={data.name}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
