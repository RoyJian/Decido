import {
  Box,Button,Container,MobileStepper,Paper,Typography,useTheme,
} from '@mui/material';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PhotoTitle from '../Components/PhotoTitle';
import P1 from '../imgs/p1.png';
import P2 from '../imgs/p2.jpg';
import P3 from '../imgs/p3.png';
import P4 from '../imgs/p4.png';
import { Link,useNavigate } from 'react-router-dom';

const images = [
  {
    label: '還在煩惱要吃什麼嗎？',
    imgPath: P1,
  },
  {
    label: '想要試試新口味嗎？',
    imgPath: P2,
  },
  {
    label: 'Decido 幫你決定',
    imgPath: P3,
  },
  {
    label: '讓你不再煩惱今天的飲食',
    imgPath: P4,
  },
];
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Wealcome() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      <Box sx={{ maxWidth: 900, flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
               <PhotoTitle  text={images[activeStep].label}/>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    display: 'block',
                    maxWidth: 900,
                    overflow: 'hidden',
                    width: '100%',
                    zIndex:'modal'
                  }}
                  src={step.imgPath}
                ></Box>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </Box>
      <Box mt={5} mb={5}>
        <Button component={Link} to="/steps" sx={{ maxWidth: 151, maxHeight: 60 }}>Start</Button>
      </Box>
    </Container>
  );
}
