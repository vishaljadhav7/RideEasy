import { useSelector } from 'react-redux';

const RiderProfile = () => {
  const rider = useSelector(store => store.ride);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Profile Section */}
        <div className="md:col-span-3 bg-white shadow-md rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={rider.profilePic}
              alt="Profile"
              className="w-48 h-48 rounded-full border-4 border-blue-400 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">
                {rider.firstName} {rider.lastName}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{rider.emailId}</p>
              <button className="w-48 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Booked Rides Section */}
        <div className="md:col-span-4 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Booked Rides</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <p className="text-gray-700">Ride to Downtown - 5th June, 2:00 PM</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <p className="text-gray-700">Ride to Airport - 7th June, 6:30 AM</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-md shadow-sm">
              <p className="text-gray-700">Ride to Central Park - 10th June, 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
