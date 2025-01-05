import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { removeDriver } from '../utils/driverSlice';
import { removeRide } from '../utils/rideSlice';
import {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../utils/useClickOutside';
import { RxHamburgerMenu } from 'react-icons/rx';

const Sidebar = ({isRider}) => {
    const [viewSideBar, toggleSidebar] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
  
    const handleLogout = async () => { // driver
      const apiPath = isRider ? "/auth/user/signout" : "/auth/driver/signout" ;
      console.log(apiPath, "localStorage.getItem('token') ", localStorage.getItem('token') );
      try {
        await axios.post(BASE_URL + apiPath, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Properly remove the token after logout
        localStorage.removeItem('token');
        if(isRider){
          dispatch(removeRide());
        }else{
          dispatch(removeDriver());
        }
        toggleSidebar(false)
        navigate('/access-page')
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    
  
    const reference = useClickOutside(() => toggleSidebar(false) ) ;
  
  
    return (
      <div className="relative">
        <RxHamburgerMenu
          className="text-3xl font-bold cursor-pointer hover:scale-110 transition-all text-gray-800"
          onClick={(e) =>{  e.stopPropagation() ; toggleSidebar(!viewSideBar) }}
  
        />
        {viewSideBar && (
          <ul  
          ref = {reference}
          className="absolute top-12 right-0 w-56 p-4 shadow-lg rounded-lg flex flex-col gap-4 items-center bg-white text-gray-800 z-50 font-semibold">
            <Link to={`${isRider ? "/ride-home" : "/driver-home"}`} className="w-full">
              <button className="w-full py-2 rounded-md hover:bg-gray-100 transition">Home</button>
            </Link>
            <Link to={`${isRider ? "/user-profile" : "/driver-profile"}`} className="w-full">
              <button className="w-full py-2 rounded-md hover:bg-gray-100 transition">Profile</button>
            </Link>
            <button className="w-full py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition" onClick={handleLogout}>
              Log Out
            </button>
          </ul>
        )}
      </div>
    );
  };

  export default Sidebar