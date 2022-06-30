import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Step1 from '../Components/Step1';
import Step2 from '../Components/Step2';
import Step3 from '../Components/Step3';
import {
  Box,
  Container,
  Grid,
  Step,
  Stepper,
  StepLabel,
  Button,
} from '@mui/material';
import { AppContext,appContextValueInterface } from '../Contexts/AppProvider';

interface LabelProps {
  optional?: React.ReactNode;
}
const steps = ['Choose a style', 'Number of Meals', 'Decide !'];

export default function Steps() {
  // const [activeStep, setActiveStep] = React.useState(0);
  const { activeStep, setActiveStep} = React.useContext(
    AppContext
  ) as appContextValueInterface;
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid
        item
        xs={1}
        sx={{paddingTop:'40vh',paddingLeft:'60px' }}
      >
        <Button
          sx={{}}
          onClick={() => {
            setActiveStep(activeStep > 0 ? activeStep - 1 : activeStep);
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="3x" />
        </Button>
      </Grid>
      <Grid item  xs={10}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '100%' }} mt={5}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const labelProps: LabelProps = {};
              return (
                <Step key={label}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      
            <Box sx={{ display: 'flex', justifyContent: 'center' }} mt={12}>
              {activeStep === 0 ? (
                <Step1 />
              ) : activeStep === 1 ? (
                <Step2 />
              ) : (
                <Step3 />
              )}
            </Box>
      </Container>
      </Grid>
     
      <Grid
        item
        xs={1}
        sx={{ paddingTop:'40vh',paddingRight:'60px'  }}
      >
        <Button
          onClick={() => {
            console.log(activeStep);
            setActiveStep(
              activeStep < steps.length ? activeStep + 1 : activeStep
            );
            if (activeStep >= steps.length - 1) navigate('/Results');
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} size="3x" />
        </Button>
      </Grid>
    </Grid>
  );
}
