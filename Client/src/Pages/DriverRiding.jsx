import {  useState } from 'react';
import { RiArrowUpWideLine } from "react-icons/ri";
import FinishRide from '../Components/FinishRide';
import { useSelector } from 'react-redux';
import LocationTracking from '../Components/LocationTracking';

const DriverRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const rideData = useSelector(store => store.rideForDriver.startedRide);

  return (
    <div className='h-screen'>

      <div className='md:visible hidden h-full w-screen  md:flex justify-around items-center'>
        <div className='w-[35%] h-auto bg-white p-4 shadow-lg rounded-lg'>
          <FinishRide ride={rideData} />
        </div>
        <div className='h-[600px] w-[50%] overflow-hidden border-4 border-white'>
          <LocationTracking />
        </div>
      </div>

      <div className='md:hidden visible h-full relative flex flex-col justify-end'>
        <div
          className='h-[100px] w-screen p-6 relative flex items-center justify-between bg-yellow-400 pt-10'
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <h5 className='p-1 text-center w-[90%] absolute top-0'>
            <RiArrowUpWideLine className='text-3xl text-gray-800' />
          </h5>
          <h4 className='text-xl font-semibold'>{'4 KM away'}</h4>
          <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>
            Complete Ride
          </button>
        </div>

        {finishRidePanel && (
          <div className='fixed w-full z-[500] bottom-0 bg-white px-3 py-10 pt-12 h-[85%]'>
            <FinishRide
              ride={rideData}
              setFinishRidePanel={setFinishRidePanel}
            />
          </div>
        )}

        {/*  Map Section */}
        <div className='h-screen fixed w-screen top-0 z-[-1]'>
          <LocationTracking />
        </div>
      </div>
    </div>
  );
};

export default DriverRiding;
