import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWebSocketContext } from '../Context/WebSocketContext';
import { MdOutlineCurrencyRupee } from 'react-icons/md';
import { RiMapPin2Fill } from 'react-icons/ri';
import LocationTracking from '../Components/LocationTracking';

// Ride Details Component
const RideDetails = ({ startedRide }) => (
  <div className='p-4 shadow-2xl'>
    <div className='flex items-center justify-between'>
      <img
        className='h-12'
        src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'
        alt='Vehicle'
      />
      <div className='text-right'>
        <h4 className='text-xl font-semibold -mt-1 -mb-1'>
          <span className='text-base font-extrabold text-red-500'>STATUS:</span> {startedRide?.status}
        </h4>
        <h2 className='text-lg font-medium capitalize'>{startedRide?.driver?.fullName?.firstName}</h2>
        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{startedRide?.driver?.vehicleDetails?.plateNumber}</h4>
        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
      </div>
    </div>
    <div className='mt-5'>
      <div className='flex items-center gap-5 p-3 border-b-2'>
        <RiMapPin2Fill />
        <div>
          <h3 className='text-lg font-medium'>{startedRide?.driver?.vehicleDetails?.plateNumber}</h3>
          <p className='text-sm -mt-1 text-gray-600'>{startedRide?.destination}</p>
        </div>
      </div>
      <div className='flex items-center gap-5 p-3'>
        <MdOutlineCurrencyRupee />
        <div>
          <h3 className='text-lg font-medium'>₹{startedRide?.fare}</h3>
          <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
        </div>
      </div>
    </div>
    <button className='w-full mt-5 bg-green-500 hover:bg-green-600 text-white font-semibold p-2 rounded-lg'>
      Make a Payment
    </button>
  </div>
);

// Main Component
const UserRiding = () => {
  const navigate = useNavigate();
  const startedRide = useSelector((store) => store.rideForUser.startedRide);
  const { socket } = useWebSocketContext();

  useEffect(() => {
    socket.on('ride-ended', () => {
      navigate('/ride-home');
    });
  }, [socket, navigate]);

  return (
    <div className='relative h-screen'>
      <div className='hidden md:flex h-full w-screen justify-around items-center'>
        <div className='h-[200px] w-[400px]'>
          <RideDetails startedRide={startedRide} />
        </div>
        <div className='h-[600px] w-[50%] overflow-hidden border-4 border-white'>
          <LocationTracking />
        </div>
      </div>

      <div className='md:hidden flex flex-col h-screen'>
        <div className='h-1/2 p-4 bg-white absolute bottom-0 z-[1000] w-full'>
          <RideDetails startedRide={startedRide} />
        </div>
        <div className='h-1/2'>
          <LocationTracking />
        </div>
      </div>
    </div>
  );
};

export default UserRiding;
