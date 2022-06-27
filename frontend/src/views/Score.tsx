import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid ,Button} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Decide from '../Components/Decide';
import { Meal } from '../Contexts/Interface';
import StarRatingComponent from 'react-star-rating-component';
export default function Score() {
  const navigate = useNavigate();
  const [decideRes, setDecideRes] = React.useState([]);
  const [mealsArr, setMealsArr] = React.useState([]);
  const [scoreArr,setScoreArr] = React.useState<number[]>([0]);
  React.useEffect(() => {
    const localDate = localStorage.getItem('date');

    if (localDate === null) {
      navigate('/steps');
    }
    const localDecideRes = JSON.parse(
      localStorage.getItem('decideRes') || '{}'
    );
    const localMealArr = JSON.parse(localStorage.getItem('mealArr') || '{}');
    setDecideRes(localDecideRes);
    setMealsArr(localMealArr);
    const MealArrLen = Array.from(localMealArr).length || 0;
    setScoreArr(Array(MealArrLen).fill(0));
  }, []);
  return (
    <Container>
      <Grid container mt={5}>
        <Grid item xs={12} mb={5} sx={{ display: 'flex' }}>
          <Typography
            variant="h4"
            sx={{ fontStyle: 'medium', fontWeight: 600 }}
          >
            <FontAwesomeIcon icon={faPenToSquare} /> {' 先為去過的餐廳打分數吧'}{' '}
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
          return (
            <React.Fragment key={meal.name}>
              <Grid container xs={12}>
                <Grid item xs={6}>
                  <Box sx={{}}></Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex' }}>
                    <StarRatingComponent
                      name={meal.name}
                      starCount={5}
                      value={scoreArr[index]}
                      onStarClick={(clickvalue)=>{
                        const temp = Array.from(scoreArr);
                        temp[index] = clickvalue;
                        setScoreArr(temp);
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Decide index={index} data={decideRes} isEdit={false} />
            </React.Fragment>
          );
        })}
      </Grid>
      <Box mb={5} mt={5} sx={{display:'flex',justifyContent:'end'}}>
        <Button variant='contained' onClick={()=>{
            localStorage.removeItem('date'),
            localStorage.removeItem('mealArr');
            localStorage.removeItem('decideRes');
            navigate('/steps');
        }}>Apply</Button>
      </Box>
    </Container>
  );
}
