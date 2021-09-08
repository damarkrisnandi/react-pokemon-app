import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {nickname: ''};
      }

      useStyles = makeStyles({
        root: {
          minWidth: 275,
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
      });
    
      render() {
        const {message, onAccept, onReject} = this.props;
        const classes = this.useStyles
        return (
            <Card className={classes.root} variant="outlined" 
            style={{backgroundColor: 'grey', color: 'white'}}>
              <CardContent>
                <Typography variant="h5" component="h3">
                  Confirmation
                </Typography>
                <Typography variant="body2" component="p">
                  {message}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => { onAccept(true) }}>YES</Button>
                <Button size="small" onClick={() => { onReject(true) }}>NO</Button>
              </CardActions>
            </Card>
          );
      }
    }
