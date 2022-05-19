import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import GetRoutes from './components/shared/GetRoutes';
import Navbar from './components/shared/Navbar/Navbar';
import { UserProvider } from './context/useGlobalContext';


const App = () => {
  const [tableData, setTableData] = useState([]);

  return (
    <BrowserRouter>
      <UserProvider
        value={{
          tableData,
          setTableData
        }}
      >
        <Navbar />
        <GetRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
