import AwaitingDriverPanel from "../Components/AwaitingDriverPanel";
import LookingForDriverPanel from "../Components/LookingForDriverPanel";
import { TEMP_IMG } from "../constants";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MonitoringDriver = () => {
  const [activePanel, setActivePanel] = useState("lookingForDriver"); // Active panel: "lookingForDriver" or "awaitingDriver"
  const lookingForDriverPanelRef = useRef(null);
  const awaitingDriverPanelRef = useRef(null);

  useGSAP(() => {
    console.log("Active Panel:", activePanel); // Debugging state changes

    if (activePanel === "lookingForDriver") {
      // Animate panels when looking for driver
      gsap.to(lookingForDriverPanelRef.current, {
        y: 0,
        opacity: 1,
      });
      gsap.to(awaitingDriverPanelRef.current, {
        y: "100%",
        opacity: 0,
      });
    } else if (activePanel === "awaitingDriver") {
      // Animate panels when awaiting driver
      gsap.to(lookingForDriverPanelRef.current, {
        y: "100%",
        opacity: 0,
        display : "none"
      });
      gsap.to(awaitingDriverPanelRef.current, {
        y: 0,
        opacity: 1,
      });
    }
  }, [activePanel]); // Re-run animation whenever activePanel changes

  const handleLookingForDriver = () => {
    console.log("Switching to AwaitingDriverPanel"); // Debug user action
    setActivePanel("awaitingDriver");
  };

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
          {activePanel === "lookingForDriver" && (
            <div className="w-[90%] h-[70%] bg-white p-4 shadow-md rounded-md">
              <LookingForDriverPanel handleLookingForDriver={handleLookingForDriver} />
            </div>
          )}
          {activePanel === "awaitingDriver" && (
            <div className="w-[90%] h-[70%] bg-white p-4 shadow-md rounded-md">
              <AwaitingDriverPanel />
            </div>
          )}
        </div>
      </div>

      {/* Right Panel for Small Devices */}
      <div className="w-screen h-screen md:w-[40%]">
        <div className="w-full h-full md:flex justify-center items-center">
          <img
            src={TEMP_IMG}
            className="h-screen md:h-[600px] w-full md:w-[70%] md:object-cover md:border-white border-4"
          />
        </div>

        {/* Small Device Panel: LookingForDriver */}
        <div
          ref={lookingForDriverPanelRef}
          className={`absolute w-full z-10 bottom-0 bg-white px-3 py-10 transform md:hidden ${
            activePanel === "lookingForDriver" ? "translate-y-0 opacity-1" : "translate-y-full opacity-0"
          }`}
        >
          <LookingForDriverPanel handleLookingForDriver={handleLookingForDriver} />
        </div>

        {/* Small Device Panel: AwaitingDriver */}
{ (activePanel !== "lookingForDriver") &&    <div
          ref={awaitingDriverPanelRef}
          className={`absolute w-full z-10 bottom-0 bg-white px-3 py-10 transform  md:hidden `}
        >
          <AwaitingDriverPanel />
        </div>}
      </div>
    </div>
  );
};

export default MonitoringDriver;
