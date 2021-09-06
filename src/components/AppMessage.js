import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {nickname: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({nickname: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
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
        const {title, message, isSubmit, onClose, onSubmit, errorSubmit, name} = this.props;
        const classes = this.useStyles
        return (
            <Card className={classes.root} variant="outlined" 
            style={{backgroundColor: isSubmit ? '#66bb6a' : '#ef5350', color: 'white'}}>
              <CardContent>
                <Typography variant="h5" component="h3">
                  {title}
                </Typography>
                <Typography variant="body2" component="p">
                  {message}
                  <br />
                </Typography>
                {
                    isSubmit ?
                    <div>
                        <TextField 
                        style={{width: '100%'}}
                        id="outlined-basic" 
                        label={`Nickname (default: ${name || ''})`} 
                        variant="outlined" 
                        value={this.state.nickname} onChange={this.handleChange}
                        />
                        <br/>
                        <label>{errorSubmit}</label>
                    </div>
                     :
                    null
                }
              </CardContent>
              <CardActions>
                <Button size="small" 
                onClick={() => {
                    if (isSubmit) {
                      onSubmit(this.state.nickname)
                    } else {
                      onClose(true)
                    }
                }
                }>{isSubmit ? 'Submit' : 'Close'}</Button>
                {isSubmit ? (
                  <Button size="small" onClick={() => { onClose(true) }}>Cancel</Button>
                ) : null}
              </CardActions>
            </Card>
          );
      }
    }
