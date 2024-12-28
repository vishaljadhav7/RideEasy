
import { CiStopwatch } from "react-icons/ci";
// import { CaptainDataContext } from '../context/CapatainContext'
import { useSelector } from "react-redux";

const DriverDetails = () => {

    // const { captain } = useContext(CaptainDataContext)

    const driver = useSelector(store => store.driver)

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{driver.fullName.firstName}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹2*****</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
                <div className='text-center'>
                <h5 className="ml-6 text-3xl mb-2 font-thin ri-booklet-line"><CiStopwatch /></h5>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                <h5 className="ml-6 text-3xl mb-2 font-thin ri-booklet-line"><CiStopwatch /></h5>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <h5 className="ml-6 text-3xl mb-2 font-thin ri-booklet-line"><CiStopwatch /></h5>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

            </div>
        </div>
    )
}

export default DriverDetails