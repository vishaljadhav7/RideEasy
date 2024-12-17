import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const DriverHome = () => {
  const driverInfo = useSelector(store => store.driver)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!driverInfo){
      navigate("/drive-signin")
    }
  }, [])

  return (
    <div className="w-screen h-screen bg-fuchsia-300 flex justify-center items-center">
        <div className="w-[50%] h-[50%] bg-slate-500 p-4 flex flex-col items-center justify-center gap-2 shadow-lg rounded-lg">
            <img src={driverInfo?.profilePic} alt="" className="w-16 p-2 "/>
            <h1>{driverInfo?.fullName?.firstName} {driverInfo?.fullName?.lastName}</h1>
        </div>
    </div>
  )
}

export default DriverHome