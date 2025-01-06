import { useSelector } from 'react-redux';
import CompletedRides from '../Components/CompletedRides';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../constants';
import axios from 'axios';

const RiderProfile = () => {
  const rider = useSelector((store) => store.ride);
  const [allBookedRides, setAllBookedRides] = useState([]);

  const fetchBookedRides = async () => {
    try {
      const res = await axios.get(BASE_URL + '/ride/booked-rides', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setAllBookedRides(res?.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookedRides();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl bg-white">

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white rounded-t-2xl">
          <div className="flex items-center space-x-6">
            <img
              src={rider?.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div>
              <h2 className="text-3xl font-bold">
                {rider?.firstName} {rider?.lastName}
              </h2>
              <p className="text-sm opacity-80">{rider?.emailId}</p>
              <p className="mt-2">Account Created: {new Date(rider?.createdAt).toLocaleDateString()}</p>
              <p>Last Updated: {new Date(rider?.updatedAt).toLocaleDateString()}</p>
              <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Booked Rides Section */}
        <div className="p-6 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Booked Rides</h3>
          {allBookedRides.length > 0 ? (
            <CompletedRides rides={allBookedRides} role="user"/>
          ) : (
            <p className="text-gray-600">No booked rides available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;