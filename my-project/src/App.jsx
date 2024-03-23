import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


import './App.css'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import ForgotPassword from './Pages/ForgotPassword'
import Resetpassword from './Pages/Resetpassword'
import AdminDashboard from './Pages/AdminDashboard'
import Reservation from './Pages/Reservation'
import Addevent from './Pages/Addevent'
import AdminEvents from './Pages/AdminEvents'

import ReservationDetails from './Pages/ReservationDetails'
import Addnotification from './Pages/Addnotification'
import NotigicationAdmin from './Pages/NotigicationAdmin'
import UpdateNotification from './Pages/UpdateNotification'

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
      <Route path='/reservation/:id' element={<Reservation/>}></Route>
      <Route path='/addevent' element={<Addevent/>}></Route>
      <Route path='/evnt-admin' element={<AdminEvents/>}></Route>
      <Route path='/reservationdetails' element={<ReservationDetails/>}></Route>
      <Route path='/addnotification' element={<Addnotification/>}></Route>
      <Route path='/notification' element={<NotigicationAdmin/>}></Route>
      <Route path='/updatenotification/:id' element={<UpdateNotification/>}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
