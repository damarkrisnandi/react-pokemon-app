import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';

export default function Stats(props) {
    const {icon, stat, value} = props;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h3">
                    {icon} { ' ' + stat} 
                </Typography>
                
                <Typography variant="h4" component="p">
                    {value}
                </Typography>
            </CardContent>
        </Card>
    )
}