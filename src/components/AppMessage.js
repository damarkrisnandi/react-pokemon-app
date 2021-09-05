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
        alert('Your favorite flavor is: ' + this.state.value);
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
        const {title, message, isSubmit, onClose, onSubmit} = this.props;
        const classes = this.useStyles
        return (
            <Card className={classes.root} variant="outlined">
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
                        <br/>
                        <label>Give his nickname!</label>
                        <TextField id="outlined-basic" label="NickName" variant="outlined" value={this.state.nickname} onChange={this.handleChange}/>
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
                    }
                    onClose(true)
                }
                }>{isSubmit ? 'Submit' : 'Close'}</Button>
              </CardActions>
            </Card>
          );
      }
    }
