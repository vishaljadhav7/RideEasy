import {useSelector} from 'react-redux';
import AccessPage from '../Pages/AccessPage'

const UserProtectedRoute = ({children}) => {
    const loggedInRider = useSelector(store => store.ride)
  return (
    <div>
       {loggedInRider ? children : <AccessPage/>}
    </div>
  )
}

export default UserProtectedRoute