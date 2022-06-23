import React from 'react';
import TimeLine from './TimeLine';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { Box, Grid } from '@mui/material';
export default function Step2() {
  const { mealsArr, setMealsArr } = React.useContext(
    AppContext
  ) as appContextValueInterface;

  return (
    <Box ml={5} sx={{ display: 'flex',justifyContent:'left',maxWidth:300 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {mealsArr.map((meal,index) => {
          const time = `${meal.time.hour}:${String(meal.time.min).padStart(
            2,
            '0'
          )}`;
          return (
            <TimeLine
              key={meal.name}
              time={time}
              name={meal.name}
              location={meal.location}
              isEnd={(index === mealsArr.length-1) ? true : false}
              index={index}
            />
          );
        })}
      </Grid>
    </Box>
  );
}
