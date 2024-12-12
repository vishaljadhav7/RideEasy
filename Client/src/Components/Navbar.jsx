import {LOGO_URL} from '../constants'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white  border-b-2  shadow-xl w-full py-2 px-6 flex items-center justify-between ">
      <div className="w-[80px]">
        <img src={LOGO_URL} alt="Logo" className="w-full rounded-lg" />
      </div>
       <Link to={"/"}>
       <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
        Home
      </button>
       </Link>
    </nav>
  );
};


export default Navbar