import React from 'react';
import { Card, CardMedia, CardContent, Typography, Icon ,Skeleton} from '@mui/material';
import { Star, LocationOnSharp } from '@mui/icons-material';
import { getRestaurantImg } from '../APIs/api';

interface Props {
  title: string;
  score: number;
  address: string;
  url: string;
}

export default function RestaurantCard(props: Props) {
  const [imageURL, setImgURL] = React.useState('');
  const [isLoading,setIsLoading] = React.useState(true);
  React.useEffect(() => {
    getRestaurantImg(props.url).then((res) => {
      setImgURL(res);
    });
  }, []);
  return (
    <Card sx={{ width: 335, height: 300 }}>
      { isLoading
        ?
        <Skeleton animation="wave" variant="rectangular" width={335} height={150} />
        :
          null
      }
      <CardMedia
        component="img"
        height="150"
        image={imageURL}
        onLoad={()=>setIsLoading(false)}
        alt="restaurant title"
        sx={{display:isLoading ? 'none':'flex'}}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Icon>
            <Star></Star>
          </Icon>{' '}
          {props.score}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Icon>
            <LocationOnSharp></LocationOnSharp>
          </Icon>{' '}
          {props.address}
        </Typography>
      </CardContent>
    </Card>
  );
}
