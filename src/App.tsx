import './App.css'
import AuthLayout from './Modules/Shared/Authentication/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import ForgetPassword from './Modules/Authentication/Forget-Password/Forget-Password'
import ResetPassword from './Modules/Authentication/Reset-Password/Reset-Password'
import { Bounce, ToastContainer } from 'react-toastify'
import { useEffect } from "react";

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
 
  const lng=cookies.get("i18next")||"en";

  useEffect(() => {
    document.dir = i18n.dir(i18n.language);
  }, [i18n.language]);
  

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
    // dashboard layout
{
  path:'dashboard',
  element:<MasterLayout/>,
  errorElement:<NotFound/>,
  children:[
    {path:'',element:<Dashboard/>},
    {path:'rooms',element:<RoomsList/>},
    {path:'rooms-data',element:<RoomsData/>},
    {path:'ads',element:<AdsList/>},
    {path:'ads-data',element:<AdsData/>},
    {path:'facilities',element:<FacilitiesList/>},
    {path:'facilities-data',element:<FacilitiesData/>},
    {path:'list-booking',element:<ListBooking/>},
    {path:'list-users',element:<ListUsers/>},

  ]
}

  ])
  return(
 <>
  <RouterProvider router={routes}></RouterProvider>
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={lng === "ar"}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition={Bounce}/>
  </>
);

  
}
export default App




