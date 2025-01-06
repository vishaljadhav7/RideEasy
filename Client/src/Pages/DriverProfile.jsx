import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../constants';
import CompletedRides from '../Components/CompletedRides';

const DriverProfile = () => {
  const driver = useSelector((store) => store.driver);
  const [allCompletedRides, setAllCompletedRides] = useState([]);

  const fetchCompletedRides = async () => {
    try {
      const res = await axios.get(BASE_URL + '/ride/completed-rides', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setAllCompletedRides(res?.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCompletedRides();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-gradient-to-r from-blue-100 to-white shadow-xl rounded-3xl p-6 flex flex-col md:flex-row gap-6 mb-8 items-center">
          <div className="flex-shrink-0">
            <img
              src={driver?.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-44 h-44 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              {driver?.fullName?.firstName} {driver?.fullName?.lastName}
            </h2>
            <p className="text-md text-gray-600 mt-1">{driver?.emailId}</p>
            <p
              className={`text-md font-semibold mt-1 ${driver?.status === 'active' ? 'text-green-500' : 'text-red-500'}`}
            >
              {driver.status === 'active' ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>

        {/* Completed Rides Section */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-1">Completed Rides</h3>
          {allCompletedRides?.length > 0 ? (
            <CompletedRides rides={allCompletedRides} role="driver" />
          ) : (
            <p className="text-gray-600 text-center">No completed rides available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
