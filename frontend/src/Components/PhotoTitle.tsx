import { Typography, Box } from '@mui/material';
import React from 'react';
interface Props {
  text: string;
}

export default function PhotoTitle(props: Props) {
  return (
    <Box sx={{ display: 'flex' , justifyContent:'center',position:'relative',top:'-55vh'}}>
      <Box sx={{
         backdropFilter: 'blur(60px)',
         boxShadow: 4,
         width:500,
         height:100,
         background: 'rgba(0,0,0, 0.4)',
         display:'center',
         justifyContent:'center',
         border: '3px solid #f1f1f1',
         alignItems:'center',
         borderRadius:'10px'
      }

      }>
      <Typography
        sx={{
          color: '#FFFFFF',
          fontWeight: 600, 
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
      
    </Box>
  );
}
