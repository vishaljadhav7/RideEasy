import AwaitingDriverPanel from "../Components/AwaitingDriverPanel";
import LookingForDriverPanel from "../Components/LookingForDriverPanel";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch } from "react-redux";
import LocationTracking from "../Components/LocationTracking";
import { useWebSocketContext } from "../Context/WebSocketContext";
import { addBookedRide, addStartedRide } from "../utils/rideInfoForUserSlice";
import { useNavigate } from "react-router-dom";

const MonitoringDriver = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("lookingForDriver"); // "lookingForDriver" or "awaitingDriver"
  const lookingForDriverPanelRef = useRef(null);
  const awaitingDriverPanelRef = useRef(null);
  const { socket } = useWebSocketContext();

  useGSAP(() => {
    if (activePanel === "lookingForDriver") {
      gsap.to(lookingForDriverPanelRef.current, { y: 0, opacity: 1 });
      gsap.to(awaitingDriverPanelRef.current, { y: "100%", opacity: 0 });
    } else if (activePanel === "awaitingDriver") {
      gsap.to(lookingForDriverPanelRef.current, { y: "100%", opacity: 0, display: "none" });
      gsap.to(awaitingDriverPanelRef.current, { y: 0, opacity: 1 });
    }
  }, [activePanel]);

  const handleLookingForDriver = () => {
    setActivePanel("awaitingDriver");
  };

  useEffect(() => {
    socket.on("ride-confirmed", (data) => {
      dispatch(addBookedRide(data));
      handleLookingForDriver();
    });

    socket.on("ride-started", (ride) => {
      dispatch(addStartedRide(ride));
      navigate("/user-riding");
    });
  }, []);

  return (
    <div className="md:flex h-screen">

      {/* ✅ Desktop View */}
      <div className="hidden md:flex h-full w-[60%] bg-gray-100">
        {/* 📄 Form Section */}
        <div className="w-[38%] flex justify-center items-center">
          <form className="w-[85%] bg-white p-6 shadow-lg rounded-lg space-y-4">
            <h1 className="text-2xl font-semibold text-center text-gray-800">Plan Your Trip</h1>
            <input
              type="text"
              placeholder="Pickup Location"
              className="w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder="Destination"
              className="w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </form>
        </div>

        {/* 📝 Panel Section */}
        <div className="w-[62%] flex justify-center items-center">
          {activePanel === "lookingForDriver" && (
            <div className="w-[90%] bg-white p-6 shadow-xl rounded-lg">
              <LookingForDriverPanel handleLookingForDriver={handleLookingForDriver} />
            </div>
          )}
          {activePanel === "awaitingDriver" && (
            <div className="w-[90%] bg-white p-6 shadow-xl rounded-lg">
              <AwaitingDriverPanel />
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mobile View */}
      <div className="w-screen md:w-[40%] h-full relative">
        {/* 🗺️ Location Tracking */}
        <div className="h-full w-full border-4 border-white overflow-hidden">
          <LocationTracking />
        </div>

        {/* 🚗 LookingForDriver Panel */}
        <div
          ref={lookingForDriverPanelRef}
          className={`absolute bottom-0 w-full z-10 bg-white px-5 py-8 shadow-2xl rounded-t-2xl transform md:hidden ${
            activePanel === "lookingForDriver" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <LookingForDriverPanel handleLookingForDriver={handleLookingForDriver} />
        </div>

        {/* 🚦 AwaitingDriver Panel */}
        {activePanel !== "lookingForDriver" && (
          <div
            ref={awaitingDriverPanelRef}
            className="absolute bottom-0 w-full z-10 bg-white px-5 py-8 shadow-2xl rounded-t-2xl transform md:hidden"
          >
            <AwaitingDriverPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitoringDriver;
