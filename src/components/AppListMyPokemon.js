import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '../utils/miscellanous';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
});


export default function ListMyPokemon(props) {
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
                    <ListItem key={row.nickname}>
                        <ListItemAvatar>
                            <Avatar alt={row.nickname} src={row.img} />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={capitalize(row.nickname)} 
                            secondary={`(${capitalize(row.name)})`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => {
                                props.deleteData(row)
                            }}>
                                <DeleteIcon />
                            </IconButton>
                    </ListItemSecondaryAction>
                    </ListItem>
                ))}
                
            </List>
        </div>
    )
}
