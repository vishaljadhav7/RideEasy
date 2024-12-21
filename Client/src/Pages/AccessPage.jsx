import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const allAccessLinks = [
  {
    id: 1,
    link: "driver-signup",
    title: "Sign Up as Driver",
  },
  {
    id: 3,
    link: "driver-signin",
    title: "Sign In as Driver",
  },
  {
    id: 7,
    link: "user-signup",
    title: "Sign Up as Ride/User",
  },
  {
    id: 10,
    link: "user-signin",
    title: "Sign In as Ride/User",
  },
];

const AccessPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 text-center">
        Access Your Dashboard
      </h1>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
        {allAccessLinks.map((accessLink) => (
          <Link to={`/${accessLink.link}`} key={accessLink.id}>
            <div className="relative flex items-center justify-between gap-5 h-[90px] w-[330px] p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <h3 className="text-lg md:text-xl text-gray-700 font-semibold tracking-wide">
                {accessLink.title}
              </h3>
              <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white rounded-full w-10 h-10 transition-all duration-300">
                <FaArrowRight />
              </button>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent to-gray-100 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccessPage;
