import React from 'react';
import Decide from './Decide';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { Box, Grid } from '@mui/material';
import { DecideInit } from '../Contexts/InitValue'; //模擬api
import { DecideRes } from '../Contexts/Interface';

export default function Step3() {
  const { mealsArr } = React.useContext(AppContext) as appContextValueInterface;
  React.useEffect(()=>{
      const decideRes = DecideInit.map((item)=>{
        return {
          meal:item.meal,
          recommands:[item.recommands[0]]
        };
      });
    localStorage.setItem('decideRes', JSON.stringify(decideRes));
    localStorage.setItem('mealArr',JSON.stringify(mealsArr));
    localStorage.setItem('date',new Date().toDateString());
  },[]);

  return (
    <Box ml={5} sx={{  maxWidth: 700 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {mealsArr.map((meal, index) => {
          return (
            <Decide
              key={meal.name}
              index={index}
              data = { DecideInit}
              isEdit = {true}
            />
          );
        })}
      </Grid>
    </Box>
  );
}
