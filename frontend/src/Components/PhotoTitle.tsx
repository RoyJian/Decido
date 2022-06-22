import { Typography, Box } from '@mui/material';
import React from 'react';
interface Props {
  text: string;
}

export default function PhotoTitle(props: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        sx={{
          color: '#FFFFFF',
          fontWeight: 600,
          position: 'relative',
          left: 0,
          top: 100,
          background: 'rgba(158, 158, 239, 0.33)',
          backdropFilter: 'blur(20px)',
          borderEndEndRadius: 35,
          borderTopRightRadius: 35,
          boxShadow: 4,
          
        }}
        variant="h4"
        pt={1}
        pr={3}
        pl={2}
      >
        {props.text}
        <Box
          sx={{
            position: 'relative',
            height: 10,
            backgroundColor: 'rgba(241, 120, 185, 0.81)',
            top: -10,
          }}
          zIndex={-1}
        />
      </Typography>
    </Box>
  );
}
