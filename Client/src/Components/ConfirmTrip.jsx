import { RiArrowDownWideLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { IoLocationOutline, IoLocation } from "react-icons/io5";
import { GrCurrency } from "react-icons/gr";

const ConfirmTrip = ({ handleConfirmTrip, handleToggleConfirmTrip = () => {}, fareValue }) => {
  const { tripLocations } = useSelector((store) => store.rideForUser);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto relative">
 
      <h5
        onClick={() => handleToggleConfirmTrip && handleToggleConfirmTrip()}
        className="absolute top-1 right-[50%] translate-x-2/4 block md:hidden p-1 text-center cursor-pointer text-3xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-y-150 origin-center"
      >
        <RiArrowDownWideLine />
      </h5>

 
      <h3 className="text-2xl font-bold mb-5 text-center text-gray-800">Confirm Your Trip</h3>

   
      <div className="flex justify-center mb-4">
        <img
          className="h-24 w-full rounded-lg object-cover"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Trip Confirmation"
        />
      </div>


      <div className="space-y-4">
        {/* Pickup Location */}
        <div className="flex items-center gap-4 p-3 border-b">
          <IoLocationOutline className="text-2xl text-gray-600" />
          <div>
            <h3 className="text-lg font-medium">Pickup Location</h3>
            <p className="text-sm text-gray-500">{tripLocations?.pickup || 'N/A'}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-4 p-3 border-b">
          <IoLocation className="text-2xl text-gray-600" />
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm text-gray-500">{tripLocations?.destination || 'N/A'}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center gap-4 p-3">
          <GrCurrency className="text-2xl text-gray-600" />
          <div>
            <h3 className="text-lg font-medium">Fare</h3>
            <p className="text-sm text-gray-500">₹{fareValue || 'N/A'}</p>
          </div>
        </div>
      </div>


      <button
        onClick={handleConfirmTrip}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 rounded-lg transition-all"
      >
        Confirm Trip
      </button>
    </div>
  );
};

export default ConfirmTrip;
