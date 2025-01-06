import { useSelector } from "react-redux";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiMapPin2Fill, RiMapPinUserFill } from "react-icons/ri";

const RidePopUp = ({ handleConfirmRide }) => {
  const newRide = useSelector((store) => store.rideForDriver.newRide);


  return (
    <div className="bg-white rounded-xl shadow-md p-5 max-w-lg mx-auto">
      {/* 🚕 Header */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
        New Ride Available!
      </h3>

      {/* 👤 Rider Info */}
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg shadow-inner">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-white"
            src={newRide?.user?.profilePic}
            alt="profilePic"
          />
          <h2 className="text-lg font-medium text-gray-800">
            {newRide?.user?.firstName}
          </h2>
        </div>
        <h5 className="text-lg font-semibold text-gray-800">
          <span className="text-base font-extrabold text-red-500">STATUS: </span>
          {newRide?.status}
        </h5>
      </div>

    
      <div className="w-full mt-5 space-y-3">
        <div className="flex items-center gap-5 p-3 border-b">
          <RiMapPinUserFill className="text-gray-600 text-xl" />
          <p className="text-sm text-gray-700">{newRide?.pickup}</p>
        </div>
        <div className="flex items-center gap-5 p-3 border-b">
          <RiMapPin2Fill className="text-gray-600 text-xl" />
          <p className="text-sm text-gray-700">{newRide?.destination}</p>
        </div>
        <div className="flex items-center gap-5 p-3">
          <MdOutlineCurrencyRupee className="text-gray-600 text-xl" />
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              ₹{newRide?.fare} /-
            </h3>
            <p className="text-sm text-gray-600">Cash Payment</p>
          </div>
        </div>
      </div>

     
      <div className="mt-5 space-y-2">
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg transition-all"
          onClick={() => handleConfirmRide(newRide?._id)}
        >
          Accept
        </button>
        <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold p-2 rounded-lg transition-all">
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
