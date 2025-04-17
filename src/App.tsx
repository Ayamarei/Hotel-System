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



function App() {
  // local
  const { t } = useTranslation();
  const lng=cookies.get("i18next")||"en";
  // useEffect(()=>{
  //     window.document.dir=i18n.dir();
  //   },[lng])
  useEffect(() => {
    document.documentElement.lang = lng;
    document.documentElement.dir = i18n.dir(lng); // <<< التعديل هنا
  }, [lng]);
  
  

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
  
      ]
    },
    // master layout
    // dashboard layout

  ])
  return(
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
);

  
}
export default App





{/* <h2>{t('Welcome to React')}</h2>
<button onClick={()=>{i18n.changeLanguage("ar")}}>Ar</button>
<button  onClick={()=>{i18n.changeLanguage("en")}}>En</button> */}