import { useSelector } from 'react-redux';

const DriverProfile = () => {
  const driver = useSelector(store => store.driver);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-10">
      <div className="max-w-6xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-shrink-0">
            <img
              src={driver.profilePic}
              alt="Profile"
              className="w-52 h-52 rounded-full border-6 border-indigo-600 shadow-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-semibold text-gray-800">{driver.fullName.firstName} {driver.fullName.lastName}</h2>
            <p className="text-lg text-gray-600 mt-2">{driver.emailId}</p>
            <p className={`text-lg font-semibold mt-2 ${driver.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
              {driver.status === 'active' ? 'Active' : 'Inactive'}
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Vehicle Details</h3>
              <div className="space-y-2">
                <p><strong>Type:</strong> {driver.vehicleDetails.type}</p>
                <p><strong>Color:</strong> {driver.vehicleDetails.color}</p>
                <p><strong>Plate Number:</strong> {driver.vehicleDetails.plateNumber}</p>
                <p><strong>Capacity:</strong> {driver.vehicleDetails.capacity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Rides Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Completed Rides</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-6 bg-gray-50 rounded-xl shadow-md transition-all hover:shadow-xl duration-300">
              <p className="text-lg text-gray-700">Ride to Downtown - 1st June, 10:00 AM</p>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <div className="flex justify-between items-center p-6 bg-gray-50 rounded-xl shadow-md transition-all hover:shadow-xl duration-300">
              <p className="text-lg text-gray-700">Ride to Airport - 3rd June, 6:30 PM</p>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <div className="flex justify-between items-center p-6 bg-gray-50 rounded-xl shadow-md transition-all hover:shadow-xl duration-300">
              <p className="text-lg text-gray-700">Ride to Central Park - 7th June, 4:00 PM</p>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;
