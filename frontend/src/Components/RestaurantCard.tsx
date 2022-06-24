import React from 'react';
import {  Card, CardMedia,CardContent ,Typography,Icon} from '@mui/material';
import { Star,LocationOnSharp } from '@mui/icons-material';

interface Props {
  title: string;
  score: number;
  address: string;
  imgURL: string;
}

export default function RestaurantCard(props: Props) {
  return <Card sx={{ width: 335, height: 300,  }}>
    <CardMedia
        component="img"
        height="150"
        image={props.imgURL}
        alt="restaurant title"
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Icon>
         <LocationOnSharp></LocationOnSharp>
          </Icon>
         
            {' '}
          {props.score}
        </Typography>
        <Typography variant="body1"  color="text.secondary">
          <Icon >
          <Star></Star>
          </Icon>
          
          {' '}
          {props.address}
        </Typography>
      </CardContent>

  </Card>;
}
