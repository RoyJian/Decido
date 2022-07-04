import {
  Backdrop,
  Button,
  Box,
  Grid,
  Avatar,
  InputAdornment,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import GoogleMaps from './GoogleMaps';
import React from 'react';
import { Marker } from '@react-google-maps/api';
import { Meal } from '../Contexts/Interface';

interface Props {
  index: number;
  enable: boolean;
  setEnable: (stste: boolean) => void;
}
const setTime = (hour: number, min: number) => {
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
  const [mealTime, setMealTime] = React.useState<Date>(setTime(hour, min));
  const [mealLocation, setMealLocation] = React.useState<Meal['location']>(
    mealsArr[props.index].location
  );
  const [mealLocationName,setMealLocationName] = React.useState(mealsArr[props.index].location.name);

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
          spacing={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
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
            <TextField
              id="LocationName"
              label="Location Name"
              value={mealLocationName}
              variant="standard"
              onChange={(e) => {
                setMealLocationName(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLocationPin} />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
          >
            <GoogleMaps
              center={{ lat: 25.038629069687218,lng:121.5323661180218}}
            >
              <Marker
                draggable
                position={{
                  lat: mealLocation.lat,
                  lng: mealLocation.lng,
                }}
                onDragEnd={(e) => {
                  const temp:Meal['location'] = mealLocation;
                  temp.name = mealLocationName;
                  temp.lat = e.latLng?.lat() as number;
                  temp.lng = e.latLng?.lng() as number;
                  setMealLocation(temp);
                }}
              />
            </GoogleMaps>
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
          <Button variant="contained" onClick={() => {
              setMealName(mealsArr[props.index].name);
              setMealTime(setTime(hour, min));
              setMealLocation(mealsArr[props.index].location);
              setMealLocationName(mealsArr[props.index].location.name);
              props.setEnable(false);
            }}>
            Cancel
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
          }}
        >
          <Button color="secondary" variant="contained" onClick={() => {
              const temp:Meal[]= mealsArr;
              const targetTemp:Meal = temp[props.index];
              targetTemp.name = mealName;
              targetTemp.time = {
                date: new Date().toDateString(),
                hour: mealTime.getHours(),
                min: mealTime.getMinutes()
              };
              targetTemp.location={
                name:mealLocationName,
                lat:mealLocation.lat,
                lng:mealLocation.lng
              };
              temp[props.index] = targetTemp;
              setMealsArr(temp);
              props.setEnable(false);
            }}>
            Apply
          </Button>
        </Grid>
        </Grid>


      </Box>
    </Backdrop>
  );
}
