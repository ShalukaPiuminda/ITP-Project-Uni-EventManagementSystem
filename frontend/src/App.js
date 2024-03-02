import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import Home from './Home';
import Login from './Login';
import Registration from './Registration';
import AdminDashboard from './AdminDashboard';
//import Navbar from './Componenets/Navbar';


function App() {
  return (
    <BrowserRouter>
         <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/sign-up" element={<Registration/>}></Route>
          <Route path="/admin" element={<AdminDashboard/>}></Route>
   </Routes>
  
    </BrowserRouter>
  );
}

export default App;
