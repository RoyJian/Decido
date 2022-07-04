import React from 'react';
import TimeLine from './TimeLine';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { Box, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Step2() {
  const { mealsArr , setMealsArr,yourLocation,setYourLocation} = React.useContext(AppContext) as appContextValueInterface;
  React.useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setYourLocation({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      });
    });
  },[]);
  return (
    <React.Fragment>
      <Box
        ml={5}
        sx={{ display: 'flex', justifyContent: 'left', maxWidth: 300 }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {mealsArr.map((meal, index) => {
            meal.location.lat = yourLocation.lat;
            meal.location.lng = yourLocation.lng;
            return (
              <TimeLine
                key={`${meal.name}${index}`}
                isEnd={index === mealsArr.length - 1 ? true : false}
                index={index}
              />
            );
          })}
        </Grid>
      </Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          right:'60px',
          bottom:'40px'
        }}
        onClick={()=>{
          const temp = [...mealsArr];
          temp.push({
             name:'',
             time:{
              date: new Date().toDateString(),
              hour:new Date().getHours(),
              min:new Date().getMinutes()
            },
            location:{
              name:'',
              lat:yourLocation.lat,
              lng:yourLocation.lng,
            }
          });
          setMealsArr(temp);
        }}
      >
        
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
}
