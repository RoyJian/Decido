import { Grid, Container, ButtonBase } from '@mui/material';
import React from 'react';
import StyleCard from './StyleCard';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { restaurantStyles } from '../Contexts/InitValue';
import { RestaurantStyle } from '../Contexts/Interface';

const SelctrRstaurantStyle = (Styles: RestaurantStyle[]) => {
  const result: RestaurantStyle[] = [];
  const seletCtcounts = 4;
  for (let i = 0; i < seletCtcounts; i++) {
    const ran = Math.floor(Math.random() * Styles.length);
    result.push(Styles.splice(ran, 1)[0]);
  }
  return result;
};
const selectStyles: RestaurantStyle[] = SelctrRstaurantStyle(restaurantStyles);

export default function Step1() {
  const { setTheSelctStyle, theSelctStyle } = React.useContext(
    AppContext
  ) as appContextValueInterface;

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        {selectStyles.map((item) => (
          <Grid
            item
            xs={6}
            key={item.name}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ButtonBase
              sx={{
                borderRadius: '40px',
                boxShadow: '2px 6px 4px rgba(0, 0, 0, 0.25)',
              }}
              onClick={() => setTheSelctStyle(item.name)}
            >
              <StyleCard nowSelect={theSelctStyle} text={item.name} img={item.url}></StyleCard>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Container>

    // <StyleCard text={'歐式'}/>
  );
}
