import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Step1 from '../Components/Step1';
import Step2 from '../Components/Step2';
import Step3 from '../Components/Step3';
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
  const navigate = useNavigate();
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
          <Step2/>
        ) : (
          <Step3/>
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
            if (activeStep === steps.length -1 )
              navigate('/Results');
          }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
}
