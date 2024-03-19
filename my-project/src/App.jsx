import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


import './App.css'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import ForgotPassword from './Pages/ForgotPassword'
import Resetpassword from './Pages/Resetpassword'
import AdminDashboard from './Pages/AdminDashboard'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/login' element={<Signin/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
      <Route path='/resetpassword/:token' element={<Resetpassword/>}></Route>
      <Route path='/admindashboard' element={<AdminDashboard/>}></Route>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
