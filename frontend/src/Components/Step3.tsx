import React from 'react';
import Decide from './Decide';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { Box, Grid ,Backdrop ,CircularProgress} from '@mui/material';
// import { DecideInit as i } from '../Contexts/InitValue'; //模擬api
import { DecideRes, Meal } from '../Contexts/Interface';
import { getRecommand } from '../APIs/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Step3() {
  const { mealsArr, theSelctStyle, setActiveStep } = React.useContext(
    AppContext
  ) as appContextValueInterface;
  const [DecideInit, setDecideInit] = React.useState<DecideRes[]>([]);
  const [isfinish, setIsFinish] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const DecideInit0: any[] = [];
    const seed = JSON.parse(localStorage.getItem('seed') || '[]');
    const useTagindex = Math.floor(Math.random() * (mealsArr.length - 1)) + 1;
    localStorage.setItem('mealArr', JSON.stringify(mealsArr));
    console.log('useTagindex:', useTagindex);
    const func = async () => {
      for (let index = 0; index < mealsArr.length; index++) {
        const meal = mealsArr[index];
        const tag =
          meal.name !== '早餐' && meal.time.hour >= 12 && useTagindex === index
            ? theSelctStyle
            : '';
        // console.log(index,'create');
        const apiRes = await getRecommand(seed[index] || '', meal, tag)
          .then((res) => {
            // console.log(index,'done');
            DecideInit0.push({
              meal: meal.name,
              recommands: res,
            });
            if (index === mealsArr.length - 1) {
              const decideRes = DecideInit0.map((item) => {
                return {
                  meal: item.meal,
                  recommands: [item.recommands[0]],
                };
              });
              setDecideInit(DecideInit0);
              localStorage.setItem('decideRes', JSON.stringify(decideRes));
              localStorage.setItem('date', new Date().toDateString());
              setIsFinish(true);
            }
            return { code: 0, msg: 'success' };
          })
          .catch((err) => {
            return JSON.parse(err.message);
          });
        if (apiRes.code !== 0) {
          console.log(apiRes);
          if (apiRes.errorcode === 666) {
            Swal.fire({
              title: 'info',
              text: apiRes.msg,
              icon: 'info',
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'error',
              text: apiRes.msg,
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
          setActiveStep(0);
          break;
        }
      }
    };
    func();
  }, []);

  return (
    <Box ml={5} sx={{ maxWidth: 700 }}>
      {isfinish === true ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {mealsArr.map((meal, index) => {
            return (
              <Decide
                key={meal.name}
                index={index}
                data={DecideInit}
                isEdit={true}
              />
            );
          })}
        </Grid>
      ) : (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isfinish}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
}
