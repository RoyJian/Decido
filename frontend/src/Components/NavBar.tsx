import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faBars} from '@fortawesome/free-solid-svg-icons';
import { Typography, Toolbar, IconButton, Box, AppBar } from '@mui/material';
export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="left"
            sx={{ mr: 2}}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} fontWeight={600}>
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
