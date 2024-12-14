import { TEMP_IMG } from "../constants"
import { RiArrowDownWideLine } from "react-icons/ri";
import {useGSAP} from '@gsap/react'
import { useRef, useState } from "react";
import gsap from 'gsap'
import LocationExplorerPanel from "../Components/LocationExplorerPanel";
import RideOptionsPanel from '../Components/RideOptionsPanel'
import ConfirmTrip from "../Components/ConfirmTrip";
import DriverTracker from "../Components/DriverTracker";
import AwaitingDriver from "../Components/AwaitingDriver";

const RideHome = () => {

  const [locationInfo , setLocationInfo] = useState({})
  const [locationSearchPanel, toggleLocationSearchPanel] = useState(false)
  const [rideOptionsPanel, toggleRideOptionsPanel] = useState(true)
  const [driverTrackingPanel, toggleDriverTrackingPanel] = useState(false)
  const [confirmTripPanel, toggleConfirmTripPanel] = useState(false)
  const [awaitingDriverPanel, toggleAwaitingDriverPanel] = useState(false)

  const PanelRefs = useRef({ 
     locationSearchPanelRef : null,
     rideOptionsPanelRef : null,
     driverTrackingPanelRef : null,
     confirmTripPanelRef : null,
     awaitingDriverPanelRef : null 
  })

  let {locationSearchPanelRef, rideOptionsPanelRef, driverTrackingPanelRef, confirmTripPanelRef, awaitingDriverPanelRef} = PanelRefs.current;
   

  const handleInfoChange = (e) => {
    setLocationInfo( prev => ({...prev , [e.target.name] : e.target.value}))
  }
  // locationSearchPanel

  useGSAP(function(){
  if (locationSearchPanel) {
    gsap.to(locationSearchPanelRef, {
      height: "65%",
      opacity: 1,
      display: "block",
    });
  } else {
    gsap.to(locationSearchPanelRef, {
      height: 0,
      opacity: 0,
      display: "none",
    });
   }
  }, [locationSearchPanel])

  useGSAP(function () {
    if (rideOptionsPanel) {
        gsap.to(rideOptionsPanelRef, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(rideOptionsPanelRef, {
            transform: 'translateY(100%)'
        })
    }
}, [ rideOptionsPanel])


useGSAP(function () {
  if (confirmTripPanel) {
      gsap.to(confirmTripPanelRef, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(confirmTripPanelRef, {
          transform: 'translateY(100%)'
      })
  }
}, [confirmTripPanel])


useGSAP(function () {
  if (driverTrackingPanel) {
      gsap.to(driverTrackingPanelRef, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(driverTrackingPanelRef, {
          transform: 'translateY(100%)'
      })
  }
}, [ driverTrackingPanel])


useGSAP(function () {
  if (awaitingDriverPanel) {
      gsap.to(awaitingDriverPanelRef, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(awaitingDriverPanelRef, {
          transform: 'translateY(100%)'
      })
  }
}, [ awaitingDriverPanel])

  return (
     <div className="">
        <div className="md:flex">
        <div className="h-screen w-[45%] bg-purple-400 hidden md:block">
        </div>
        <div className="md:w-[55%] bg-orange-400">
          <div className="w-full h-full md:flex justify-center items-center">
               <img src={TEMP_IMG}  className="h-screen md:h-[600px]  w-full md:w-[70%] md:object-cover md:border-white border-4"/>
          </div>
         <div className="flex flex-col justify-end absolute visible md:hidden top-0 h-screen w-full"  >
          <div className='h-[35%] p-6  bg-white relative flex flex-col justify-center '>
            <h5 onClick={() => toggleLocationSearchPanel(false)} className={`absolute opacity-${locationSearchPanel ? '1' : '0'} right-6 top-6 text-2xl cursor-pointer`}>
            <RiArrowDownWideLine  />
            </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
            <form className='relative py-3' onChange={handleInfoChange}>
              <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
              <input
                  className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                  type="text"
                  onFocus={() => toggleLocationSearchPanel(true)}
                  name = "pickup"
                  placeholder='Add a pick-up location'
              />
              <input
                  className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                  type="text"
                  name = "destination"
                  placeholder='Enter your destination' />
            </form>
            <button
                className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                Find Trip
            </button>
              </div>
            <div ref={(ele) => (locationSearchPanelRef = ele)} className="bg-white h-0 opacity-0">
             <LocationExplorerPanel/>
            </div>  
            <div ref={(ele) => (rideOptionsPanelRef = ele)} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10    pt-12'>
             <RideOptionsPanel/>
            </div>  
            <div ref={(ele) => (confirmTripPanelRef = ele)} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
              <ConfirmTrip />
            </div>
            <div ref={(ele) => (driverTrackingPanelRef = ele)} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <DriverTracker/>
            </div>
            <div ref={(ele) => (awaitingDriverPanelRef = ele)} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <AwaitingDriver/>
            </div>
          </div>
        </div>  
        </div> 
     </div>
  )
}

export default RideHome
