import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './views/test';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
