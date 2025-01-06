import React, { useState } from 'react';
import { IoLocationOutline, IoLocation } from 'react-icons/io5';
import { GrCurrency } from 'react-icons/gr';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { addStartedRide } from '../utils/rideInfoForDriverSlice';

const ConfirmRidePopUp = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirmedRide = useSelector((store) => store.rideForDriver.confirmedRide);

  const handleRideStartWithOTP = async () => {
    try {
      const res = await axios.get(BASE_URL + '/ride/start-ride', {
        params: {
          rideId: confirmedRide._id,
          otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(addStartedRide(res.data.data));
      navigate('/driver-riding', { state: confirmedRide });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto ">
      {/* 🚗 Ride Confirmation Header */}
      <h3 className="text-2xl font-bold mb-5 text-center text-gray-800">Confirm Ride to Start</h3>

      {/* 🧑 Rider Info */}
      <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mb-6">
        <div className="flex items-center gap-4">
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={confirmedRide?.user.profilePic}
            alt="User Profile"
          />
          <h2 className="text-lg font-medium capitalize">{confirmedRide?.user.firstName}</h2>
        </div>
        <h5 className="text-lg font-semibold">
          <span className="text-sm font-bold text-red-500">STATUS:</span> {confirmedRide?.status}
        </h5>
      </div>

      {/* 📍 Ride Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-3 border-b">
          <IoLocationOutline className="text-2xl text-gray-600" />
          <div>
            <h3 className="text-lg font-medium">{confirmedRide?.driver?.vehicleDetails?.plateNumber}</h3>
            <p className="text-sm text-gray-500">{confirmedRide?.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 border-b">
          <IoLocation className="text-2xl text-gray-600" />
          <div>
            <h3 className="text-lg font-medium">{confirmedRide?.driver?.vehicleDetails?.plateNumber}</h3>
            <p className="text-sm text-gray-500">{confirmedRide?.destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3">
          <GrCurrency className="text-2xl text-gray-600" />
          <div>
            <h3 className="text-lg font-medium">₹{confirmedRide?.fare}</h3>
            <p className="text-sm text-gray-500">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* 🔑 OTP & Buttons */}
      <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          type="text"
          className="w-full bg-gray-100 px-4 py-3 text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter OTP"
        />
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 rounded-lg"
          onClick={handleRideStartWithOTP}
        >
          Start Ride
        </button>
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-3 rounded-lg"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ConfirmRidePopUp;
