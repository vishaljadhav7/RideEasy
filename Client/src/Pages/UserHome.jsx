import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { TEMP_IMG } from "../constants";
import gsap from "gsap";
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationExplorerPanel from "../Components/LocationExplorerPanel";
import {useGSAP} from '@gsap/react';
import {useNavigate} from 'react-router-dom'
import { BASE_URL } from "../constants";
import axios from 'axios';
import LocationTracking from "../Components/LocationTracking";
import { addFareAndTripLocations} from "../utils/rideInfoForUserSlice";
// import { updateCache } from "../utils/suggestionsSlice";
import {useWebSocketContext} from '../Context/WebSocketContext'

const UserHome = () => {
  const ride = useSelector((state) => state.ride);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [activeField, setActiveField] = useState('pickup')
  const [locationSearchPanel, toggleLocationSearchPanel] = useState(false);
  const locationSearchPanelRef = useRef(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const timerRef = useRef(null)
  const pickupControllerRef = useRef(null);
  const destinationControllerRef = useRef(null);

  const {socket} = useWebSocketContext()


  const handleTripSubmit = async (e) => {
    e.preventDefault();
    if (!pickup || !destination) return;

    const res = await axios.get(`${BASE_URL}/ride/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const details = {
      fareDetails: res.data.data,
      locationDetails: { pickup, destination },
    };

    dispatch(addFareAndTripLocations(details));
    navigate("/ride-booking");
  };

  const fetchSuggestions = async (querySearch = '', field, controller) => {
    if (!querySearch) return;
    try {
      const response = await axios.get(`${BASE_URL}/map/get-suggestions`, {
        params: { input: querySearch },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        signal: controller.signal,
      });

      if (field === 'pickup') {
        setPickupSuggestions(response.data.data);
      } else if (field === 'destination') {
        setDestinationSuggestions(response.data.data);
      }
    } catch (error) {
      if (error.name === "CanceledError") {
        console.error(`${field} API call aborted.`);
      } else {
        console.error("Error fetching suggestions:", error);
      }
    }
  };

  const debounceFetchSuggestions = (query, field, controllerRef) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (controllerRef.current) controllerRef.current.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    timerRef.current = setTimeout(() => {
      fetchSuggestions(query, field, controller);
    }, 500);
  };

  useEffect(() => {
    if (pickup) debounceFetchSuggestions(pickup, 'pickup', pickupControllerRef);
  }, [pickup]);

  useEffect(() => {
    if (destination) debounceFetchSuggestions(destination, 'destination', destinationControllerRef);
  }, [destination]);

  
   useEffect(() => {
    socket.emit("join", { clientType: "ride", clientId: ride._id })
   }, [ride, socket]);


   useGSAP(() => {
    gsap.to(locationSearchPanelRef.current, {
      height: locationSearchPanel ? "65%" : 0,
      opacity: locationSearchPanel ? 1 : 0,
      display: locationSearchPanel ? "block" : "none",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [locationSearchPanel]);

  return (
    <div className="md:flex">
      <div className="h-screen w-[55%] hidden md:visible  md:flex flex-col justify-center items-center gap-5">
       <div className="h-[40%] p-6 bg-white relative flex flex-col justify-center w-[70%] shadow-lg rounded-lg">
            <h5
              onClick={() => toggleLocationSearchPanel(false) }
              className={`absolute ${
                locationSearchPanel ? "opacity-100" : "opacity-0"
              } right-6 top-6 text-2xl cursor-pointer`}
            >
            <IoClose />
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form className="relative py-3" onSubmit={handleTripSubmit}>
              <div className="line absolute h-16 w-1 top-[50%] -translate-y-14 left-5 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                onFocus={() => { setActiveField('pickup');  toggleLocationSearchPanel(true) } }
                name="pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Add a pick-up location"
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                onFocus={() => {setActiveField('destination'); toggleLocationSearchPanel(true) }}
                value={destination}
                onChange={(e) =>  setDestination(e.target.value)}
                name="destination"
                placeholder="Enter your destination"
              />

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
              Find Trip
            </button>
            </form>
          </div>
        {locationSearchPanel && <div className="absolute top-[68%] w-[40%] h-[45%] m-auto">
        <LocationExplorerPanel
        setPickup = {setPickup}
        setDestination = {setDestination}
        activeField={activeField}
        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
        />
        </div>}
       </div>

      <div className="w-screen h-screen md:w-[45%] ">
        <div className="w-full h-full md:flex justify-center items-center">
          <div className="h-screen md:h-[600px] w-full md:w-[70%] md:object-cover md:border-white border-4">
            <LocationTracking/>
          </div>
        </div>

        <div className="flex flex-col justify-end absolute visible md:hidden top-0 h-[110%] w-full ">
          <div className="h-[35%] p-6 bg-white relative flex flex-col justify-center -mb-2 ">
            <h5
              onClick={() => toggleLocationSearchPanel(false)}
              className={`absolute ${
                locationSearchPanel ? "opacity-100" : "opacity-0"
              } right-6 top-6 text-2xl cursor-pointer`}
            >
              <RiArrowDownWideLine />
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form className="relative py-3" onSubmit={handleTripSubmit}>
              <div className="line absolute h-16 w-1 top-[50%] -translate-y-14 left-5 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                onFocus={() => { setActiveField('pickup');  toggleLocationSearchPanel(true) } }
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                name="pickup"
                placeholder="Add a pick-up location"
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                onFocus={() => {setActiveField('destination'); toggleLocationSearchPanel(true) }}
                value={destination}
                onChange={(e) =>  setDestination(e.target.value)}
                name="destination"
                placeholder="Enter your destination"
              />

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
              Find Trip
            </button>
            </form>
          </div>
   
          <div
            ref={locationSearchPanelRef}
            className="bg-white h-0 opacity-0 overflow-hidden"
          >
            <LocationExplorerPanel 
             setPickup = {setPickup}
             setDestination = {setDestination}
             activeField={activeField}
           suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

