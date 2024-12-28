import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { addDriver } from "../utils/driverSlice";

const DriverSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ emailId: null, password: null });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/auth/driver/signin", {
        ...formData,
      });
      localStorage.setItem("token", res.data.token);
      dispatch(addDriver(res.data.data));
      return navigate("/drive-home");
    } catch (error) {
      setErrorMessage(error || "Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    const canSubmit = Object.keys(formData).every((field) => Boolean(formData[field]));
    setIsSubmit(canSubmit);
  }, [formData]);

  return (
    <div className="h-screen w-full md:flex bg-gradient-to-br from-orange-100 to-orange-300 md:bg-white">
      {/* Sign In Form Section */}
      <div className="h-full md:w-[40%] w-[100%] flex items-center justify-center bg-white shadow-md md:rounded-r-lg">
        <form
          onSubmit={handleSubmit}
          onChange={handleChange}
          className="w-[80%] md:w-[75%] bg-white h-auto shadow-lg p-6 flex flex-col gap-6 rounded-lg border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">Driver Sign In</h2>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="emailId"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between mt-4 gap-2">
            <button
              className={`px-4 py-2 text-white rounded-md font-semibold ${
                isSubmit
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-300 cursor-not-allowed"
              } transition-all duration-300`}
              type="submit"
              disabled={!isSubmit}
            >
              Sign In
            </button>
            <p className="text-sm text-gray-600">
              New Here?{" "}
              <Link to="/driver-signup" className="text-orange-500 font-medium hover:underline">
                Sign Up!
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 mt-3 text-sm">{errorMessage.message}</p>}
        </form>
      </div>

      {/* Info Section */}
      <div className="h-full w-[60%] md:flex flex-col items-center justify-center gap-4 hidden md:visible bg-gradient-to-bl from-orange-100 to-orange-300 shadow-inner p-6 rounded-l-lg">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Back, Driver!</h1>
        <p className="text-md text-gray-700 w-[70%] text-center leading-relaxed">
          Manage your rides, track earnings, and keep your journey smooth. Sign in to stay connected
          and on the move!
        </p>
      </div>
    </div>
  );
};

export default DriverSignIn;
