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
import Results from './views/Results';
import Score from './views/Score';

function App() {
  return (
    <BrowserRouter>
      <Context>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <NavBar />
          <Routes>
          <Route path="/" element={<Welcome />} />
            <Route path="/test" element={<Test />} />
            <Route path="/steps" element={<Steps />} />
            <Route path="/results" element={<Results />}/>
            <Route path="/Score" element={<Score />} />
          </Routes>
        </ThemeProvider>
      </Context>
    </BrowserRouter>
  );
}

export default App;
