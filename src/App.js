import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import GetRoutes from './components/shared/GetRoutes';

const App = () => {
 
  return (
    <BrowserRouter>
      <GetRoutes />
    </BrowserRouter>
  );
}

export default App;
