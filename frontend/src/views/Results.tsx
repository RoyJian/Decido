import { Box, Grid, Typography, Container, Fab } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Decide from '../Components/Decide';
import { DecideRes, Meal } from '../Contexts/Interface';
import MapIcon from '@mui/icons-material/Map';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import GoogleMaps from '../Components/GoogleMaps';
import { InfoWindow, Marker } from '@react-google-maps/api';
import RestaurantCard from '../Components/RestaurantCard';
const localDate = localStorage.getItem('date');
export default function Results() {
  const navigate = useNavigate();
  const [isMapMode, SetIsMapMode] = React.useState(false);
  const [activeMarker, setActiveMarker] = React.useState<string>('');
  const [decideRes, setDecideRes] = React.useState([]);
  const [mealsArr, setMealsArr] = React.useState([]);
  React.useEffect(() => {
    const localDecideRes = JSON.parse(
      localStorage.getItem('decideRes') || '{}'
    );
    const localMealArr = JSON.parse(localStorage.getItem('mealArr') || '{}');

    if (
      !Array.isArray(localDecideRes) ||
      !Array.isArray(localMealArr) ||
      localDate !== new Date().toDateString()
    ) {
      console.log(localDate, 'and', new Date().toDateString());
      console.log(
        'navigate to steps',
        localDate !== new Date().toDateString(),
        !Array.isArray(localDecideRes),
        !Array.isArray(localMealArr)
      );
      navigate('/steps');
    }
    setDecideRes(localDecideRes);
    setMealsArr(localMealArr);
  }, []);
  const handleActiveMarker = (marker: string) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  return (
    <Container>
      <Grid
        my={12}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            right: '60px',
            bottom: '40px',
          }}
          onClick={() => {
            SetIsMapMode(!isMapMode);
          }}
        >
          {isMapMode ? <AccessTimeFilledIcon /> : <MapIcon />}
        </Fab>
        <Grid item ml={12} mb={5} xs={12} sx={{ display: 'flex' }}>
          <Typography
            variant="h4"
            sx={{ fontStyle: 'medium', fontWeight: 600 }}
          >
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
        {isMapMode ? (
          <Grid container ml={15}>
            <GoogleMaps height="70vh" width="60vw">
              {decideRes.map((meal: DecideRes) => {
                return (
                  <Marker
                    key={meal.meal}
                    position={{
                      lat: meal.recommands[0].location.lat,
                      lng: meal.recommands[0].location.lng,
                    }}
                    onClick={() => handleActiveMarker(meal.recommands[0].name)}
                  >
                    {activeMarker === meal.recommands[0].name ? (
                      <InfoWindow onCloseClick={() => setActiveMarker('')}>
                        {/* <div>{meal.recommands[0].name}</div> */}
                        <RestaurantCard
                          title={meal.recommands[0].name}
                          score={meal.recommands[0].score}
                          address={meal.recommands[0].address}
                          url={meal.recommands[0].url}
                        />
                      </InfoWindow>
                    ) : null}
                  </Marker>
                );
              })}
            </GoogleMaps>
          </Grid>
        ) : (
          mealsArr.map((meal: Meal, index: number) => {
            return (
              <Decide
                key={meal.name}
                index={index}
                data={decideRes}
                isEdit={false}
              />
            );
          })
        )}
      </Grid>
    </Container>
  );
}
