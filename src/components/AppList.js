import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '../utils/miscellanous';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Chip, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});


export default function AppList(props) {
    const list = props.list;
    const title = props.title
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                    <Typography variant="h4" component="h3">
                        {title} 
                    </Typography>
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
                {list.map((row) => (
                    <ListItem button onClick={async () => await props.selectData(row)} key={row.name}>
                        <ListItemText primary={capitalize(row.name)} />
                        <Chip 
                            label={'Owned: ' + (row.owned || 0).toString()} 
                            variant="outlined" 
                            color={row.owned && row.owned > 0 ? 'primary' : 'secondary'}
                        />
                    </ListItem>
                ))}
                
            </List>
        </div>
    )
}
