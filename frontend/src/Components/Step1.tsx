import { Grid, Container, ButtonBase } from '@mui/material';
import React from 'react';
import StyleCard from './StyleCard';
import { AppContext, appContextValueInterface } from '../Contexts/AppProvider';
import { restaurantStyles } from '../Contexts/InitValue';

const SelctrRstaurantStyle = (Styles: string[]) => {
  const styleArr: string[] = Styles;
  const result: string[] = [];
  const seletCtcounts = 4;
  for (let i = 0; i < seletCtcounts; i++) {
    const ran = Math.floor(Math.random() * Styles.length);
    result.push(styleArr.splice(ran, 1)[0]);
  }
  return result;
};
const selectStyles: string[] = SelctrRstaurantStyle(restaurantStyles);

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
            key={item}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ButtonBase
              key={item}
              sx={{
                borderRadius: '40px',
                boxShadow: '2px 6px 4px rgba(0, 0, 0, 0.25)',
              }}
              onClick={() => setTheSelctStyle(item)}
            >
              <StyleCard nowSelect={theSelctStyle} text={item}></StyleCard>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Container>

    // <StyleCard text={'歐式'}/>
  );
}
