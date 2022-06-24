import React from 'react';
import Decide from './Decide';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { Box, Grid } from '@mui/material';
export default function Step3() {
  const { mealsArr } = React.useContext(AppContext) as appContextValueInterface;

  return (
    <Box ml={5} sx={{  maxWidth: 700 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {mealsArr.map((meal, index) => {
          return (
            <Decide
              key={meal.name}
              index={index}
            />
          );
        })}
      </Grid>
    </Box>
  );
}
