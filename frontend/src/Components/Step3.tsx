import React from 'react';
import Decide from './Decide';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { Box, Grid } from '@mui/material';
import { DecideInit as i } from '../Contexts/InitValue'; //模擬api
import { DecideRes } from '../Contexts/Interface';
import { getRecommand } from '../APIs/api';
import { useNavigate } from 'react-router-dom';

export default function Step3() {
  const { mealsArr ,theSelctStyle} = React.useContext(AppContext) as appContextValueInterface;
  const [DecideInit,setDecideInit] = React.useState<DecideRes[]>([]);
  const [isfinish,setIsFinish] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(()=>{
      const DecideInit0:any[]= [];
      const seed = JSON.parse( localStorage.getItem('seed') || '[]'); 
      mealsArr.map((meal,index)=>{
        const tag = (meal.name!== '早餐' && meal.time.hour > 12 && Math.random() > 0.5) ? theSelctStyle : '';
        getRecommand((seed[index]||''),meal,tag).then((res)=>{

          DecideInit0.push({
            meal:meal.name,
            recommands:res
          });
          const decideRes = DecideInit0.map((item)=>{
            return {
              meal:item.meal,
              recommands:[item.recommands[0]]
            };
          });
          if (index === mealsArr.length - 1){
            setDecideInit(DecideInit0);
            console.log('set');
            localStorage.setItem('decideRes', JSON.stringify(decideRes));
            localStorage.setItem('mealArr',JSON.stringify(mealsArr));
            localStorage.setItem('date',new Date().toDateString());
            console.log(DecideInit0);
            setIsFinish(true);
          }
            

        }).catch((err)=>{
          window.alert(err);
          navigate('/steps');
        });
      });
      

  },[]);

  return (
    <Box ml={5} sx={{  maxWidth: 700 }}>{
      isfinish=== true 
      ?
       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {mealsArr.map((meal, index) => {
          return (
            <Decide
              key={meal.name}
              index={index}
              data = {DecideInit}
              isEdit = {true}
            />
          );
        })}
      </Grid>
      :
      <h1>wef</h1>
    }

    </Box>
  );

}
