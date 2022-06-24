import { Box, Typography, Avatar, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import EditMeal from './EditMeal';
import React from 'react';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';

interface Props {
  index: number;
  isEnd: boolean;
}

export default function TimeLine(props: Props) {
  const [isEdit, setIsEdit] = React.useState(false);
  const { mealsArr } = React.useContext(
    AppContext
  ) as appContextValueInterface;
  return (
    <React.Fragment>
      <EditMeal index={props.index} enable={isEdit} setEnable={setIsEdit} />
      <Grid
        item
        xs={4}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="h4">
          {`${mealsArr[props.index].time.hour}:${String(
            mealsArr[props.index].time.min
          ).padStart(2, '0')}`}{' '}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Avatar
          sx={{ bgcolor: '#ffc0cb' }}
          onClick={() => setIsEdit(true)}
        ></Avatar>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box>
          <Typography variant="h5">{mealsArr[props.index].name} </Typography>
          <Typography variant="h6">
            <FontAwesomeIcon icon={faLocationPin} />{' '}
            {mealsArr[props.index].location.name}{' '}
          </Typography>
        </Box>
      </Grid>
      {!props.isEnd ? (
        <Grid
          item
          mt={1}
          mb={1}
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: 2, height: 100, background: '#C4C4C4' }} />
        </Grid>
      ) : (
        <div />
      )}
    </React.Fragment>
  );
}
