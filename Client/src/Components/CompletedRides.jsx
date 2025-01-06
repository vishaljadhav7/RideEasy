import React from 'react';
import { FaMapMarkerAlt, FaCarSide, FaCheckCircle } from 'react-icons/fa';

const CompletedRides = ({ rides = [], role }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {rides.length > 0 ? (
        rides.map((ride) => (
          <div
            key={ride._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-[1.02]"
          >
            <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6 border-l-4 border-blue-500">
              
              {/* Ride Information */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <FaMapMarkerAlt />
                  <span>From:</span>
                  <span className="text-gray-800 font-semibold">{ride.pickup}</span>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <FaMapMarkerAlt />
                  <span>To:</span>
                  <span className="text-gray-800 font-semibold">{ride.destination}</span>
                </div>
                <p className="text-gray-700 mt-2"><strong>Fare:</strong> ₹{ride.fare}</p>
                <p className="text-gray-700">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`font-medium ${
                      ride.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {ride.status}
                  </span>
                </p>
              </div>

              {/* User/Driver Information */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    role === 'rider'
                      ? ride.driver?.profilePic
                      : ride.user?.profilePic
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-400 shadow-md"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {role === 'rider'
                      ? `${ride.driver?.fullName?.firstName} ${ride.driver?.fullName?.lastName}`
                      : `${ride.user?.firstName} ${ride.user?.lastName}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {role === 'rider'
                      ? `Vehicle: ${ride.driver?.vehicleDetails?.type} (${ride.driver?.vehicleDetails?.plateNumber})`
                      : ride.user?.emailId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center text-lg">No rides available.</p>
      )}
    </div>
  );
};

export default CompletedRides;
