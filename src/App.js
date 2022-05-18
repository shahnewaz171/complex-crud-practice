import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import GetRoutes from './components/shared/GetRoutes';
import Navbar from './components/shared/Navbar/Navbar';

export const GlobalContext = createContext();

const App = () => {
  const [tableData, setTableData] = useState([]);
 
  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{ 
          tableData,
          setTableData
         }}
      >
        <Navbar />
        <GetRoutes />
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
