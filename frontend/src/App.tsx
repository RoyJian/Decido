import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './views/Test';
import Welcome from './views/Welcome';
import { theme } from './styles/Theme';
import NavBar from './Components/NavBar';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Steps from './views/Steps';
import Context from './Contexts/AppProvider';

function App() {
  return (
    <BrowserRouter>
      <Context>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <NavBar />
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/steps" element={<Steps />} />
          </Routes>
        </ThemeProvider>
      </Context>
    </BrowserRouter>
  );
}

export default App;
