import { TEMP_IMG } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationExplorerPanel from "../Components/LocationExplorerPanel";
import {useGSAP} from '@gsap/react';
import {useNavigate} from 'react-router-dom'

const UserHome = () => {
  const navigate = useNavigate()
  const [locationInfo, setLocationInfo] = useState({});
  const [locationSearchPanel, toggleLocationSearchPanel] = useState(false);
  const locationSearchPanelRef = useRef(null);

  const handleInfoChange = (e) => {
    setLocationInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTripSubmit = (e) => {
    e.preventDefault();
    navigate("/ride-booking")
  }

  useGSAP(() => {
    if (locationSearchPanel) {
      gsap.to(locationSearchPanelRef.current, {
        height: "65%",
        opacity: 1,
        display: "block",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(locationSearchPanelRef.current, {
        height: 0,
        opacity: 0,
        display: "none",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [locationSearchPanel]);

  return (
    <div className="md:flex ">
      <div className="h-screen w-[55%] hidden md:visible  md:flex flex-col justify-center items-center gap-5">
       <div className="h-[40%] p-6 bg-white relative flex flex-col justify-center w-[70%] shadow-lg rounded-lg">
            <h5
              onClick={() => toggleLocationSearchPanel(false)}
              className={`absolute ${
                locationSearchPanel ? "opacity-100" : "opacity-0"
              } right-6 top-6 text-2xl cursor-pointer`}
            >
              <RiArrowDownWideLine />
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form className="relative py-3" onChange={handleInfoChange}  onSubmit={handleTripSubmit}>
              <div className="line absolute h-16 w-1 top-[50%] -translate-y-14 left-5 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                onFocus={() => toggleLocationSearchPanel(true)}
                name="pickup"
                placeholder="Add a pick-up location"
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                onFocus={() => toggleLocationSearchPanel(true)}
                name="destination"
                placeholder="Enter your destination"
              />

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full">
              Find Trip
            </button>
            </form>
          </div>
   {locationSearchPanel && <div className="w-[70%]">
        <LocationExplorerPanel/>
        </div>}
       </div>

      <div className="w-screen h-screen md:w-[45%] ">
        <div className="w-full h-full md:flex justify-center items-center">
          <img
            src={TEMP_IMG}
            className="h-screen md:h-[600px] w-full md:w-[70%] md:object-cover md:border-white border-4"
          />
        </div>

        <div className="flex flex-col justify-end absolute visible md:hidden top-0 h-screen w-full">
          <div className="h-[35%] p-6 bg-white relative flex flex-col justify-center">
            <h5
              onClick={() => toggleLocationSearchPanel(false)}
              className={`absolute ${
                locationSearchPanel ? "opacity-100" : "opacity-0"
              } right-6 top-6 text-2xl cursor-pointer`}
            >
              <RiArrowDownWideLine />
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form className="relative py-3" onChange={handleInfoChange}  onSubmit={handleTripSubmit}>
              <div className="line absolute h-16 w-1 top-[50%] -translate-y-14 left-5 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full"
                type="text"
                onFocus={() => toggleLocationSearchPanel(true)}
                name="pickup"
                placeholder="Add a pick-up location"
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                onFocus={() => toggleLocationSearchPanel(true)}
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
            <LocationExplorerPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
