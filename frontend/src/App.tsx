import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './views/Test';
import { theme } from './styles/Theme';
import NavBar from './Components/NavBar';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <ThemeProvider theme={theme()}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
