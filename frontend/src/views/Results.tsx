import { Box, Grid, Typography, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Decide from '../Components/Decide';
import { Meal } from '../Contexts/Interface';
export default function Results() {
  const navigate = useNavigate();
  const [decideRes, setDecideRes] = React.useState([]);
  const [mealsArr, setMealsArr] = React.useState([]);
  React.useEffect(() => {
    const localDecideRes = JSON.parse(
      localStorage.getItem('decideRes') || '{}'
    );
    const localMealArr = JSON.parse(localStorage.getItem('mealArr') || '{}');
    const localDate = localStorage.getItem('date');
    if (
      !Array.isArray(localDecideRes) ||
      !Array.isArray(localMealArr) ||
      localDate !== new Date().toDateString()
    ) {
      navigate('/steps');
    }
    setDecideRes(localDecideRes);
    setMealsArr(localMealArr);
  }, []);

  return (
    <Container>
      <Grid
        my={12}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item ml={12} mb={5} xs={12} sx={{ display: 'flex' }}>
          <Typography variant="h4" sx={{fontStyle:'medium',fontWeight: 600}}>
            {'今日推薦'}{' '}
            <Box
              sx={{
                position: 'relative',
                height: 10,
                backgroundColor: 'rgba(235, 154, 197, 0.81)',
                top: -10,
              }}
              zIndex={-1}
            />
          </Typography>
        </Grid>
        {mealsArr.map((meal: Meal, index) => {
          return <Decide key={meal.name} index={index} data={decideRes} isEdit={false} />;
        })}
      </Grid>
    </Container>
  );
}
