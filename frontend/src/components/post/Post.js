import React from 'react';
import {Button, Grid, Typography} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {HOSTNAME} from "../../utils/constants";

const Post = (props) => {
    return (<Grid item xs={6} sm={4}>
            <Card sx={{maxWidth: 300}}>
                <CardMedia
                    component="img"
                    alt={props.title}
                    height="200"
                    image={`${HOSTNAME}${props.post_picture}`}
                />
                <CardContent>
                    <Typography variant="h6">{props.title}</Typography>
                    <Typography variant="p">{props.description}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium">Read</Button>
                </CardActions>

            </Card>
        </Grid>);
}

export default Post;