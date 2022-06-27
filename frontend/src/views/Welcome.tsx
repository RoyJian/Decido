import {
  Box,
  Button,
  Container,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
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
import { Link, useNavigate } from 'react-router-dom';
import { DriveEtaRounded } from '@mui/icons-material';

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
  const navigate = useNavigate();
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
    <React.Fragment>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            <Box
              mt={-12}
              style={{
                width: '99vw',
                height: '100vh',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${step.imgPath})`,
                filter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
              }}
            ></Box>
            <PhotoTitle text={step.label} />
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Box sx={{position:'relative' ,top:'-20vh' }}>
      <Box sx={{display:'flex',justifyContent:'center'}}>
        <Button
          variant="contained"
          sx={{ maxWidth: 151, maxHeight: 60 }}
          onClick={() => {
            const localDate = localStorage.getItem('date');
            if (localDate !== new Date().toDateString() && localDate !== null) {
              console.log('評分');
              navigate('/score');
            } else navigate('/steps');
          }}
        >
          Start
        </Button>
      </Box>
      <MobileStepper
        style={{background:'transparent'}}
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
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
       
      </Box>
     
    
    </React.Fragment>
  );
}
