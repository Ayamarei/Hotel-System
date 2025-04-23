import './App.css'
import AuthLayout from './Modules/Shared/Authentication/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import ForgetPassword from './Modules/Authentication/Forget-Password/Forget-Password'
import ResetPassword from './Modules/Authentication/Reset-Password/Reset-Password'
import { Bounce, ToastContainer } from 'react-toastify'
import React, { useEffect } from "react";

import { useTranslation, initReactI18next } from "react-i18next";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import i18n from './i18n'
import cookies from "js-cookie"
import MasterLayout from './Shared/MasterLayout/MasterLayout'
import RoomsList from './Rooms/RoomsList/RoomsList'
import RoomsData from './Rooms/RoomsData/RoomsData'
import AdsList from './ADS/AdsList/AdsList'
import AdsData from './ADS/AdsData/AdsData'
import FacilitiesData from './Facilities/FacilitiesData/FacilitiesData'
import FacilitiesList from './Facilities/FacilitiesList/FacilitiesList'
import ListBooking from './Booking/ListBooking'
import ListUsers from './Users/ListUsers'
import Dashboard from './Modules/Dashboard/Dashboard'
import ChangePassword from './Modules/Authentication/Change-Password/Change-Password'






function App() {
  // local
  const { t } = useTranslation();
  const lng=cookies.get("i18next")||"en";

  useEffect(()=>{
      window.document.dir=i18n.dir();
    },[lng])

  // routes
  const routes=createBrowserRouter([
    // auth layout
    {
      path:'',
      element: <AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {path:'login',element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'forget-password',element:<ForgetPassword/>},
        {path:'reset-password',element:<ResetPassword/>},
        {path:'Change-Password',element:<ChangePassword/>},
  
      ]
    },
    
    {
  path:'dashboard',
  element:<MasterLayout/>,
  errorElement:<NotFound/>,
  children:[
    {path:'',element:<Dashboard/>},
    {path:'rooms',element:<RoomsList/>},
    {path:'rooms-data/:roomId',element:<RoomsData/>},
    {path:'add-room',element:<RoomsData/>},
    {path:'ads',element:<AdsList/>},
    {path:'ads-data',element:<AdsData/>},
    {path:'facilities',element:<FacilitiesList/>},
    {path:'facilities-data',element:<FacilitiesData/>},
    {path:'list-booking',element:<ListBooking/>},
    {path:'list-users',element:<ListUsers/>},

  ]
}
  ])

  return (
    <>
    <button onClick={()=>{i18n.changeLanguage("ar")}}>Ar</button>
    <button  onClick={()=>{i18n.changeLanguage("en")}}>En</button>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}/>

    </>
  )
}
export default App