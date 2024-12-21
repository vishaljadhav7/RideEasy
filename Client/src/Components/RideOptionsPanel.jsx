import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";


const RideOptionsPanel = ({selectFareAndVehicle}) => {
      const {fare} = useSelector(store => store.rideOrder);
  return (
    <div className="" >
    <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
    <div  className='flex border-2 active:border-black  mb-2 rounded-xl w-full p-3  items-center justify-around' onClick={()=> selectFareAndVehicle(fare.car, 'car')}>
        <img className='h-10' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base flex items-center gap-3'>UberGo  <FaUser className="inline-block"/> </h4>
            <h5 className='font-medium text-sm'>2 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹{fare.car}</h2>
    </div>
    <div  className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-around' onClick={()=> selectFareAndVehicle(fare.moto, 'moto')}>
        <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
        <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base flex items-center gap-3'>Moto <FaUser className="inline-block"/> </h4>
            <h5 className='font-medium text-sm'>3 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable motorcycle rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹{fare.moto}</h2>
    </div>
    <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3  items-center justify-around' onClick={()=> selectFareAndVehicle(fare.auto, 'auto')}>
        <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base flex items-center gap-3'>UberAuto  <FaUser className="inline-block"/> </h4>
            <h5 className='font-medium text-sm'>3 mins away </h5>
            <p className='font-normal text-xs text-gray-600'>Affordable Auto rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹{fare.auto}</h2>
    </div>
</div>
  )
}

export default RideOptionsPanel;