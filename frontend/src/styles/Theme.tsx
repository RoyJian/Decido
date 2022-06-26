import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
export const theme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  return createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      primary: {
        main: prefersDarkMode ? '#7879F1' : '#290481',
      },
      secondary: {
        main: prefersDarkMode ? '#f44336' : '#ba000d',

      },
      // background: {
      //   default:prefersDarkMode ?'#FFFFFF':'#000000'
      // }
    },
  });
};
