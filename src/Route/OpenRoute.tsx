import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AllPhotos from '../Pages/AllPhotos'
import Home from '../Pages/Home'
import Signin from '../Pages/Signin'
import Signout from '../Pages/Signout'
import Signup from '../Pages/Signup'
import UserPage from '../Pages/UserPage'
import MyPhotos from '../Pages/MyPhotos';



const OpenRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/userpage' element={<UserPage/>} />
        <Route path='/allphotos' element={<AllPhotos/>} />
        <Route path='/myphotos' element={<MyPhotos/>} />
        <Route path='/signout' element={<Signout/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default OpenRoute