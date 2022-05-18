import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import GetRoutes from './components/shared/GetRoutes';
import Navbar from './components/shared/Navbar/Navbar';

const App = () => {
 
  return (
    <BrowserRouter>
      <Navbar />
      <GetRoutes />
    </BrowserRouter>
  );
}

export default App;
