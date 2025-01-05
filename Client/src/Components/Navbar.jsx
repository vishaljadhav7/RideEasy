import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './SideBar';



const Navbar = () => {
  const rider = useSelector(store => store.ride);
  const driver = useSelector(store => store.driver);
  

  return (
    <nav className="relative bg-white border-b-2 shadow-xl w-full py-2 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-yellow-400">
          Ryde<span className="text-slate-500">Easy</span>
        </h1>
      </div>
      { (!rider && !driver) ? <div className="">
        <Link to="/">
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
            Main
          </button>
        </Link>
      </div> : null }
      { (rider || driver) && <Sidebar isRider={rider}/>}
    </nav>
  );
};


export default Navbar