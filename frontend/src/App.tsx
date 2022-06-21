import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './views/Test';
import Wealcome from './views/Wealcome';
import { theme } from './styles/Theme';
import NavBar from './Components/NavBar';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme()}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/wealcome" element={<Wealcome />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
