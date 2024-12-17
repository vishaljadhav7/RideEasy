
import { RiArrowDownWideLine } from "react-icons/ri";



const LookingForDriverPanel = ({handleLookingForDriver}) => {
  return (
    <div className="relative">
      <h5 
      onClick={()=> handleLookingForDriver()} 
      className='absolute  -top-8 right-[50%] translate-x-2/4  block md:hidden p-1 text-center cursor-pointer text-3xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-y-150 origin-center' 
      ><RiArrowDownWideLine/></h5>
      <h5 className="text-center text-2xl font-semibold text-gray-500">Looking For Driver</h5>

      <div className='p-2 flex items-center justify-between '>
        <img className='object-cover w-1/2 mx-auto' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        {/* <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'> firstname</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>XW4344</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'>  3435</h1>
        </div> */}
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>KEB saasx</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"> </i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>NATVdVc sacaszdcv scx</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹ 565 </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriverPanel;