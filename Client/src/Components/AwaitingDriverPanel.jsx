import { useSelector } from "react-redux";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { RiMapPin2Fill } from "react-icons/ri";
import { RiMapPinUserFill } from "react-icons/ri";
// import { useEffect, useState } from "react";
// import {carURL, motoURL, autoURL} from '../constants';

const AwaitingDriverPanel = () => {

  const bookedRide = useSelector(store => store.rideForUser.bookedRide);
  // const [rideType, setRideType] = useState(null)
 


    return (
        <div className="relative">
          <div className='flex items-center justify-between'>
            <img className='h-14 w-14 ml-4 rounded-full object-cover' src={bookedRide?.driver.profilePic} alt="" />
            <div className='text-right'>
              <h4 className='text-xl font-semibold -mt-1 -mb-1'>
                <span className='text-base font-extrabold text-red-500'>STATUS : </span> {bookedRide?.status}
              </h4>
              <h2 className='text-lg font-medium capitalize'> 
              <span className='text-base font-extrabold text-gray-500'>Driver Name : </span> 
                {bookedRide?.driver.fullName.firstName}</h2>
              <h4 className='text-xl font-semibold -mt-1 -mb-1'>
              <span className='text-base font-extrabold text-gray-500'>Plate Num : </span> 
                {bookedRide?.driver.vehicleDetails.plateNumber}</h4>
              {/* <p className='text-base text-gray-600'>{bookedRide?.driver.vehicleDetails.type}</p> */}
              <h1 className='text-lg font-semibold'><span className='text-base font-extrabold text-green-500'>OTP : </span> {bookedRide?.otp}</h1>
            </div>
          </div>
    
          <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>
              <div className='flex items-center gap-5 p-3 border-b-2'>
                <RiMapPin2Fill/>
                <div>
                  <h3 className='text-lg font-medium'>{bookedRide?.driver.vehicleDetails.plateNumber}</h3>
                  <p className='text-sm -mt-1 text-gray-600'>{bookedRide?.pickup}</p>
                </div>
              </div>
              <div className='flex items-center gap-5 p-3 border-b-2'>
                <RiMapPinUserFill/> 
                <div>
                  <h3 className='text-lg font-medium'>{bookedRide?.driver.vehicleDetails.plateNumber}</h3>
                  <p className='text-sm -mt-1 text-gray-600'>{bookedRide?.destination}</p>
                </div>
              </div>
              <div className='flex items-center gap-5 p-3'>
                <MdOutlineCurrencyRupee/>
                <div>
                  <h3 className='text-lg font-medium'>₹ {bookedRide?.fare}</h3>
                  <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default AwaitingDriverPanel