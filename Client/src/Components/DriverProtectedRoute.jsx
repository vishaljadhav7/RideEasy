
import {useSelector} from 'react-redux';
import {Outlet } from 'react-router-dom'
import AccessPage from '../Pages/AccessPage'

const DriverProtectedRoute = ({ children }) => {
    const loggedInDriver = useSelector(store => store.driver);

  return (
    <div>
       {loggedInDriver ? children : <AccessPage/>} 
    </div>
  )
}

export default DriverProtectedRoute