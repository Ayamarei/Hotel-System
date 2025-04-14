import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import AuthLayout from './Modules/Shared/Authentication/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import ForgetPassword from './Modules/Authentication/Forget-Password/Forget-Password'
import ResetPassword from './Modules/Authentication/Reset-Password/Reset-Password'




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
  
      ]
    },
    
    // master layout
    
    // dashboard layout

  ])

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>

    </>
  )
}

export default App
