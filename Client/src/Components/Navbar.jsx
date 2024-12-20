import {LOGO_URL} from '../constants'
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from 'react-redux';


const Navbar = () => {
 const user = null
 const driverInfo = useSelector(store => store.driver)
 console.log("driverInfo from nav " , driverInfo)
  return (
   <div className=''>
    <nav className="bg-white  border-b-2  shadow-xl w-full py-2 px-6 md:flex items-center justify-between hidden md:visible">
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-yellow-400">
            Ryde<span className="text-slate-500">Easy</span>
          </h1>
        </div>
       <Link to={"/"}>
       <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
        Home
      </button>
       </Link>
    </nav>
     <div className="absolute w-screen px-8 pt-6 flex justify-between items-center visible md:hidden">
     <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-black">
            Ryde<span className="text-slate-500">Easy</span>
          </h1>
        </div>
      { user ?
        <RxHamburgerMenu  className="font-bold cursor-pointer hover:scale-y-90 transition-all"/> : 
        <Link to={"/"}>
        <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
         Home
       </button>
        </Link>
        }
      </div>  
   </div> 
  );
};


export default Navbar