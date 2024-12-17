import { RiArrowDownWideLine } from "react-icons/ri";

const AwaitingDriverPanel = () => {
    return (
        <div className="relative">
          {/* <h5 className='absolute -top-10 right-[50%] translate-x-2/4 block md:hidden p-1 text-center cursor-pointer text-3xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-y-150 origin-center'>
            <RiArrowDownWideLine />
          </h5> */}
          <div className='flex items-center justify-between'>
            <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
            <div className='text-right'>
              <h2 className='text-lg font-medium capitalize'> AJ Styles </h2>
              <h4 className='text-xl font-semibold -mt-1 -mb-1'>2233 </h4>
              <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
              <h1 className='text-lg font-semibold'> 4443 </h1>
            </div>
          </div>
    
          <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full mt-5'>
              <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="ri-map-pin-user-fill"></i>
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className='text-sm -mt-1 text-gray-600'>scasc qwgie wewe 3443</p>
                </div>
              </div>
              <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                  <h3 className='text-lg font-medium'>562/11-A</h3>
                  <p className='text-sm -mt-1 text-gray-600'> asd idcis lmdc;ds saca 3423 </p>
                </div>
              </div>
              <div className='flex items-center gap-5 p-3'>
                <i className="ri-currency-line"></i>
                <div>
                  <h3 className='text-lg font-medium'>₹ 657</h3>
                  <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default AwaitingDriverPanel