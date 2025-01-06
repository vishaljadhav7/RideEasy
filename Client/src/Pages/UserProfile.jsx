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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src={rider?.profilePic || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-md"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {rider?.firstName} {rider?.lastName}
            </h2>
            <p className="text-gray-600">{rider?.emailId}</p>
            <button className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Rider Details</h3>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Name:</strong> {rider?.firstName} {rider?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {rider?.emailId}
            </p>
            <p>
              <strong>Account Created:</strong>{' '}
              {new Date(rider?.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Updated:</strong>{' '}
              {new Date(rider?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Booked Rides Section */}
        <div className="lg:col-span-3 bg-white shadow-lg rounded-lg p-6 mt-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Booked Rides</h3>
          {allBookedRides.length > 0 ? (
            <CompletedRides rides={allBookedRides} />
          ) : (
            <p className="text-gray-600">No booked rides available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
