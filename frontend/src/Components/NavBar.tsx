import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import {
  Typography,
  Toolbar,
  IconButton,
  Box,
  AppBar,
  Drawer,
  styled,
  useTheme,
  Divider,
  List,
} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import GitHub from '@mui/icons-material/GitHub';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function NavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
            sx={{ mr: 2 }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </IconButton>
          <Typography
            onClick={() => navigate('/')}
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            fontWeight={600}
          >
            Decido
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              navigate('/results');
              setOpen(false);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <TurnLeftIcon />
              </ListItemIcon>
              <ListItemText primary={'Today decision'} />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              window.open('https://github.com/RoyJian/Decido');
              setOpen(false);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <GitHub />
              </ListItemIcon>
              <ListItemText primary={'Source Code'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
