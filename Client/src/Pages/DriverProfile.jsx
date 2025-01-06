import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
import {BASE_URL} from '../constants'
import CompletedRides from '../Components/CompletedRides';


const DriverProfile = () => {
  const driver = useSelector(store => store.driver);
  const [allCompletedRides, setAllCompletedRides] = useState([])

  const fetchCompletedRides = async () =>{
    try {
      const res = await axios.get(BASE_URL + "/ride/completed-rides", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })

      setAllCompletedRides(res?.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchCompletedRides()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-10">
      <div className="max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            <img
              src={driver?.profilePic}
              alt="Profile"
              className="w-52 h-52 rounded-full border-6 border-indigo-600 shadow-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-semibold text-gray-800">{driver?.fullName.firstName} {driver?.fullName.lastName}</h2>
            <p className="text-lg text-gray-600 mt-2">{driver?.emailId}</p>
            <p className={`text-lg font-semibold mt-2 ${driver?.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
              {driver.status === 'active' ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        {/* Completed Rides Section */}
        <div className="lg:col-span-3 bg-white shadow-lg rounded-lg p-6 mt-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Completed Rides</h3>
          {allCompletedRides?.length > 0 ? (
            <CompletedRides rides={allCompletedRides} />
          ) : (
            <p className="text-gray-600">No booked rides available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
