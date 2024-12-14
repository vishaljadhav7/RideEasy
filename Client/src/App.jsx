import {createBrowserRouter} from 'react-router-dom'
import Main from './Pages/Main'
import AccessPage from './Pages/AccessPage'
import Layout from './Components/Layout'
import UserSignUp from './Pages/UserSignUp'
import UserSignIn from './Pages/UserSignIn'
import DriverSignUp from './Pages/DriverSignUp'
import DriverSignIn from './Pages/DriverSignIn'
import { RouterProvider } from 'react-router-dom'
import RideHome from './Pages/RideHome'
import DriverHome from './Pages/DriverHome'


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
          element : <DriverHome/>
        },
        {
          path : "/ride-home",
          element : <RideHome/>
        },
      ],
    },

  ])

  return (
    <>
      <div >
       <RouterProvider router={Router}/>    
      </div>
    </>
  )
}

export default App
