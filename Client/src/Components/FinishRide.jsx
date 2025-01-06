import {BASE_URL} from '../constants' ;
import { IoLocationOutline, IoLocation } from 'react-icons/io5';
import { GrCurrency } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const FinishRide = ({ setFinishRidePanel = () => {} }) => {
  const navigate = useNavigate();
  const rideData = useSelector((store) => store.rideForDriver.startedRide);

  //  End Ride Handler
  async function endRide() {
    try {
      const response = await axios.post(
        `${BASE_URL}/ride/end-ride`, 
        {
          rideId: rideData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      

      if (response.status === 200) {
        navigate('/drive-home');
      }
    } catch (error) {
      console.error('Failed to end the ride:', error);
    }
  }

  return (
    <div className='p-4'>
      {/*  Close Panel Button (Mobile Only) */}
      <h5
        className='p-1 text-center w-[93%] absolute top-0 md:hidden block cursor-pointer'
        onClick={() => setFinishRidePanel(false)}
      >
        <IoLocationOutline className='text-3xl text-gray-400' />
      </h5>

      {/*  Header */}
      <h3 className='text-2xl font-bold mb-5 text-gray-800'>Finish this Ride</h3>

      {/*  Rider Info */}
      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-xl shadow-md'>
        <div className='flex items-center gap-3'>
          <img
            className='h-14 w-14 rounded-full object-cover'
            src={rideData?.user?.profilePic}
            alt='Rider'
          />
          <div>
            <h2 className='text-lg font-medium'>{rideData?.user?.firstName}</h2>
            <p className='text-sm text-gray-500'>{rideData?.status}</p>
          </div>
        </div>
        <h5 className='text-sm font-medium text-gray-700'>
          <span className='font-extrabold text-red-500'>STATUS:</span>{' '}
          {rideData?.status}
        </h5>
      </div>

      {/*  Ride Details */}
      <div className='w-full mt-6 space-y-4'>
        {/*  Pickup Location */}
        <div className='flex items-center gap-4 p-3 border-b'>
          <IoLocationOutline className='text-xl text-gray-700' />
          <div>
            <h3 className='text-md font-medium text-gray-800'>Pickup</h3>
            <p className='text-sm text-gray-500'>{rideData?.pickup}</p>
          </div>
        </div>

        {/*  Drop-off Location */}
        <div className='flex items-center gap-4 p-3 border-b'>
          <IoLocation className='text-xl text-gray-700' />
          <div>
            <h3 className='text-md font-medium text-gray-800'>Drop-off</h3>
            <p className='text-sm text-gray-500'>{rideData?.destination}</p>
          </div>
        </div>

        {/*  Fare */}
        <div className='flex items-center gap-4 p-3'>
          <GrCurrency className='text-xl text-gray-700' />
          <div>
            <h3 className='text-md font-medium text-gray-800'>Fare</h3>
            <p className='text-sm text-gray-500'>₹{rideData?.fare}</p>
          </div>
        </div>
      </div>

      {/* Finish Ride Button */}
      <div className='mt-8'>
        <button
          onClick={endRide}
          className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg'
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
