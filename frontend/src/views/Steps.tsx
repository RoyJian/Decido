import React from 'react';
import Step1 from '../Components/Step1';
import {
  Box,
  Container,
  Step,
  Stepper,
  StepLabel,
  Button,
} from '@mui/material';

interface StepProps {
  completed?: boolean;
}
interface LabelProps {
  optional?: React.ReactNode;
}
const steps = ['Choose a style', 'Number of Meals', 'Decide !'];

export default function Steps() {
  const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%' }} mt={5}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            console.log(label);
            const stepProps: StepProps = {};
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
          <h1>step2</h1>
        ) : (
          <h1>step3</h1>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mt={5}>
        <Button
          onClick={() => {
            setActiveStep(activeStep > 0 ? activeStep - 1 : activeStep);
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setActiveStep(
              activeStep < steps.length ? activeStep + 1 : activeStep
            );
          }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
