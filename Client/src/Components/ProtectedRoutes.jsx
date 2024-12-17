import { useSelector} from "react-redux";
import { useNavigate , Outlet} from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoutes = () => {

  const rideInfo = useSelector(store => store.ride)
  const driverInfo = useSelector(store => store.driver)
  const navigate = useNavigate()

  useEffect(()=>{
    console.log("driverInfo from navbar", driverInfo)
    if(driverInfo){
      navigate("/drive-home")

    }else if(rideInfo){
      navigate("/ride-home")
    }else{
        navigate("/access-page")
    }
   }, [rideInfo, driverInfo, navigate])

}

export default ProtectedRoutes