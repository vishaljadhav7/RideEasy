import { RiArrowDownWideLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiMapPin2Fill, RiMapPinUserFill } from "react-icons/ri";

const LookingForDriver = () => {
  const rideDetails = useSelector((store) => store?.rideForUser);
  const { fare, tripLocations } = rideDetails;

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto">
      {/* 📌 Toggle Button (for Mobile Devices) */}
      <h5
        className="absolute -top-8 right-[50%] translate-x-2/4 block md:hidden p-1 text-center cursor-pointer text-3xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-y-150 origin-center"
      >
        <RiArrowDownWideLine />
      </h5>

      {/* 🚗 Header */}
      <h5 className="text-center text-2xl font-semibold text-gray-700 mb-4">
        Looking For Driver
      </h5>

      {/* 🖼️ Image Section */}
      <div className="flex justify-center mb-4">
        <img
          className="h-24 w-full rounded-lg object-cover"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Looking for Driver"
        />
      </div>

      {/* 📍 Ride Details */}
      <div className="space-y-4">
        {/* Pickup Location */}
        <div className="flex items-center gap-4 p-3 border-b">
          <RiMapPinUserFill className="text-2xl text-blue-500" />
          <div>
            <h3 className="text-lg font-medium text-gray-800">Pickup Location</h3>
            <p className="text-sm text-gray-600">{tripLocations?.pickup || "N/A"}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-4 p-3 border-b">
          <RiMapPin2Fill className="text-2xl text-green-500" />
          <div>
            <h3 className="text-lg font-medium text-gray-800">Destination</h3>
            <p className="text-sm text-gray-600">{tripLocations?.destination || "N/A"}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center gap-4 p-3">
          <MdOutlineCurrencyRupee className="text-2xl text-yellow-500" />
          <div>
            <h3 className="text-lg font-medium text-gray-800">Fare</h3>
            <p className="text-sm text-gray-600">₹{fare?.car || "N/A"}/-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
