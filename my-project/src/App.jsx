import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


import './App.css'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/login' element={<Signin/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
