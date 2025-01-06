import React from 'react';

const CompletedRides = ({ rides = [], role }) => {
  return (
    <div className="space-y-4">
      {rides.length > 0 ? (
        rides.map((ride) => (
          <div
            key={ride._id}
            className="bg-white rounded-lg p-4 border border-gray-200 hover:bg-gray-50 transition duration-300"
          >
            {/* Ride Details */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              {/* Ride Information */}
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  <span className="text-blue-600">From:</span> {ride.pickup}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  <span className="text-green-600">To:</span> {ride.destination}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Fare:</strong> ₹{ride.fare}
                </p>
                <p className="text-gray-600">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`${
                      ride.status === 'completed'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    } font-medium`}
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
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {role === 'rider'
                      ? `${ride.driver?.fullName?.firstName} ${ride.driver?.fullName?.lastName}`
                      : `${ride.user?.firstName} ${ride.user?.lastName}`}
                  </p>
                  <p className="text-gray-600 text-sm">
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
        <p className="text-gray-600 text-center">No rides available.</p>
      )}
    </div>
  );
};

export default CompletedRides;
