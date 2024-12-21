import { Link } from "react-router-dom";
import {MAIN_URL} from '../constants'
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import Footer from "../Components/Footer";

const Main = () => {
  // const rideInfo = useSelector(store => store.ride)
  // const driverInfo = useSelector(store => store.driver)
  // const navigate = useNavigate()

  //  useEffect(()=>{
  //   if(driverInfo){
  //     navigate("/drive-home")
  //   }else if(rideInfo){
  //     navigate("/ride-home")
  //   }
  //  }, [])
  return (
  <>
    <div 
      className="flex-grow flex flex-col justify-center items-center text-center bg-cover bg-center px-4 py-10 min-h-screen"
      style={{ backgroundImage: `url(${MAIN_URL})`}}
    >
      <div className="bg-slate-300 bg-opacity-80 p-6 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Ride Easy</h1>
        <p className="text-lg text-gray-600 mb-6">
        Welcome to RideEasy – your smarter way to travel! From work commutes to city rides, enjoy safe, affordable, and reliable trips. Pick your vehicle, track your ride, and go seamlessly. RideEasy: Your journey, simplified.
        </p>
     <Link to={"access-page"}>
     <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition duration-300">
          Get Started
        </button>
     </Link>
      </div>
    </div>
    <Footer/>
  </>

  );
};

export default Main