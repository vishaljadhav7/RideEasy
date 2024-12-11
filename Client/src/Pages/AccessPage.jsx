
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const allAccessLinks = [
    {
        id : 1,
        link : "driver-signup",
        title : "Sign Up as Driver"
    },
    {
        id : 3,
        link : "driver-signin",
        title : "Sign In as Driver"
    },
    {
        id : 7,
        link : "user-signup",
        title : "Sign Up as Ride/User"
    },
    {
        id : 10,
        link : "user-signin",
        title : "Sign In as Ride/User"
    },
    
]

const AccessPage = () => {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allAccessLinks.map((accessLink) => {
            return (
              <Link to={"/" + accessLink.link} key={accessLink.id}>
                <div className="border-black border-b-2 flex items-center justify-between gap-5 h-[90px] w-[330px] p-4">
                  <h3 className="text-3xl text-black font-bold">{accessLink.title}</h3>
                  <button className="border-none outline-none px-8 py-2 bg-white text-black rounded-full">
                    <FaArrowRight />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };
  

export default AccessPage