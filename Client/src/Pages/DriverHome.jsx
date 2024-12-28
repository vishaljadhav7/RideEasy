import LocationTracking from "../Components/LocationTracking"
import { BASE_URL, TEMP_IMG } from "../constants"
import DriverDetails from "../Components/DriverDetails"
import RidePopUp from "../Components/RidePopUp"
import { useState, useEffect } from "react"
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp"
import { useWebSocketContext } from "../Context/WebSocketContext";
import { addNewRide, addConfirmedRide } from "../utils/rideInfoForDriverSlice"
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"

const STATUSES = Object.freeze({
  RIDEPOPUP : "ridepopup",
  RIDECONFRIM : 'rideconfirm',
  NONE : "none"
})  

const DriverHome = () => {
  const dispatch = useDispatch();
  const [rideStatus, setRideStatus] = useState(STATUSES.NONE);
  const {socket} = useWebSocketContext();
  const driver = useSelector(store => store.driver);
  const  [newRide, setNewRide] = useState({})
  // const newRide =  useSelector(store => store.rideForDriver)
  
  // console.log("newRide @DriverHome", newRide)
  

  const handleConfirmRide = async () => {
 
    try {
      const res = await axios.post(BASE_URL + "/ride/confirm-ride" , {rideId : newRide._id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(addConfirmedRide(res.data.data));
      setRideStatus(STATUSES.RIDECONFRIM);
    } catch (error) {
      console.error(error);
    }
  };
  
  
    
 useEffect(() => {
  socket.emit("join", { clientType: "driver", clientId: driver._id })

  const updateLocation = () => {
    if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition((position) => {
       socket.emit('update-driver-location', {
         clientId: driver._id,
         location: {
           ltd: position.coords.latitude,
           lng: position.coords.longitude
         }
       })
     })
    }
  }

   updateLocation();

    socket.on('new-ride', (data) => {
    setRideStatus(STATUSES.RIDEPOPUP);
    dispatch(addNewRide(data))
    setNewRide(data);
   });

  }, [driver])



  return (
    <div className="md:flex">
      <div className="h-screen md:w-[60%]  hidden md:block relative">
         <h1 className="text-2xl absolute left-[28%] top-5 font-bold text-gray-400 translate-x-2/4">Welcome Captain!</h1>
        <div className="w-full h-full flex flex-col justify-center items-center gap-5">
          
         <div className="w-[70%] bg-white px-6 py-4 rounded-lg shadow-lg">
         <DriverDetails/>  
         </div>
         {rideStatus === STATUSES.RIDEPOPUP && <div className="absolute bg-white w-[50%] h-[70%] p-4 transition-all ease-in">
          <RidePopUp handleConfirmRide={handleConfirmRide}/> 
         </div>}
  
         { rideStatus === STATUSES.RIDECONFRIM && <div className="absolute bg-white w-[50%] h-[70%] p-4 transition-all ease-in">
          <ConfirmRidePopUp/>
         </div>} 
        </div> 

      </div>

      <div className="w-screen h-screen md:w-[40%] block ">
        <div className="w-full h-full md:flex justify-center items-center">
        <div className="h-screen md:h-[600px] w-full md:w-[70%] md:object-cover md:border-white border-4">

<LocationTracking/>
</div>
        </div>
    
        <div className="h-2/5 p-6 w-full fixed bottom-0 bg-white visible md:hidden">
         <DriverDetails/>  
        </div>        
       {rideStatus === STATUSES.RIDEPOPUP && <div className="bg-white w-full p-2 fixed bottom-0 visible md:hidden">
        <RidePopUp handleConfirmRide={handleConfirmRide}/>
        </div>} 
        {rideStatus === STATUSES.RIDECONFRIM && <div className="bg-white w-full p-2 fixed bottom-0 visible md:hidden">
        <ConfirmRidePopUp/> 
        </div>}
      </div>
    </div>
  )
}

export default DriverHome