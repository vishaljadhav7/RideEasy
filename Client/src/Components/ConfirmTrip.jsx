import { RiArrowDownWideLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { IoLocationOutline } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { GrCurrency } from "react-icons/gr";

const ConfirmTrip = ({handleConfirmTrip, handleToggleConfirmTrip = () => {} , fareValue}) => {
    const {tripLocations} = useSelector(store => store.rideOrder); 
 
    console.log(tripLocations , fareValue)
    return (
        <div>
            <h5 
            onClick={()=>handleToggleConfirmTrip && handleToggleConfirmTrip()} 
            className='absolute  top-1 right-[50%] translate-x-2/4  block md:hidden p-1 text-center cursor-pointer text-3xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-y-150 origin-center'>
            <RiArrowDownWideLine />
          </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                      <IoLocationOutline />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>  {tripLocations?.pickup} </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                    <IoLocation />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'> {tripLocations?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                    <GrCurrency />
                        <div>
                            <h3 className='text-lg font-medium'>{fareValue}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button 
                onClick={handleConfirmTrip} 
                className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmTrip