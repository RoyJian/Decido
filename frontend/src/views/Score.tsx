import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid ,Button,Rating} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Decide from '../Components/Decide';
import { Meal } from '../Contexts/Interface';
import StarRatingComponent from 'react-star-rating-component';
import { addReview } from '../APIs/api';
import Swal from 'sweetalert2';

const uuid = localStorage.getItem('uuid') as string;
export default function Score() {
  const navigate = useNavigate();
  const [decideRes, setDecideRes] = React.useState<any[]>([]);
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
                  <Box sx={{ display: 'flex',position:'absolute' }}>
                    <Rating
                      sx = {{position:'relative',left:'0px' ,top:'70px' ,zIndex:'10'}}
                      name={meal.name}
                      value={scoreArr[index]}
                      onChange={(_e,clickvalue)=>{
                        const temp = Array.from(scoreArr);
                        const restaurant_id:string = decideRes[index].recommands[0].place_id;
                        temp[index] = clickvalue as number;
                        setScoreArr(temp);
                        addReview(uuid,restaurant_id,clickvalue as number);
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
            const seed = decideRes.map((meal)=>{
              return meal.recommands[0].name;
            });
            localStorage.setItem('seed',JSON.stringify(seed));
            Swal.fire({
              text:'感謝您的回饋',
              icon: 'success',
              confirmButtonText:'OK',
            });
            navigate('/steps');
        }}>Apply</Button>
      </Box>
    </Container>
  );
}
