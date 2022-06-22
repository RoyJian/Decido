import { Box, Typography, ButtonBase ,ToggleButton } from '@mui/material';
import React from 'react';

interface Props{
    text:string,
    nowSelect:string
}

export default function StyleCard(props:Props){
    return (
        <Box 
            width={212}
            height={299}
            border={props.nowSelect===props.text ?'7px solid rgba(241, 120, 185, 0.81)':0}
            borderRadius='40px'
            sx={{
                    display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#D9D9D9',

                }}
        >
            <Typography variant="h4">
                {props.text}
            </Typography>
        </Box>
        
    );
}