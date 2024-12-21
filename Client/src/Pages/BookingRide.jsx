import RideOptionsPanel from '../Components/RideOptionsPanel';
import ConfirmTrip from '../Components/ConfirmTrip';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, TEMP_IMG } from '../constants';
import { useRef, useState, useEffect } from "react";
import gsap from 'gsap';
import { addReservedRide } from '../utils/rideOrderSlice';
import axios from 'axios';
import { useSelector , useDispatch} from 'react-redux';

const BookingRide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [activePanel, setActivePanel] = useState("rideOptions"); // "rideOptions" or "confirmTrip"
  const rideOptionsPanelRef = useRef(null);
  const confirmTripPanelRef = useRef(null);
  const {tripLocations} = useSelector(store => store.rideOrder)
  const [fareAndVehicleType, setFareAndVehicleType] = useState({fareValue : '', vehicleType : ''}) 

  const selectFareAndVehicle = (fee, vehicle ) => {
    setFareAndVehicleType({fareValue : fee, vehicleType : vehicle}) 
    setActivePanel("confirmTrip");
  }
  const {pickup, destination} = tripLocations

  useEffect(() => {
    if (activePanel === "rideOptions") {
      gsap.to(rideOptionsPanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(confirmTripPanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    } else if (activePanel === "confirmTrip") {
      gsap.to(rideOptionsPanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(confirmTripPanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [activePanel]);


  const handleConfirmTrip = async () => {

    try {
      // API Call to Create Ride
      const res = await axios.post(
        `${BASE_URL}/ride/create-ride`, 
        {
          pickup,
          destination,
          vehicleType : fareAndVehicleType.vehicleType,
          fare : fareAndVehicleType.fareValue  // Data goes in the body for POST
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Headers at the same level as data
          },
        }
      );
  
      if (res?.data?.data) {
        dispatch(addReservedRide(res.data.data));
        navigate("/monitor-driver");
      } else {
        console.error("No ride data returned");
      }
    } catch (error) {
      console.error("Error creating ride:", error);
      alert("Failed to confirm the trip. Please try again.");
    }
  };
  

  const handleToggleConfirmTrip = () => {
    setActivePanel("rideOptions");
  }

  return (
    <div className="md:flex">
      <div className="w-[60%] md:flex h-screen hidden md:visible">
        {/* Form Section */}
        <div className="h-full w-[38%] flex justify-center items-center">
          <form className="w-[85%] bg-gray-100 p-6 shadow-md rounded-md flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-gray-800 text-center">Plan Your Trip</h1>
            <input
              type="text"
              placeholder="Pickup Location"
              className="bg-white px-4 py-2 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder="Destination"
              className="bg-white px-4 py-2 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </form>
        </div>
        <div className="h-full w-[62%] flex justify-center items-center">
          <div
            ref={rideOptionsPanelRef}
            className={`w-[90%] h-[70%] bg-white p-4 shadow-md rounded-md ${
              activePanel === "rideOptions" ? "" : "hidden"
            }`}
          >
            <RideOptionsPanel selectFareAndVehicle={selectFareAndVehicle} />
          </div>
          <div
            ref={confirmTripPanelRef}
            className={`w-[90%] h-[70%] bg-white p-4 shadow-md rounded-md ${
              activePanel === "confirmTrip" ? "" : "hidden"
            }`}
          >
            <ConfirmTrip handleConfirmTrip={handleConfirmTrip}  fareValue={fareAndVehicleType.fareValue}/>
          </div>
        </div>
      </div>

      {/* Right Panel: Image */}
      <div className="w-screen h-screen md:w-[40%]">
        <div className="w-full h-full md:flex justify-center items-center">
          <img
            src={TEMP_IMG}
            className="h-screen md:h-[600px] w-full md:w-[70%] md:object-cover md:border-white border-4"
          />
        </div>

        {/* Ride Options Panel */}
        <div
          ref={rideOptionsPanelRef}
          className="absolute w-full z-10 bottom-0 bg-white px-3 py-10 pt-10 transform translate-y-0 block md:hidden"
        >
          <RideOptionsPanel selectFareAndVehicle={selectFareAndVehicle}/>
        </div>
        <div
          ref={confirmTripPanelRef}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 block md:hidden"
        >
          <ConfirmTrip handleConfirmTrip={handleConfirmTrip}  handleToggleConfirmTrip={handleToggleConfirmTrip} fareValue={fareAndVehicleType.fareValue}/>
        </div>
      </div>
    </div>
  );
};

export default BookingRide;
