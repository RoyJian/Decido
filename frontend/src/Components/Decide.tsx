import { Box, Typography, Avatar, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import EditMeal from './EditMeal';
import React from 'react';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import RestaurantCard from './RestaurantCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DecideRes, Meal } from '../Contexts/Interface';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper';
interface Props {
  index: number;
  data: DecideRes[];
  isEdit:boolean;
}

export default function Decido(props: Props) {
  const [isEdit, setIsEdit] = React.useState(false);
  const mealsArr :Meal[]= (JSON.parse(localStorage.getItem('mealArr') || '{}'));

  return (
    <React.Fragment>
      <Grid
        container
        rowSpacing={2}
        mb={3}
        xs={6}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        { props.isEdit
          ?<EditMeal index={props.index} enable={isEdit} setEnable={setIsEdit} />
          :null
        }
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4">
            {`${mealsArr[props.index].time.hour}:${String(
              mealsArr[props.index].time.min
            ).padStart(2, '0')}`}{' '}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ bgcolor: '#ffc0cb' }}
            onClick={() => props.isEdit?setIsEdit(true):setIsEdit(false)}
          ></Avatar>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: 2, height: 326, background: '#C4C4C4' }} />
        </Grid>
      </Grid>

      <Grid
        container
        rowSpacing={5}
        mb={3}
        xs={6}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'sart',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h5">{mealsArr[props.index].name} </Typography>
            <Typography variant="h6">
              <FontAwesomeIcon icon={faLocationPin} />{' '}
              {mealsArr[props.index].location.name}{' '}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
  
        >
          <Swiper
            effect={'cards'}
            grabCursor={false}
            modules={[EffectCards]}
            className="mySwiper"
            onActiveIndexChange={(e)=>{
              const decideRes :DecideRes[] = JSON.parse(localStorage.getItem('decideRes')|| '[]');
              decideRes[props.index].recommands[0] = props.data[props.index].recommands[e.activeIndex];
              localStorage.setItem('decideRes',JSON.stringify(decideRes));
            }}
          >
            {props.data[props.index].recommands.map((restaurant, index) => {
              // console.log(index,restaurant.name,restaurant.url);
              return(
              <SwiperSlide key={restaurant.name}>
                <RestaurantCard
                  title={restaurant.name}
                  score={restaurant.score}
                  address={restaurant.address}
                  url={restaurant.url}
                />
              </SwiperSlide>
            );})}
          </Swiper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
