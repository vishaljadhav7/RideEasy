import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { carURL, motoURL, autoURL } from "../constants";

const RideOptionsPanel = ({ selectFareAndVehicle }) => {
  const { fare } = useSelector((store) => store.rideForUser);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md max-w-lg mx-auto">
      {/* 🚗 Header */}
      <h3 className="text-2xl font-semibold mb-5 text-gray-800">Choose a Vehicle</h3>

      {/* 🚙 Car Option */}
      <div
        className="flex items-center justify-between border rounded-xl p-3 mb-3 hover:shadow-lg cursor-pointer transition-all duration-300"
        onClick={() => selectFareAndVehicle(fare.car, "car")}
      >
        <img className="h-12 w-12 object-contain" src={carURL} alt="Car" />
        <div className="ml-4 flex-1">
          <h4 className="font-medium text-base flex items-center gap-2 text-gray-700">
            UberGo <FaUser className="inline-block text-gray-500" />
          </h4>
          <h5 className="font-medium text-sm text-gray-600">2 mins away</h5>
          <p className="font-normal text-xs text-gray-500">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">₹{fare.car}</h2>
      </div>

      {/* 🛵 Moto Option */}
      <div
        className="flex items-center justify-between border rounded-xl p-3 mb-3 hover:shadow-lg cursor-pointer transition-all duration-300"
        onClick={() => selectFareAndVehicle(fare.moto, "moto")}
      >
        <img className="h-12 w-12 object-contain" src={motoURL} alt="Moto" />
        <div className="ml-4 flex-1">
          <h4 className="font-medium text-base flex items-center gap-2 text-gray-700">
            Moto <FaUser className="inline-block text-gray-500" />
          </h4>
          <h5 className="font-medium text-sm text-gray-600">3 mins away</h5>
          <p className="font-normal text-xs text-gray-500">Affordable motorcycle rides</p>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">₹{fare.moto}</h2>
      </div>

      {/* 🚜 Auto Option */}
      <div
        className="flex items-center justify-between border rounded-xl p-3 hover:shadow-lg cursor-pointer transition-all duration-300"
        onClick={() => selectFareAndVehicle(fare.auto, "auto")}
      >
        <img className="h-12 w-12 object-contain" src={autoURL} alt="Auto" />
        <div className="ml-4 flex-1">
          <h4 className="font-medium text-base flex items-center gap-2 text-gray-700">
            UberAuto <FaUser className="inline-block text-gray-500" />
          </h4>
          <h5 className="font-medium text-sm text-gray-600">3 mins away</h5>
          <p className="font-normal text-xs text-gray-500">Affordable Auto rides</p>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">₹{fare.auto}</h2>
      </div>
    </div>
  );
};

export default RideOptionsPanel;
