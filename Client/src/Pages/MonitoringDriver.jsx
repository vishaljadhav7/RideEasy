import AwaitingDriverPanel from "../Components/AwaitingDriverPanel";
import { TEMP_IMG } from "../constants";


const MonitoringDriver = () => {
    return (
        <div className="md:flex">
          <div className="w-[60%] md:flex h-screen hidden md:visible">
            {/* Form Section */}
            <div className="h-full w-[38%] flex justify-center items-center">
              <form className="w-[85%] bg-gray-100 p-6 shadow-md rounded-md flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-gray-800 text-center">Plan Your Trip</h1>
                <input
                  type="text"
                  placeholder="Pickup Location"
                  className="bg-white px-4 py-2 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                  type="text"
                  placeholder="Destination"
                  className="bg-white px-4 py-2 text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </form>
            </div>
            <div className="h-full w-[62%] flex justify-center items-center">
              <div className="w-[90%] h-[70%] bg-white p-4 shadow-md rounded-md">
                <AwaitingDriverPanel />
              </div>
            </div>
          </div>
    
          {/* Right Panel: Image */}
          <div className="w-screen h-screen md:w-[40%]">
            <div className="w-full h-full md:flex justify-center items-center">
              <img
                src={TEMP_IMG}
                className="h-screen md:h-[600px] w-full md:w-[70%] md:object-cover md:border-white border-4"
              />
            </div>
    
            {/* Ride Options Panel */}
            <div
              className="absolute w-full z-10 bottom-0 bg-white px-3 py-10 pt-10 transform translate-y-0 opacity-1 block md:hidden"
            >
              <AwaitingDriverPanel  />
            </div>

          </div>
        </div>
      );
}

export default MonitoringDriver