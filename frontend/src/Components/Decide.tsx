import { Box, Typography, Avatar, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import EditMeal from './EditMeal';
import React from 'react';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import RestaurantCard from './RestaurantCard';
import { DecideInit } from '../Contexts/InitValue';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper';
interface Props {
  index: number;
}

export default function TimeLine(props: Props) {
  const [isEdit, setIsEdit] = React.useState(false);
  const { mealsArr } = React.useContext(AppContext) as appContextValueInterface;
  return (
    <React.Fragment>
      <Grid
        container
        rowSpacing={2}
        mb={3}
        xs={6}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <EditMeal index={props.index} enable={isEdit} setEnable={setIsEdit} />
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
            onClick={() => setIsEdit(true)}
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
              console.log(e.activeIndex);
            }}
          >
            {DecideInit[props.index].recommands.map((restaurant, index) => (
              <SwiperSlide key={restaurant.title}>
                <RestaurantCard
                  title={restaurant.title}
                  score={restaurant.score}
                  address={restaurant.address}
                  imgURL={restaurant.imgURL}
                  
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {
            //   <RestaurantCard
            //   title={DecideInit[props.index].recommands[0].title}
            //   score={DecideInit[props.index].recommands[0].score}
            //   address={DecideInit[props.index].recommands[0].address}
            //   imgURL={DecideInit[props.index].recommands[0].imgURL}
            //   key={DecideInit[props.index].recommands[0].title}
            // />
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
