import { Box, Typography, Avatar, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface Props {
  name: string;
  time: string;
  location: string;
  isEnd:boolean;
}

export default function TimeLine(props: Props) {
  return (
    <React.Fragment>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' ,alignItems:'center'}}>
        <Typography variant="h4" >
          {props.time}{' '}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
        <Avatar sx={{ bgcolor: '#ffc0cb' }}></Avatar>
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center',alignItems:'center'}}>
        <Box>
            <Typography variant="h5" >
            {props.name}{' '}
            </Typography>
            <Typography variant="h6" >
                <FontAwesomeIcon icon={faLocationPin} />{' '}
                {props.location}{' '}
            </Typography>
        </Box>
      </Grid>
      {
        !(props.isEnd)
        ?( 
            <Grid item mt={1} mb={1} xs={12} sx={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
                <Box sx={{width:2,height:100,background:'#C4C4C4'}}/>
            </Grid>)
        :(<div/>)
      }
    </React.Fragment>
  );
}
