import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faBars} from '@fortawesome/free-solid-svg-icons';
import { Typography, Toolbar, IconButton, Box, AppBar } from '@mui/material';
import {  useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            onClick={() => navigate(-1)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="left"
            sx={{ mr: 2}}
          > 
            <FontAwesomeIcon icon={faAngleLeft} />
          </IconButton>
          <Typography onClick={() => navigate('/')} variant="h5" component="div" sx={{ flexGrow: 1 ,cursor:'pointer'}} fontWeight={600}>
            Decido
            
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
