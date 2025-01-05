import {createBrowserRouter} from 'react-router-dom'
import Main from './Pages/Main'
import AccessPage from './Pages/AccessPage'
import Layout from './Components/Layout'
import UserSignUp from './Pages/UserSignUp'
import UserSignIn from './Pages/UserSignIn'
import DriverSignUp from './Pages/DriverSignUp'
import DriverSignIn from './Pages/DriverSignIn'
import { RouterProvider } from 'react-router-dom'
// import RideHome from './Pages/RideHome'
import DriverHome from './Pages/DriverHome'
import { Provider } from 'react-redux'
import appStore from './utils/store'
import UserHome from './Pages/UserHome'
import BookingRide from './Pages/BookingRide'
import MonitoringDriver from './Pages/MonitoringDriver'
import DriverProtectedRoute from './Components/DriverProtectedRoute'
import UserProtectedRoute from './Components/UserProtectedRoute';
import UserRiding from './Pages/UserRiding';
import DriverRiding from './Pages/DriverRiding'
import UserProfile from './Pages/UserProfile';
import DriverProfile from './Pages/DriverProfile'

function App() {
 
  const Router = createBrowserRouter([
    {
      path : "/",
      element : <Layout/>,
      children : [
        {
          path : "/",
          element : <Main/>,
          children : []
        },
        {
          path : "user-signup",
          element : <UserSignUp/> 
        },
        {
          path : "user-signin",
          element : <UserSignIn/>
        },
        {
          path : "driver-signup",
          element : <DriverSignUp/>
        },
        {
          path : "driver-signin",
          element : <DriverSignIn/>
        },
        {
          path : "access-page",
          element : <AccessPage/>
        },
        {
          path : "/drive-home",
          element : <DriverProtectedRoute> <DriverHome/> </DriverProtectedRoute>
        },
        {
          path : "/ride-home",
          element : <UserProtectedRoute> <UserHome/> </UserProtectedRoute>
        },
        {
          path : "/ride-booking",
          element : <UserProtectedRoute> <BookingRide/> </UserProtectedRoute>
        },
        {
          path : "/monitor-driver",
          element : <UserProtectedRoute><MonitoringDriver/></UserProtectedRoute>
        },
        {
          path : "/driver-riding",
          element :  <DriverProtectedRoute> <DriverRiding/> </DriverProtectedRoute>
        },
        {
          path : "/user-riding",
          element :  <UserProtectedRoute> <UserRiding/> </UserProtectedRoute>
        },
        {
          path : "/driver-profile",
          element :  <DriverProfile/> 
        },
        {
          path : "/user-profile",
          element :  <UserProtectedRoute> <UserProfile/> </UserProtectedRoute>
        }
      ],
    },

  ])

  return (
    <>
      <div >
        <Provider store={appStore}>          
          <RouterProvider router={Router}/>    
        </Provider> 
      </div>
    </>
  )
}

export default App
