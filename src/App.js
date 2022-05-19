import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GetRoutes from './components/shared/GetRoutes';
import Navbar from './components/shared/Navbar/Navbar';
import { UserProvider } from './context/useGlobalContext';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


const App = () => {

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <GetRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
