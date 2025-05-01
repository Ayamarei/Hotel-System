import './App.css'
import AuthLayout from './Modules/Shared/Authentication/AuthLayout/AuthLayout'
import NotFound from './Modules/Shared/NotFound/NotFound'
import Login from './Modules/Authentication/Login/Login'
import Register from './Modules/Authentication/Register/Register'
import ForgetPassword from './Modules/Authentication/Forget-Password/Forget-Password'
import ResetPassword from './Modules/Authentication/Reset-Password/Reset-Password'
import { Bounce, ToastContainer } from 'react-toastify'
import  { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import i18n from './i18n'
import cookies from "js-cookie"
import MasterLayout from './Modules/Shared/MasterLayout/MasterLayout'
import RoomsList from './Rooms/RoomsList/RoomsList'
import RoomsData from './Rooms/RoomsData/RoomsData'
import AdsList from './ADS/AdsList/AdsList'
import FacilitiesList from './Facilities/FacilitiesList/FacilitiesList'
import ListBooking from './Booking/ListBooking/ListBooking'
import ListUsers from './Users/ListUser/ListUsers'
import Dashboard from './Modules/Dashboard/Dashboard'
import ProtectedRoute from './Modules/Shared/Dashboard/ProtectedRoute/ProtectedRoute'
import UserMasterLayout from './Modules/Shared/Master/UserMasterLayout/UserMasterLayout'
import UserRoomsList from './Modules/UserRooms/UserRoomsList/UserRoomsList'
import UserRoomsData from './Modules/UserRooms/UserRoomsData/UserRoomsData'
import UserFav from './Modules/UserRooms/UserFav/UserFav'
import UserPortal from './Modules/UserPortal/UserPortal'
import UserProtectedRoute from './Modules/Shared/Master/UserProtectedRoute/UserProtectedRoute'
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Modules/Payment/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'

const stripe=loadStripe("pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8");

function App() {
  // local

  const lng=cookies.get("i18next")||"en";

  useEffect(() => {
    document.dir = i18n.dir(i18n.language);
  }, [i18n.language]);
  

  // routes
  const routes = createBrowserRouter([
   {
    path:"",
    element:<UserMasterLayout/>,
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<UserPortal/>},
      {path:"user-room",element:<UserRoomsList/>},
      {path:"user-room-data",element:<UserRoomsData/>},
      {path:"user-room-fav",element:<UserProtectedRoute> <UserFav/></UserProtectedRoute>},
      { path: "CheckoutForm", element: <Elements stripe={stripe}><CheckoutForm /></Elements>},
    ]
   },
    // auth layout
    {
      path: "auth",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element:<ProtectedRoute>  <Dashboard /></ProtectedRoute>},
        { path: "rooms", element: <ProtectedRoute><RoomsList/> </ProtectedRoute> },
        { path:'rooms-data/:roomId',element: <ProtectedRoute><RoomsData/></ProtectedRoute>},
        { path:'add-room',element:<ProtectedRoute><RoomsData/></ProtectedRoute>},
        { path: "ads", element: <ProtectedRoute><AdsList /></ProtectedRoute> },
        { path: "facilities", element:<ProtectedRoute><FacilitiesList /> </ProtectedRoute> },
        { path: "list-booking", element: <ProtectedRoute><ListBooking /></ProtectedRoute> },
        { path: "list-users", element:<ProtectedRoute> <ListUsers /> </ProtectedRoute>},

      ],
    },
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
    rtl={lng==="ar"}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    transition={Bounce}/>
  </>
);

  
}
export default App