import React, { Children } from 'react'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'


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
import ReservationAdmin from './Pages/ReservationAdmin'
import DeleteNotification from './Pages/DeleteNotification'
import ApproveReservation from './Pages/ApproveReservation'

import UploadVideo from './Pages/UploadVideo'
import MyWishlist from './Pages/MyWishlist'
import Pastevents from './Pages/Pastevents'
import UpdateVideo from './Pages/UpdateVideo'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'
import DeleteUser from './Pages/DeleteUser'
import PasteventsAdmin from './Pages/PasteventsAdmin'
import Deletevideo from './Pages/Deletevideo'
import UserNotification from './Pages/UserNotification'
import UserReservations from './Pages/UserReservations'
import Updatereservation from './Pages/Updatereservation'
import DeleteReservation from './Pages/DeleteReservation'
import DeleteProfile from './Pages/DeleteProfile'

import UserRouteGuard from './Components/UserRouteGuard'
import AdminRouteGuard from './Components/AdminRouteGuard'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={
      
      <UserRouteGuard>
      <Home/>
      </UserRouteGuard>
      
      
      }></Route>
      <Route path='/login' element={<Signin/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
      <Route path='/resetpassword/:token' element={<Resetpassword/>}></Route>
      <Route path='/admindashboard' element={<AdminRouteGuard><AdminDashboard/></AdminRouteGuard>}></Route>
      <Route path='/reservation/:id' element={<Reservation/>}></Route>
      <Route path='/addevent' element={<Addevent/>}></Route>
      <Route path='/evnt-admin' element={<AdminEvents/>}></Route>
      <Route path='/reservationdetails/:customername/:eventname' element={<ReservationDetails/>}></Route>
      <Route path='/addnotification' element={<Addnotification/>}></Route>
      <Route path='/notification' element={<UserRouteGuard><NotigicationAdmin/></UserRouteGuard>}></Route>
      <Route path='/updatenotification/:id' element={<UpdateNotification/>}></Route>
      <Route path='/reservation-admin' element={<ReservationAdmin/>}></Route>
      <Route path='/deletenotification/:id' element={<DeleteNotification/>}></Route>
      <Route path='/approvereservation/:id' element={<ApproveReservation/>}></Route>
      <Route path='/mywishlist' element={<UserRouteGuard><MyWishlist/></UserRouteGuard>}></Route>
      <Route path='/pastevents' element={<UserRouteGuard><Pastevents/></UserRouteGuard>}></Route>
      <Route path='/uploadvideo' element={<UploadVideo/>}></Route>
      <Route path='/updatevideo/:id' element={<UpdateVideo/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/editprofile/:userId' element={<EditProfile/>}></Route>
      <Route path='/deleteuser/:id' element={<DeleteUser/>}></Route>
      <Route path='/pastevents-admin' element={<PasteventsAdmin/>}></Route>
      <Route path='/deletevideo/:id' element={<Deletevideo/>}></Route>
      <Route path='/usernotification' element={<UserNotification/>}></Route>
      <Route path='/userreservation' element={<UserRouteGuard><UserReservations/></UserRouteGuard>}></Route>
      <Route path='/updatereservation/:id' element={<Updatereservation/>}></Route>
      <Route path='/deletereservation/:id' element={<DeleteReservation/>}></Route>
      <Route path='/deleteprofile/:id' element={<DeleteProfile/>}></Route>
     
      

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
