import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import AuthLayout from './Modules/Shared/Authentication/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import ForgetPassword from './Modules/Authentication/Forget-Password/Forget-Password'
import ResetPassword from './Modules/Authentication/Reset-Password/Reset-Password'
import { Bounce, ToastContainer } from 'react-toastify'
import ChangePassword from './Modules/Authentication/Change-Password/Change-Password'




function App() {
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
        {path:'change-password',element:<ChangePassword/>},
  
      ]
    },
    
    // master layout
    
    // dashboard layout

  ])

  return (
    <>
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
