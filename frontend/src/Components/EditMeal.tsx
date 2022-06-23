import { Backdrop, Button, Box, Grid, Avatar } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface Props {
  index: number;
  enable: boolean;
  setEnable: (stste: boolean) => void;
}
const setTime = (hour:number,min:number)=>{
  const time = new Date();
  time.setHours(hour);
  time.setMinutes(min);
  return time;
};
export default function EditMeal(props: Props) {
  const { mealsArr, setMealsArr } = React.useContext(
    AppContext
  ) as appContextValueInterface;

  const [mealName, setMealName] = React.useState(mealsArr[props.index].name);
  const hour = mealsArr[props.index].time.hour;
  const min = mealsArr[props.index].time.min;
  const [mealTime, setMealTime] = React.useState(setTime(hour,min));

  return (
    <Backdrop
      sx={{
        backdropFilter: 'blur(20px)',
        color: '#111111',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={props.enable}
    >
      <Box
        width={800}
        borderRadius={5}
        padding={5}
        sx={{
          background: '#FFFFFF',
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid
            item
            xs={4}
            
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Basic example"
                value={mealTime}
                onChange={(newValue) => {
                  setMealTime(newValue as Date);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: '#ffc0cb' }}></Avatar>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >

              <TextField
                fullWidth
                id="outlined-name"
                label="Meal Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1>
              <FontAwesomeIcon icon={faLocationPin} /> location
            </h1>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Button
            variant="contained"
            onClick={() => props.setEnable(false)}
          >
            Cancel
          </Button>
        </Grid>
      </Box>
    </Backdrop>
  );
}
