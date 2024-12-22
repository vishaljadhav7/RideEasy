// import { useEffect } from "react"
// import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
import { TEMP_IMG } from "../constants"
import DriverDetails from "../Components/DriverDetails"
import RidePopUp from "../Components/RidePopUp"
import { useState } from "react"
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp"


const DriverHome = () => {

  const [showRidePopUp, setShowRidePopUp] = useState(true)


const handleConfirmRide = () => {
 
  setShowRidePopUp(false)
}
  

  return (
    <div className="md:flex">
      <div className="h-screen md:w-[60%]  hidden md:block relative">
         <h1 className="text-2xl absolute left-[28%] top-5 font-bold text-gray-400 translate-x-2/4">Welcome Captain!</h1>
        <div className="w-full h-full flex flex-col justify-center items-center gap-5">
          
         <div className="w-[70%] bg-white px-6 py-4 rounded-lg shadow-lg">
         <DriverDetails/>  
         </div>
         {/* <div className="w-[50%] min-h-24 ">
            <h3 className="text-center mt-4 text-xl font-medium text-black">Recent Rides</h3>

            <h5 className="text-center mt-3">No Rides Available!</h5>
         </div> */}

         {showRidePopUp ? (<div className="absolute bg-white w-[50%] h-[70%] p-4 transition-all ease-in">
          <RidePopUp handleConfirmRide={handleConfirmRide}/> 
         </div>)
            : 
         (<div className="absolute bg-white w-[50%] h-[70%] p-4 transition-all ease-in">
          <ConfirmRidePopUp/>
         </div>) } 
        </div> 

      </div>

      <div className="w-screen h-screen md:w-[40%] block ">
        <div className="w-full h-full md:flex justify-center items-center">
          <img
            src={TEMP_IMG}
            className="h-screen md:h-[600px] w-full md:w-[70%] md:object-cover md:border-white border-4"
          />
        </div>
    
        <div className="h-2/5 p-6 w-full fixed bottom-0 bg-white visible md:hidden">
         <DriverDetails/>  
        </div>        
       {showRidePopUp ? ( <div className="bg-white w-full p-2 fixed bottom-0 visible md:hidden">
        <RidePopUp handleConfirmRide={handleConfirmRide}/>
        </div>) :
        (<div className="bg-white w-full p-2 fixed bottom-0 visible md:hidden">
        <ConfirmRidePopUp/> 
        </div>)}
      </div>
    </div>
  )
}

export default DriverHome