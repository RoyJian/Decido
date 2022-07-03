import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  text: string;
  nowSelect: string;
  img: string;
}

export default function StyleCard(props: Props) {
  return (
    <Box
      width={212}
      height={299}
      border={
        props.nowSelect === props.text
          ? '7px solid  rgba(241, 120, 185, 0.81)'
          : '7px solid rgba(217, 217, 217, 1)'
      }
      borderRadius="40px"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `url(${props.img}) no-repeat center center  `,
        backgroundSize: '600px'
      }}
    >
      <Typography
        sx={{
          padding: '5px',
          backdropFilter: 'blur(5px)',
          border: '2px solid rgba(217, 217, 217, 1)',
          borderRadius: '10px',
          background: 'rgba(0, 0, 0, 0.40)',
        }}
        color="#FFFFFF"
        variant="h4"
      >
        {props.text}
      </Typography>
    </Box>
  );
}
